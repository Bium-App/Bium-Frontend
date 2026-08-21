import {
  addMemoImageApi,
  deleteMemoImageApi,
  uploadSelectedFileApi,
} from '../api/files';
import {FILE_DOMAINS} from './filePicker';
import type {EntityId} from '../types/api';
import type {SelectedFile} from '../types/file';

interface SaveMemoImageChangesParams {
  memoId: EntityId;
  newFiles: SelectedFile[];
  removedImageIds: EntityId[];
}

export const saveMemoImageChanges = async ({
  memoId,
  newFiles,
  removedImageIds,
}: SaveMemoImageChangesParams): Promise<void> => {
  // 교체 중 업로드나 메타데이터 연결이 실패해도 기존 이미지는 보존한다.
  // 새 이미지가 메모에 정상 연결된 뒤에만 기존 이미지 삭제를 확정한다.
  const addedImageIds: EntityId[] = [];

  try {
    for (const file of newFiles) {
      const imageUrl = await uploadSelectedFileApi({
        domain: FILE_DOMAINS.MEMO,
        file,
      });
      const addedImage = await addMemoImageApi(memoId, imageUrl);
      addedImageIds.push(addedImage.imageId);
    }

    for (const imageId of removedImageIds) {
      await deleteMemoImageApi(imageId);
    }
  } catch (error) {
    // 새 이미지 연결 후 기존 이미지 삭제가 실패하면, 새 연결을 되돌려
    // 교체 전 이미지와 교체 이미지가 동시에 남지 않도록 한다.
    await Promise.allSettled(
      addedImageIds.map(imageId => deleteMemoImageApi(imageId)),
    );
    throw error;
  }
};
