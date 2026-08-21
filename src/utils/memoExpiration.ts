/**
 * FIRE 메모의 만료 여부와 다음 만료 시점을 계산한다.
 */

import dayjs from 'dayjs';
import type {MemoSummary} from '../types/memo';

// FIRE 메모는 설정된 시간이 지나면 만료된다.
// FIRE 상태이고 만료 시각이 현재 시각과 같거나 이전이면 만료된 FIRE 메모로 판단한다.
export const isExpiredFireMemo = (
  memo: Pick<MemoSummary, 'status' | 'expiredAt'>,
  now = dayjs(),
): boolean =>
  memo.status === 'FIRE' &&
  Boolean(memo.expiredAt) &&
  !dayjs(memo.expiredAt).isAfter(now);

// 아직 만료되지 않은 FIRE 메모들 중 가장 먼저 만료될 시각을 찾는다.
// 화면에서 다음 만료 상태를 확인할 시점을 정하는 데 사용한다.
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
