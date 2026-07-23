import { useCallback, useState } from 'react';
import dayjs from 'dayjs';
import { getMemoApi, getUserMemosApi } from '../api/memos';
import { getUserId } from '../utils/authStorage';
import { getApiErrorMessage } from '../utils/apiError';

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
  const [errorMessage, setErrorMessage] = useState('');

  const fetchMemos = useCallback(async () => {
    setIsLoading(true);
    setErrorMessage('');
    try {
      const userId = await getUserId();
      if (!userId) {
        setErrorMessage('로그인 정보를 찾을 수 없습니다. 다시 로그인해주세요.');
        return;
      }
      const memos = await getUserMemosApi();
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
      setErrorMessage(
        getApiErrorMessage(error, '타임라인 데이터를 불러오는데 실패했습니다.'),
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    fireMemos,
    icePinnedMemos,
    iceRegularMemos,
    isLoading,
    errorMessage,
    fetchMemos,
    getMemoDetail: getMemoApi,
  };
};
