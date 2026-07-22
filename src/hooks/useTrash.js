import { useCallback, useState } from 'react';
import { Alert } from 'react-native';
import dayjs from 'dayjs';
import {
  deleteTrashMemosApi,
  getTrashMemosApi,
  restoreMemoApi,
} from '../api/memos';
import { getUserId } from '../utils/authStorage';

export const useTrash = () => {
  const [trashItems, setTrashItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchTrashMemos = useCallback(async () => {
    setIsLoading(true);
    try {
      const userId = await getUserId();
      if (!userId) return;
      const memos = await getTrashMemosApi(userId);
      setTrashItems(
        memos.map(memo => {
          const elapsedDays = dayjs().diff(dayjs(memo.deletedAt), 'day');
          const remainingDays = Math.max(0, 30 - elapsedDays);
          return {
            id: String(memo.memoId),
            title: memo.title,
            desc: memo.content ?? '',
            remain: remainingDays ? `${remainingDays}일` : 'D-Day',
          };
        }),
      );
    } catch (error) {
      Alert.alert(
        '오류',
        error.response?.data?.message ?? '휴지통 데이터를 불러오지 못했습니다.',
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleRestoreMemos = async (selectedIds, onSuccess) => {
    setIsLoading(true);
    try {
      await Promise.all(selectedIds.map(restoreMemoApi));
      Alert.alert('완료', '선택한 메모가 복구되었습니다.');
      onSuccess?.();
    } catch (error) {
      Alert.alert(
        '오류',
        error.response?.data?.message ?? '메모 복구에 실패했습니다.',
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handlePermanentDeleteMemos = async (selectedIds, onSuccess) => {
    if (!selectedIds.length) return;
    setIsLoading(true);
    try {
      await deleteTrashMemosApi(selectedIds.map(Number));
      Alert.alert('완료', '선택한 메모가 영구 삭제되었습니다.');
      onSuccess?.();
    } catch (error) {
      Alert.alert(
        '오류',
        error.response?.data?.message ?? '메모 영구 삭제에 실패했습니다.',
      );
    } finally {
      setIsLoading(false);
    }
  };

  return {
    trashItems,
    isLoading,
    fetchTrashMemos,
    handleRestoreMemos,
    handlePermanentDeleteMemos,
  };
};
