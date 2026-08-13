import apiClient from './client';
import {parseRootArray} from '../utils/apiResponse';
import type {EntityId} from '../types/api';
import type {
  FriendMutationResponse,
  FriendRequest,
  FriendUser,
  SendFriendRequestResponse,
} from '../types/friend';

export const searchFriendsApi = async (
  keyword: string,
): Promise<FriendUser[]> => {
  const response = await apiClient.get<unknown>('/api/friends', {
    params: {type: 'SEARCH', keyword},
  });
  return parseRootArray<FriendUser>(response.data, '친구 검색 목록');
};

export const getRecommendedFriendsApi = async (): Promise<FriendUser[]> => {
  const response = await apiClient.get<unknown>('/api/friends', {
    params: {type: 'RECOMMEND'},
  });
  return parseRootArray<FriendUser>(response.data, '추천 친구 목록');
};

export const sendFriendRequestApi = async (
  receiverId: EntityId,
): Promise<SendFriendRequestResponse> => {
  const response = await apiClient.post<SendFriendRequestResponse>(
    '/api/friends/requests',
    {receiverId: Number(receiverId)},
  );
  return response.data;
};

const getFriendRequestsApi = async (
  type: 'RECEIVED' | 'SENT',
): Promise<FriendRequest[]> => {
  const response = await apiClient.get<unknown>(
    '/api/friends/requests',
    {params: {type}},
  );
  return parseRootArray<FriendRequest>(response.data, '친구 요청 목록');
};

export const getReceivedFriendRequestsApi = () =>
  getFriendRequestsApi('RECEIVED');

export const getSentFriendRequestsApi = () => getFriendRequestsApi('SENT');

const respondToFriendRequestApi = async (
  requestId: EntityId,
  action: 'ACCEPT' | 'REJECT',
): Promise<FriendMutationResponse> => {
  const response = await apiClient.patch<FriendMutationResponse>(
    `/api/friends/requests/${requestId}`,
    null,
    {params: {action}},
  );
  return response.data;
};

export const acceptFriendRequestApi = (requestId: EntityId) =>
  respondToFriendRequestApi(requestId, 'ACCEPT');

export const rejectFriendRequestApi = (requestId: EntityId) =>
  respondToFriendRequestApi(requestId, 'REJECT');

export const cancelFriendRequestApi = async (
  requestId: EntityId,
): Promise<FriendMutationResponse> => {
  const response = await apiClient.delete<FriendMutationResponse>(
    `/api/friends/requests/${requestId}`,
  );
  return response.data;
};
