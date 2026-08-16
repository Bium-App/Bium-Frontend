import dayjs from 'dayjs';
import type {MemoSummary} from '../types/memo';

export const isExpiredFireMemo = (
  memo: Pick<MemoSummary, 'status' | 'expiredAt'>,
  now = dayjs(),
): boolean =>
  memo.status === 'FIRE' &&
  Boolean(memo.expiredAt) &&
  !dayjs(memo.expiredAt).isAfter(now);

export const getNextFireExpirationAt = (
  memos: Array<Pick<MemoSummary, 'status' | 'expiredAt'>>,
): number | null => {
  const now = Date.now();
  const expirationTimes = memos
    .filter(memo => memo.status === 'FIRE' && memo.expiredAt)
    .map(memo => dayjs(memo.expiredAt).valueOf())
    .filter(expiredAt => Number.isFinite(expiredAt) && expiredAt > now);

  return expirationTimes.length ? Math.min(...expirationTimes) : null;
};
