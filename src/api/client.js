import axios from 'axios';
import { Alert } from 'react-native';
import { API_BASE_URL, API_TIMEOUT_MS } from '../config/api';
import { resetToLogin } from '../navigation/navigationRef';
import {
  clearSession,
  getAccessToken,
  getRefreshToken,
  updateAccessToken,
  updateRefreshToken,
} from '../utils/authStorage';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: API_TIMEOUT_MS,
  headers: {
    'Content-Type': 'application/json',
  },
});

let refreshRequest = null;
let didShowSessionExpiredAlert = false;

const isPublicAuthRequest = url =>
  [
    '/api/auth/login',
    '/api/auth/signup',
    '/api/auth/find-id',
    '/api/auth/code',
    '/api/auth/verify',
    '/api/auth/reset-password',
    '/api/auth/refresh',
  ].some(path => url?.startsWith(path));

const refreshAccessToken = async () => {
  const refreshToken = await getRefreshToken();
  if (!refreshToken) throw new Error('저장된 리프레시 토큰이 없습니다.');

  const response = await axios.post(
    `${API_BASE_URL}/api/auth/refresh`,
    { refreshToken },
    {
      timeout: API_TIMEOUT_MS,
      headers: { 'Content-Type': 'application/json' },
    },
  );

  const { accessToken, refreshToken: rotatedRefreshToken } = response.data;
  await updateAccessToken(accessToken);
  if (rotatedRefreshToken) await updateRefreshToken(rotatedRefreshToken);
  return accessToken;
};

const getRefreshedAccessToken = () => {
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
    config.headers = config.headers ?? {};
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

apiClient.interceptors.response.use(
  response => {
    if (response.config.url?.startsWith('/api/auth/login')) {
      didShowSessionExpiredAlert = false;
    }
    return response;
  },
  async error => {
    const originalRequest = error.config;
    const canRefresh =
      error.response?.status === 401 &&
      originalRequest &&
      !originalRequest._retry &&
      !isPublicAuthRequest(originalRequest.url);

    if (!canRefresh) return Promise.reject(error);

    originalRequest._retry = true;
    try {
      const accessToken = await getRefreshedAccessToken();
      originalRequest.headers = originalRequest.headers ?? {};
      originalRequest.headers.Authorization = `Bearer ${accessToken}`;
      didShowSessionExpiredAlert = false;
      return apiClient(originalRequest);
    } catch (refreshError) {
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
