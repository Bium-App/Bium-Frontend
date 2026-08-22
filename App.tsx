import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Navigation from './src/navigation';
import {AppRoot} from './App.styles';
import {configureGoogleSignIn} from './src/utils/googleSignIn';

// 앱 시작 시 다국어 설정을 초기화한다.
import './src/locales/i18n';

// 구글 로그인 SDK를 초기화한다.
configureGoogleSignIn();

export default function App() {
  return (
    <AppRoot>
      <SafeAreaProvider>
        <Navigation />
      </SafeAreaProvider>
    </AppRoot>
  );
}
