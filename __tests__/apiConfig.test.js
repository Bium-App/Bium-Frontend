import { API_BASE_URL, API_ENVIRONMENT } from '../src/config/api';

describe('API configuration', () => {
  it('테스트에서는 로컬 API 환경을 사용한다', () => {
    expect(API_ENVIRONMENT).toBe('local');
    expect(['http://localhost:8080', 'http://10.0.2.2:8080']).toContain(
      API_BASE_URL,
    );
  });
});
