import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Navigation from './src/navigation/index.js';

// 다국어 딕셔너리 및 설정 파일 불러오기 (앱 실행 시 메모리에 즉시 세팅됩니다)
// @ts-ignore
import './src/locales/i18n.js';

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <Navigation />
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}