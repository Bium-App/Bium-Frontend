import {shouldRefreshAccessToken} from '../src/utils/authRetry';

describe('인증 실패 재시도 판별', () => {
  it('401 보호 API 응답은 토큰을 재발급한다', () => {
    expect(
      shouldRefreshAccessToken({status: 401, url: '/api/memos'}),
    ).toBe(true);
  });

  it('403 응답은 Body 유무와 관계없이 재발급하지 않는다', () => {
    expect(
      shouldRefreshAccessToken({
        status: 403,
        url: '/api/memos',
      }),
    ).toBe(false);
    expect(
      shouldRefreshAccessToken({
        status: 403,
        url: '/api/team-spaces/1',
      }),
    ).toBe(false);
  });

  it('공개 인증 API와 이미 재시도한 요청은 재발급하지 않는다', () => {
    expect(
      shouldRefreshAccessToken({
        status: 401,
        url: '/api/auth/login',
      }),
    ).toBe(false);
    expect(
      shouldRefreshAccessToken({
        status: 401,
        url: '/api/memos',
        alreadyRetried: true,
      }),
    ).toBe(false);
  });
});
