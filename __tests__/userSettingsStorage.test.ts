import {
  DEFAULT_USER_SETTINGS,
  normalizeUserSettings,
} from '../src/utils/userSettingsStorage';

describe('normalizeUserSettings', () => {
  it('빈 서버 필드를 기본 설정으로 복구한다', () => {
    expect(
      normalizeUserSettings({
        language: undefined,
        timezone: null,
        dateFormat: '',
      }),
    ).toEqual(DEFAULT_USER_SETTINGS);
  });

  it('유효한 서버 설정은 유지한다', () => {
    expect(
      normalizeUserSettings({
        language: 'en-US',
        timezone: 'America/New_York',
        dateFormat: 'MM/DD/YYYY',
        use2fa: true,
        twoFactorMethod: 'EMAIL',
        twoFactorDestination: 'te***@example.com',
        allowPush: false,
        allowEvent: false,
      }),
    ).toEqual({
      language: 'en-US',
      timezone: 'America/New_York',
      dateFormat: 'MM/DD/YYYY',
      use2fa: true,
      twoFactorMethod: 'EMAIL',
      twoFactorDestination: 'te***@example.com',
      allowPush: false,
      allowEvent: false,
    });
  });
});
