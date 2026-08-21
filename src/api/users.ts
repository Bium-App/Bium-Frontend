import apiClient from './client';
import {parseRootArray} from '../utils/apiResponse';
import {excludeSelf} from '../utils/excludeSelf';
import type {ApiMutationResponse} from '../types/api';
import type {FriendUser} from '../types/friend';
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

// 친구 추가·팀원 초대 화면에서 닉네임으로 유저를 찾을 때 쓴다.
export const searchUsersApi = async (
  nickname: string,
): Promise<FriendUser[]> => {
  const response = await apiClient.get<unknown>('/api/users/search', {
    params: {nickname},
  });
  return excludeSelf(parseRootArray<FriendUser>(response.data, '유저 검색 결과'));
};

export const getUserSettingsApi = async (): Promise<UserSettings> => {
  const response = await apiClient.get<UserSettings>('/api/users/me/settings');
  return response.data;
};

export const updateUserApi = async ({
  name,
  nickname,
  email,
  phoneNumber,
  profileImageUrl,
}: UpdateUserRequest): Promise<UserMutationResponse> => {
  const response = await apiClient.patch<UserMutationResponse>(
    '/api/users/me',
    {name, nickname, email, phoneNumber, profileImageUrl},
  );
  return response.data;
};

export const updateUserSettingsApi = async (
  settings: Partial<UserSettings>,
): Promise<ApiMutationResponse> => {
  const response = await apiClient.patch<ApiMutationResponse>(
    '/api/users/me/settings',
    settings,
  );
  return response.data;
};

export const deleteUserApi = async (): Promise<ApiMutationResponse> => {
  const response = await apiClient.delete<ApiMutationResponse>('/api/users/me');
  return response.data;
};
