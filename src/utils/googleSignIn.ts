import {GoogleSignin} from '@react-native-google-signin/google-signin';

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
