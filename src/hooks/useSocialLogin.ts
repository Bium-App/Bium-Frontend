import {useState} from 'react';
import {Alert, Platform} from 'react-native';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {socialLoginApi} from '../api/auth';
import {storeSession} from '../utils/authStorage';
import {getApiResponseMessage, getErrorMessage} from '../utils/apiError';
import {getDeviceName} from '../utils/deviceName';
import type {SocialLoginResponse} from '../types/auth';

export const useSocialLogin = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleLogin = async (
    onSuccess?: (session: SocialLoginResponse) => void,
  ): Promise<void> => {
    setIsLoading(true);
    try {
      if (Platform.OS === 'android') {
        await GoogleSignin.hasPlayServices({
          showPlayServicesUpdateDialog: true,
        });
      }

      const response = await GoogleSignin.signIn();
      if (response.type !== 'success') return;

      const {user} = response.data;
      const sessionData = await socialLoginApi({
        provider: 'GOOGLE',
        providerId: user.id,
        email: user.email,
        name: user.name ?? user.givenName ?? '',
        profileImageUrl: user.photo ?? undefined,
        deviceName: getDeviceName(),
      });

      await storeSession(sessionData);
      onSuccess?.(sessionData);
    } catch (error) {
      Alert.alert(
        '구글 로그인 실패',
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
