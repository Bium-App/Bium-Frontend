import apiClient from './client';

export const searchFriendsApi = async keyword => {
  const response = await apiClient.get('/api/friends', {
    params: { type: 'SEARCH', keyword },
  });
  return response.data;
};

export const getRecommendedFriendsApi = async () => {
  const response = await apiClient.get('/api/friends', {
    params: { type: 'RECOMMEND' },
  });
  return response.data;
};

export const sendFriendRequestApi = async receiverId => {
  const response = await apiClient.post('/api/friends/requests', {
    receiverId: Number(receiverId),
  });
  return response.data;
};

export const getReceivedFriendRequestsApi = async () => {
  const response = await apiClient.get('/api/friends/requests', {
    params: { type: 'RECEIVED' },
  });
  return response.data;
};

export const getSentFriendRequestsApi = async () => {
  const response = await apiClient.get('/api/friends/requests', {
    params: { type: 'SENT' },
  });
  return response.data;
};

export const acceptFriendRequestApi = async requestId => {
  const response = await apiClient.patch(
    `/api/friends/requests/${requestId}`,
    null,
    {
      params: { action: 'ACCEPT' },
    },
  );
  return response.data;
};

export const rejectFriendRequestApi = async requestId => {
  const response = await apiClient.patch(
    `/api/friends/requests/${requestId}`,
    null,
    {
      params: { action: 'REJECT' },
    },
  );
  return response.data;
};

export const cancelFriendRequestApi = async requestId => {
  const response = await apiClient.delete(`/api/friends/requests/${requestId}`);
  return response.data;
};
