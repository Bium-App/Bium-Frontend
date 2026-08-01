import {useCallback, useState} from 'react';
import dayjs from 'dayjs';
import {useFocusEffect} from '@react-navigation/native';
import {getDevicesApi, logoutApi, logoutDeviceApi} from '../api/auth';
import {clearSession, getDeviceId} from '../utils/authStorage';
import {getApiErrorMessage} from '../utils/apiError';
import type {EntityId} from '../types/api';

export type DeviceType = 'mobile' | 'tablet' | 'laptop';

export interface DeviceListItem {
  id: string;
  name: string;
  type: DeviceType;
  isCurrent: boolean;
  time: string;
}

const getDeviceType = (deviceName?: string): DeviceType => {
  const normalizedName = deviceName?.toLowerCase() ?? '';
  if (normalizedName.includes('ipad') || normalizedName.includes('tablet')) {
    return 'tablet';
  }
  if (
    normalizedName.includes('mac') ||
    normalizedName.includes('windows') ||
    normalizedName.includes('pc')
  ) {
    return 'laptop';
  }
  return 'mobile';
};

export const useDeviceManagement = () => {
  const [devices, setDevices] = useState<DeviceListItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const fetchDevices = useCallback(async (): Promise<void> => {
    setIsLoading(true);
    setErrorMessage('');
    try {
      const [currentDeviceId, data] = await Promise.all([
        getDeviceId(),
        getDevicesApi(),
      ]);
      setDevices(
        data.map(device => ({
          id: String(device.deviceId),
          name: device.deviceName,
          type: getDeviceType(device.deviceName),
          isCurrent: String(device.deviceId) === String(currentDeviceId),
          time: device.lastLoginAt
            ? dayjs(device.lastLoginAt).format('YYYY.MM.DD HH:mm')
            : '',
        })),
      );
    } catch (error) {
      setDevices([]);
      setErrorMessage(
        getApiErrorMessage(error, '로그인 기기를 불러오지 못했습니다.'),
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

  const logoutDevice = async (deviceId: EntityId): Promise<boolean> => {
    setIsLoading(true);
    try {
      const currentDeviceId = await getDeviceId();
      const isCurrent = String(deviceId) === String(currentDeviceId);
      await logoutDeviceApi(deviceId);
      if (isCurrent) await clearSession();
      else await fetchDevices();
      return isCurrent;
    } finally {
      setIsLoading(false);
    }
  };

  const logoutAllDevices = async (): Promise<void> => {
    setIsLoading(true);
    try {
      await logoutApi('ALL');
      await clearSession();
    } finally {
      setIsLoading(false);
    }
  };

  return {
    devices,
    isLoading,
    errorMessage,
    fetchDevices,
    logoutDevice,
    logoutAllDevices,
  };
};
