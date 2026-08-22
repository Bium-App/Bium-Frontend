import apiClient from './client';
import {parseLoginId, parseRootArray} from '../utils/apiResponse';
import {getRefreshToken} from '../utils/authStorage';
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
  SignUpResponse,
  SocialLoginRequest,
  SocialLoginResponse,
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
}: SignUpRequest): Promise<SignUpResponse> => {
  const response = await apiClient.post<SignUpResponse>(
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

// Google 등 소셜 로그인으로 받은 사용자 정보를 전달해 Bium 서비스 자체 세션을 발급받는다.
export const socialLoginApi = async (
  request: SocialLoginRequest,
): Promise<SocialLoginResponse> => {
  const response = await apiClient.post<SocialLoginResponse>(
    '/api/auth/social-login',
    request,
  );
  return response.data;
};

// type이 'ID'면 로그인 아이디를, 'PW'면 비밀번호 재설정 절차를 이메일로 안내한다.
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
  method,
  phoneNumber,
  email,
  code,
}: TwoFactorRequest): Promise<TwoFactorResponse> => {
  const response = await apiClient.post<TwoFactorResponse>('/api/auth/2fa', {
    action,
    method,
    ...(phoneNumber ? {phoneNumber} : {}),
    ...(email ? {email} : {}),
    ...(code ? {code} : {}),
  });
  return response.data;
};

// CURRENT는 현재 기기의 리프레시 토큰만 무효화하고, ALL은 모든 기기의 세션을 로그아웃시킨다.
export const logoutApi = async (
  type: LogoutType = 'CURRENT',
): Promise<ApiMutationResponse> => {
  const body =
    type === 'CURRENT'
      ? {refreshToken: await getRefreshToken()}
      : null;
  const response = await apiClient.post<ApiMutationResponse>(
    '/api/auth/logout',
    body,
    {
      params: {type},
    },
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
