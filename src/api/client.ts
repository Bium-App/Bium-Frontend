import axios, {
  type AxiosError,
  type InternalAxiosRequestConfig,
} from 'axios';
import {Alert} from 'react-native';
import {API_BASE_URL, API_TIMEOUT_MS} from '../config/api';
import {resetToLogin} from '../navigation/navigationRef';
import {
  clearSession,
  getAccessToken,
  getRefreshToken,
  updateAccessToken,
  updateRefreshToken,
  updateSessionIdentity,
} from '../utils/authStorage';
import type {RefreshAccessTokenResponse} from '../types/api';
import {
  logApiError,
  logApiRequest,
  logApiResponse,
} from '../utils/apiLogger';
import {shouldRefreshAccessToken} from '../utils/authRetry';

type RetryableRequestConfig = InternalAxiosRequestConfig & {
  _retry?: boolean;
};

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: API_TIMEOUT_MS,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 여러 요청이 동시에 401을 받아도 토큰 재발급은 한 번만 진행하도록 진행 중인 요청을 공유한다.
let refreshRequest: Promise<string> | null = null;
// 재발급 실패로 인한 만료 알림을 세션당 한 번만 띄우기 위한 플래그.
let didShowSessionExpiredAlert = false;

const refreshAccessToken = async (): Promise<string> => {
  const refreshToken = await getRefreshToken();
  if (!refreshToken) throw new Error('저장된 리프레시 토큰이 없습니다.');

  const response = await axios.post<RefreshAccessTokenResponse>(
    `${API_BASE_URL}/api/auth/refresh`,
    {refreshToken},
    {
      timeout: API_TIMEOUT_MS,
      headers: {'Content-Type': 'application/json'},
    },
  );

  const {
    accessToken,
    refreshToken: rotatedRefreshToken,
    userId,
    deviceId,
  } = response.data;
  await updateAccessToken(accessToken);
  await updateRefreshToken(rotatedRefreshToken);
  await updateSessionIdentity(userId, deviceId);
  return accessToken;
};

const getRefreshedAccessToken = (): Promise<string> => {
  if (!refreshRequest) {
    refreshRequest = refreshAccessToken().finally(() => {
      refreshRequest = null;
    });
  }
  return refreshRequest;
};

apiClient.interceptors.request.use(async config => {
  const accessToken = await getAccessToken();
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  logApiRequest(config);
  return config;
});

apiClient.interceptors.response.use(
  response => {
    logApiResponse(response);
    if (
      response.config.url?.startsWith('/api/auth/login') ||
      response.config.url?.startsWith('/api/auth/social-login')
    ) {
      didShowSessionExpiredAlert = false;
    }
    return response;
  },
  async (error: AxiosError) => {
    const originalRequest = error.config as RetryableRequestConfig | undefined;
    if (
      !originalRequest ||
      !shouldRefreshAccessToken({
        status: error.response?.status,
        url: originalRequest.url,
        alreadyRetried: originalRequest._retry,
      })
    ) {
      logApiError(error);
      return Promise.reject(error);
    }

    // 401 응답을 받으면 토큰을 재발급받아 원래 요청을 한 번 더 시도한다.
    originalRequest._retry = true;
    try {
      const accessToken = await getRefreshedAccessToken();
      originalRequest.headers.Authorization = `Bearer ${accessToken}`;
      didShowSessionExpiredAlert = false;
      return apiClient(originalRequest);
    } catch (refreshError) {
      // 재발급마저 실패하면 세션을 정리하고 로그인 화면으로 돌려보낸다.
      if (refreshError && typeof refreshError === 'object') {
        logApiError(refreshError as AxiosError);
      }
      await clearSession().catch(() => undefined);
      resetToLogin();
      if (!didShowSessionExpiredAlert) {
        didShowSessionExpiredAlert = true;
        Alert.alert(
          '인증 만료',
          '로그인이 만료되었습니다. 다시 로그인해주세요.',
        );
      }
      return Promise.reject(refreshError);
    }
  },
);

export default apiClient;
