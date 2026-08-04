import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/ko';
import type {EntityId} from '../types/api';
import type {
  Notification,
  NotificationType,
  SearchResponse,
} from '../types/common';
import type {MemoStatus} from '../types/memo';

dayjs.extend(relativeTime);
dayjs.locale('ko');

export interface RecentSearch {
  id: string;
  text: string;
}

export type SearchResultType = 'MEMO' | 'NOTICE' | 'TODO' | 'SCHEDULE';

export interface SearchResultItem {
  id: string;
  resultType: SearchResultType;
  category: string;
  title: string;
  desc: string;
  targetId: EntityId;
  teamSpaceId?: EntityId | null;
  status?: MemoStatus;
}

export interface NotificationListItem {
  id: string;
  title: string;
  description: string;
  time: string;
  isRead: boolean;
  targetId?: EntityId | null;
  notificationType: NotificationType;
  type: 'FIRE' | 'ICE';
}

const NOTIFICATION_TITLES: Record<NotificationType, string> = {
  MEMO: '메모 알림',
  FRIEND_REQUEST: '친구 요청',
  TEAM_INVITE: '팀 초대',
  TEAM_NOTICE: '팀 공지',
  TEAM_TODO: '팀 할 일',
};

export const parseRecentSearches = (stored: string): RecentSearch[] => {
  try {
    const parsed: unknown = JSON.parse(stored);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (item): item is RecentSearch =>
        Boolean(item) &&
        typeof item === 'object' &&
        typeof item.id === 'string' &&
        typeof item.text === 'string',
    );
  } catch {
    return [];
  }
};

export const mapSearchResponse = (
  data: SearchResponse,
): SearchResultItem[] => [
  ...(data.memos ?? []).map(memo => ({
    id: `memo-${memo.memoId}`,
    resultType: 'MEMO' as const,
    category: '메모',
    title: memo.title,
    desc: memo.content ?? '',
    targetId: memo.memoId,
    status: memo.status,
  })),
  ...(data.notices ?? []).map(notice => ({
    id: `notice-${notice.noticeId}`,
    resultType: 'NOTICE' as const,
    category: '공지',
    title: notice.title,
    desc: notice.content ?? '',
    targetId: notice.noticeId,
    teamSpaceId: notice.teamSpaceId,
  })),
  ...(data.todos ?? []).map(todo => ({
    id: `todo-${todo.todoId}`,
    resultType: 'TODO' as const,
    category: '할 일',
    title: todo.title,
    desc: todo.content ?? todo.dueDate ?? '',
    targetId: todo.todoId,
    teamSpaceId: todo.teamSpaceId,
  })),
  ...(data.schedules ?? []).map(schedule => ({
    id: `schedule-${schedule.scheduleId}`,
    resultType: 'SCHEDULE' as const,
    category: '일정',
    title: schedule.title,
    desc: [schedule.startAt, schedule.endAt].filter(Boolean).join(' ~ '),
    targetId: schedule.scheduleId,
    teamSpaceId: schedule.teamSpaceId,
  })),
];

export const mapNotificationResponse = (
  notification: Notification,
): NotificationListItem => ({
  id: String(notification.notificationId),
  title: NOTIFICATION_TITLES[notification.type],
  description: notification.message,
  time: notification.createdAt ? dayjs(notification.createdAt).fromNow() : '',
  isRead: notification.isRead,
  targetId: notification.targetId,
  notificationType: notification.type,
  type: notification.type === 'MEMO' ? 'FIRE' : 'ICE',
});
