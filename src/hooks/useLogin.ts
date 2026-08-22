import {useState} from 'react';
import {Alert} from 'react-native';
import {loginApi} from '../api/auth';
import {storeSession} from '../utils/authStorage';
import {getDeviceName} from '../utils/deviceName';
import {
  getApiResponseMessage,
  getErrorMessage,
} from '../utils/apiError';

// 아이디/비밀번호 로그인 화면의 입력 상태와 제출 처리를 담당한다.
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
        // 기기 이름은 로그인 기기 목록 화면에서 각 세션을 구분하는 데 쓰인다.
        deviceName: getDeviceName(),
      });

      // 로그인 응답으로 받은 세션(토큰 등)을 로컬에 저장한다.
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
