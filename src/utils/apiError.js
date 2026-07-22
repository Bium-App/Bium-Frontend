const NETWORK_ERROR_CODES = new Set([
  'ERR_NETWORK',
  'ECONNABORTED',
  'ETIMEDOUT',
]);

export const getApiErrorMessage = (error, fallback) => {
  const data = error?.response?.data;
  const fieldErrors = data?.fieldErrors;
  if (fieldErrors && typeof fieldErrors === 'object') {
    const firstFieldMessage = Object.values(fieldErrors).find(Boolean);
    if (Array.isArray(firstFieldMessage)) return firstFieldMessage[0] ?? fallback;
    if (firstFieldMessage) return String(firstFieldMessage);
  }
  if (data?.message) return data.message;
  if (NETWORK_ERROR_CODES.has(error?.code) || !error?.response) {
    return '서버에 연결할 수 없습니다. 네트워크와 서버 주소를 확인해주세요.';
  }
  return fallback;
};
