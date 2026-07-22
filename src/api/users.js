import apiClient from './client';

export const getUserApi = async userId => {
  const response = await apiClient.get(`/api/users/${userId}`);
  return response.data;
};

export const getUserSettingsApi = async userId => {
  const response = await apiClient.get(`/api/users/${userId}/settings`);
  return response.data;
};

export const updateUserApi = async (userId, { nickname, profileImageUrl }) => {
  const response = await apiClient.patch(`/api/users/${userId}`, {
    nickname,
    profileImageUrl,
  });
  return response.data;
};

export const updateUserSettingsApi = async (userId, settings) => {
  const response = await apiClient.patch(
    `/api/users/${userId}/settings`,
    settings,
  );
  return response.data;
};

export const deleteUserApi = async userId => {
  const response = await apiClient.delete(`/api/users/${userId}`);
  return response.data;
};
