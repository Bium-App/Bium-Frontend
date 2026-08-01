export type EntityId = number | string;

export interface ApiErrorBody {
  code?: string;
  message: string;
  fieldErrors?: Record<string, string>;
}

export type ApiMutationResponse = {
  message?: string;
} & Record<string, unknown>;

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface SessionResponse extends AuthTokens {
  userId: EntityId;
  deviceId?: EntityId;
}
