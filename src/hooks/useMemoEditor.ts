import { useCallback, useEffect, useState } from 'react';
import { Alert } from 'react-native';
import dayjs from 'dayjs';
import { createMemoApi, updateMemoApi } from '../api/memos';
import {pickMemoImageFiles} from '../utils/filePicker';
import { formatApiDateTime } from '../utils/dateTime';
import { getApiResponseMessage, getErrorMessage } from '../utils/apiError';
import type { EntityId } from '../types/api';
import type { MemoEditorData } from '../types/navigation';
import type { MemoImage, SelectedFile } from '../types/file';
import type { MemoRichContent } from '../types/memo';
import { saveRecentFile } from '../utils/recentFiles';
import {
  MemoImageSyncError,
  saveMemoImageChanges,
} from '../utils/memoImageSync';

// 새 FIRE 메모 생성 시 timer(시간 단위 문자열)를 더해 만료 시각을 계산한다.
const getExpiration = (timer: string): string | null => {
  const hours = Number.parseInt(timer, 10);
  return Number.isFinite(hours)
    ? formatApiDateTime(dayjs().add(hours, 'hour'))
    : null;
};

const getImageSyncErrorDetail = (error: unknown): string => {
  const source =
    error instanceof MemoImageSyncError ? error.originalError : error;
  return (
    getApiResponseMessage(source) ??
    getErrorMessage(source) ??
    '서버에서 이미지 변경을 처리하지 못했습니다.'
  );
};

