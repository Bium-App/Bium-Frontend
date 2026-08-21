import {
  GoogleSignin,
  isErrorWithCode,
  statusCodes,
} from '@react-native-google-signin/google-signin';

/**
 * 네이티브 Google 로그인 오류를 사용자가 이해할 수 있는 문구로 변환한다.
 * Android의 DEVELOPER_ERROR(10)는 앱 코드가 아니라 package/SHA 등록 불일치다.
 */
export const getGoogleSignInErrorMessage = (
  error: unknown,
): string | null | undefined => {
  if (!isErrorWithCode(error)) return undefined;

  const code = String(error.code);
  if (code === String(statusCodes.SIGN_IN_CANCELLED)) return null;
  if (code === String(statusCodes.IN_PROGRESS)) {
    return '구글 로그인이 이미 진행 중입니다. 잠시 후 다시 시도해주세요.';
  }
  if (code === String(statusCodes.PLAY_SERVICES_NOT_AVAILABLE)) {
    return 'Google Play 서비스를 사용할 수 없습니다. 업데이트 후 다시 시도해주세요.';
  }
  if (code === '10' || code === 'DEVELOPER_ERROR') {
    return 'Android 구글 로그인 설정이 일치하지 않습니다. 앱 서명 정보를 확인해주세요.';
  }
  return undefined;
};

export const configureGoogleSignIn = () => {
  try {
    GoogleSignin.configure({
      iosClientId:
        '821091206715-168llag0knfsh89h15bo0880bh9lg347.apps.googleusercontent.com',
      webClientId:
        '821091206715-tvogrcdhdu2c7tci2hgatnrnh8p044ek.apps.googleusercontent.com',
    });
  } catch (error) {
    // 네이티브 모듈이 아직 안 들어간 바이너리로 실행 중이면 여기서 던지는데,
    // 앱 부팅 자체(AppRegistry.registerComponent 호출 전)를 막아서는 안 되므로 무시한다.
    if (__DEV__) {
      console.warn('Google Sign-In 초기화 실패 (네이티브 모듈 미탑재 가능성):', error);
    }
  }
};
