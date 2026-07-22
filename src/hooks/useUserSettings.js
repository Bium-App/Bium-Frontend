import { useCallback, useRef, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { getUserSettingsApi, updateUserSettingsApi } from '../api/users';
import { getUserId } from '../utils/authStorage';
import {
  DEFAULT_USER_SETTINGS,
  getStoredUserSettings,
  storeUserSettings,
} from '../utils/userSettingsStorage';

export const useUserSettings = () => {
  const [settings, setSettings] = useState(DEFAULT_USER_SETTINGS);
  const [isLoading, setIsLoading] = useState(false);
  const settingsRef = useRef(DEFAULT_USER_SETTINGS);

  const loadSettings = useCallback(async () => {
    setIsLoading(true);
    try {
      const userId = await getUserId();
      const loaded = userId
        ? { ...DEFAULT_USER_SETTINGS, ...(await getUserSettingsApi(userId)) }
        : await getStoredUserSettings();
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

  const saveSettings = async patch => {
    const previous = settingsRef.current;
    const next = { ...previous, ...patch };
    settingsRef.current = next;
    setSettings(next);
    setIsLoading(true);

    try {
      const userId = await getUserId();
      if (!userId) throw new Error('사용자 정보를 찾을 수 없습니다.');
      await updateUserSettingsApi(userId, next);
      await storeUserSettings(next);
      return next;
    } catch (error) {
      settingsRef.current = previous;
      setSettings(previous);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return { settings, isLoading, saveSettings };
};
