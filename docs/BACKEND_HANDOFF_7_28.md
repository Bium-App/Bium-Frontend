# BlazeMemo 백엔드 E2E 준비 요청서

> 기준: API 명세 7/28, ERD 7/28
>
> 프론트: React Native iOS
>
> 갱신일: 2026-08-10

7/28 명세로 프론트 Method, URI, Query, Body를 갱신했고 실서버 1차 검증까지 진행했습니다.

- PIN `value`: `true/false` 문자열
- TEAM_TODO: `GET /api/todos/{todoId}` 응답의 `teamSpaceId`
- 기기 목록: `GET /api/auth/devices`
- 알림 읽음: `PATCH /api/notifications/{id}/read`
- 개발 S3 CORS 규격: Origins `*`, Methods `PUT`, Headers `*`

## 백엔드 수정 요청

```text
1. GET /api/friends?type=SEARCH가 기존 사용자를 반환하도록 수정
2. GET /api/friends/requests?type=RECEIVED/SENT의 500 수정
3. POST /api/friends/requests 성공 응답에 requestId 추가
4. POST /api/team-spaces/{teamSpaceId}/members의 500 수정
5. GET /api/team-members/team/{teamSpaceId} 응답에 teamMemberId 추가
6. POST /api/memos/{memoId}/images 성공 후 GET /api/memos/{memoId}의 imageUrls에 연결 이미지 반환
7. 이미지가 연결된 메모의 DELETE /api/trash 영구삭제 500 수정
8. POST /api/auth/find type=ID의 loginId에 실제 로그인 아이디 반환
9. 인증 정보가 유효하지 않은 요청은 403이 아닌 공통 규격의 401로 반환
10. 모든 createdAt을 Asia/Seoul, ISO 8601 기준으로 일관되게 반환
```

2026-08-10 재시험에서 팀 삭제, 빈 팀 파일 `200 []`, 실제 S3 Presigned URL과 PROFILE·MEMO·TEAM·INQUIRY PUT은 정상 확인했습니다. 프론트 팀 관리 화면은 `teamMemberId`가 도착하는 즉시 역할 변경·내보내기 API를 호출하도록 구현되어 있습니다. S3는 이미지 10MB, 문서 30MB 제한과 발급 요청 MIME/PUT `Content-Type` 일치를 적용했습니다.
