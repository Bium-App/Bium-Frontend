import {useEffect} from 'react';

const MAX_TIMEOUT_MS = 2_147_483_647;

export const useMemoExpirationRefresh = (
  nextExpirationAt: number | null,
  onExpire: () => void | Promise<void>,
  enabled = true,
): void => {
  useEffect(() => {
    if (!enabled || nextExpirationAt === null) return;

    const remainingMs = Math.max(nextExpirationAt - Date.now(), 0);
    const timeout = setTimeout(
      () => {
        onExpire();
      },
      Math.min(remainingMs + 250, MAX_TIMEOUT_MS),
    );

    return () => clearTimeout(timeout);
  }, [enabled, nextExpirationAt, onExpire]);
};
