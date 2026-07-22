import { useState } from 'react';
import { Alert, Platform } from 'react-native';
import { loginApi } from '../api/auth';
import { storeSession } from '../utils/authStorage';

const getDeviceName = () => `${Platform.OS}-${Platform.Version}`;

export const useLogin = () => {
  const [loginId, setLoginId] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLoginSubmit = async onSuccess => {
    if (!loginId.trim() || !password.trim()) {
      Alert.alert('알림', '아이디와 비밀번호를 모두 입력해주세요.');
      return;
    }

    setIsLoading(true);
    try {
      const data = await loginApi({
        loginId: loginId.trim(),
        password,
        deviceName: getDeviceName(),
      });

      await storeSession({
        accessToken: data.accessToken,
        refreshToken: data.refreshToken,
        userId: data.userId,
        deviceId: data.deviceId,
      });
      onSuccess?.();
    } catch (error) {
      Alert.alert(
        '로그인 실패',
        error.response?.data?.message ??
          (__DEV__ ? error.message : null) ??
          '로그인에 실패했습니다.',
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
    isLoading,
    handleLoginSubmit,
  };
};
