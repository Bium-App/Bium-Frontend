import {useCallback, useRef, useState} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import {getUserSettingsApi, updateUserSettingsApi} from '../api/users';
import {getUserId} from '../utils/authStorage';
import {
  DEFAULT_USER_SETTINGS,
  getStoredUserSettings,
  normalizeUserSettings,
  storeUserSettings,
} from '../utils/userSettingsStorage';
import type {UserSettings} from '../types/user';

export const useUserSettings = () => {
  const [settings, setSettings] = useState<UserSettings>(
    DEFAULT_USER_SETTINGS,
  );
  const [isLoading, setIsLoading] = useState(false);
  const settingsRef = useRef<UserSettings>(DEFAULT_USER_SETTINGS);

  const loadSettings = useCallback(async (): Promise<void> => {
    setIsLoading(true);
    try {
      const userId = await getUserId();
      const stored = await getStoredUserSettings();
      const loaded: UserSettings = userId
        ? normalizeUserSettings({
            ...(await getUserSettingsApi()),
            language: stored.language,
          })
        : stored;
      settingsRef.current = loaded;
      setSettings(loaded);
      await storeUserSettings(loaded);
    } catch {
      const stored = await getStoredUserSettings();
      settingsRef.current = stored;
      setSettings(stored);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadSettings();
    }, [loadSettings]),
  );

  const saveSettings = async (
    patch: Partial<UserSettings>,
    options: {rollbackOnError?: boolean} = {},
  ): Promise<UserSettings> => {
    const previous = settingsRef.current;
    const next = {...previous, ...patch};
    settingsRef.current = next;
    setSettings(next);
    setIsLoading(true);

    try {
      const userId = await getUserId();
      if (!userId) throw new Error('사용자 정보를 찾을 수 없습니다.');
      await updateUserSettingsApi(patch);
      await storeUserSettings(next);
      return next;
    } catch (error) {
      if (options.rollbackOnError !== false) {
        settingsRef.current = previous;
        setSettings(previous);
      } else {
        await storeUserSettings(next);
      }
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return {settings, isLoading, saveSettings};
};
