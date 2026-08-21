import {
  getNextFireExpirationAt,
  isExpiredFireMemo,
} from '../src/utils/memoExpiration';

describe('memo expiration', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date('2026-08-15T17:44:00+09:00'));
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('treats a fire memo whose expiration has passed as expired', () => {
    expect(
      isExpiredFireMemo({
        status: 'FIRE',
        expiredAt: '2026-08-15T17:43:59+09:00',
      }),
    ).toBe(true);
  });

  it('does not expire an ice memo even when it has an old expiration value', () => {
    expect(
      isExpiredFireMemo({
        status: 'ICE',
        expiredAt: '2026-08-15T17:43:59+09:00',
      }),
    ).toBe(false);
  });

  it('returns the nearest future fire memo expiration', () => {
    expect(
      getNextFireExpirationAt([
        {status: 'FIRE', expiredAt: '2026-08-15T18:00:00+09:00'},
        {status: 'FIRE', expiredAt: '2026-08-15T17:50:00+09:00'},
        {status: 'ICE', expiredAt: '2026-08-15T17:45:00+09:00'},
      ]),
    ).toBe(new Date('2026-08-15T17:50:00+09:00').getTime());
  });
});
