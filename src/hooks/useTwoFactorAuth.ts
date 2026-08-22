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

  // 2단계 인증 수단을 처음 등록할 때는 SETUP으로 방식을 먼저 등록한 뒤,
  // 곧바로 SEND를 호출해 인증 코드를 발송한다.
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
    // 인증 코드 검증에 성공하면 서버가 새 토큰을 함께 내려줄 수 있다.
    // 이 경우 저장된 세션 토큰을 갱신해 이후 요청에 반영한다.
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
