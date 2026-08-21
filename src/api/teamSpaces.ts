import apiClient from './client';
import {parseRootArray} from '../utils/apiResponse';
import type {ApiMutationResponse, EntityId} from '../types/api';
import type {
  AddTeamMemberResponse,
  CreateTeamNoticeResponse,
  CreateTeamTodoRequest,
  CreateTeamTodoResponse,
  TeamMember,
  TeamMemberMutationResponse,
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
  const response = await apiClient.get<unknown>('/api/team-spaces');
  return parseRootArray<TeamSpace>(response.data, '팀스페이스 목록');
};

export const updateTeamSpaceApi = async (
  teamSpaceId: EntityId,
  name: string,
): Promise<ApiMutationResponse> => {
  const response = await apiClient.patch<ApiMutationResponse>(
    `/api/team-spaces/${teamSpaceId}`,
    {name},
  );
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
): Promise<AddTeamMemberResponse> => {
  const response = await apiClient.post<AddTeamMemberResponse>(
    `/api/team-spaces/${teamSpaceId}/members`,
    {userId: Number(userId), role},
  );
  return response.data;
};

export const getTeamMembersApi = async (
  teamSpaceId: EntityId,
): Promise<TeamMember[]> => {
  const response = await apiClient.get<unknown>(
    `/api/team-members/team/${teamSpaceId}`,
  );
  return parseRootArray<TeamMember>(response.data, '팀 멤버 목록');
};

export const updateTeamMemberRoleApi = async (
  teamMemberId: EntityId,
  role: string,
): Promise<TeamMemberMutationResponse> => {
  const response = await apiClient.patch<TeamMemberMutationResponse>(
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
): Promise<CreateTeamNoticeResponse> => {
  const response = await apiClient.post<CreateTeamNoticeResponse>(
    `/api/team-spaces/${teamSpaceId}/notices`,
    notice,
  );
  return response.data;
};

export const getTeamNoticesApi = async (
  teamSpaceId: EntityId,
): Promise<TeamNotice[]> => {
  const response = await apiClient.get<unknown>('/api/notices', {
    params: {teamSpaceId},
  });
  return parseRootArray<TeamNotice>(response.data, '팀 공지 목록');
};

export const getTeamNoticeApi = async (
  noticeId: EntityId,
): Promise<TeamNotice> => {
  const response = await apiClient.get<TeamNotice>(`/api/notices/${noticeId}`);
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
): Promise<CreateTeamTodoResponse> => {
  const response = await apiClient.post<CreateTeamTodoResponse>(
    `/api/team-spaces/${teamSpaceId}/todos`,
    todo,
  );
  return response.data;
};

export const getTeamTodosApi = async (
  teamSpaceId: EntityId,
): Promise<TeamTodo[]> => {
  const response = await apiClient.get<unknown>('/api/todos', {
    params: {teamSpaceId},
  });
  return parseRootArray<TeamTodo>(response.data, '팀 할 일 목록');
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
