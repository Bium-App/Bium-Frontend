import { useCallback, useState } from 'react';
import { Alert } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { getInquiriesApi } from '../api/common';

export const useInquiryHistory = () => {
  const [inquiries, setInquiries] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchInquiries = useCallback(async () => {
    setIsLoading(true);
    try {
      setInquiries(await getInquiriesApi());
    } catch (error) {
      Alert.alert(
        '오류',
        error.response?.data?.message ?? '문의 내역을 불러오지 못했습니다.',
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

  return { inquiries, isLoading, fetchInquiries };
};
