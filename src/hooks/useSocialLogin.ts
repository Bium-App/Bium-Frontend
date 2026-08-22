import {useState} from 'react';
import {Alert, Platform} from 'react-native';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {socialLoginApi} from '../api/auth';
import {storeSession} from '../utils/authStorage';
import {getApiResponseMessage, getErrorMessage} from '../utils/apiError';
import {getDeviceName} from '../utils/deviceName';
import {getGoogleSignInErrorMessage} from '../utils/googleSignIn';
import type {SocialLoginResponse} from '../types/auth';

// 구글 소셜 로그인 흐름을 관리한다. 구글 SDK 인증과 Bium 자체 로그인 세션은
// 서로 다른 절차다: GoogleSignin.signIn()으로 구글 계정 정보만 받아오고,
// 그 정보(provider/providerId/email/name/profileImageUrl)를 Bium 로그인
// API로 전달해 Bium이 자체 세션(토큰)을 새로 발급하는 방식으로 동작한다.
export const useSocialLogin = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleLogin = async (
    onSuccess?: (session: SocialLoginResponse) => void,
  ): Promise<void> => {
    setIsLoading(true);
    try {
      if (Platform.OS === 'android') {
        // Play 서비스가 없거나 오래되면 구글 로그인 자체가 동작하지 않으므로
        // 로그인 시도 전에 확인/업데이트 다이얼로그를 먼저 띄운다.
        await GoogleSignin.hasPlayServices({
          showPlayServicesUpdateDialog: true,
        });
      }

      const response = await GoogleSignin.signIn();
      if (response.type !== 'success') return;

      const {user, idToken} = response.data;
      if (!idToken) {
        Alert.alert('구글 로그인 실패', '구글 인증 토큰을 받아오지 못했습니다.');
        return;
      }

      // 구글에서 받은 사용자 정보로 Bium 소셜 로그인을 요청해 Bium 세션을 발급받는다.
      const sessionData = await socialLoginApi({
        provider: 'GOOGLE',
        providerId: user.id,
        idToken,
        email: user.email,
        name: user.name ?? user.givenName ?? '',
        profileImageUrl: user.photo ?? undefined,
        deviceName: getDeviceName(),
      });

      await storeSession(sessionData);
      onSuccess?.(sessionData);
    } catch (error) {
      const googleErrorMessage = getGoogleSignInErrorMessage(error);
      // 사용자가 구글 로그인 창을 직접 취소한 경우(null)는 오류가 아니므로
      // 별도 알림 없이 조용히 종료한다.
      if (googleErrorMessage === null) return;
      Alert.alert(
        '구글 로그인 실패',
        googleErrorMessage ??
          getApiResponseMessage(error) ??
          (__DEV__ ? getErrorMessage(error) : undefined) ??
          '구글 로그인에 실패했습니다.',
      );
    } finally {
      setIsLoading(false);
    }
  };

  return {isLoading, handleGoogleLogin};
};
