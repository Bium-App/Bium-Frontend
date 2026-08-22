import {useCallback, useState} from 'react';
import {Alert} from 'react-native';
import dayjs from 'dayjs';
import {
  deleteTrashMemosApi,
  getTrashMemosApi,
  restoreMemoApi,
} from '../api/memos';
import {getApiErrorMessage} from '../utils/apiError';
import type {MemoStatus} from '../types/memo';

export interface TrashItem {
  id: string;
  title: string;
  desc: string;
  remain: string;
  status: MemoStatus;
}

// TRASH 화면에서 삭제되었거나 만료된 메모 목록을 조회하고, 복구·영구 삭제를 처리하는 훅.
export const useTrash = () => {
  const [trashItems, setTrashItems] = useState<TrashItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const fetchTrashMemos = useCallback(async (): Promise<void> => {
    setIsLoading(true);
    setErrorMessage('');
    try {
      const memos = await getTrashMemosApi();
      setTrashItems(
        memos.map(memo => {
          // TRASH로 이동한 메모는 deletedAt 기준 24시간이 지나면 영구 삭제 대상이 되므로
          // 남은 시간을 계산해 표시한다.
          const expiresAt = dayjs(memo.deletedAt).add(24, 'hour');
          const remainingMinutes = Math.max(
            0,
            expiresAt.diff(dayjs(), 'minute'),
          );
          const remain =
            remainingMinutes <= 0
              ? 'D-Day'
              : remainingMinutes < 60
                ? `${remainingMinutes}분`
                : `${Math.ceil(remainingMinutes / 60)}시간`;
          return {
            id: String(memo.memoId),
            title: memo.title,
            desc: memo.content ?? '',
            remain,
            status: memo.status,
          };
        }),
      );
    } catch (error) {
      setErrorMessage(
        getApiErrorMessage(error, '휴지통 데이터를 불러오지 못했습니다.'),
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleRestoreMemos = async (
    selectedIds: string[],
    onSuccess?: () => void,
  ): Promise<void> => {
    setIsLoading(true);
    try {
      await Promise.all(selectedIds.map(restoreMemoApi));
      Alert.alert('완료', '선택한 메모가 복구되었습니다.');
      onSuccess?.();
    } catch (error) {
      Alert.alert(
        '오류',
        getApiErrorMessage(error, '메모 복구에 실패했습니다.'),
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handlePermanentDeleteMemos = async (
    selectedIds: string[],
    onSuccess?: () => void,
  ): Promise<void> => {
    if (!selectedIds.length) return;
    setIsLoading(true);
    try {
      await deleteTrashMemosApi(selectedIds.map(Number));
      Alert.alert('완료', '선택한 메모가 영구 삭제되었습니다.');
      onSuccess?.();
    } catch (error) {
      Alert.alert(
        '오류',
        getApiErrorMessage(error, '메모 영구 삭제에 실패했습니다.'),
      );
    } finally {
      setIsLoading(false);
    }
  };

  return {
    trashItems,
    isLoading,
    errorMessage,
    fetchTrashMemos,
    handleRestoreMemos,
    handlePermanentDeleteMemos,
  };
};
