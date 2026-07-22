import apiClient from './client';

export const createScheduleApi = async schedule => {
  const response = await apiClient.post('/api/schedules', schedule);
  return response.data;
};

export const getTeamSchedulesApi = async (teamSpaceId, year, month) => {
  const response = await apiClient.get(`/api/schedules/team/${teamSpaceId}`, {
    params: { year, month },
  });
  return response.data;
};

export const getUserSchedulesApi = async (userId, year, month) => {
  const response = await apiClient.get(`/api/schedules/user/${userId}`, {
    params: { year, month },
  });
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
