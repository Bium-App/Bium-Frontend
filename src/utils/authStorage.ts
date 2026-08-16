import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Keychain from 'react-native-keychain';
import type {SetOptions} from 'react-native-keychain';
import type {AuthTokens, SessionResponse} from '../types/api';

const SESSION_KEYS = ['accessToken', 'userId', 'deviceId'];
const LEGACY_REFRESH_TOKEN_KEY = 'refreshToken';
const REFRESH_TOKEN_SERVICE = 'com.blazememo.auth.refresh-token';
const REFRESH_TOKEN_ACCOUNT = 'refresh-token';

const refreshTokenOptions: SetOptions = {
  service: REFRESH_TOKEN_SERVICE,
  accessible: Keychain.ACCESSIBLE.AFTER_FIRST_UNLOCK_THIS_DEVICE_ONLY,
  securityLevel: Keychain.SECURITY_LEVEL.SECURE_SOFTWARE,
};

const saveRefreshToken = async (refreshToken: string): Promise<void> => {
  if (!refreshToken) {
    throw new Error('저장할 리프레시 토큰이 없습니다.');
  }

  const result = await Keychain.setGenericPassword(
    REFRESH_TOKEN_ACCOUNT,
    refreshToken,
    refreshTokenOptions,
  );
  if (!result) throw new Error('리프레시 토큰 보안 저장에 실패했습니다.');

  await AsyncStorage.removeItem(LEGACY_REFRESH_TOKEN_KEY);
};

export const storeSession = async ({
  accessToken,
  refreshToken,
  userId,
  deviceId,
}: SessionResponse): Promise<void> => {
  const entries: Record<string, string> = {
    accessToken,
    userId: String(userId),
  };
  if (deviceId !== undefined && deviceId !== null) {
    entries.deviceId = String(deviceId);
  }
  await AsyncStorage.setMany(entries);
  try {
    await saveRefreshToken(refreshToken);
  } catch (error) {
    await Promise.all([
      AsyncStorage.removeMany(SESSION_KEYS).catch(() => undefined),
      Keychain.resetGenericPassword({
        service: REFRESH_TOKEN_SERVICE,
      }).catch(() => undefined),
    ]);
    throw error;
  }
};

export const updateAccessToken = (accessToken: string): Promise<void> =>
  AsyncStorage.setItem('accessToken', accessToken);

export const updateRefreshToken = saveRefreshToken;

export const updateSessionIdentity = async (
  userId: SessionResponse['userId'],
  deviceId: SessionResponse['deviceId'],
): Promise<void> => {
  await AsyncStorage.setMany({
    userId: String(userId),
    deviceId: String(deviceId),
  });
};

export const updateTokens = async ({
  accessToken,
  refreshToken,
}: AuthTokens): Promise<void> => {
  await AsyncStorage.setItem('accessToken', accessToken);
  try {
    await saveRefreshToken(refreshToken);
  } catch (error) {
    await clearSession().catch(() => undefined);
    throw error;
  }
};

export const clearSession = async (): Promise<void> => {
  await Promise.all([
    AsyncStorage.removeMany(SESSION_KEYS),
    AsyncStorage.removeItem(LEGACY_REFRESH_TOKEN_KEY),
    Keychain.resetGenericPassword({service: REFRESH_TOKEN_SERVICE}),
  ]);
};

export const getAccessToken = (): Promise<string | null> =>
  AsyncStorage.getItem('accessToken');

export const getUserId = (): Promise<string | null> =>
  AsyncStorage.getItem('userId');

export const getRefreshToken = async (): Promise<string | null> => {
  const credentials = await Keychain.getGenericPassword({
    service: REFRESH_TOKEN_SERVICE,
  });
  if (credentials) return credentials.password;

  const legacyRefreshToken = await AsyncStorage.getItem(
    LEGACY_REFRESH_TOKEN_KEY,
  );
  if (!legacyRefreshToken) return null;

  await saveRefreshToken(legacyRefreshToken);
  return legacyRefreshToken;
};

export const getDeviceId = (): Promise<string | null> =>
  AsyncStorage.getItem('deviceId');
