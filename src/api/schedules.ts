import apiClient from './client';
import type {ApiMutationResponse, EntityId} from '../types/api';
import type {
  CreateScheduleRequest,
  Schedule,
  ScheduleMutationResponse,
  ScheduleQuery,
  ScheduleRequest,
} from '../types/schedule';

export const createScheduleApi = async (
  schedule: CreateScheduleRequest,
): Promise<ScheduleMutationResponse> => {
  const response = await apiClient.post<ScheduleMutationResponse>(
    '/api/schedules',
    schedule,
  );
  return response.data;
};

export const getSchedulesApi = async ({
  year,
  month,
  teamSpaceId,
}: ScheduleQuery): Promise<Schedule[]> => {
  const response = await apiClient.get<Schedule[]>('/api/schedules', {
    params: {year, month, ...(teamSpaceId ? {teamSpaceId} : {})},
  });
  return response.data;
};

export const getTeamSchedulesApi = (
  teamSpaceId: EntityId,
  year: number,
  month: number,
) => getSchedulesApi({teamSpaceId, year, month});

export const getUserSchedulesApi = (year: number, month: number) =>
  getSchedulesApi({year, month});

export const getScheduleApi = async (
  scheduleId: EntityId,
): Promise<Schedule> => {
  const response = await apiClient.get<Schedule>(
    `/api/schedules/${scheduleId}`,
  );
  return response.data;
};

export const updateScheduleApi = async (
  scheduleId: EntityId,
  schedule: ScheduleRequest,
): Promise<ScheduleMutationResponse> => {
  const response = await apiClient.patch<ScheduleMutationResponse>(
    `/api/schedules/${scheduleId}`,
    schedule,
  );
  return response.data;
};

export const deleteScheduleApi = async (
  scheduleId: EntityId,
): Promise<ApiMutationResponse> => {
  const response = await apiClient.delete<ApiMutationResponse>(
    `/api/schedules/${scheduleId}`,
  );
  return response.data;
};
