import AsyncStorage from '@react-native-async-storage/async-storage';

const SESSION_KEYS = ['accessToken', 'refreshToken', 'userId', 'deviceId'];

export const storeSession = async ({
  accessToken,
  refreshToken,
  userId,
  deviceId,
}) => {
  const entries = [
    ['accessToken', accessToken],
    ['refreshToken', refreshToken],
    ['userId', String(userId)],
  ];
  if (deviceId !== undefined && deviceId !== null) {
    entries.push(['deviceId', String(deviceId)]);
  }
  await AsyncStorage.setMany(Object.fromEntries(entries));
};

export const updateAccessToken = async accessToken =>
  AsyncStorage.setItem('accessToken', accessToken);

export const updateTokens = async ({ accessToken, refreshToken }) =>
  AsyncStorage.setMany({ accessToken, refreshToken });

export const clearSession = async () => AsyncStorage.removeMany(SESSION_KEYS);

export const getUserId = async () => AsyncStorage.getItem('userId');

export const getRefreshToken = async () => AsyncStorage.getItem('refreshToken');

export const getDeviceId = async () => AsyncStorage.getItem('deviceId');
