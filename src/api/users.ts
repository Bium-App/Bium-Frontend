import apiClient from './client';
import type {ApiMutationResponse} from '../types/api';
import type {
  UpdateUserRequest,
  User,
  UserMutationResponse,
  UserSettings,
} from '../types/user';

export const getUserApi = async (): Promise<User> => {
  const response = await apiClient.get<User>('/api/users/me');
  return response.data;
};

export const getUserSettingsApi = async (): Promise<UserSettings> => {
  const response = await apiClient.get<UserSettings>('/api/users/me/settings');
  return response.data;
};

export const updateUserApi = async ({
  nickname,
  profileImageUrl,
}: UpdateUserRequest): Promise<UserMutationResponse> => {
  const response = await apiClient.patch<UserMutationResponse>(
    '/api/users/me',
    {nickname, profileImageUrl},
  );
  return response.data;
};

export const updateUserSettingsApi = async (
  settings: UserSettings,
): Promise<UserSettings> => {
  const response = await apiClient.patch<UserSettings>(
    '/api/users/me/settings',
    settings,
  );
  return response.data;
};

export const deleteUserApi = async (): Promise<ApiMutationResponse> => {
  const response = await apiClient.delete<ApiMutationResponse>('/api/users/me');
  return response.data;
};
