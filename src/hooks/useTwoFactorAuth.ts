import {twoFactorApi, verifyPasswordApi} from '../api/auth';
import {updateTokens} from '../utils/authStorage';
import type {TwoFactorMethod, TwoFactorRequest} from '../types/auth';

const getDestinationPayload = (
  method: TwoFactorMethod,
  destination: string,
): Pick<TwoFactorRequest, 'phoneNumber' | 'email'> =>
  method === 'EMAIL'
    ? {email: destination}
    : {phoneNumber: destination};

export const useTwoFactorAuth = () => {
  const verifyCurrentPassword = async (password: string): Promise<boolean> => {
    const result = await verifyPasswordApi(password);
    return result.isMatched;
  };

  const setupMethod = async (
    method: TwoFactorMethod,
    destination: string,
  ) => {
    const destinationPayload = getDestinationPayload(method, destination);
    await twoFactorApi({action: 'SETUP', method, ...destinationPayload});
    return twoFactorApi({action: 'SEND', method, ...destinationPayload});
  };

  const sendCode = (method: TwoFactorMethod, destination: string) =>
    twoFactorApi({
      action: 'SEND',
      method,
      ...getDestinationPayload(method, destination),
    });

  const verifyCode = async (
    method: TwoFactorMethod,
    destination: string,
    code: string,
  ) => {
    const tokens = await twoFactorApi({
      action: 'VERIFY',
      method,
      ...getDestinationPayload(method, destination),
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

  return {verifyCurrentPassword, setupMethod, sendCode, verifyCode};
};
