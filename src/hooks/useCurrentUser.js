import { useCallback, useState } from 'react';
import { Alert } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { getUserApi, updateUserApi } from '../api/users';
import { getUserId } from '../utils/authStorage';

export const useCurrentUser = () => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchUser = useCallback(async () => {
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
        error.response?.data?.message ?? '사용자 정보를 불러오지 못했습니다.',
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

  const updateProfile = async ({ nickname, profileImageUrl }) => {
    const userId = await getUserId();
    if (!userId) throw new Error('사용자 정보를 찾을 수 없습니다.');

    await updateUserApi({
      nickname,
      profileImageUrl: profileImageUrl ?? null,
    });
    await fetchUser();
  };

  return { user, isLoading, fetchUser, updateProfile };
};
