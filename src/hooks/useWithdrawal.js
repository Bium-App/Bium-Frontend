import { useState } from 'react';
import { Alert } from 'react-native';
import { deleteUserApi } from '../api/users';
import { clearSession, getUserId } from '../utils/authStorage';

export const useWithdrawal = navigation => {
  const [isAgreed, setIsAgreed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const withdraw = async () => {
    setIsLoading(true);
    try {
      const userId = await getUserId();
      if (!userId) throw new Error('사용자 정보를 찾을 수 없습니다.');
      await deleteUserApi(userId);
      await clearSession();
      navigation.reset({ index: 0, routes: [{ name: 'Login' }] });
    } catch (error) {
      Alert.alert(
        '오류',
        error.response?.data?.message ?? '회원 탈퇴에 실패했습니다.',
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleWithdrawal = () => {
    if (!isAgreed) {
      Alert.alert('안내', '탈퇴 안내 내용을 확인하시고 동의해 주세요.');
      return;
    }

    Alert.alert(
      '회원 탈퇴',
      '정말 탈퇴하시겠습니까?\n모든 데이터는 복구할 수 없습니다.',
      [
        { text: '취소', style: 'cancel' },
        { text: '탈퇴', style: 'destructive', onPress: withdraw },
      ],
    );
  };

  return {
    isAgreed,
    setIsAgreed,
    isLoading,
    handleWithdrawal,
  };
};
