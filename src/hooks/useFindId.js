import { useState } from 'react';
import { Alert } from 'react-native';
import { findLoginIdApi } from '../api/auth';

export const useFindId = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const findLoginId = async onFound => {
    if (!name.trim() || !email.trim()) {
      Alert.alert('알림', '이름과 이메일을 모두 입력해주세요.');
      return;
    }

    setIsLoading(true);
    try {
      const data = await findLoginIdApi({
        name: name.trim(),
        email: email.trim(),
      });
      onFound?.(data.loginId);
    } catch (error) {
      Alert.alert(
        '아이디 찾기 실패',
        error.response?.data?.message ?? '입력한 회원 정보를 확인해주세요.',
      );
    } finally {
      setIsLoading(false);
    }
  };

  return { name, setName, email, setEmail, isLoading, findLoginId };
};
