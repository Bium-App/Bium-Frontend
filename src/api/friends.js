import apiClient from './client';

export const searchFriendsApi = async keyword => {
  const response = await apiClient.get('/api/friends/search', {
    params: { keyword },
  });
  return response.data;
};

export const getRecommendedFriendsApi = async userId => {
  const response = await apiClient.get(`/api/friends/recommend/${userId}`);
  return response.data;
};

export const sendFriendRequestApi = async ({ requesterId, receiverId }) => {
  const response = await apiClient.post('/api/friends/requests', {
    requesterId: Number(requesterId),
    receiverId: Number(receiverId),
  });
  return response.data;
};

export const getReceivedFriendRequestsApi = async userId => {
  const response = await apiClient.get(
    `/api/friends/requests/received/${userId}`,
  );
  return response.data;
};

export const getSentFriendRequestsApi = async userId => {
  const response = await apiClient.get(`/api/friends/requests/sent/${userId}`);
  return response.data;
};

export const acceptFriendRequestApi = async requestId => {
  const response = await apiClient.patch(
    `/api/friends/requests/${requestId}/accept`,
  );
  return response.data;
};

export const rejectFriendRequestApi = async requestId => {
  const response = await apiClient.patch(
    `/api/friends/requests/${requestId}/reject`,
  );
  return response.data;
};

export const cancelFriendRequestApi = async requestId => {
  const response = await apiClient.delete(`/api/friends/requests/${requestId}`);
  return response.data;
};
