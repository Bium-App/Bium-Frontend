import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Navigation from './src/navigation';
import {AppRoot} from './App.styles';

// 다국어 딕셔너리 및 설정 파일 불러오기 (앱 실행 시 메모리에 즉시 세팅됩니다)
import './src/locales/i18n';

export default function App() {
  return (
    <AppRoot>
      <SafeAreaProvider>
        <Navigation />
      </SafeAreaProvider>
    </AppRoot>
  );
}
