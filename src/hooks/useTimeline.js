import { useCallback, useState } from 'react';
import { Alert } from 'react-native';
import dayjs from 'dayjs';
import { getUserMemosApi } from '../api/memos';
import { getUserId } from '../utils/authStorage';

const getRemainingTime = expiredAt => {
  const seconds = dayjs(expiredAt).diff(dayjs(), 'second');
  if (!expiredAt || seconds <= 0) return '00:00';
  return `${String(Math.floor(seconds / 3600)).padStart(2, '0')}:${String(
    Math.floor((seconds % 3600) / 60),
  ).padStart(2, '0')}`;
};

export const useTimeline = () => {
  const [fireMemos, setFireMemos] = useState([]);
  const [icePinnedMemos, setIcePinnedMemos] = useState([]);
  const [iceRegularMemos, setIceRegularMemos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchMemos = useCallback(async () => {
    setIsLoading(true);
    try {
      const userId = await getUserId();
      if (!userId) return;
      const memos = await getUserMemosApi(userId);
      const mapped = memos.map(memo => ({
        id: String(memo.memoId),
        title: memo.title,
        desc: memo.content ?? '',
        status: memo.status,
        isPinned: memo.isPinned,
        time: memo.createdAt ? dayjs(memo.createdAt).format('HH:mm') : '',
        date: memo.createdAt
          ? dayjs(memo.createdAt).format('M월 D일 저장')
          : '',
        remainingTime:
          memo.status === 'FIRE' ? getRemainingTime(memo.expiredAt) : null,
      }));
      const iceMemos = mapped.filter(memo => memo.status === 'ICE');
      setFireMemos(mapped.filter(memo => memo.status === 'FIRE'));
      setIcePinnedMemos(iceMemos.filter(memo => memo.isPinned));
      setIceRegularMemos(iceMemos.filter(memo => !memo.isPinned));
    } catch (error) {
      Alert.alert(
        '오류',
        error.response?.data?.message ??
          '타임라인 데이터를 불러오는데 실패했습니다.',
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { fireMemos, icePinnedMemos, iceRegularMemos, isLoading, fetchMemos };
};
