export const parseRootArray = <T>(
  data: unknown,
  resourceName = '목록',
): T[] => {
  if (Array.isArray(data)) return data as T[];
  if (data === null || data === undefined || data === '') return [];
  throw new Error(`${resourceName} 응답 형식이 올바르지 않습니다.`);
};

const LOGIN_ID_PATTERN = /^\S{2,64}$/u;

export const parseLoginId = (data: unknown): string => {
  if (!data || typeof data !== 'object') {
    throw new Error('아이디 찾기 응답 형식이 올바르지 않습니다.');
  }

  const loginId = (data as {loginId?: unknown}).loginId;
  if (
    typeof loginId !== 'string' ||
    !loginId.trim() ||
    !LOGIN_ID_PATTERN.test(loginId)
  ) {
    throw new Error('서버에서 실제 로그인 아이디를 반환하지 않았습니다.');
  }

  return loginId;
};
