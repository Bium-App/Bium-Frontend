// 서버 응답에서 id가 숫자 또는 문자열로 섞여 내려와 둘 다 허용한다.
export type EntityId = number | string;

export interface ApiErrorBody {
  code?: string;
  message: string;
  fieldErrors?: Record<string, string | string[]> | null;
}

// 엔드포인트마다 응답에 실리는 필드가 달라 message 외 나머지는 unknown으로 열어둔다.
export type ApiMutationResponse = {
  message?: string;
} & Record<string, unknown>;

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface SessionResponse extends AuthTokens {
  userId: EntityId;
  deviceId: EntityId;
}

export type RefreshAccessTokenResponse = SessionResponse;
