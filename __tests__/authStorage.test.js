jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  setMany: jest.fn(),
  removeMany: jest.fn(),
}));

import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Keychain from 'react-native-keychain';
import {
  clearSession,
  getRefreshToken,
  storeSession,
  updateTokens,
} from '../src/utils/authStorage';

const keychainOptions = {
  service: 'com.blazememo.auth.refresh-token',
};

describe('authStorage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    AsyncStorage.getItem.mockResolvedValue(null);
    AsyncStorage.setItem.mockResolvedValue(undefined);
    AsyncStorage.removeItem.mockResolvedValue(undefined);
    AsyncStorage.setMany.mockResolvedValue(undefined);
    AsyncStorage.removeMany.mockResolvedValue(undefined);
    Keychain.setGenericPassword.mockResolvedValue({
      service: keychainOptions.service,
      storage: 'MOCK_SECURE_STORAGE',
    });
    Keychain.getGenericPassword.mockResolvedValue(false);
    Keychain.resetGenericPassword.mockResolvedValue(true);
  });

  it('로그인 세션에서 Refresh Token만 Keychain에 저장한다', async () => {
    await storeSession({
      accessToken: 'access-token',
      refreshToken: 'refresh-token',
      userId: 1,
      deviceId: 2,
    });

    expect(AsyncStorage.setMany).toHaveBeenCalledWith({
      accessToken: 'access-token',
      userId: '1',
      deviceId: '2',
    });
    expect(Keychain.setGenericPassword).toHaveBeenCalledWith(
      'refresh-token',
      'refresh-token',
      expect.objectContaining(keychainOptions),
    );
    expect(AsyncStorage.removeItem).toHaveBeenCalledWith('refreshToken');
  });

  it('Keychain에 저장된 Refresh Token을 조회한다', async () => {
    Keychain.getGenericPassword.mockResolvedValue({
      username: 'refresh-token',
      password: 'secure-refresh-token',
      service: keychainOptions.service,
      storage: 'MOCK_SECURE_STORAGE',
    });

    await expect(getRefreshToken()).resolves.toBe('secure-refresh-token');
    expect(AsyncStorage.getItem).not.toHaveBeenCalled();
  });

  it('기존 AsyncStorage 토큰을 최초 조회 시 Keychain으로 이전한다', async () => {
    AsyncStorage.getItem.mockResolvedValue('legacy-refresh-token');

    await expect(getRefreshToken()).resolves.toBe('legacy-refresh-token');
    expect(Keychain.setGenericPassword).toHaveBeenCalledWith(
      'refresh-token',
      'legacy-refresh-token',
      expect.objectContaining(keychainOptions),
    );
    expect(AsyncStorage.removeItem).toHaveBeenCalledWith('refreshToken');
  });

  it('2FA 토큰 교체 시 Access Token과 Refresh Token 저장소를 분리한다', async () => {
    await updateTokens({
      accessToken: 'next-access-token',
      refreshToken: 'next-refresh-token',
    });

    expect(AsyncStorage.setItem).toHaveBeenCalledWith(
      'accessToken',
      'next-access-token',
    );
    expect(Keychain.setGenericPassword).toHaveBeenCalledWith(
      'refresh-token',
      'next-refresh-token',
      expect.objectContaining(keychainOptions),
    );
  });

  it('세션 삭제 시 일반 세션과 보안 토큰을 모두 제거한다', async () => {
    await clearSession();

    expect(AsyncStorage.removeMany).toHaveBeenCalledWith([
      'accessToken',
      'userId',
      'deviceId',
    ]);
    expect(AsyncStorage.removeItem).toHaveBeenCalledWith('refreshToken');
    expect(Keychain.resetGenericPassword).toHaveBeenCalledWith(keychainOptions);
  });
});
