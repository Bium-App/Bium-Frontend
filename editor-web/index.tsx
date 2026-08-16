import React from 'react';
import {createRoot} from 'react-dom/client';
import {MEMO_EDITOR_EXTENSIONS} from '../src/editor/memoEditorExtensions';
import {MemoWebEditor} from './MemoWebEditor';

declare global {
  interface Window {
    bridgeExtensionConfigMap?: string;
    contentInjected?: boolean;
    disableColorHighlight?: boolean;
    dynamicHeight?: boolean;
    editable?: boolean;
    initialContent?: string;
    platform?: 'ios' | 'android' | 'web';
    ReactNativeWebView?: {postMessage: (message: string) => void};
    whiteListBridgeExtensions?: string[];
  }
}

// 개발 브라우저에서도 실제 WebView와 같은 초기값으로 검증한다.
// 프로덕션 빌드에서는 Vite가 이 분기를 제거한다.
if (import.meta.env.DEV && !window.ReactNativeWebView) {
  window.bridgeExtensionConfigMap = JSON.stringify(
    Object.fromEntries(
      MEMO_EDITOR_EXTENSIONS.map(extension => [extension.name, {}]),
    ),
  );
  window.whiteListBridgeExtensions = MEMO_EDITOR_EXTENSIONS.map(
    extension => extension.name,
  );
  window.initialContent = '';
  window.editable = true;
  window.disableColorHighlight = false;
  window.dynamicHeight = false;
  window.contentInjected = true;
  window.platform = 'web';
}

const waitForBridge = setInterval(() => {
  if (!window.contentInjected) return;

  const container = document.getElementById('root');
  if (!container) return;

  createRoot(container).render(<MemoWebEditor />);
  clearInterval(waitForBridge);
}, 1);
