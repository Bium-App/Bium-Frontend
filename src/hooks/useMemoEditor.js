import { useState } from 'react';
import { Alert } from 'react-native';
import dayjs from 'dayjs';
import { createMemoApi, updateMemoApi } from '../api/memos';
import { addMemoImageApi, uploadSelectedFileApi } from '../api/files';
import { useFileSelection } from './useFileSelection';
import { getUserId } from '../utils/authStorage';
import { formatApiDateTime } from '../utils/dateTime';
import { FILE_PREFIXES } from '../utils/filePicker';

const getExpiration = timer => {
  const hours = Number.parseInt(timer, 10);
  return Number.isFinite(hours)
    ? formatApiDateTime(dayjs().add(hours, 'hour'))
    : null;
};

export const useMemoEditor = initialData => {
  const [title, setTitle] = useState(initialData?.title ?? '');
  const [content, setContent] = useState(initialData?.content ?? '');
  const [timer, setTimer] = useState(initialData?.timer ?? '24h');
  const [isLoading, setIsLoading] = useState(false);
  const {
    selectedFile: imageFile,
    isPicking: isPickingImage,
    selectFile: selectImage,
    clearFile: removeImage,
  } = useFileSelection({ kind: 'image' });

  const handleSave = async (memoId, onSuccess) => {
    if (!title.trim() || !content.trim()) {
      Alert.alert('알림', '제목과 내용을 모두 입력해주세요.');
      return;
    }

    setIsLoading(true);
    try {
      let savedMemoId = memoId;
      if (memoId) {
        await updateMemoApi(memoId, {
          title: title.trim(),
          content: content.trim(),
        });
      } else {
        const userId = await getUserId();
        if (!userId) {
          Alert.alert(
            '오류',
            '사용자 정보를 찾을 수 없습니다. 다시 로그인해주세요.',
          );
          return;
        }

        const createdMemo = await createMemoApi(userId, {
          teamSpaceId: null,
          title: title.trim(),
          content: content.trim(),
          expiredAt: getExpiration(timer),
          status: 'FIRE',
        });
        savedMemoId = createdMemo.memoId ?? createdMemo.id;
      }

      if (imageFile) {
        try {
          if (!savedMemoId) {
            throw new Error('저장된 메모 ID를 확인할 수 없습니다.');
          }
          const imageUrl = await uploadSelectedFileApi({
            prefix: FILE_PREFIXES.MEMOS,
            file: imageFile,
          });
          await addMemoImageApi(savedMemoId, imageUrl);
        } catch (uploadError) {
          Alert.alert(
            '이미지 업로드 실패',
            `메모는 저장됐지만 이미지를 첨부하지 못했습니다.\n${
              uploadError.response?.data?.message ?? uploadError.message
            }`,
          );
          onSuccess?.();
          return;
        }
      }

      Alert.alert(
        '성공',
        memoId ? '메모가 수정되었습니다.' : '새 메모가 저장되었습니다.',
      );
      onSuccess?.();
    } catch (error) {
      Alert.alert(
        '오류',
        error.response?.data?.message ?? '메모 저장에 실패했습니다.',
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
    imageFile,
    isPickingImage,
    selectImage,
    removeImage,
    isLoading,
    handleSave,
  };
};
