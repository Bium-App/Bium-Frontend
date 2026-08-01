import {useState} from 'react';
import {Alert, Platform} from 'react-native';
import {loginApi} from '../api/auth';
import {storeSession} from '../utils/authStorage';
import {
  getApiResponseMessage,
  getErrorMessage,
} from '../utils/apiError';

const getDeviceName = (): string => `${Platform.OS}-${Platform.Version}`;

export const useLogin = () => {
  const [loginId, setLoginId] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLoginSubmit = async (onSuccess?: () => void): Promise<void> => {
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

      await storeSession(data);
      onSuccess?.();
    } catch (error) {
      Alert.alert(
        '로그인 실패',
        getApiResponseMessage(error) ??
          (__DEV__ ? getErrorMessage(error) : undefined) ??
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
