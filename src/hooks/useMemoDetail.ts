import {useCallback, useState} from 'react';
import {Alert} from 'react-native';
import {
  getMemoApi,
  moveMemoToTrashApi,
  updateMemoPinApi,
  updateMemoStatusApi,
} from '../api/memos';
import {getApiErrorMessage, getApiResponseMessage} from '../utils/apiError';
import type {EntityId} from '../types/api';
import type {MemoDetail as MemoDetailData, MemoStatus} from '../types/memo';

export const useMemoDetail = (memoId: EntityId) => {
  const [memo, setMemo] = useState<MemoDetailData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const fetchMemo = useCallback(async (): Promise<void> => {
    setIsLoading(true);
    setErrorMessage('');
    try {
      const data = await getMemoApi(memoId);
      setMemo(data);
    } catch (error) {
      setErrorMessage(
        getApiErrorMessage(error, '메모를 불러오지 못했습니다.'),
      );
    } finally {
      setIsLoading(false);
    }
  }, [memoId]);

  const runMemoAction = async (
    action: () => Promise<unknown>,
    fallbackMessage: string,
  ): Promise<boolean> => {
    try {
      await action();
      await fetchMemo();
      return true;
    } catch (error) {
      Alert.alert('오류', getApiResponseMessage(error) ?? fallbackMessage);
      return false;
    }
  };

  const changeStatus = (status: MemoStatus) =>
    runMemoAction(async () => {
      await updateMemoStatusApi(memoId, status);
      // 얼음 메모만 고정할 수 있어서, 불로 바뀌면 고정도 같이 풀어야 한다.
      // 서버가 상태 변경 시 자동으로 고정을 풀어주지 않는다.
      if (status === 'FIRE' && memo?.isPinned) {
        await updateMemoPinApi(memoId, false);
      }
    }, '메모 상태를 변경하지 못했습니다.');

  const togglePin = () =>
    memo
      ? runMemoAction(
          () => updateMemoPinApi(memoId, !memo.isPinned),
          '메모 고정 상태를 변경하지 못했습니다.',
        )
      : Promise.resolve(false);

  const moveToTrash = () =>
    runMemoAction(
      () => moveMemoToTrashApi(memoId),
      '메모를 휴지통으로 이동하지 못했습니다.',
    );

  return {
    memo,
    isLoading,
    errorMessage,
    fetchMemo,
    changeStatus,
    togglePin,
    moveToTrash,
  };
};
