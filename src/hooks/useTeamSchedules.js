import { useCallback, useState } from 'react';
import { Alert } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import dayjs from 'dayjs';
import { getTeamSchedulesApi } from '../api/schedules';

export const useTeamSchedules = teamSpaceId => {
  const [schedules, setSchedules] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchSchedules = useCallback(async () => {
    if (!teamSpaceId) return;
    setIsLoading(true);
    try {
      const now = dayjs();
      setSchedules(
        await getTeamSchedulesApi(teamSpaceId, now.year(), now.month() + 1),
      );
    } catch (error) {
      Alert.alert(
        '오류',
        error.response?.data?.message ?? '일정을 불러오지 못했습니다.',
      );
    } finally {
      setIsLoading(false);
    }
  }, [teamSpaceId]);

  useFocusEffect(
    useCallback(() => {
      fetchSchedules();
    }, [fetchSchedules]),
  );

  return { schedules, isLoading, fetchSchedules };
};
