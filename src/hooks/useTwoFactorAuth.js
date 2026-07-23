import { twoFactorApi, verifyPasswordApi } from '../api/auth';
import { updateTokens } from '../utils/authStorage';

export const useTwoFactorAuth = () => {
  const verifyCurrentPassword = async password => {
    const result = await verifyPasswordApi(password);
    return result.isMatched;
  };

  const setupPhone = async phoneNumber => {
    await twoFactorApi({ action: 'SETUP', phoneNumber });
    return twoFactorApi({ action: 'SEND', phoneNumber });
  };

  const sendCode = phoneNumber => twoFactorApi({ action: 'SEND', phoneNumber });

  const verifyCode = async (phoneNumber, code) => {
    const tokens = await twoFactorApi({
      action: 'VERIFY',
      phoneNumber,
      code,
    });
    if (tokens.accessToken && tokens.refreshToken) await updateTokens(tokens);
    return tokens;
  };

  return { verifyCurrentPassword, setupPhone, sendCode, verifyCode };
};
