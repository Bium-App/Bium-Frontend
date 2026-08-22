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
      // 언어 설정은 서버가 아닌 기기(로컬)에 저장된 값을 기준으로 삼는다.
      // 로그인 상태라면 나머지 설정은 서버 값으로, 비로그인 상태라면
      // 로컬에 저장된 값을 그대로 사용한다.
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

  // 화면 반응성을 위해 서버 응답을 기다리지 않고 먼저 상태를 변경한 뒤
  // (낙관적 업데이트), 저장에 실패하면 기본적으로 이전 값으로 되돌린다.
  // rollbackOnError를 false로 넘기면 실패하더라도 변경값을 로컬에는
  // 그대로 남겨둔다(예: 서버 연동이 없는 로컬 전용 설정 처리용).
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
