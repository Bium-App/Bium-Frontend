import type {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';

type TimedRequestConfig = InternalAxiosRequestConfig & {
  __apiRequestStartedAt?: number;
};

const REDACTED = '[REDACTED]';
const REDACTED_URL = '[REDACTED URL]';
const MAX_STRING_LENGTH = 2000;

const secretKeyPattern =
  /^(authorization|password|currentpassword|newpassword|accesstoken|refreshtoken|token|secret)$/i;
const privateUrlKeyPattern = /^(presignedurl)$/i;

const sanitizeUrl = (url?: string): string => {
  if (!url) return '';
  const queryIndex = url.indexOf('?');
  return queryIndex >= 0 ? `${url.slice(0, queryIndex)}?[QUERY REDACTED]` : url;
};

export const sanitizeApiLogValue = (
  value: unknown,
  seen = new WeakSet<object>(),
): unknown => {
  if (typeof value === 'string') {
    return value.length > MAX_STRING_LENGTH
      ? `${value.slice(0, MAX_STRING_LENGTH)}…[TRUNCATED]`
      : value;
  }
  if (value === null || typeof value !== 'object') return value;
  if (seen.has(value)) return '[CIRCULAR]';
  seen.add(value);

  if (typeof Blob !== 'undefined' && value instanceof Blob) {
    return `[Blob ${value.size} bytes${value.type ? `, ${value.type}` : ''}]`;
  }
  if (Array.isArray(value)) {
    return value.map(item => sanitizeApiLogValue(item, seen));
  }

  return Object.fromEntries(
    Object.entries(value).map(([key, item]) => {
      if (secretKeyPattern.test(key)) return [key, REDACTED];
      if (privateUrlKeyPattern.test(key)) return [key, REDACTED_URL];
      return [key, sanitizeApiLogValue(item, seen)];
    }),
  );
};

const stringify = (value: unknown): string => {
  if (value === undefined) return '-';
  try {
    return JSON.stringify(sanitizeApiLogValue(value), null, 2);
  } catch {
    return String(value);
  }
};

const getRequestLabel = (config?: InternalAxiosRequestConfig): string => {
  const method = config?.method?.toUpperCase() ?? 'UNKNOWN';
  const url = config?.url?.startsWith('http')
    ? config.url
    : `${config?.baseURL ?? ''}${config?.url ?? ''}`;
  return `${method} ${sanitizeUrl(url)}`;
};

const getDuration = (config?: InternalAxiosRequestConfig): string => {
  const startedAt = (config as TimedRequestConfig | undefined)
    ?.__apiRequestStartedAt;
  return startedAt ? `${Date.now() - startedAt}ms` : '-';
};

const getSafeHeaderSummary = (
  config: InternalAxiosRequestConfig,
): string => {
  const authorization = config.headers.get?.('Authorization');
  const contentType = config.headers.get?.('Content-Type');
  return (
    `Authorization: ${authorization ? '[PRESENT]' : '[MISSING]'}\n` +
    `Content-Type: ${contentType ?? '[MISSING]'}`
  );
};

export const logApiRequest = (config: InternalAxiosRequestConfig): void => {
  if (!__DEV__) return;
  (config as TimedRequestConfig).__apiRequestStartedAt = Date.now();
  console.log(
    `[API →] ${getRequestLabel(config)}\n` +
      `${getSafeHeaderSummary(config)}\n` +
      `Params: ${stringify(config.params)}\n` +
      `Body: ${stringify(config.data)}`,
  );
};

export const logApiResponse = (response: AxiosResponse): void => {
  if (!__DEV__) return;
  console.log(
    `[API ←] ${response.status} ${getRequestLabel(response.config)} ` +
      `(${getDuration(response.config)})\n` +
      `Response: ${stringify(response.data)}`,
  );
};

export const logApiError = (error: AxiosError): void => {
  if (!__DEV__) return;
  const status = error.response?.status ?? 'NETWORK_ERROR';
  // console.error는 React Native LogBox를 띄울 수 있어 콘솔 전용 로그로 남깁니다.
  console.log(
    `[API ✕] ${status} ${getRequestLabel(error.config)} ` +
      `(${getDuration(error.config)})\n` +
      `Code: ${error.code ?? '-'}\n` +
      `Response: ${stringify(error.response?.data)}\n` +
      `Message: ${error.message}`,
  );
};

export const logFetchRequest = (
  method: string,
  url: string,
  body?: unknown,
): number => {
  const startedAt = Date.now();
  if (__DEV__) {
    console.log(
      `[FETCH →] ${method.toUpperCase()} ${sanitizeUrl(url)}\n` +
        `Body: ${stringify(body)}`,
    );
  }
  return startedAt;
};

export const logFetchResponse = (
  method: string,
  url: string,
  status: number,
  startedAt: number,
): void => {
  if (!__DEV__) return;
  console.log(
    `[FETCH ←] ${status} ${method.toUpperCase()} ${sanitizeUrl(url)} ` +
      `(${Date.now() - startedAt}ms)`,
  );
};

export const logFetchError = (
  method: string,
  url: string,
  error: unknown,
  startedAt: number,
): void => {
  if (!__DEV__) return;
  console.log(
    `[FETCH ✕] NETWORK_ERROR ${method.toUpperCase()} ${sanitizeUrl(url)} ` +
      `(${Date.now() - startedAt}ms)\n` +
      `Message: ${error instanceof Error ? error.message : String(error)}`,
  );
};
