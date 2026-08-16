import {useCallback, useState} from 'react';
import {Alert} from 'react-native';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import {
  getMemoApi,
  getUserMemosApi,
  moveMemoToTrashApi,
  updateMemoPinApi,
  updateMemoStatusApi,
} from '../api/memos';
import {getUserId} from '../utils/authStorage';
import {getApiErrorMessage, getApiResponseMessage} from '../utils/apiError';
import type {EntityId} from '../types/api';
import type {MemoStatus, MemoSummary} from '../types/memo';
import {isExpiredFireMemo} from '../utils/memoExpiration';

dayjs.locale('ko');

export interface HomeMemoItem {
  id: string;
  MTitle: string;
  MContent: string;
  Status: MemoStatus;
  time: string;
  isPinned: boolean;
  remainingTime: string | null;
  expiredAt: string | null;
}

export interface MemoSection {
  title: string;
  data: HomeMemoItem[];
}

const formatMemoTime = (date?: string | null): string => {
  if (!date) return '';
  const target = dayjs(date);
  if (target.isSame(dayjs(), 'day')) return target.format('오늘 A hh:mm');
  if (target.isSame(dayjs().subtract(1, 'day'), 'day')) {
    return target.format('어제 A hh:mm');
  }
  return target.format('M월 D일 A hh:mm');
};

const getRemainingTime = (expiredAt?: string | null): string => {
  if (!expiredAt) return '00:00:00';
  const seconds = dayjs(expiredAt).diff(dayjs(), 'second');
  if (seconds <= 0) return '00:00:00';
  return [
    Math.floor(seconds / 3600),
    Math.floor((seconds % 3600) / 60),
    seconds % 60,
  ]
    .map(value => String(value).padStart(2, '0'))
    .join(':');
};

export const useHome = () => {
  const [memoSections, setMemoSections] = useState<MemoSection[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const fetchMemos = useCallback(async (): Promise<void> => {
    setIsLoading(true);
    setErrorMessage('');
    try {
      const userId = await getUserId();
      if (!userId) return;

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

      const mapped: HomeMemoItem[] = activeMemos.map((memo: MemoSummary) => ({
        id: String(memo.memoId),
        MTitle: memo.title,
        MContent: memo.content ?? '',
        Status: memo.status,
        time: formatMemoTime(memo.createdAt ?? memo.expiredAt),
        isPinned: memo.isPinned,
        remainingTime:
          memo.status === 'FIRE' ? getRemainingTime(memo.expiredAt) : null,
        expiredAt: memo.expiredAt ?? null,
      }));
      const pinned = mapped.filter(memo => memo.isPinned);
      const regular = mapped.filter(memo => !memo.isPinned);
      setMemoSections([
        ...(pinned.length ? [{title: '고정된 메모', data: pinned}] : []),
        ...(regular.length ? [{title: '메모', data: regular}] : []),
      ]);
    } catch (error) {
      setErrorMessage(
        getApiErrorMessage(error, '메모를 불러오는데 실패했습니다.'),
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  const runMemoAction = async (
    action: () => Promise<unknown>,
    fallbackMessage: string,
  ): Promise<void> => {
    setIsLoading(true);
    try {
      await action();
      await fetchMemos();
    } catch (error) {
      Alert.alert(
        '오류',
        getApiResponseMessage(error) ?? fallbackMessage,
      );
    } finally {
      setIsLoading(false);
    }
  };

  const changeMemoStatus = (memoId: EntityId, status: MemoStatus) =>
    runMemoAction(
      () => updateMemoStatusApi(memoId, status),
      '메모 상태를 변경하지 못했습니다.',
    );

  const toggleMemoPin = (memoId: EntityId, isPinned: boolean) =>
    runMemoAction(
      () => updateMemoPinApi(memoId, !isPinned),
      '메모 고정 상태를 변경하지 못했습니다.',
    );

  const moveMemoToTrash = (memoId: EntityId) =>
    runMemoAction(
      () => moveMemoToTrashApi(memoId),
      '메모를 휴지통으로 이동하지 못했습니다.',
    );

  return {
    memoSections,
    isLoading,
    errorMessage,
    fetchMemos,
    getMemoDetail: getMemoApi,
    changeMemoStatus,
    toggleMemoPin,
    moveMemoToTrash,
  };
};
