import {useCallback, useState} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import {getInquiriesApi} from '../api/common';
import {getApiErrorMessage} from '../utils/apiError';
import type {Inquiry} from '../types/common';

export const useInquiryHistory = () => {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const fetchInquiries = useCallback(async (): Promise<void> => {
    setIsLoading(true);
    setErrorMessage('');
    try {
      setInquiries(await getInquiriesApi());
    } catch (error) {
      setErrorMessage(
        getApiErrorMessage(error, '문의 내역을 불러오지 못했습니다.'),
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchInquiries();
    }, [fetchInquiries]),
  );

  return {inquiries, isLoading, errorMessage, fetchInquiries};
};
