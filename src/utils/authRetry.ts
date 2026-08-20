interface AuthRetryCandidate {
  status?: number;
  url?: string;
  alreadyRetried?: boolean;
}

const PUBLIC_AUTH_PATHS = [
  '/api/auth/login',
  '/api/auth/social-login',
  '/api/auth/signup',
  '/api/auth/find',
  '/api/auth/refresh',
];

const isPublicAuthRequest = (url?: string): boolean =>
  PUBLIC_AUTH_PATHS.some(path => url?.startsWith(path));

export const shouldRefreshAccessToken = ({
  status,
  url,
  alreadyRetried = false,
}: AuthRetryCandidate): boolean => {
  if (alreadyRetried || isPublicAuthRequest(url)) return false;
  return status === 401;
};
