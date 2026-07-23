import apiClient from './client';

export const createTeamSpaceApi = async name => {
  const response = await apiClient.post('/api/team-spaces', { name });
  return response.data;
};

export const getTeamSpaceApi = async teamSpaceId => {
  const response = await apiClient.get(`/api/team-spaces/${teamSpaceId}`);
  return response.data;
};

export const getUserTeamSpacesApi = async () => {
  const response = await apiClient.get('/api/team-spaces');
  return response.data;
};

export const deleteTeamSpaceApi = async teamSpaceId => {
  const response = await apiClient.delete(`/api/team-spaces/${teamSpaceId}`);
  return response.data;
};

export const addTeamMemberApi = async (
  teamSpaceId,
  userId,
  role = 'MEMBER',
) => {
  const response = await apiClient.post(
    `/api/team-spaces/${teamSpaceId}/members`,
    {
      userId: Number(userId),
      role,
    },
  );
  return response.data;
};

export const getTeamMembersApi = async teamSpaceId => {
  const response = await apiClient.get(`/api/team-members/team/${teamSpaceId}`);
  return response.data;
};

export const updateTeamMemberRoleApi = async (teamMemberId, role) => {
  const response = await apiClient.patch(
    `/api/team-members/${teamMemberId}`,
    null,
    {
      params: { role },
    },
  );
  return response.data;
};

export const removeTeamMemberApi = async teamMemberId => {
  const response = await apiClient.delete(`/api/team-members/${teamMemberId}`);
  return response.data;
};

export const createTeamNoticeApi = async (teamSpaceId, notice) => {
  const response = await apiClient.post(
    `/api/team-spaces/${teamSpaceId}/notices`,
    notice,
  );
  return response.data;
};

export const getTeamNoticesApi = async teamSpaceId => {
  const response = await apiClient.get('/api/notices', {
    params: { teamSpaceId },
  });
  return response.data;
};

export const getTeamNoticeApi = async noticeId => {
  const response = await apiClient.get(`/api/notices/${noticeId}`);
  return response.data;
};

export const updateTeamNoticeApi = async (noticeId, notice) => {
  const response = await apiClient.patch(`/api/notices/${noticeId}`, notice);
  return response.data;
};

export const deleteTeamNoticeApi = async noticeId => {
  const response = await apiClient.delete(`/api/notices/${noticeId}`);
  return response.data;
};

export const createTeamTodoApi = async (teamSpaceId, todo) => {
  const response = await apiClient.post(
    `/api/team-spaces/${teamSpaceId}/todos`,
    todo,
  );
  return response.data;
};

export const getTeamTodosApi = async teamSpaceId => {
  const response = await apiClient.get('/api/todos', {
    params: { teamSpaceId },
  });
  return response.data;
};

export const updateTeamTodoApi = async (todoId, todo) => {
  const response = await apiClient.patch(`/api/todos/${todoId}`, todo);
  return response.data;
};

export const toggleTeamTodoApi = async (todoId, title, isChecked) => {
  const response = await apiClient.patch(`/api/todos/${todoId}`, {
    title,
    isChecked,
  });
  return response.data;
};

export const deleteTeamTodoApi = async todoId => {
  const response = await apiClient.delete(`/api/todos/${todoId}`);
  return response.data;
};
