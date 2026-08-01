import {twoFactorApi, verifyPasswordApi} from '../api/auth';
import {updateTokens} from '../utils/authStorage';

export const useTwoFactorAuth = () => {
  const verifyCurrentPassword = async (password: string): Promise<boolean> => {
    const result = await verifyPasswordApi(password);
    return result.isMatched;
  };

  const setupPhone = async (phoneNumber: string) => {
    await twoFactorApi({action: 'SETUP', phoneNumber});
    return twoFactorApi({action: 'SEND', phoneNumber});
  };

  const sendCode = (phoneNumber: string) =>
    twoFactorApi({action: 'SEND', phoneNumber});

  const verifyCode = async (phoneNumber: string, code: string) => {
    const tokens = await twoFactorApi({
      action: 'VERIFY',
      phoneNumber,
      code,
    });
    if (tokens.accessToken && tokens.refreshToken) {
      await updateTokens({
        accessToken: tokens.accessToken,
        refreshToken: tokens.refreshToken,
      });
    }
    return tokens;
  };

  return {verifyCurrentPassword, setupPhone, sendCode, verifyCode};
};
