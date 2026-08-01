import { Platform } from 'react-native';

const COMPILED_API_ENVIRONMENT = '__BLAZE_API_ENVIRONMENT__';
const COMPILED_API_BASE_URL = '__BLAZE_API_BASE_URL__';

const LOCAL_API_BASE_URL = Platform.select({
  android: 'http://10.0.2.2:8080',
  ios: 'http://localhost:8080',
  default: 'http://localhost:8080',
});

export const API_ENVIRONMENT = COMPILED_API_ENVIRONMENT;

export const API_BASE_URL = (
  COMPILED_API_BASE_URL || LOCAL_API_BASE_URL
).replace(/\/+$/, '');

export const API_TIMEOUT_MS = 10_000;
