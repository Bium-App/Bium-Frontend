import { useState } from 'react';
import { Alert } from 'react-native';
import { createTeamNoticeApi } from '../api/teamSpaces';
import { getUserId } from '../utils/authStorage';

export const useAddNotice = (teamSpaceId, navigation) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isPinned, setIsPinned] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const saveNotice = async () => {
    if (!title.trim() || !content.trim()) {
      Alert.alert('알림', '공지 제목과 내용을 모두 입력해주세요.');
      return;
    }
    setIsLoading(true);
    try {
      const userId = await getUserId();
      if (!userId || !teamSpaceId) {
        throw new Error('팀 또는 사용자 정보를 찾을 수 없습니다.');
      }
      await createTeamNoticeApi(teamSpaceId, {
        userId: Number(userId),
        title: title.trim(),
        content: content.trim(),
        isPinned,
      });
      navigation.goBack();
    } catch (error) {
      Alert.alert(
        '오류',
        error.response?.data?.message ??
          error.message ??
          '공지사항을 저장하지 못했습니다.',
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
    isPinned,
    setIsPinned,
    isLoading,
    saveNotice,
  };
};
