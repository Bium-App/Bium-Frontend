import apiClient from './client';

export const getUserApi = async () => {
  const response = await apiClient.get('/api/users/me');
  return response.data;
};

export const getUserSettingsApi = async () => {
  const response = await apiClient.get('/api/users/me/settings');
  return response.data;
};

export const updateUserApi = async ({ nickname, profileImageUrl }) => {
  const response = await apiClient.patch('/api/users/me', {
    nickname,
    profileImageUrl,
  });
  return response.data;
};

export const updateUserSettingsApi = async settings => {
  const response = await apiClient.patch('/api/users/me/settings', settings);
  return response.data;
};

export const deleteUserApi = async () => {
  const response = await apiClient.delete('/api/users/me');
  return response.data;
};
