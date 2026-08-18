import { Platform } from 'react-native';

// 빌드 시점에 babel이 실제 서버 주소로 치환하는 자리표시자.
// BLAZE_API_ENV 값(local/aws/production)에 따라 다른 주소가 들어간다.
const COMPILED_API_ENVIRONMENT = '__BLAZE_API_ENVIRONMENT__';
const COMPILED_API_BASE_URL = '__BLAZE_API_BASE_URL__';

// 안드로이드 에뮬레이터에서 localhost는 에뮬레이터 자신을 가리키므로
// 호스트 PC를 가리키는 10.0.2.2를 대신 사용한다.
const LOCAL_API_BASE_URL = Platform.select({
  android: 'http://10.0.2.2:8080',
  ios: 'http://localhost:8080',
  default: 'http://localhost:8080',
});

export const API_ENVIRONMENT = COMPILED_API_ENVIRONMENT;

// 빌드 치환이 안 된 로컬 실행 대비 fallback. 끝 슬래시는 제거해서
// 경로 이어붙일 때 // 중복 방지.
export const API_BASE_URL = (
  COMPILED_API_BASE_URL || LOCAL_API_BASE_URL
).replace(/\/+$/, '');

export const API_TIMEOUT_MS = 10_000;
