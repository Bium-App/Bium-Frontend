import { useState, useCallback } from 'react';
import { Alert } from 'react-native';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/ko';
import {
  getNotificationsApi,
  readNotificationApi,
  deleteNotificationApi,
} from '../api/common';
import { getMemoApi } from '../api/memos';
import { getTeamNoticeApi } from '../api/teamSpaces';
import { getApiErrorMessage } from '../utils/apiError';

dayjs.extend(relativeTime);
dayjs.locale('ko');

const NOTIFICATION_TITLES = {
  MEMO: '메모 알림',
  FRIEND_REQUEST: '친구 요청',
  TEAM_INVITE: '팀 초대',
  TEAM_NOTICE: '팀 공지',
  TEAM_TODO: '팀 할 일',
};

export const useNotification = () => {
  const [notifications, setNotifications] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const fetchNotifications = useCallback(async () => {
    setIsLoading(true);
    setErrorMessage('');
    try {
      const data = await getNotificationsApi();

      const mapped = data.map(n => ({
        id: String(n.notificationId),
        title: NOTIFICATION_TITLES[n.type] ?? n.type,
        description: n.message,
        time: n.createdAt ? dayjs(n.createdAt).fromNow() : '',
        isRead: n.isRead,
        targetId: n.targetId,
        notificationType: n.type,
        type: n.type === 'MEMO' ? 'FIRE' : 'ICE',
      }));

      setNotifications(mapped);
    } catch (error) {
      setErrorMessage(getApiErrorMessage(error, '알림을 불러오지 못했습니다.'));
    } finally {
      setIsLoading(false);
    }
  }, []);

  const markAsRead = async id => {
    try {
      await readNotificationApi(id);
      setNotifications(prev =>
        prev.map(n => (n.id === id ? { ...n, isRead: true } : n)),
      );
    } catch (error) {
      console.error(error);
    }
  };

  const deleteNotification = async id => {
    try {
      await deleteNotificationApi(id);
      setNotifications(prev => prev.filter(n => n.id !== id));
    } catch (error) {
      Alert.alert('오류', '알림 삭제에 실패했습니다.');
    }
  };

  const openNotification = async (
    notification,
    { onMemoReady, onNavigate } = {},
  ) => {
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
          ? noticeResponse[0] ?? {}
          : noticeResponse;
        Alert.alert(
          notice.title ?? '팀 공지',
          notice.content ?? '공지 내용이 없습니다.',
        );
        return;
      }
      Alert.alert(
        '할 일 이동 준비 중',
        '7/23 명세에도 todoId 단건 조회 API 또는 teamSpaceId가 없어 팀 할 일 화면으로 이동할 수 없습니다.',
      );
    } catch (error) {
      Alert.alert(
        '이동 실패',
        error.response?.data?.message ?? '연결된 내용을 불러오지 못했습니다.',
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
