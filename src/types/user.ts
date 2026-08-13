import type {ApiMutationResponse, EntityId} from './api';

export interface User {
  userId: EntityId;
  loginId?: string;
  name: string;
  nickname: string;
  email: string;
  phoneNumber: string;
  profileImageUrl: string | null;
  provider?: string;
}

export interface UpdateUserRequest {
  name: string;
  nickname: string;
  email: string;
  phoneNumber: string;
  profileImageUrl: string | null;
}

export interface UserSettings {
  timezone: string;
  dateFormat: string;
  language: string;
  use2fa: boolean;
  allowPush: boolean;
  allowEvent: boolean;
}

export type UserMutationResponse = ApiMutationResponse & Partial<User>;
