import {
  setupTwoFactorApi,
  verifyPasswordApi,
  verifyTwoFactorApi,
} from '../api/auth';
import { getUserId, updateTokens } from '../utils/authStorage';

const requireUserId = async () => {
  const userId = await getUserId();
  if (!userId) throw new Error('사용자 정보를 찾을 수 없습니다.');
  return userId;
};

export const useTwoFactorAuth = () => {
  const verifyCurrentPassword = async password => {
    const userId = await requireUserId();
    const result = await verifyPasswordApi({ userId, password });
    return result.isMatched;
  };

  const setupPhone = async phoneNumber => {
    const userId = await requireUserId();
    return setupTwoFactorApi({ userId, phoneNumber });
  };

  const verifyCode = async code => {
    const userId = await requireUserId();
    const tokens = await verifyTwoFactorApi({ userId, code });
    await updateTokens(tokens);
    return tokens;
  };

  return { verifyCurrentPassword, setupPhone, verifyCode };
};
