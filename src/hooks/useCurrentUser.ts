import {useCallback, useState} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import {getUserApi, updateUserApi} from '../api/users';
import {getUserId} from '../utils/authStorage';
import {getApiErrorMessage} from '../utils/apiError';
import type {UpdateUserRequest, User} from '../types/user';

export const useCurrentUser = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const fetchUser = useCallback(async (): Promise<void> => {
    setIsLoading(true);
    setErrorMessage('');
    try {
      const userId = await getUserId();
      if (!userId) {
        setUser(null);
        setErrorMessage(
          '로그인 정보를 찾을 수 없습니다. 다시 로그인해주세요.',
        );
        return;
      }
      setUser(await getUserApi());
    } catch (error) {
      setErrorMessage(
        getApiErrorMessage(error, '사용자 정보를 불러오지 못했습니다.'),
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
      name: profile.name,
      nickname: profile.nickname,
      email: profile.email,
      phoneNumber: profile.phoneNumber,
      profileImageUrl: profile.profileImageUrl ?? null,
    });
    await fetchUser();
  };

  return {user, isLoading, errorMessage, fetchUser, updateProfile};
};
