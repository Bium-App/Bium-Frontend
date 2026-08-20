import {useRef, useState} from 'react';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {logoutApi} from '../api/auth';
import {clearSession} from '../utils/authStorage';
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
    } catch {
      // 서버 세션 정리에 실패해도 사용자가 선택한 로컬 로그아웃은 완료한다.
    } finally {
      // 서버가 내려가 있거나 이미 세션이 만료됐더라도 이 기기에 저장된
      // 토큰은 반드시 제거해 사용자가 로그아웃 화면에 갇히지 않게 한다.
      await clearSession().catch(() => undefined);
      navigation.reset({index: 0, routes: [{name: 'Login'}]});
      setIsLoading(false);
      isLoggingOutRef.current = false;
    }
  };

  return {isLoading, handleLogout};
};
