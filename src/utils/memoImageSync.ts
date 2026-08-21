import {
  addMemoImageApi,
  deleteMemoImageApi,
  getMemoImagesApi,
  uploadSelectedFileApi,
} from '../api/files';
import {FILE_DOMAINS} from './filePicker';
import type {EntityId} from '../types/api';
import type {MemoImage, SelectedFile} from '../types/file';

interface SaveMemoImageChangesParams {
  memoId: EntityId;
  newFiles: SelectedFile[];
  removedImageIds: EntityId[];
}

export type MemoImageSyncErrorCode =
  | 'UPLOAD_FAILED'
  | 'ATTACH_FAILED'
  | 'EXISTING_DELETE_FAILED'
  | 'RECOVERY_FAILED';

export class MemoImageSyncError extends Error {
  readonly code: MemoImageSyncErrorCode;
  readonly serverImages?: MemoImage[];
  readonly originalError: unknown;

  constructor(
    code: MemoImageSyncErrorCode,
    message: string,
    originalError: unknown,
    serverImages?: MemoImage[],
  ) {
    super(message);
    this.name = 'MemoImageSyncError';
    this.code = code;
    this.originalError = originalError;
    this.serverImages = serverImages;
  }
}

const idsMatch = (left: EntityId, right: EntityId): boolean =>
  String(left) === String(right);

const includesImageId = (
  images: MemoImage[],
  imageId: EntityId,
): boolean => images.some(image => idsMatch(image.imageId, imageId));

const deleteImagesWithRetry = async (
  imageIds: EntityId[],
  maxAttempts = 3,
): Promise<void> => {
  let pendingIds = [...imageIds];

  for (
    let attempt = 0;
    attempt < maxAttempts && pendingIds.length > 0;
    attempt += 1
  ) {
    const results = await Promise.allSettled(
      pendingIds.map(imageId => deleteMemoImageApi(imageId)),
    );
    pendingIds = pendingIds.filter(
      (_, index) => results[index].status === 'rejected',
    );
  }
};

type RecoveryResult =
  | {status: 'ROLLED_BACK'; serverImages: MemoImage[]}
  | {status: 'REPLACEMENT_COMPLETED'; serverImages: MemoImage[]};

const recoverFailedReplacement = async ({
  memoId,
  addedImageIds,
  removedImageIds,
  originalError,
}: {
  memoId: EntityId;
  addedImageIds: EntityId[];
  removedImageIds: EntityId[];
  originalError: unknown;
}): Promise<RecoveryResult> => {
  // 우선 새 이미지 연결을 되돌린다. 삭제 응답 자체가 실패해도 실제 서버
  // 상태는 달라질 수 있으므로 반드시 목록을 다시 조회해 결과를 확인한다.
  await deleteImagesWithRetry(addedImageIds);

  let serverImages: MemoImage[];
  try {
    serverImages = await getMemoImagesApi(memoId);
  } catch (requeryError) {
    throw new MemoImageSyncError(
      'RECOVERY_FAILED',
      '이미지 교체 복구 후 서버 상태를 확인하지 못했습니다.',
      requeryError,
    );
  }

  const hasAddedImages = addedImageIds.some(imageId =>
    includesImageId(serverImages, imageId),
  );
  if (!hasAddedImages) {
    return {status: 'ROLLED_BACK', serverImages};
  }

  const hasRemovedImages = removedImageIds.some(imageId =>
    includesImageId(serverImages, imageId),
  );
  if (!hasRemovedImages) {
    return {status: 'REPLACEMENT_COMPLETED', serverImages};
  }

  // 새 이미지 롤백이 불가능하면 기존 이미지 삭제를 다시 시도해 교체를
  // 완결한다. 둘 중 한쪽 관계는 반드시 정리하는 것이 목적이다.
  const oldImagesStillAttached = removedImageIds.filter(imageId =>
    includesImageId(serverImages, imageId),
  );
  await deleteImagesWithRetry(oldImagesStillAttached);

  try {
    serverImages = await getMemoImagesApi(memoId);
  } catch (requeryError) {
    throw new MemoImageSyncError(
      'RECOVERY_FAILED',
      '이미지 교체 재시도 후 서버 상태를 확인하지 못했습니다.',
      requeryError,
    );
  }

  const oldImagesRemain = removedImageIds.some(imageId =>
    includesImageId(serverImages, imageId),
  );
  if (!oldImagesRemain) {
    return {status: 'REPLACEMENT_COMPLETED', serverImages};
  }

  // 기존 이미지 삭제까지 실패했다면 새 이미지 롤백을 마지막으로 한 번
  // 더 수행하고 재조회한다.
  const newImagesStillAttached = addedImageIds.filter(imageId =>
    includesImageId(serverImages, imageId),
  );
  await deleteImagesWithRetry(newImagesStillAttached);

  try {
    serverImages = await getMemoImagesApi(memoId);
  } catch (requeryError) {
    throw new MemoImageSyncError(
      'RECOVERY_FAILED',
      '이미지 교체 최종 복구 상태를 확인하지 못했습니다.',
      requeryError,
    );
  }

  const newImagesRemain = addedImageIds.some(imageId =>
    includesImageId(serverImages, imageId),
  );
  if (!newImagesRemain) {
    return {status: 'ROLLED_BACK', serverImages};
  }

  if (
    !removedImageIds.some(imageId => includesImageId(serverImages, imageId))
  ) {
    return {status: 'REPLACEMENT_COMPLETED', serverImages};
  }

  throw new MemoImageSyncError(
    'RECOVERY_FAILED',
    '기존 이미지와 새 이미지 관계를 자동으로 정리하지 못했습니다.',
    originalError,
    serverImages,
  );
};

export const saveMemoImageChanges = async ({
  memoId,
  newFiles,
  removedImageIds,
}: SaveMemoImageChangesParams): Promise<void> => {
  const addedImageIds: EntityId[] = [];

  for (const file of newFiles) {
    let imageUrl: string;
    try {
      imageUrl = await uploadSelectedFileApi({
        domain: FILE_DOMAINS.MEMO,
        file,
      });
    } catch (error) {
      throw new MemoImageSyncError(
        'UPLOAD_FAILED',
        '새 이미지 파일을 업로드하지 못했습니다.',
        error,
      );
    }

    try {
      const addedImage = await addMemoImageApi(memoId, imageUrl);
      addedImageIds.push(addedImage.imageId);
    } catch (error) {
      throw new MemoImageSyncError(
        'ATTACH_FAILED',
        '업로드한 이미지를 메모에 연결하지 못했습니다.',
        error,
      );
    }
  }

  try {
    for (const imageId of removedImageIds) {
      await deleteMemoImageApi(imageId);
    }
  } catch (error) {
    if (addedImageIds.length === 0) {
      throw new MemoImageSyncError(
        'EXISTING_DELETE_FAILED',
        '기존 이미지를 삭제하지 못했습니다.',
        error,
      );
    }

    const recovery = await recoverFailedReplacement({
      memoId,
      addedImageIds,
      removedImageIds,
      originalError: error,
    });

    if (recovery.status === 'ROLLED_BACK') {
      throw new MemoImageSyncError(
        'EXISTING_DELETE_FAILED',
        '기존 이미지 삭제에 실패해 새 이미지 연결을 되돌렸습니다.',
        error,
        recovery.serverImages,
      );
    }
    // 기존 이미지 삭제 재시도로 교체가 완결됐다면 정상 저장으로 처리한다.
  }
};
