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

export interface ScheduleSummary {
  scheduleId: EntityId;
  title: string;
  startAt: string;
  endAt: string;
  teamSpaceId?: EntityId | null;
  createdAt?: string;
  updatedAt?: string;
}

export interface ScheduleDetail extends ScheduleSummary {
  content: string | null;
}

export interface ScheduleQuery {
  year: number;
  month: number;
  teamSpaceId?: EntityId;
}

export type ScheduleMutationResponse = ApiMutationResponse &
  Partial<ScheduleDetail>;

export interface CreateScheduleResponse extends ApiMutationResponse {
  scheduleId: EntityId;
}
