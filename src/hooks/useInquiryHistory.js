import { useCallback, useState } from 'react';
import { Alert } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { getInquiriesApi } from '../api/common';
import { getUserId } from '../utils/authStorage';

export const useInquiryHistory = () => {
  const [inquiries, setInquiries] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchInquiries = useCallback(async () => {
    setIsLoading(true);
    try {
      const userId = await getUserId();
      if (!userId) return;
      setInquiries(await getInquiriesApi(userId));
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
