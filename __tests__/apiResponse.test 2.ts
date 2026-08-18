import {parseLoginId, parseRootArray} from '../src/utils/apiResponse';

describe('API Root 응답 검증', () => {
  test('배열과 비어 있는 목록 응답을 처리한다', () => {
    expect(parseRootArray([{id: 1}], '테스트 목록')).toEqual([{id: 1}]);
    expect(parseRootArray(null, '테스트 목록')).toEqual([]);
    expect(parseRootArray('', '테스트 목록')).toEqual([]);
  });

  test('목록 자리에 객체가 오면 계약 오류를 발생시킨다', () => {
    expect(() => parseRootArray({id: 1}, '테스트 목록')).toThrow(
      '테스트 목록 응답 형식이 올바르지 않습니다.',
    );
  });

  test('실제 로그인 아이디만 허용한다', () => {
    expect(parseLoginId({loginId: 'test.user-01'})).toBe('test.user-01');
    expect(() =>
      parseLoginId({loginId: '요청하신 정보가 전송되었습니다.'}),
    ).toThrow('서버에서 실제 로그인 아이디를 반환하지 않았습니다.');
  });
});
