import AsyncStorage from '@react-native-async-storage/async-storage';
import type {UserSettings} from '../types/user';

const USER_SETTINGS_KEY = '@user_settings';

export const DEFAULT_USER_SETTINGS: UserSettings = {
  timezone: 'Asia/Seoul',
  dateFormat: 'YYYY-MM-DD',
  language: 'ko-KR',
  use2fa: false,
  allowPush: true,
  allowEvent: true,
};

const isRecord = (value: unknown): value is Record<string, unknown> =>
  Boolean(value) && typeof value === 'object' && !Array.isArray(value);

export const getStoredUserSettings = async (): Promise<UserSettings> => {
  const stored = await AsyncStorage.getItem(USER_SETTINGS_KEY);
  if (!stored) {
    const legacy = await AsyncStorage.getMany([
      'userLanguage',
      'userTimezone',
      'userFormatType',
      'notiEvent',
      'notiPush',
    ]);
    const timezoneMap: Record<string, string> = {
      '(GMT +09:00)서울': 'Asia/Seoul',
      '(GMT -05:00)뉴욕': 'America/New_York',
      '(GMT +00:00)런던': 'Europe/London',
    };

    return {
      ...DEFAULT_USER_SETTINGS,
      language:
        legacy.userLanguage === 'ko'
          ? 'ko-KR'
          : legacy.userLanguage === 'en'
          ? 'en-US'
          : legacy.userLanguage ?? DEFAULT_USER_SETTINGS.language,
      timezone:
        (legacy.userTimezone
          ? timezoneMap[legacy.userTimezone]
          : undefined) ?? DEFAULT_USER_SETTINGS.timezone,
      dateFormat:
        legacy.userFormatType ?? DEFAULT_USER_SETTINGS.dateFormat,
      allowEvent:
        legacy.notiEvent === null
          ? DEFAULT_USER_SETTINGS.allowEvent
          : legacy.notiEvent !== 'false',
      allowPush:
        legacy.notiPush === null
          ? DEFAULT_USER_SETTINGS.allowPush
          : legacy.notiPush !== 'false',
    };
  }

  try {
    const parsed: unknown = JSON.parse(stored);
    return isRecord(parsed)
      ? {...DEFAULT_USER_SETTINGS, ...parsed}
      : DEFAULT_USER_SETTINGS;
  } catch {
    return DEFAULT_USER_SETTINGS;
  }
};

export const storeUserSettings = async (
  settings: UserSettings,
): Promise<void> => {
  await AsyncStorage.setItem(
    USER_SETTINGS_KEY,
    JSON.stringify({...DEFAULT_USER_SETTINGS, ...settings}),
  );
};
