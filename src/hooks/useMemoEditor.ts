import { useCallback, useEffect, useState } from 'react';
import { Alert } from 'react-native';
import dayjs from 'dayjs';
import { createMemoApi, updateMemoApi } from '../api/memos';
import {
  addMemoImageApi,
  deleteMemoImageApi,
  uploadSelectedFileApi,
} from '../api/files';
import { FILE_DOMAINS, pickMemoImageFiles } from '../utils/filePicker';
import { formatApiDateTime } from '../utils/dateTime';
import { getApiResponseMessage, getErrorMessage } from '../utils/apiError';
import type { EntityId } from '../types/api';
import type { MemoEditorData } from '../types/navigation';
import type { MemoImage, SelectedFile } from '../types/file';
import type { MemoRichContent } from '../types/memo';
import { saveRecentFile } from '../utils/recentFiles';

const getExpiration = (timer: string): string | null => {
  const hours = Number.parseInt(timer, 10);
  return Number.isFinite(hours)
    ? formatApiDateTime(dayjs().add(hours, 'hour'))
    : null;
};

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

  const selectMedia = useCallback(async (): Promise<void> => {
    if (isPickingMedia) return;
    setIsPickingMedia(true);
    try {
      const files = await pickMemoImageFiles();
      if (files.length === 0) return;
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

  const removeExistingImage = useCallback(
    async (imageId: EntityId): Promise<void> => {
      try {
        await deleteMemoImageApi(imageId);
        setExistingImages(current =>
          current.filter(image => String(image.imageId) !== String(imageId)),
        );
      } catch (error) {
        Alert.alert(
          '이미지 삭제 실패',
          getApiResponseMessage(error) ??
            getErrorMessage(error) ??
            '이미지를 삭제하지 못했습니다.',
        );
      }
    },
    [],
  );

  const resetForm = useCallback((): void => {
    setTitle('');
    setContent('');
    setTimer('24h');
    setMediaFiles([]);
    setExistingImages(initialData?.images ?? []);
  }, [initialData?.images]);

  useEffect(() => {
    setTitle(initialData?.title ?? '');
    setContent(initialData?.content ?? '');
    setTimer('24h');
    setMediaFiles([]);
    setExistingImages(initialData?.images ?? []);
  }, [
    initialData?.content,
    initialData?.id,
    initialData?.images,
    initialData?.title,
  ]);

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

      if (mediaFiles.length > 0) {
        try {
          if (!savedMemoId) {
            throw new Error('저장된 메모 ID를 확인할 수 없습니다.');
          }
          // 이미지는 1개만 유지하므로, 새 이미지를 첨부하기 전에
          // 아직 남아있는 기존 이미지를 먼저 지운다.
          if (existingImages.length > 0) {
            await Promise.all(
              existingImages.map(image => deleteMemoImageApi(image.imageId)),
            );
          }
          for (const mediaFile of mediaFiles) {
            const mediaUrl = await uploadSelectedFileApi({
              domain: FILE_DOMAINS.MEMO,
              file: mediaFile,
            });
            await addMemoImageApi(savedMemoId, mediaUrl);
          }
        } catch (uploadError) {
          resetForm();
          Alert.alert(
            '이미지 업로드 실패',
            `메모는 저장됐지만 이미지를 첨부하지 못했습니다.\n${
              getApiResponseMessage(uploadError) ??
              getErrorMessage(uploadError) ??
              '업로드 오류가 발생했습니다.'
            }`,
          );
          onSuccess?.();
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
