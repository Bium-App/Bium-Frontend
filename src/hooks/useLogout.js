import { useState } from 'react';
import { Alert } from 'react-native';
import { logoutDeviceApi } from '../api/auth';
import { clearSession, getDeviceId } from '../utils/authStorage';

export const useLogout = navigation => {
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = async () => {
    if (isLoading) return;
    setIsLoading(true);
    try {
      const deviceId = await getDeviceId();
      if (deviceId) await logoutDeviceApi(deviceId);
      await clearSession();
      navigation.reset({ index: 0, routes: [{ name: 'Login' }] });
    } catch (error) {
      Alert.alert(
        '오류',
        error.response?.data?.message ?? '로그아웃 처리에 실패했습니다.',
      );
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, handleLogout };
};
