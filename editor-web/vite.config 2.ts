import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';
import {viteSingleFile} from 'vite-plugin-singlefile';

export default defineConfig({
  root: 'editor-web',
  build: {
    outDir: 'build',
    emptyOutDir: true,
  },
  resolve: {
    // @10play/tentap-editor 내부의 ReactDOM 18 복사본이 React 19와 함께
    // 번들되면 WebView 편집기가 시작되지 않으므로 앱의 단일 버전을 사용한다.
    dedupe: ['react', 'react-dom'],
    alias: [
      {
        find: '@10play/tentap-editor',
        replacement: '@10play/tentap-editor/web',
      },
      {
        find: '@tiptap/pm/view',
        replacement: '@10play/tentap-editor/web',
      },
      {
        find: '@tiptap/pm/state',
        replacement: '@10play/tentap-editor/web',
      },
    ],
  },
  plugins: [react(), viteSingleFile()],
  server: {
    port: 3000,
  },
});
