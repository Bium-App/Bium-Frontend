import {useCallback, useState} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import {getServiceNoticesApi} from '../api/common';
import {getApiErrorMessage} from '../utils/apiError';
import type {ServiceNotice} from '../types/common';

export const useServiceNotices = () => {
  const [notices, setNotices] = useState<ServiceNotice[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const fetchNotices = useCallback(async (): Promise<void> => {
    setIsLoading(true);
    setErrorMessage('');
    try {
      setNotices(await getServiceNoticesApi());
    } catch (error) {
      setErrorMessage(
        getApiErrorMessage(error, '서비스 공지사항을 불러오지 못했습니다.'),
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchNotices();
    }, [fetchNotices]),
  );

  return {notices, isLoading, errorMessage, fetchNotices};
};
