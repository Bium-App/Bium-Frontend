import apiClient from './client';
import {parseRootArray} from '../utils/apiResponse';
import type {ApiMutationResponse, EntityId} from '../types/api';
import type {
  CreateScheduleRequest,
  ScheduleDetail,
  ScheduleMutationResponse,
  ScheduleQuery,
  ScheduleRequest,
  ScheduleSummary,
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
}: ScheduleQuery): Promise<ScheduleSummary[]> => {
  const response = await apiClient.get<unknown>('/api/schedules', {
    params: {year, month, ...(teamSpaceId ? {teamSpaceId} : {})},
  });
  return parseRootArray<ScheduleSummary>(response.data, '일정 목록');
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
): Promise<ScheduleDetail> => {
  const response = await apiClient.get<ScheduleDetail>(
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
