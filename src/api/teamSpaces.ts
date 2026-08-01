import apiClient from './client';
import type {ApiMutationResponse, EntityId} from '../types/api';
import type {
  CreateTeamTodoRequest,
  TeamMember,
  TeamNotice,
  TeamNoticeMutationResponse,
  TeamNoticeRequest,
  TeamSpace,
  TeamTodo,
  TeamTodoDetail,
  TeamTodoMutationResponse,
  UpdateTeamTodoRequest,
} from '../types/teamSpace';

export const createTeamSpaceApi = async (name: string): Promise<TeamSpace> => {
  const response = await apiClient.post<TeamSpace>('/api/team-spaces', {name});
  return response.data;
};

export const getTeamSpaceApi = async (
  teamSpaceId: EntityId,
): Promise<TeamSpace> => {
  const response = await apiClient.get<TeamSpace>(
    `/api/team-spaces/${teamSpaceId}`,
  );
  return response.data;
};

export const getUserTeamSpacesApi = async (): Promise<TeamSpace[]> => {
  const response = await apiClient.get<TeamSpace[]>('/api/team-spaces');
  return response.data;
};

export const deleteTeamSpaceApi = async (
  teamSpaceId: EntityId,
): Promise<ApiMutationResponse> => {
  const response = await apiClient.delete<ApiMutationResponse>(
    `/api/team-spaces/${teamSpaceId}`,
  );
  return response.data;
};

export const addTeamMemberApi = async (
  teamSpaceId: EntityId,
  userId: EntityId,
  role = 'MEMBER',
): Promise<TeamMember> => {
  const response = await apiClient.post<TeamMember>(
    `/api/team-spaces/${teamSpaceId}/members`,
    {userId: Number(userId), role},
  );
  return response.data;
};

export const getTeamMembersApi = async (
  teamSpaceId: EntityId,
): Promise<TeamMember[]> => {
  const response = await apiClient.get<TeamMember[]>(
    `/api/team-members/team/${teamSpaceId}`,
  );
  return response.data;
};

export const updateTeamMemberRoleApi = async (
  teamMemberId: EntityId,
  role: string,
): Promise<TeamMember> => {
  const response = await apiClient.patch<TeamMember>(
    `/api/team-members/${teamMemberId}`,
    null,
    {params: {role}},
  );
  return response.data;
};

export const removeTeamMemberApi = async (
  teamMemberId: EntityId,
): Promise<ApiMutationResponse> => {
  const response = await apiClient.delete<ApiMutationResponse>(
    `/api/team-members/${teamMemberId}`,
  );
  return response.data;
};

export const createTeamNoticeApi = async (
  teamSpaceId: EntityId,
  notice: TeamNoticeRequest,
): Promise<TeamNoticeMutationResponse> => {
  const response = await apiClient.post<TeamNoticeMutationResponse>(
    `/api/team-spaces/${teamSpaceId}/notices`,
    notice,
  );
  return response.data;
};

export const getTeamNoticesApi = async (
  teamSpaceId: EntityId,
): Promise<TeamNotice[]> => {
  const response = await apiClient.get<TeamNotice[]>('/api/notices', {
    params: {teamSpaceId},
  });
  return response.data;
};

export const getTeamNoticeApi = async (
  noticeId: EntityId,
): Promise<TeamNotice | TeamNotice[]> => {
  const response = await apiClient.get<TeamNotice | TeamNotice[]>(
    `/api/notices/${noticeId}`,
  );
  return response.data;
};

export const updateTeamNoticeApi = async (
  noticeId: EntityId,
  notice: TeamNoticeRequest,
): Promise<TeamNoticeMutationResponse> => {
  const response = await apiClient.patch<TeamNoticeMutationResponse>(
    `/api/notices/${noticeId}`,
    notice,
  );
  return response.data;
};

export const deleteTeamNoticeApi = async (
  noticeId: EntityId,
): Promise<ApiMutationResponse> => {
  const response = await apiClient.delete<ApiMutationResponse>(
    `/api/notices/${noticeId}`,
  );
  return response.data;
};

export const createTeamTodoApi = async (
  teamSpaceId: EntityId,
  todo: CreateTeamTodoRequest,
): Promise<TeamTodoMutationResponse> => {
  const response = await apiClient.post<TeamTodoMutationResponse>(
    `/api/team-spaces/${teamSpaceId}/todos`,
    todo,
  );
  return response.data;
};

export const getTeamTodosApi = async (
  teamSpaceId: EntityId,
): Promise<TeamTodo[]> => {
  const response = await apiClient.get<TeamTodo[]>('/api/todos', {
    params: {teamSpaceId},
  });
  return response.data;
};

export const getTeamTodoApi = async (
  todoId: EntityId,
): Promise<TeamTodoDetail> => {
  const response = await apiClient.get<TeamTodoDetail>(`/api/todos/${todoId}`);
  return response.data;
};

export const updateTeamTodoApi = async (
  todoId: EntityId,
  todo: UpdateTeamTodoRequest,
): Promise<TeamTodoMutationResponse> => {
  const response = await apiClient.patch<TeamTodoMutationResponse>(
    `/api/todos/${todoId}`,
    todo,
  );
  return response.data;
};

export const toggleTeamTodoApi = async (
  todoId: EntityId,
  todo: UpdateTeamTodoRequest,
): Promise<TeamTodoMutationResponse> => {
  const response = await apiClient.patch<TeamTodoMutationResponse>(
    `/api/todos/${todoId}`,
    {
      title: todo.title,
      content: todo.content,
      dueDate: todo.dueDate,
      isChecked: todo.isChecked,
      sendPush: todo.sendPush,
    },
  );
  return response.data;
};

export const deleteTeamTodoApi = async (
  todoId: EntityId,
): Promise<ApiMutationResponse> => {
  const response = await apiClient.delete<ApiMutationResponse>(
    `/api/todos/${todoId}`,
  );
  return response.data;
};
