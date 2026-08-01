import {useCallback, useState} from 'react';
import {Alert} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import {getUserApi, updateUserApi} from '../api/users';
import {getUserId} from '../utils/authStorage';
import {getApiResponseMessage} from '../utils/apiError';
import type {UpdateUserRequest, User} from '../types/user';

export const useCurrentUser = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchUser = useCallback(async (): Promise<void> => {
    setIsLoading(true);
    try {
      const userId = await getUserId();
      if (!userId) {
        setUser(null);
        return;
      }
      setUser(await getUserApi());
    } catch (error) {
      Alert.alert(
        '오류',
        getApiResponseMessage(error) ??
          '사용자 정보를 불러오지 못했습니다.',
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchUser();
    }, [fetchUser]),
  );

  const updateProfile = async (profile: UpdateUserRequest): Promise<void> => {
    const userId = await getUserId();
    if (!userId) throw new Error('사용자 정보를 찾을 수 없습니다.');

    await updateUserApi({
      nickname: profile.nickname,
      profileImageUrl: profile.profileImageUrl ?? null,
    });
    await fetchUser();
  };

  return {user, isLoading, fetchUser, updateProfile};
};
