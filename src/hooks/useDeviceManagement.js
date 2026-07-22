import { useCallback, useState } from 'react';
import { Alert } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import dayjs from 'dayjs';
import {
  getLoginDevicesApi,
  logoutAllDevicesApi,
  logoutDeviceApi,
} from '../api/auth';
import { clearSession, getDeviceId, getUserId } from '../utils/authStorage';

const getDeviceType = deviceName => {
  const normalized = deviceName?.toLowerCase() ?? '';
  if (normalized.includes('ipad') || normalized.includes('tablet')) {
    return 'tablet';
  }
  if (
    normalized.includes('windows') ||
    normalized.includes('mac') ||
    normalized.includes('pc')
  ) {
    return 'laptop';
  }
  return 'mobile';
};

export const useDeviceManagement = () => {
  const [devices, setDevices] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchDevices = useCallback(async () => {
    setIsLoading(true);
    try {
      const userId = await getUserId();
      if (!userId) return;
      const [data, currentDeviceId] = await Promise.all([
        getLoginDevicesApi(userId),
        getDeviceId(),
      ]);
      setDevices(
        data.map(device => ({
          id: String(device.deviceId),
          name: device.deviceName,
          type: getDeviceType(device.deviceName),
          lastLoginAt: device.lastLoginAt,
          isCurrent: String(device.deviceId) === currentDeviceId,
          time: device.lastLoginAt
            ? dayjs(device.lastLoginAt).format('YYYY.MM.DD HH:mm')
            : '',
        })),
      );
    } catch (error) {
      Alert.alert(
        '오류',
        error.response?.data?.message ?? '로그인 기기를 불러오지 못했습니다.',
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchDevices();
    }, [fetchDevices]),
  );

  const logoutDevice = async deviceId => {
    const currentDeviceId = await getDeviceId();
    if (String(deviceId) === currentDeviceId) {
      Alert.alert(
        '안내',
        '현재 기기는 전체 로그아웃 또는 계정 로그아웃을 이용해주세요.',
      );
      return;
    }
    setIsLoading(true);
    try {
      await logoutDeviceApi(deviceId);
      await fetchDevices();
      Alert.alert('완료', '선택한 기기에서 로그아웃했습니다.');
    } catch (error) {
      Alert.alert(
        '오류',
        error.response?.data?.message ?? '기기 로그아웃에 실패했습니다.',
      );
    } finally {
      setIsLoading(false);
    }
  };

  const logoutAllDevices = async () => {
    setIsLoading(true);
    try {
      await logoutAllDevicesApi();
      await clearSession();
    } finally {
      setIsLoading(false);
    }
  };

  return {
    devices,
    isLoading,
    fetchDevices,
    logoutDevice,
    logoutAllDevices,
  };
};
