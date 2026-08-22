import {createNavigationContainerRef} from '@react-navigation/native';
import type {RootStackParamList} from '../types/navigation';

export const navigationRef = createNavigationContainerRef<RootStackParamList>();

// 로그아웃 시 스택 전체를 로그인 화면 하나로 교체한다.
// 뒤로 가기로 로그인 이전 화면에 다시 접근하지 못하도록 막기 위함이다.
export const resetToLogin = () => {
  if (!navigationRef.isReady()) return;
  navigationRef.resetRoot({
    index: 0,
    routes: [{name: 'Login'}],
  });
};
