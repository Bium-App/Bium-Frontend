import apiClient from './client';
import type {EntityId} from '../types/api';
import type {
  FriendMutationResponse,
  FriendRequest,
  FriendUser,
} from '../types/friend';

export const searchFriendsApi = async (
  keyword: string,
): Promise<FriendUser[]> => {
  const response = await apiClient.get<FriendUser[]>('/api/friends', {
    params: {type: 'SEARCH', keyword},
  });
  return response.data;
};

export const getRecommendedFriendsApi = async (): Promise<FriendUser[]> => {
  const response = await apiClient.get<FriendUser[]>('/api/friends', {
    params: {type: 'RECOMMEND'},
  });
  return response.data;
};

export const sendFriendRequestApi = async (
  receiverId: EntityId,
): Promise<FriendMutationResponse> => {
  const response = await apiClient.post<FriendMutationResponse>(
    '/api/friends/requests',
    {receiverId: Number(receiverId)},
  );
  return response.data;
};

const getFriendRequestsApi = async (
  type: 'RECEIVED' | 'SENT',
): Promise<FriendRequest[]> => {
  const response = await apiClient.get<FriendRequest[]>(
    '/api/friends/requests',
    {params: {type}},
  );
  return response.data;
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
