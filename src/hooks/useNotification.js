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
import { getUserId } from '../utils/authStorage';
import { getApiErrorMessage } from '../utils/apiError';

dayjs.extend(relativeTime);
dayjs.locale('ko');

export const useNotification = () => {
  const [notifications, setNotifications] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const fetchNotifications = useCallback(async () => {
    setIsLoading(true);
    setErrorMessage('');
    try {
      const userId = await getUserId();
      if (!userId) return;

      const data = await getNotificationsApi(userId);

      const mapped = data.map(n => ({
        id: String(n.notificationId),
        title: n.type,
        description: n.message,
        time: dayjs(n.createdAt).fromNow(),
        isRead: n.isRead,
        targetId: n.targetId,
        notificationType: n.type,
        type: n.type === 'MEMO' ? 'FIRE' : 'ICE',
      }));

      setNotifications(mapped);
    } catch (error) {
      setErrorMessage(
        getApiErrorMessage(error, '알림을 불러오지 못했습니다.'),
      );
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

  const openNotification = async (notification, onMemoReady) => {
    await markAsRead(notification.id);
    if (notification.notificationType !== 'MEMO' || !notification.targetId) {
      Alert.alert(
        '이동 정보 확인 필요',
        '이 알림 유형의 targetId 화면 매핑이 아직 확정되지 않았습니다.',
      );
      return;
    }

    try {
      const memo = await getMemoApi(notification.targetId);
      onMemoReady?.({
        id: String(memo.memoId),
        title: memo.title,
        content: memo.content,
        status: memo.status,
      });
    } catch (error) {
      Alert.alert(
        '이동 실패',
        error.response?.data?.message ?? '연결된 메모를 불러오지 못했습니다.',
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
