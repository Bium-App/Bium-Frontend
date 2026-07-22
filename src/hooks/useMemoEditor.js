import { useState } from 'react';
import { Alert } from 'react-native';
import dayjs from 'dayjs';
import { createMemoApi, updateMemoApi } from '../api/memos';
import { getUserId } from '../utils/authStorage';
import { formatApiDateTime } from '../utils/dateTime';

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

  const handleSave = async (memoId, onSuccess) => {
    if (!title.trim() || !content.trim()) {
      Alert.alert('알림', '제목과 내용을 모두 입력해주세요.');
      return;
    }

    setIsLoading(true);
    try {
      if (memoId) {
        await updateMemoApi(memoId, {
          title: title.trim(),
          content: content.trim(),
        });
        Alert.alert('성공', '메모가 수정되었습니다.');
      } else {
        const userId = await getUserId();
        if (!userId) {
          Alert.alert(
            '오류',
            '사용자 정보를 찾을 수 없습니다. 다시 로그인해주세요.',
          );
          return;
        }

        await createMemoApi(userId, {
          teamSpaceId: null,
          title: title.trim(),
          content: content.trim(),
          expiredAt: getExpiration(timer),
          status: 'FIRE',
        });
        Alert.alert('성공', '새 메모가 저장되었습니다.');
      }

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
    isLoading,
    handleSave,
  };
};
