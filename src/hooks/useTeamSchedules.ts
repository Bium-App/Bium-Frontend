import {useCallback, useState} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import dayjs from 'dayjs';
import {getScheduleApi, getTeamSchedulesApi} from '../api/schedules';
import {getApiErrorMessage} from '../utils/apiError';
import type {EntityId} from '../types/api';
import type {ScheduleSummary} from '../types/schedule';

export const useTeamSchedules = (teamSpaceId?: EntityId) => {
  const [schedules, setSchedules] = useState<ScheduleSummary[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const fetchSchedules = useCallback(async (): Promise<void> => {
    if (!teamSpaceId) return;
    setIsLoading(true);
    setErrorMessage('');
    try {
      const now = dayjs();
      setSchedules(
        await getTeamSchedulesApi(teamSpaceId, now.year(), now.month() + 1),
      );
    } catch (error) {
      setErrorMessage(
        getApiErrorMessage(error, '일정을 불러오지 못했습니다.'),
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

  return {
    schedules,
    isLoading,
    errorMessage,
    fetchSchedules,
    getScheduleDetail: getScheduleApi,
  };
};
