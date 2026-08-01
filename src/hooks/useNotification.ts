import {useCallback, useState} from 'react';
import {Alert} from 'react-native';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/ko';
import {
  deleteNotificationApi,
  getNotificationsApi,
  readNotificationApi,
} from '../api/common';
import {getMemoApi} from '../api/memos';
import {getTeamNoticeApi, getTeamTodoApi} from '../api/teamSpaces';
import {getApiErrorMessage, getApiResponseMessage} from '../utils/apiError';
import type {EntityId} from '../types/api';
import type {NotificationType} from '../types/common';
import type {MemoEditorData} from '../types/navigation';

dayjs.extend(relativeTime);
dayjs.locale('ko');

const NOTIFICATION_TITLES: Record<NotificationType, string> = {
  MEMO: '메모 알림',
  FRIEND_REQUEST: '친구 요청',
  TEAM_INVITE: '팀 초대',
  TEAM_NOTICE: '팀 공지',
  TEAM_TODO: '팀 할 일',
};

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

interface NotificationHandlers {
  onMemoReady?: (memoData: MemoEditorData) => void;
  onNavigate?: (
    screen: 'FriendRequestList' | 'ProjectDetail' | 'ProjectTodo',
    params?: {projectId: string; todoId?: string},
  ) => void;
}

export const useNotification = () => {
  const [notifications, setNotifications] = useState<NotificationListItem[]>(
    [],
  );
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const fetchNotifications = useCallback(async (): Promise<void> => {
    setIsLoading(true);
    setErrorMessage('');
    try {
      const data = await getNotificationsApi();
      setNotifications(
        data.map(notification => ({
          id: String(notification.notificationId),
          title: NOTIFICATION_TITLES[notification.type],
          description: notification.message,
          time: notification.createdAt
            ? dayjs(notification.createdAt).fromNow()
            : '',
          isRead: notification.isRead,
          targetId: notification.targetId,
          notificationType: notification.type,
          type: notification.type === 'MEMO' ? 'FIRE' : 'ICE',
        })),
      );
    } catch (error) {
      setErrorMessage(getApiErrorMessage(error, '알림을 불러오지 못했습니다.'));
    } finally {
      setIsLoading(false);
    }
  }, []);

  const markAsRead = async (id: EntityId): Promise<void> => {
    try {
      await readNotificationApi(id);
      setNotifications(current =>
        current.map(notification =>
          notification.id === String(id)
            ? {...notification, isRead: true}
            : notification,
        ),
      );
    } catch (error) {
      console.error(error);
    }
  };

  const deleteNotification = async (id: EntityId): Promise<void> => {
    try {
      await deleteNotificationApi(id);
      setNotifications(current =>
        current.filter(notification => notification.id !== String(id)),
      );
    } catch {
      Alert.alert('오류', '알림 삭제에 실패했습니다.');
    }
  };

  const openNotification = async (
    notification: NotificationListItem,
    {onMemoReady, onNavigate}: NotificationHandlers = {},
  ): Promise<void> => {
    await markAsRead(notification.id);
    if (!notification.targetId) {
      Alert.alert('이동 실패', '알림에 연결된 대상 정보가 없습니다.');
      return;
    }

    try {
      if (notification.notificationType === 'MEMO') {
        const memo = await getMemoApi(notification.targetId);
        onMemoReady?.({
          id: String(memo.memoId),
          title: memo.title,
          content: memo.content,
          status: memo.status,
          expiredAt: memo.expiredAt,
          createdAt: memo.createdAt,
        });
        return;
      }
      if (notification.notificationType === 'FRIEND_REQUEST') {
        onNavigate?.('FriendRequestList');
        return;
      }
      if (notification.notificationType === 'TEAM_INVITE') {
        onNavigate?.('ProjectDetail', {
          projectId: String(notification.targetId),
        });
        return;
      }
      if (notification.notificationType === 'TEAM_NOTICE') {
        const noticeResponse = await getTeamNoticeApi(notification.targetId);
        const notice = Array.isArray(noticeResponse)
          ? noticeResponse[0]
          : noticeResponse;
        Alert.alert(
          notice?.title ?? '팀 공지',
          notice?.content ?? '공지 내용이 없습니다.',
        );
        return;
      }
      if (notification.notificationType === 'TEAM_TODO') {
        const todo = await getTeamTodoApi(notification.targetId);
        onNavigate?.('ProjectTodo', {
          projectId: String(todo.teamSpaceId),
          todoId: String(todo.todoId),
        });
      }
    } catch (error) {
      Alert.alert(
        '이동 실패',
        getApiResponseMessage(error) ??
          '연결된 내용을 불러오지 못했습니다.',
      );
    }
  };

  return {
    notifications,
    isLoading,
    errorMessage,
    fetchNotifications,
    markAsRead,
    openNotification,
    deleteNotification,
  };
};
