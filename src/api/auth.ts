import apiClient from './client';
import {parseLoginId, parseRootArray} from '../utils/apiResponse';
import type {
  ApiMutationResponse,
  EntityId,
  FindAccountRequest,
  FindLoginIdResponse,
  LoginDevice,
  LoginRequest,
  LogoutType,
  SessionResponse,
  SignUpRequest,
  TwoFactorRequest,
  TwoFactorResponse,
  VerifyPasswordResponse,
} from '../types/auth';

export const signUpApi = async ({
  loginId,
  password,
  name,
  nickname,
  email,
  phoneNumber,
  provider = 'LOCAL',
}: SignUpRequest): Promise<ApiMutationResponse> => {
  const response = await apiClient.post<ApiMutationResponse>(
    '/api/auth/signup',
    {
      loginId,
      password,
      name,
      nickname,
      email,
      phoneNumber,
      provider,
    },
  );
  return response.data;
};

export const loginApi = async ({
  loginId,
  password,
  deviceName,
}: LoginRequest): Promise<SessionResponse> => {
  const response = await apiClient.post<SessionResponse>('/api/auth/login', {
    loginId,
    password,
    deviceName,
  });
  return response.data;
};

export const findAccountApi = async ({
  type,
  email,
}: FindAccountRequest): Promise<FindLoginIdResponse | ApiMutationResponse> => {
  const response = await apiClient.post<
    FindLoginIdResponse | ApiMutationResponse
  >('/api/auth/find', {type, email});
  return response.data;
};

export const findLoginIdApi = async (
  email: string,
): Promise<FindLoginIdResponse> => {
  const data = await findAccountApi({type: 'ID', email});
  return {...data, loginId: parseLoginId(data)};
};

export const findPasswordApi = (email: string) =>
  findAccountApi({type: 'PW', email});

export const verifyPasswordApi = async (
  password: string,
): Promise<VerifyPasswordResponse> => {
  const response = await apiClient.post<VerifyPasswordResponse>(
    '/api/auth/verify-password',
    {password},
  );
  return response.data;
};

export const twoFactorApi = async ({
  action,
  phoneNumber,
  code,
}: TwoFactorRequest): Promise<TwoFactorResponse> => {
  const response = await apiClient.post<TwoFactorResponse>('/api/auth/2fa', {
    action,
    phoneNumber,
    code,
  });
  return response.data;
};

export const logoutApi = async (
  type: LogoutType = 'CURRENT',
): Promise<ApiMutationResponse> => {
  const response = await apiClient.post<ApiMutationResponse>(
    '/api/auth/logout',
    null,
    {params: {type}},
  );
  return response.data;
};

export const getDevicesApi = async (): Promise<LoginDevice[]> => {
  const response = await apiClient.get<unknown>('/api/auth/devices');
  return parseRootArray<LoginDevice>(response.data, '로그인 기기 목록');
};

export const logoutDeviceApi = async (
  deviceId: EntityId,
): Promise<ApiMutationResponse> => {
  const response = await apiClient.delete<ApiMutationResponse>(
    `/api/auth/devices/${deviceId}`,
  );
  return response.data;
};
