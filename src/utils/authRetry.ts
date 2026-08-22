interface AuthRetryCandidate {
  status?: number;
  url?: string;
  alreadyRetried?: boolean;
}

// 로그인 전이거나 인증과 무관한 요청은 401이 나도 토큰 재발급 대상이 아니다.
const PUBLIC_AUTH_PATHS = [
  '/api/auth/login',
  '/api/auth/social-login',
  '/api/auth/signup',
  '/api/auth/find',
  '/api/auth/refresh',
];

const isPublicAuthRequest = (url?: string): boolean =>
  PUBLIC_AUTH_PATHS.some(path => url?.startsWith(path));

// 이미 재시도했거나 공개 인증 요청이 아니면서 401인 경우에만 토큰 재발급을 시도한다.
export const shouldRefreshAccessToken = ({
  status,
  url,
  alreadyRetried = false,
}: AuthRetryCandidate): boolean => {
  if (alreadyRetried || isPublicAuthRequest(url)) return false;
  return status === 401;
};
