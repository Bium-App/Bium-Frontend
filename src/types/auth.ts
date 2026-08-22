import type {
  ApiMutationResponse,
  AuthTokens,
  EntityId,
  RefreshAccessTokenResponse,
  SessionResponse,
} from './api';

export interface SignUpRequest {
  loginId: string;
  password: string;
  name: string;
  nickname: string;
  email: string;
  phoneNumber: string;
  provider?: 'LOCAL' | string;
}

export interface SignUpResponse {
  userId: EntityId;
}

export interface LoginRequest {
  loginId: string;
  password: string;
  deviceName: string;
}

export interface FindAccountRequest {
  type: 'ID' | 'PW';
  email: string;
}

export interface FindLoginIdResponse extends ApiMutationResponse {
  loginId: string;
}

export interface VerifyPasswordResponse extends ApiMutationResponse {
  isMatched: boolean;
}

// SETUP: 2단계 인증 등록, SEND: 인증코드 발송, VERIFY: 인증코드 확인.
export type TwoFactorAction = 'SETUP' | 'SEND' | 'VERIFY';
export type TwoFactorMethod = 'PHONE' | 'EMAIL';

export interface TwoFactorRequest {
  action: TwoFactorAction;
  method: TwoFactorMethod;
  phoneNumber?: string;
  email?: string;
  code?: string;
}

export type TwoFactorResponse = ApiMutationResponse & Partial<AuthTokens>;

// CURRENT: 현재 기기만 로그아웃, ALL: 로그인된 모든 기기 로그아웃.
export type LogoutType = 'CURRENT' | 'ALL';

export type SocialProvider = 'GOOGLE';

export interface SocialLoginRequest {
  provider: SocialProvider;
  // Google 계정을 구분하기 위한 외부 사용자 식별값이다.
  providerId: string;
  idToken: string;
  email: string;
  name: string;
  profileImageUrl?: string;
  deviceName: string;
}

export interface SocialLoginResponse extends SessionResponse {
  isNewUser: boolean;
}

export interface LoginDevice {
  deviceId: EntityId;
  deviceName: string;
  lastLoginAt: string | null;
}

export type {
  ApiMutationResponse,
  AuthTokens,
  EntityId,
  RefreshAccessTokenResponse,
  SessionResponse,
};
