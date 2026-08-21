import type {MemoSummary} from '../types/memo';

// 메모 목록을 최신순(createdAt 내림차순)으로 정렬한다.
export const sortMemosByCreatedAtDesc = <
  T extends Pick<MemoSummary, 'createdAt'>,
>(
  memos: T[],
): T[] =>
  [...memos].sort((a, b) => {
    const aTime = a.createdAt ? new Date(a.createdAt).getTime() : 0;
    const bTime = b.createdAt ? new Date(b.createdAt).getTime() : 0;
    return bTime - aTime;
  });
