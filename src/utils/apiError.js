const NETWORK_ERROR_CODES = new Set([
  'ERR_NETWORK',
  'ECONNABORTED',
  'ETIMEDOUT',
]);

const STATUS_ERROR_MESSAGES = {
  400: '입력한 내용을 확인해주세요.',
  401: '인증 정보가 없거나 만료되었습니다. 다시 로그인해주세요.',
  403: '이 작업을 수행할 권한이 없습니다.',
  404: '요청한 정보를 찾을 수 없습니다.',
  409: '중복된 요청이거나 현재 상태와 충돌합니다.',
  500: '서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.',
};

export const getApiErrorMessage = (error, fallback) => {
  const data = error?.response?.data;
  const fieldErrors = data?.fieldErrors;
  if (fieldErrors && typeof fieldErrors === 'object') {
    const firstFieldMessage = Object.values(fieldErrors).find(Boolean);
    if (Array.isArray(firstFieldMessage))
      return firstFieldMessage[0] ?? fallback;
    if (firstFieldMessage) return String(firstFieldMessage);
  }
  if (data?.message) return data.message;
  if (NETWORK_ERROR_CODES.has(error?.code) || !error?.response) {
    return '서버에 연결할 수 없습니다. 네트워크와 서버 주소를 확인해주세요.';
  }
  const statusMessage = STATUS_ERROR_MESSAGES[error.response.status];
  if (statusMessage) return statusMessage;
  return fallback;
};
