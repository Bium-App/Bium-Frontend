import { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import {
  resetPasswordApi,
  sendAuthCodeApi,
  verifyAuthCodeApi,
} from '../api/auth';

const CODE_EXPIRES_IN_SECONDS = 180;

export const useFindPassword = () => {
  const [loginId, setLoginId] = useState('');
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [remainingSeconds, setRemainingSeconds] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!remainingSeconds) return undefined;
    const timerId = setInterval(() => {
      setRemainingSeconds(current => Math.max(current - 1, 0));
    }, 1000);
    return () => clearInterval(timerId);
  }, [remainingSeconds]);

  const sendCode = async () => {
    if (!loginId.trim() || !email.trim()) {
      Alert.alert('알림', '아이디와 이메일을 모두 입력해주세요.');
      return;
    }
    setIsLoading(true);
    try {
      await sendAuthCodeApi({ email: email.trim() });
      setIsCodeSent(true);
      setRemainingSeconds(CODE_EXPIRES_IN_SECONDS);
    } catch (error) {
      Alert.alert(
        '인증번호 발송 실패',
        error.response?.data?.message ?? '인증번호를 보내지 못했습니다.',
      );
    } finally {
      setIsLoading(false);
    }
  };

  const resetPassword = async onSuccess => {
    if (!code.trim() || !newPassword) {
      Alert.alert('알림', '인증번호와 새 비밀번호를 입력해주세요.');
      return;
    }
    if (!remainingSeconds) {
      Alert.alert('알림', '인증번호가 만료되었습니다. 다시 받아주세요.');
      return;
    }

    setIsLoading(true);
    try {
      const verification = await verifyAuthCodeApi({
        email: email.trim(),
        code: code.trim(),
      });
      if (!verification.isVerified) {
        Alert.alert('인증 실패', '인증번호가 일치하지 않습니다.');
        return;
      }
      await resetPasswordApi({
        loginId: loginId.trim(),
        newPassword,
      });
      onSuccess?.();
    } catch (error) {
      Alert.alert(
        '비밀번호 재설정 실패',
        error.response?.data?.message ?? '비밀번호를 변경하지 못했습니다.',
      );
    } finally {
      setIsLoading(false);
    }
  };

  const timerText = `${String(Math.floor(remainingSeconds / 60)).padStart(
    2,
    '0',
  )}:${String(remainingSeconds % 60).padStart(2, '0')}`;

  return {
    loginId,
    setLoginId,
    email,
    setEmail,
    code,
    setCode,
    newPassword,
    setNewPassword,
    isCodeSent,
    isLoading,
    timerText,
    sendCode,
    resetPassword,
  };
};
