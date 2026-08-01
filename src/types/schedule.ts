import type {ApiMutationResponse, EntityId} from './api';

export interface ScheduleRequest {
  title: string;
  content: string;
  startAt: string;
  endAt: string;
}

export interface CreateScheduleRequest extends ScheduleRequest {
  teamSpaceId?: EntityId | null;
}

export interface Schedule extends ScheduleRequest {
  scheduleId: EntityId;
  teamSpaceId?: EntityId | null;
  createdAt?: string;
  updatedAt?: string;
}

export interface ScheduleQuery {
  year: number;
  month: number;
  teamSpaceId?: EntityId;
}

export type ScheduleMutationResponse = ApiMutationResponse & Partial<Schedule>;
