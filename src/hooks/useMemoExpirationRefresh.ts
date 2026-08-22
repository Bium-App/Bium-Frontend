import {useEffect} from 'react';

// setTimeout의 지연 시간은 32비트 정수 범위(약 24.8일)를 넘으면 즉시 실행되므로 상한값으로 사용한다.
const MAX_TIMEOUT_MS = 2_147_483_647;

// FIRE 메모의 만료 시각(nextExpirationAt)이 되면 onExpire를 실행해 화면을 갱신할 수 있도록
// 타이머를 예약하는 훅.
export const useMemoExpirationRefresh = (
  nextExpirationAt: number | null,
  onExpire: () => void | Promise<void>,
  enabled = true,
): void => {
  useEffect(() => {
    if (!enabled || nextExpirationAt === null) return;

    const remainingMs = Math.max(nextExpirationAt - Date.now(), 0);
    // 만료 시각 직후 서버 상태와의 오차를 줄이기 위해 약간의 여유를 두고 실행한다.
    const timeout = setTimeout(
      () => {
        onExpire();
      },
      Math.min(remainingMs + 250, MAX_TIMEOUT_MS),
    );

    return () => clearTimeout(timeout);
  }, [enabled, nextExpirationAt, onExpire]);
};
