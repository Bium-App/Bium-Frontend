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

export type TwoFactorAction = 'SETUP' | 'SEND' | 'VERIFY';

export interface TwoFactorRequest {
  action: TwoFactorAction;
  phoneNumber?: string;
  code?: string;
}

export type TwoFactorResponse = ApiMutationResponse & Partial<AuthTokens>;

export type LogoutType = 'CURRENT' | 'ALL';

export interface LoginDevice {
  deviceId: EntityId;
  deviceName: string;
  lastLoginAt?: string | null;
}

export type {
  ApiMutationResponse,
  AuthTokens,
  EntityId,
  RefreshAccessTokenResponse,
  SessionResponse,
};
