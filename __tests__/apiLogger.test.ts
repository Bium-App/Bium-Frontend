import {sanitizeApiLogValue} from '../src/utils/apiLogger';

describe('API 개발 로그 민감정보 제거', () => {
  it('비밀번호와 인증 토큰을 가린다', () => {
    expect(
      sanitizeApiLogValue({
        loginId: 'tester',
        password: 'Test1234!',
        accessToken: 'access-token',
        nested: {refreshToken: 'refresh-token'},
      }),
    ).toEqual({
      loginId: 'tester',
      password: '[REDACTED]',
      accessToken: '[REDACTED]',
      nested: {refreshToken: '[REDACTED]'},
    });
  });

  it('Presigned URL을 로그에 노출하지 않는다', () => {
    expect(
      sanitizeApiLogValue({
        presignedUrl: 'https://s3.example.com/file?X-Amz-Signature=secret',
        fileUrl: 'https://cdn.example.com/file',
      }),
    ).toEqual({
      presignedUrl: '[REDACTED URL]',
      fileUrl: 'https://cdn.example.com/file',
    });
  });
});
