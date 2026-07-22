import { useCallback, useState } from 'react';
import { Alert } from 'react-native';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import {
  getUserMemosApi,
  moveMemoToTrashApi,
  toggleMemoPinApi,
  updateMemoStatusApi,
} from '../api/memos';
import { getUserId } from '../utils/authStorage';
import { getApiErrorMessage } from '../utils/apiError';

dayjs.locale('ko');

const formatMemoTime = date => {
  if (!date) return '';
  const target = dayjs(date);
  if (target.isSame(dayjs(), 'day')) return target.format('오늘 A hh:mm');
  if (target.isSame(dayjs().subtract(1, 'day'), 'day'))
    return target.format('어제 A hh:mm');
  return target.format('M월 D일 A hh:mm');
};

const getRemainingTime = expiredAt => {
  const seconds = dayjs(expiredAt).diff(dayjs(), 'second');
  if (!expiredAt || seconds <= 0) return '00:00:00';
  return [
    Math.floor(seconds / 3600),
    Math.floor((seconds % 3600) / 60),
    seconds % 60,
  ]
    .map(value => String(value).padStart(2, '0'))
    .join(':');
};

export const useHome = () => {
  const [memoSections, setMemoSections] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const fetchMemos = useCallback(async () => {
    setIsLoading(true);
    setErrorMessage('');
    try {
      const userId = await getUserId();
      if (!userId) return;

      const memos = await getUserMemosApi(userId);
      const mapped = memos.map(memo => ({
        id: String(memo.memoId),
        MTitle: memo.title,
        MContent: memo.content ?? '',
        Status: memo.status,
        time: formatMemoTime(memo.createdAt ?? memo.expiredAt),
        isPinned: memo.isPinned,
        remainingTime:
          memo.status === 'FIRE' ? getRemainingTime(memo.expiredAt) : null,
      }));
      const pinned = mapped.filter(memo => memo.isPinned);
      const regular = mapped.filter(memo => !memo.isPinned);
      setMemoSections([
        ...(pinned.length ? [{ title: '고정된 메모', data: pinned }] : []),
        ...(regular.length ? [{ title: '메모', data: regular }] : []),
      ]);
    } catch (error) {
      setErrorMessage(
        getApiErrorMessage(error, '메모를 불러오는데 실패했습니다.'),
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  const runMemoAction = async (action, fallbackMessage) => {
    setIsLoading(true);
    try {
      await action();
      await fetchMemos();
    } catch (error) {
      Alert.alert('오류', error.response?.data?.message ?? fallbackMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const changeMemoStatus = (memoId, status) =>
    runMemoAction(
      () => updateMemoStatusApi(memoId, status),
      '메모 상태를 변경하지 못했습니다.',
    );

  const toggleMemoPin = memoId =>
    runMemoAction(
      () => toggleMemoPinApi(memoId),
      '메모 고정 상태를 변경하지 못했습니다.',
    );

  const moveMemoToTrash = memoId =>
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
