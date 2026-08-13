import type {ApiMutationResponse, EntityId} from './api';
import type {MemoSummary} from './memo';
import type {ScheduleSummary} from './schedule';
import type {TeamNotice, TeamTodo} from './teamSpace';

export interface SearchResponse {
  memos?: Array<Partial<MemoSummary> & Pick<MemoSummary, 'memoId' | 'title'>>;
  notices?: Array<
    Partial<TeamNotice> & Pick<TeamNotice, 'noticeId' | 'title'>
  >;
  todos?: Array<Partial<TeamTodo> & Pick<TeamTodo, 'todoId' | 'title'>>;
  schedules?: Array<
    Partial<ScheduleSummary> & Pick<ScheduleSummary, 'scheduleId' | 'title'>
  >;
}

export interface ServiceNotice {
  noticeId: EntityId;
  title: string;
  content?: string | null;
  createdAt?: string;
  updatedAt?: string;
}

export type InquiryType = 'ONE_ON_ONE' | 'SUGGESTION';

export interface CreateInquiryRequest {
  type: InquiryType;
  title: string;
  content: string;
  attachmentUrl: string | null;
}

export type InquiryStatus = 'WAITING' | 'ANSWERED';

export interface Inquiry extends CreateInquiryRequest {
  inquiryId: EntityId;
  status: InquiryStatus;
  response?: string | null;
  createdAt?: string;
  updatedAt?: string;
}

export type NotificationType =
  | 'MEMO'
  | 'FRIEND_REQUEST'
  | 'TEAM_INVITE'
  | 'TEAM_NOTICE'
  | 'TEAM_TODO';

export interface Notification {
  notificationId: EntityId;
  type: NotificationType;
  message: string;
  isRead: boolean;
  targetId: EntityId;
  createdAt?: string;
}

export type InquiryMutationResponse = ApiMutationResponse & Partial<Inquiry>;

export interface CreateInquiryResponse extends ApiMutationResponse {
  inquiryId: EntityId;
}
