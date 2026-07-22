import AsyncStorage from '@react-native-async-storage/async-storage';

const USER_SETTINGS_KEY = '@user_settings';

export const DEFAULT_USER_SETTINGS = {
  timezone: 'Asia/Seoul',
  dateFormat: 'YYYY-MM-DD',
  language: 'ko-KR',
  use2fa: false,
  allowPush: true,
  allowEvent: true,
};

export const getStoredUserSettings = async () => {
  const stored = await AsyncStorage.getItem(USER_SETTINGS_KEY);
  if (!stored) {
    const legacy = await AsyncStorage.getMany([
      'userLanguage',
      'userTimezone',
      'userFormatType',
      'notiEvent',
      'notiPush',
    ]);
    const timezoneMap = {
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
        timezoneMap[legacy.userTimezone] ?? DEFAULT_USER_SETTINGS.timezone,
      dateFormat: legacy.userFormatType ?? DEFAULT_USER_SETTINGS.dateFormat,
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
    return { ...DEFAULT_USER_SETTINGS, ...JSON.parse(stored) };
  } catch {
    return DEFAULT_USER_SETTINGS;
  }
};

export const storeUserSettings = async settings => {
  await AsyncStorage.setItem(
    USER_SETTINGS_KEY,
    JSON.stringify({ ...DEFAULT_USER_SETTINGS, ...settings }),
  );
};
