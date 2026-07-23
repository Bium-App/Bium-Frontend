import apiClient from './client';

export const createMemoApi = async memo => {
  const response = await apiClient.post('/api/memos', memo);
  return response.data;
};

export const getUserMemosApi = async () => {
  const response = await apiClient.get('/api/memos');
  return response.data;
};

export const getMemoApi = async memoId => {
  const response = await apiClient.get(`/api/memos/${memoId}`);
  return response.data;
};

export const getTeamMemosApi = async teamSpaceId => {
  const response = await apiClient.get('/api/memos', {
    params: { teamSpaceId },
  });
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
    params: { action: 'STATUS', value: status },
  });
  return response.data;
};

export const updateMemoPinApi = async (memoId, isPinned) => {
  const response = await apiClient.patch(`/api/memos/${memoId}/status`, null, {
    params: { action: 'PIN', value: String(isPinned) },
  });
  return response.data;
};

export const moveMemoToTrashApi = async memoId => {
  const response = await apiClient.delete(`/api/memos/${memoId}`);
  return response.data;
};

export const getTrashMemosApi = async () => {
  const response = await apiClient.get('/api/trash');
  return response.data;
};

export const restoreMemoApi = async memoId => {
  const response = await apiClient.patch(`/api/trash/${memoId}/restore`);
  return response.data;
};

export const deleteTrashMemosApi = async memoIds => {
  const response = await apiClient.delete('/api/trash', {
    data: { memoIds },
  });
  return response.data;
};
