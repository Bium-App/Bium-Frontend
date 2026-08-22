import {useCallback, useState} from 'react';
import {Alert} from 'react-native';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import {
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
import {sortMemosByCreatedAtDesc} from '../utils/memoSort';

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

// 홈 화면의 개인 메모 목록을 불러오고, 만료된 FIRE 메모의 TRASH 이동, 상태 변경, 고정(pin) 처리를 담당한다.
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
      // FIRE 메모는 expiredAt이 지나면 TRASH로 이동해야 하므로, 목록을 불러올 때마다
      // 만료된 FIRE 메모를 가려내 TRASH로 옮긴다.
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
      const mapped: HomeMemoItem[] = sortedActiveMemos.map((memo: MemoSummary) => ({
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

  const changeMemoStatus = (
    memoId: EntityId,
    status: MemoStatus,
    wasPinned = false,
  ) =>
    runMemoAction(async () => {
      await updateMemoStatusApi(memoId, status);
      // ICE 메모만 pin이 가능하므로, 상태를 FIRE로 바꿀 때는 기존 pin도 함께 해제한다.
      // 서버가 상태 변경 시 pin을 자동으로 해제하지 않아 클라이언트에서 별도로 요청한다.
      if (status === 'FIRE' && wasPinned) {
        await updateMemoPinApi(memoId, false);
      }
    }, '메모 상태를 변경하지 못했습니다.');

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
    changeMemoStatus,
    toggleMemoPin,
    moveMemoToTrash,
  };
};
