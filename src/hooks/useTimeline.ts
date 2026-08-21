import { useCallback, useState } from 'react';
import dayjs from 'dayjs';
import {
  getUserMemosApi,
  moveMemoToTrashApi,
  updateMemoPinApi,
} from '../api/memos';
import { getUserId } from '../utils/authStorage';
import { getApiErrorMessage } from '../utils/apiError';
import type { MemoStatus } from '../types/memo';
import {isExpiredFireMemo} from '../utils/memoExpiration';
import {sortMemosByCreatedAtDesc} from '../utils/memoSort';

export interface TimelineMemoItem {
  id: string;
  title: string;
  desc: string;
  status: MemoStatus;
  isPinned: boolean;
  time: string;
  date: string;
  createdAt: string | null;
  expiredAt: string | null;
}

export const useTimeline = () => {
  const [fireMemos, setFireMemos] = useState<TimelineMemoItem[]>([]);
  const [icePinnedMemos, setIcePinnedMemos] = useState<TimelineMemoItem[]>([]);
  const [iceRegularMemos, setIceRegularMemos] = useState<TimelineMemoItem[]>(
    [],
  );
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const fetchMemos = useCallback(async (): Promise<void> => {
    setIsLoading(true);
    setErrorMessage('');
    try {
      const userId = await getUserId();
      if (!userId) {
        setErrorMessage('로그인 정보를 찾을 수 없습니다. 다시 로그인해주세요.');
        return;
      }
      const memos = await getUserMemosApi();
      const expiredMemos = memos.filter(memo => isExpiredFireMemo(memo));
      const activeMemos = memos.filter(memo => !isExpiredFireMemo(memo));

      if (expiredMemos.length) {
        const results = await Promise.allSettled(
          expiredMemos.map(memo => moveMemoToTrashApi(memo.memoId)),
        );
        if (__DEV__ && results.some(result => result.status === 'rejected')) {
          console.warn('[Memo expiration] Failed to move expired memo to trash');
        }
      }

      const sortedActiveMemos = sortMemosByCreatedAtDesc(activeMemos);
      const mapped: TimelineMemoItem[] = sortedActiveMemos.map(memo => ({
        id: String(memo.memoId),
        title: memo.title,
        desc: memo.content ?? '',
        status: memo.status,
        isPinned: memo.isPinned,
        time: memo.createdAt ? dayjs(memo.createdAt).format('HH:mm') : '',
        date: memo.createdAt
          ? dayjs(memo.createdAt).format('M월 D일 저장')
          : '',
        createdAt: memo.createdAt ?? null,
        expiredAt: memo.expiredAt ?? null,
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

  const toggleMemoPin = async (
    memoId: string,
    isPinned: boolean,
  ): Promise<void> => {
    const target = [...icePinnedMemos, ...iceRegularMemos].find(
      memo => memo.id === memoId,
    );
    if (!target) return;

    const updated = { ...target, isPinned: !isPinned };
    if (isPinned) {
      setIcePinnedMemos(current => current.filter(memo => memo.id !== memoId));
      setIceRegularMemos(current => [updated, ...current]);
    } else {
      setIceRegularMemos(current => current.filter(memo => memo.id !== memoId));
      setIcePinnedMemos(current => [updated, ...current]);
    }

    try {
      await updateMemoPinApi(memoId, !isPinned);
      await fetchMemos();
    } catch (error) {
      await fetchMemos();
      throw error;
    }
  };

  return {
    fireMemos,
    icePinnedMemos,
    iceRegularMemos,
    isLoading,
    errorMessage,
    fetchMemos,
    toggleMemoPin,
  };
};
