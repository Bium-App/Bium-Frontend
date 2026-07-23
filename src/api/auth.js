import apiClient from './client';

export const signUpApi = async ({
  loginId,
  password,
  nickname,
  provider = 'LOCAL',
}) => {
  const response = await apiClient.post('/api/auth/signup', {
    loginId,
    password,
    nickname,
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

export const findAccountApi = async ({ type, email }) => {
  const response = await apiClient.post('/api/auth/find', { type, email });
  return response.data;
};

export const findLoginIdApi = email => findAccountApi({ type: 'ID', email });

export const findPasswordApi = email => findAccountApi({ type: 'PW', email });

export const verifyPasswordApi = async password => {
  const response = await apiClient.post('/api/auth/verify-password', {
    password,
  });
  return response.data;
};

export const twoFactorApi = async ({ action, phoneNumber, code }) => {
  const response = await apiClient.post('/api/auth/2fa', {
    action,
    phoneNumber,
    code,
  });
  return response.data;
};

export const logoutApi = async (type = 'CURRENT') => {
  const response = await apiClient.post('/api/auth/logout', null, {
    params: { type },
  });
  return response.data;
};

export const logoutDeviceApi = async deviceId => {
  const response = await apiClient.delete(`/api/auth/devices/${deviceId}`);
  return response.data;
};
