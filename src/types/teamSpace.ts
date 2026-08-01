import type {ApiMutationResponse, EntityId} from './api';

export interface TeamSpace {
  teamSpaceId: EntityId;
  name: string;
  memberCount?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface TeamMember {
  teamMemberId: EntityId;
  teamSpaceId: EntityId;
  userId: EntityId;
  nickname?: string;
  profileImageUrl?: string | null;
  role: string;
}

export interface TeamNoticeRequest {
  title: string;
  content: string;
  isPinned: boolean;
}

export interface TeamNotice extends TeamNoticeRequest {
  noticeId: EntityId;
  teamSpaceId?: EntityId;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateTeamTodoRequest {
  title: string;
  content: string;
  dueDate: string | null;
  sendPush: boolean;
}

export interface UpdateTeamTodoRequest extends CreateTeamTodoRequest {
  isChecked: boolean;
}

export interface TeamTodo extends UpdateTeamTodoRequest {
  todoId: EntityId;
  teamSpaceId?: EntityId;
  createdAt?: string;
  updatedAt?: string;
}

export interface TeamTodoDetail extends TeamTodo {
  teamSpaceId: EntityId;
}

export type TeamNoticeMutationResponse = ApiMutationResponse &
  Partial<TeamNotice>;

export type TeamTodoMutationResponse = ApiMutationResponse & Partial<TeamTodo>;
