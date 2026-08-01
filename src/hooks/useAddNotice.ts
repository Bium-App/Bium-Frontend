import {useState} from 'react';
import {Alert} from 'react-native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {createTeamNoticeApi} from '../api/teamSpaces';
import {getApiResponseMessage, getErrorMessage} from '../utils/apiError';
import type {EntityId} from '../types/api';
import type {RootStackParamList} from '../types/navigation';

type Navigation = NativeStackNavigationProp<RootStackParamList>;

export const useAddNotice = (
  teamSpaceId: EntityId | undefined,
  navigation: Navigation,
) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isPinned, setIsPinned] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const saveNotice = async (): Promise<void> => {
    if (!title.trim() || !content.trim()) {
      Alert.alert('알림', '공지 제목과 내용을 모두 입력해주세요.');
      return;
    }
    setIsLoading(true);
    try {
      if (!teamSpaceId) throw new Error('팀 정보를 찾을 수 없습니다.');
      await createTeamNoticeApi(teamSpaceId, {
        title: title.trim(),
        content: content.trim(),
        isPinned,
      });
      navigation.goBack();
    } catch (error) {
      Alert.alert(
        '오류',
        getApiResponseMessage(error) ??
          getErrorMessage(error) ??
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
