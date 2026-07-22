import apiClient from './client';

export const signUpApi = async ({
  loginId,
  password,
  name,
  nickname,
  email,
  phoneNumber = null,
  provider = 'LOCAL',
}) => {
  const response = await apiClient.post('/api/auth/signup', {
    loginId,
    password,
    name,
    nickname,
    email,
    phoneNumber,
    provider,
  });
  return response.data;
};

export const loginApi = async ({ loginId, password, deviceName }) => {
  const response = await apiClient.post('/api/auth/login', {
    loginId,
    password,
    deviceName,
  });
  return response.data;
};

export const refreshAccessTokenApi = async refreshToken => {
  const response = await apiClient.post('/api/auth/refresh', { refreshToken });
  return response.data;
};

export const findLoginIdApi = async ({ name, email }) => {
  const response = await apiClient.post('/api/auth/find-id', { name, email });
  return response.data;
};

export const sendAuthCodeApi = async ({ email, phone = null }) => {
  const response = await apiClient.post('/api/auth/code', { email, phone });
  return response.data;
};

export const verifyAuthCodeApi = async ({ email, code }) => {
  const response = await apiClient.post('/api/auth/verify', { email, code });
  return response.data;
};

export const resetPasswordApi = async ({ loginId, newPassword }) => {
  const response = await apiClient.post('/api/auth/reset-password', {
    loginId,
    newPassword,
  });
  return response.data;
};

export const verifyPasswordApi = async ({ userId, password }) => {
  const response = await apiClient.post('/api/auth/verify-password', {
    userId: Number(userId),
    password,
  });
  return response.data;
};

export const setupTwoFactorApi = async ({ userId, phoneNumber }) => {
  const response = await apiClient.post('/api/auth/2fa/setup', {
    userId: Number(userId),
    phoneNumber,
  });
  return response.data;
};

export const verifyTwoFactorApi = async ({ userId, code }) => {
  const response = await apiClient.post('/api/auth/2fa/verify', {
    userId: Number(userId),
    code,
  });
  return response.data;
};

export const getLoginDevicesApi = async userId => {
  const response = await apiClient.get(`/api/users/${userId}/devices`);
  return response.data;
};

export const logoutDeviceApi = async deviceId => {
  const response = await apiClient.post(`/api/auth/logout/device/${deviceId}`);
  return response.data;
};

export const logoutAllDevicesApi = async () => {
  const response = await apiClient.post('/api/auth/logout-all');
  return response.data;
};
