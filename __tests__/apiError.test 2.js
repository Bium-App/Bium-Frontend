import {
  getApiErrorMessage,
  getApiResponseMessage,
} from '../src/utils/apiError';

describe('getApiErrorMessage', () => {
  it('필드 오류를 가장 먼저 반환한다', () => {
    const error = {
      response: {
        status: 400,
        data: {
          message: '유효성 검증 실패',
          fieldErrors: { title: '제목을 입력해주세요.' },
        },
      },
    };

    expect(getApiErrorMessage(error, '요청에 실패했습니다.')).toBe(
      '제목을 입력해주세요.',
    );
  });

  it('서버 메시지가 있으면 상태별 기본 문구보다 우선한다', () => {
    const error = {
      response: {
        status: 409,
        data: { message: '이미 보낸 친구 요청입니다.' },
      },
    };

    expect(getApiErrorMessage(error, '요청에 실패했습니다.')).toBe(
      '이미 보낸 친구 요청입니다.',
    );
  });

  it.each([
    [400, '입력한 내용을 확인해주세요.'],
    [401, '인증 정보가 없거나 만료되었습니다. 다시 로그인해주세요.'],
    [403, '이 작업을 수행할 권한이 없습니다.'],
    [404, '요청한 정보를 찾을 수 없습니다.'],
    [409, '중복된 요청이거나 현재 상태와 충돌합니다.'],
    [500, '서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.'],
  ])('응답 본문이 없는 %i 오류의 기본 문구를 반환한다', (status, message) => {
    expect(
      getApiErrorMessage(
        { response: { status, data: undefined } },
        '요청에 실패했습니다.',
      ),
    ).toBe(message);
  });

  it('응답이 없으면 네트워크 오류 문구를 반환한다', () => {
    expect(getApiErrorMessage({ code: 'ERR_NETWORK' }, '요청 실패')).toBe(
      '서버에 연결할 수 없습니다. 네트워크와 서버 주소를 확인해주세요.',
    );
  });

  it('로컬 검증 오류 메시지를 네트워크 오류로 바꾸지 않는다', () => {
    expect(getApiErrorMessage(new Error('응답 형식 오류'), '요청 실패')).toBe(
      '응답 형식 오류',
    );
  });

  it('화면의 기존 응답 메시지 처리도 상태별 기본 문구를 사용한다', () => {
    expect(
      getApiResponseMessage({response: {status: 403, data: undefined}}),
    ).toBe('이 작업을 수행할 권한이 없습니다.');
  });

  it('알 수 없는 상태 코드는 화면별 fallback을 반환한다', () => {
    expect(
      getApiErrorMessage(
        { response: { status: 418, data: undefined } },
        '요청에 실패했습니다.',
      ),
    ).toBe('요청에 실패했습니다.');
  });
});
