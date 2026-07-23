import apiClient from './client';

export const createScheduleApi = async schedule => {
  const response = await apiClient.post('/api/schedules', schedule);
  return response.data;
};

export const getSchedulesApi = async ({ year, month, teamSpaceId }) => {
  const response = await apiClient.get('/api/schedules', {
    params: { year, month, ...(teamSpaceId ? { teamSpaceId } : {}) },
  });
  return response.data;
};

export const getTeamSchedulesApi = async (teamSpaceId, year, month) =>
  getSchedulesApi({ teamSpaceId, year, month });

export const getUserSchedulesApi = async (year, month) =>
  getSchedulesApi({ year, month });

export const getScheduleApi = async scheduleId => {
  const response = await apiClient.get(`/api/schedules/${scheduleId}`);
  return response.data;
};

export const updateScheduleApi = async (scheduleId, schedule) => {
  const response = await apiClient.patch(
    `/api/schedules/${scheduleId}`,
    schedule,
  );
  return response.data;
};

export const deleteScheduleApi = async scheduleId => {
  const response = await apiClient.delete(`/api/schedules/${scheduleId}`);
  return response.data;
};
