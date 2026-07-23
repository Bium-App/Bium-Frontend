import { useState } from 'react';
import { Alert } from 'react-native';
import { signUpApi } from '../api/auth';

export const useSignUp = () => {
  const [loginId, setLoginId] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [nickname, setNickname] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  /**
   * [3단계] 최종 회원가입 제출 액션
   * @param {Function} onSuccess - 가입 완료 후 로그인 화면으로 넘어가는 콜백
   */
  const handleSignUpSubmit = async onSuccess => {
    if (!loginId.trim() || !password || !nickname.trim()) {
      Alert.alert('알림', '모든 항목을 입력해주세요.');
      return;
    }
    if (password !== passwordConfirm) {
      Alert.alert('알림', '비밀번호가 일치하지 않습니다');
      return;
    }

    setIsLoading(true);
    try {
      await signUpApi({
        loginId: loginId.trim(),
        password,
        nickname: nickname.trim(),
        provider: 'LOCAL',
      });
      Alert.alert('가입 완료', '회원가입이 성공적으로 완료되었습니다.');

      onSuccess?.();
    } catch (error) {
      Alert.alert(
        '가입 실패',
        error.response?.data?.message ??
          '회원가입 처리 중 문제가 발생했습니다.',
      );
    } finally {
      setIsLoading(false);
    }
  };

  return {
    loginId,
    setLoginId,
    password,
    setPassword,
    passwordConfirm,
    setPasswordConfirm,
    nickname,
    setNickname,
    isLoading,
    handleSignUpSubmit,
  };
};
