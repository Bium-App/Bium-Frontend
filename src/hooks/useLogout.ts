import {useRef, useState} from 'react';
import {Alert} from 'react-native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {logoutApi} from '../api/auth';
import {clearSession} from '../utils/authStorage';
import {getApiResponseMessage} from '../utils/apiError';
import type {RootStackParamList} from '../types/navigation';

type Navigation = NativeStackNavigationProp<RootStackParamList, 'Logout'>;

export const useLogout = (navigation: Navigation) => {
  const [isLoading, setIsLoading] = useState(false);
  // isLoading은 비동기라 아주 빠른 연타는 이 값이 갱신되기 전에 두 번 다
  // 통과할 수 있다. 동시에 로그아웃 요청이 두 번 나가면 서버가 500을
  // 내므로, ref로 즉시(동기적으로) 막는다.
  const isLoggingOutRef = useRef(false);

  const handleLogout = async (): Promise<void> => {
    if (isLoggingOutRef.current) return;
    isLoggingOutRef.current = true;
    setIsLoading(true);
    try {
      await logoutApi('CURRENT');
      await clearSession();
      navigation.reset({index: 0, routes: [{name: 'Login'}]});
    } catch (error) {
      Alert.alert(
        '오류',
        getApiResponseMessage(error) ?? '로그아웃 처리에 실패했습니다.',
      );
    } finally {
      setIsLoading(false);
      isLoggingOutRef.current = false;
    }
  };

  return {isLoading, handleLogout};
};