// 메모 작성/수정 화면의 제목·내용·이미지 입력 상태를 관리하고, 저장 시 메모 생성/수정 API와
// 이미지 동기화(첨부/삭제)를 처리하는 훅.
export const useMemoEditor = (initialData?: MemoEditorData) => {
  const [title, setTitle] = useState(initialData?.title ?? '');
  const [content, setContent] = useState(initialData?.content ?? '');
  const [timer, setTimer] = useState('24h');
  const [isLoading, setIsLoading] = useState(false);
  const [mediaFiles, setMediaFiles] = useState<SelectedFile[]>([]);
  const [isPickingMedia, setIsPickingMedia] = useState(false);
  const [existingImages, setExistingImages] = useState<MemoImage[]>(
    initialData?.images ?? [],
  );
  const [removedImageIds, setRemovedImageIds] = useState<EntityId[]>([]);

  const selectMedia = useCallback(async (): Promise<void> => {
    if (isPickingMedia) return;
    setIsPickingMedia(true);
    try {
      const files = await pickMemoImageFiles();
      if (files.length === 0) return;
      // 메모당 이미지는 하나만 유지하므로 여러 장을 선택해도 첫 번째 파일만 사용한다.
      setMediaFiles(files.slice(0, 1));
      for (const file of files) {
        await saveRecentFile(file).catch(() => undefined);
      }
    } catch (error) {
      Alert.alert(
        '이미지 선택 실패',
        getErrorMessage(error) ?? '이미지를 선택하지 못했습니다.',
      );
    } finally {
      setIsPickingMedia(false);
    }
  }, [isPickingMedia]);

  const removeMedia = useCallback((uri: string): void => {
    setMediaFiles(current => current.filter(file => file.uri !== uri));
  }, []);

  const removeExistingImage = useCallback((imageId: EntityId): void => {
    // 편집을 취소하면 원본 이미지가 그대로 유지되도록 화면에서만 숨기고,
    // 실제 삭제는 사용자가 저장을 확정한 뒤 처리한다.
    setRemovedImageIds(current =>
      current.some(id => String(id) === String(imageId))
        ? current
        : [...current, imageId],
    );
    setExistingImages(current =>
      current.filter(image => String(image.imageId) !== String(imageId)),
    );
  }, []);

  const resetForm = useCallback((): void => {
    setTitle('');
    setContent('');
    setTimer('24h');
    setMediaFiles([]);
    setExistingImages(initialData?.images ?? []);
    setRemovedImageIds([]);
  }, [initialData?.images]);

  // initialData가 바뀌면(다른 메모를 편집하도록 전환된 경우) 입력 상태를 새 메모 기준으로 초기화한다.
  useEffect(() => {
    setTitle(initialData?.title ?? '');
    setContent(initialData?.content ?? '');
    setTimer('24h');
    setMediaFiles([]);
    setExistingImages(initialData?.images ?? []);
    setRemovedImageIds([]);
  }, [
    initialData?.content,
    initialData?.id,
    initialData?.images,
    initialData?.title,
  ]);

  // 메모 내용을 먼저 저장한 뒤 이미지 변경(첨부/삭제)을 순차로 처리하고,
  // 이미지 동기화 단계별 실패 원인에 맞는 안내 메시지를 보여준다.
  const handleSave = async (
    memoId?: EntityId,
    onSuccess?: () => void,
    editorContent?: {content: string; richContent: MemoRichContent},
  ): Promise<void> => {
    const plainContent = editorContent?.content.trim() ?? content.trim();
    if (!title.trim() || !plainContent) {
      Alert.alert('알림', '제목과 내용을 모두 입력해주세요.');
      return;
    }
    if (plainContent.length > 2000) {
      Alert.alert('알림', '내용은 최대 2000자까지 입력할 수 있습니다.');
      return;
    }

    setIsLoading(true);
    try {
      let savedMemoId = memoId;
      if (memoId) {
        await updateMemoApi(memoId, {
          title: title.trim(),
          content: plainContent,
          richContent: editorContent?.richContent,
        });
      } else {
        const createdMemo = await createMemoApi({
          teamSpaceId: null,
          title: title.trim(),
          content: plainContent,
          richContent: editorContent?.richContent,
          expiredAt: getExpiration(timer),
          status: 'FIRE',
        });
        savedMemoId = createdMemo.memoId;
      }

      // 새 이미지가 있으면 업로드와 기존 이미지 삭제를 함께 처리하고,
      // 새 이미지 없이 삭제할 기존 이미지만 있으면 삭제만 처리한다.
      if (mediaFiles.length > 0) {
        try {
          if (!savedMemoId) {
            throw new Error('저장된 메모 ID를 확인할 수 없습니다.');
          }
          await saveMemoImageChanges({
            memoId: savedMemoId,
            newFiles: mediaFiles,
            removedImageIds,
          });
        } catch (uploadError) {
          if (
            uploadError instanceof MemoImageSyncError &&
            uploadError.serverImages
          ) {
            // 자동 복구 결과를 화면에도 반영해 사용자가 실제 서버 상태를 보고
            // 남길 이미지를 다시 선택할 수 있게 한다.
            setExistingImages(uploadError.serverImages);
            setMediaFiles([]);
            setRemovedImageIds([]);
          }

          const detail = getImageSyncErrorDetail(uploadError);
          if (uploadError instanceof MemoImageSyncError) {
            switch (uploadError.code) {
              // 새 이미지 업로드 자체가 실패한 경우.
              case 'UPLOAD_FAILED':
                Alert.alert(
                  '이미지 업로드 실패',
                  `메모 내용은 저장됐지만 새 이미지 파일을 업로드하지 못했습니다.\n${detail}`,
                );
                break;
              // 업로드는 됐지만 메모에 연결하지 못한 경우.
              case 'ATTACH_FAILED':
                Alert.alert(
                  '이미지 연결 실패',
                  `메모 내용은 저장됐지만 업로드한 이미지를 메모에 연결하지 못했습니다.\n${detail}`,
                );
                break;
              // 새 이미지 연결 후 기존 이미지 삭제에 실패한 경우.
              case 'EXISTING_DELETE_FAILED':
                Alert.alert(
                  '기존 이미지 삭제 실패',
                  `새 이미지 연결은 취소하고 서버의 이미지 상태를 다시 불러왔습니다. 다시 저장해주세요.\n${detail}`,
                );
                break;
              // 위 실패 이후 자동 복구(롤백)까지 실패한 경우.
              case 'RECOVERY_FAILED':
                Alert.alert(
                  '이미지 교체 복구 필요',
                  uploadError.serverImages
                    ? `기존 이미지와 새 이미지가 모두 남아 있을 수 있어 서버 상태를 다시 불러왔습니다. 화면에서 남길 이미지 하나를 선택해 다시 저장해주세요.\n${detail}`
                    : `이미지 관계 자동 복구와 서버 상태 확인에 실패했습니다. 잠시 후 메모를 다시 열어 이미지를 확인해주세요.\n${detail}`,
                );
                break;
            }
          } else {
            Alert.alert(
              '이미지 변경 실패',
              `메모 내용은 저장됐지만 이미지 변경을 완료하지 못했습니다.\n${detail}`,
            );
          }
          return;
        }
      } else if (removedImageIds.length > 0) {
        try {
          if (!savedMemoId) {
            throw new Error('저장된 메모 ID를 확인할 수 없습니다.');
          }
          await saveMemoImageChanges({
            memoId: savedMemoId,
            newFiles: [],
            removedImageIds,
          });
        } catch (deleteError) {
          const detail = getImageSyncErrorDetail(deleteError);
          Alert.alert(
            '이미지 삭제 실패',
            `메모 내용은 저장됐지만 기존 이미지를 삭제하지 못했습니다. 다시 저장해주세요.\n${detail}`,
          );
          return;
        }
      }

      resetForm();
      Alert.alert(
        '성공',
        memoId ? '메모가 수정되었습니다.' : '새 메모가 저장되었습니다.',
      );
      onSuccess?.();
    } catch (error) {
      Alert.alert(
        '오류',
        getApiResponseMessage(error) ?? '메모 저장에 실패했습니다.',
      );
    } finally {
      setIsLoading(false);
    }
  };

  return {
    title,
    setTitle,
    content,
    setContent,
    timer,
    setTimer,
    mediaFiles,
    isPickingMedia,
    selectMedia,
    removeMedia,
    existingImages,
    removeExistingImage,
    resetForm,
    isLoading,
    handleSave,
  };
};
