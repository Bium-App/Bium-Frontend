import { useCallback, useState } from 'react';
import { Platform } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { logoutApi } from '../api/auth';
import { clearSession, getDeviceId } from '../utils/authStorage';

export const useDeviceManagement = () => {
  const [devices, setDevices] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchDevices = useCallback(async () => {
    setIsLoading(true);
    try {
      const currentDeviceId = await getDeviceId();
      setDevices(
        currentDeviceId
          ? [
              {
                id: currentDeviceId,
                name: `현재 ${Platform.OS === 'ios' ? 'iOS' : '앱'} 기기`,
                type: 'mobile',
                isCurrent: true,
                time: '',
              },
            ]
          : [],
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

  const logoutAllDevices = async () => {
    setIsLoading(true);
    try {
      await logoutApi('ALL');
      await clearSession();
    } finally {
      setIsLoading(false);
    }
  };

  return { devices, isLoading, fetchDevices, logoutAllDevices };
};
