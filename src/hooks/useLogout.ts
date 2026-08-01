import {useState} from 'react';
import {Alert} from 'react-native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {logoutApi} from '../api/auth';
import {clearSession} from '../utils/authStorage';
import {getApiResponseMessage} from '../utils/apiError';
import type {RootStackParamList} from '../types/navigation';

type Navigation = NativeStackNavigationProp<RootStackParamList>;

export const useLogout = (navigation: Navigation) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = async (): Promise<void> => {
    if (isLoading) return;
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
    }
  };

  return {isLoading, handleLogout};
};
