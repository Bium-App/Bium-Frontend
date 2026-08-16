import {
  mapNotificationResponse,
  mapSearchResponse,
  parseRecentSearches,
} from '../src/utils/viewModelMappers';

describe('화면 데이터 변환', () => {
  test('통합 검색의 네 종류 결과를 화면 목록으로 변환한다', () => {
    const result = mapSearchResponse({
      memos: [{memoId: 1, title: '메모', content: '내용', status: 'FIRE'}],
      notices: [
        {noticeId: 2, title: '공지', content: '공지 내용', teamSpaceId: 20},
      ],
      todos: [
        {todoId: 3, title: '할 일', dueDate: '2026-08-05', teamSpaceId: 20},
      ],
      schedules: [
        {
          scheduleId: 4,
          title: '일정',
          startAt: '2026-08-05T10:00:00',
          endAt: '2026-08-05T11:00:00',
          teamSpaceId: 20,
        },
      ],
    });

    expect(result).toHaveLength(4);
    expect(result.map(item => item.resultType)).toEqual([
      'MEMO',
      'NOTICE',
      'TODO',
      'SCHEDULE',
    ]);
    expect(result[2]).toMatchObject({
      id: 'todo-3',
      targetId: 3,
      teamSpaceId: 20,
      desc: '2026-08-05',
    });
    expect(result[3].desc).toBe(
      '2026-08-05T10:00:00 ~ 2026-08-05T11:00:00',
    );
  });

  test('누락된 검색 그룹과 선택 필드를 안전하게 처리한다', () => {
    expect(mapSearchResponse({memos: [{memoId: 1, title: '제목'}]})).toEqual([
      expect.objectContaining({desc: '', targetId: 1}),
    ]);
    expect(mapSearchResponse({})).toEqual([]);
  });

  test('최근 검색 JSON에서 올바른 항목만 남긴다', () => {
    expect(
      parseRecentSearches(
        JSON.stringify([
          {id: '1', text: '회의'},
          {id: 2, text: '잘못된 항목'},
          null,
        ]),
      ),
    ).toEqual([{id: '1', text: '회의'}]);
    expect(parseRecentSearches('잘못된 JSON')).toEqual([]);
  });

  test.each([
    ['MEMO', '메모 알림', 'FIRE'],
    ['FRIEND_REQUEST', '친구 요청', 'ICE'],
    ['TEAM_INVITE', '팀 초대', 'ICE'],
    ['TEAM_NOTICE', '팀 공지', 'ICE'],
    ['TEAM_TODO', '팀 할 일', 'ICE'],
  ] as const)('%s 알림을 화면 항목으로 변환한다', (type, title, colorType) => {
    const result = mapNotificationResponse({
      notificationId: 9,
      type,
      message: '알림 내용',
      isRead: false,
      targetId: 3,
    });

    expect(result).toMatchObject({
      id: '9',
      title,
      description: '알림 내용',
      isRead: false,
      targetId: 3,
      notificationType: type,
      type: colorType,
      time: '',
    });
  });
});
