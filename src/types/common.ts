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

// ONE_ON_ONE은 1:1 문의, SUGGESTION은 서비스 개선 제안이다.
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
  // type에 따라 가리키는 대상(메모/친구요청/팀 등)의 id가 달라진다.
  targetId: EntityId;
  createdAt?: string;
}

export type InquiryMutationResponse = ApiMutationResponse & Partial<Inquiry>;

export interface CreateInquiryResponse extends ApiMutationResponse {
  inquiryId: EntityId;
}
