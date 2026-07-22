import apiClient from './client';

export const createMemoApi = async (userId, memo) => {
  const response = await apiClient.post(`/api/memos/user/${userId}`, memo);
  return response.data;
};

export const getUserMemosApi = async userId => {
  const response = await apiClient.get(`/api/memos/user/${userId}`);
  return response.data;
};

export const getMemoApi = async memoId => {
  const response = await apiClient.get(`/api/memos/${memoId}`);
  return response.data;
};

export const getTeamMemosApi = async teamSpaceId => {
  const response = await apiClient.get(`/api/memos/team/${teamSpaceId}`);
  return response.data;
};

export const updateMemoApi = async (memoId, { title, content }) => {
  const response = await apiClient.patch(`/api/memos/${memoId}`, {
    title,
    content,
  });
  return response.data;
};

export const updateMemoStatusApi = async (memoId, status) => {
  const response = await apiClient.patch(`/api/memos/${memoId}/status`, null, {
    params: { status },
  });
  return response.data;
};

export const toggleMemoPinApi = async memoId => {
  const response = await apiClient.patch(`/api/memos/${memoId}/pin`);
  return response.data;
};

export const moveMemoToTrashApi = async memoId => {
  const response = await apiClient.delete(`/api/memos/${memoId}`);
  return response.data;
};

export const getTrashMemosApi = async userId => {
  const response = await apiClient.get(`/api/memos/user/${userId}/trash`);
  return response.data;
};

export const restoreMemoApi = async memoId => {
  const response = await apiClient.patch(`/api/memos/${memoId}/restore`);
  return response.data;
};

export const deleteTrashMemosApi = async memoIds => {
  const response = await apiClient.delete('/api/memos/trash', {
    data: { memoIds },
  });
  return response.data;
};
