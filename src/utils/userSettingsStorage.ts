import AsyncStorage from '@react-native-async-storage/async-storage';
import type {UserSettings} from '../types/user';

const USER_SETTINGS_KEY = '@user_settings';

export const DEFAULT_USER_SETTINGS: UserSettings = {
  timezone: 'Asia/Seoul',
  dateFormat: 'YYYY-MM-DD',
  language: 'ko-KR',
  use2fa: false,
  twoFactorMethod: 'PHONE',
  twoFactorDestination: '',
  allowPush: true,
  allowEvent: true,
};

const isRecord = (value: unknown): value is Record<string, unknown> =>
  Boolean(value) && typeof value === 'object' && !Array.isArray(value);

const getString = (value: unknown, fallback: string): string =>
  typeof value === 'string' && value.trim().length > 0 ? value : fallback;

const getBoolean = (value: unknown, fallback: boolean): boolean =>
  typeof value === 'boolean' ? value : fallback;

export const normalizeUserSettings = (value: unknown): UserSettings => {
  if (!isRecord(value)) return DEFAULT_USER_SETTINGS;

  return {
    language: getString(value.language, DEFAULT_USER_SETTINGS.language),
    timezone: getString(value.timezone, DEFAULT_USER_SETTINGS.timezone),
    dateFormat: getString(value.dateFormat, DEFAULT_USER_SETTINGS.dateFormat),
    use2fa: getBoolean(value.use2fa, DEFAULT_USER_SETTINGS.use2fa),
    twoFactorMethod:
      value.twoFactorMethod === 'EMAIL' ? 'EMAIL' : 'PHONE',
    twoFactorDestination:
      typeof value.twoFactorDestination === 'string'
        ? value.twoFactorDestination
        : DEFAULT_USER_SETTINGS.twoFactorDestination,
    allowPush: getBoolean(value.allowPush, DEFAULT_USER_SETTINGS.allowPush),
    allowEvent: getBoolean(value.allowEvent, DEFAULT_USER_SETTINGS.allowEvent),
  };
};

export const getStoredUserSettings = async (): Promise<UserSettings> => {
  const stored = await AsyncStorage.getItem(USER_SETTINGS_KEY);
  if (!stored) {
    // 통합 설정 키가 없으면 이전 버전에서 개별 키로 저장하던 값을 찾아 변환한다.
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

    return normalizeUserSettings({
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
    });
  }

  try {
    const parsed: unknown = JSON.parse(stored);
    return normalizeUserSettings(parsed);
  } catch {
    return DEFAULT_USER_SETTINGS;
  }
};

export const storeUserSettings = async (
  settings: UserSettings,
): Promise<void> => {
  await AsyncStorage.setItem(
    USER_SETTINGS_KEY,
    JSON.stringify(normalizeUserSettings(settings)),
  );
};
