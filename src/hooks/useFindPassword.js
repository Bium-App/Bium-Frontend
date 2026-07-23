import { useState } from 'react';
import { Alert } from 'react-native';
import { findPasswordApi } from '../api/auth';

export const useFindPassword = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const findPassword = async onSuccess => {
    if (!email.trim()) {
      Alert.alert('알림', '이메일을 입력해주세요.');
      return;
    }

    setIsLoading(true);
    try {
      await findPasswordApi(email.trim());
      onSuccess?.();
    } catch (error) {
      Alert.alert(
        '비밀번호 찾기 실패',
        error.response?.data?.message ?? '임시 비밀번호를 발송하지 못했습니다.',
      );
    } finally {
      setIsLoading(false);
    }
  };

  return { email, setEmail, isLoading, findPassword };
};
