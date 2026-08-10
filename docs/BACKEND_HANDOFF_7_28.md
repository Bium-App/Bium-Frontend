# BlazeMemo 백엔드 E2E 준비 요청서

> 기준: API 명세 7/28, ERD 7/28
>
> 프론트: React Native iOS
>
> 갱신일: 2026-08-04

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
3. GET /api/team-members/team/{teamSpaceId} 응답에 teamMemberId 추가
4. DELETE /api/team-spaces/{teamSpaceId}의 500 수정
5. 빈 GET /api/team-spaces/{teamSpaceId}/files를 200 []로 반환
6. POST /api/auth/find type=ID의 loginId에 실제 로그인 아이디 반환
7. 모든 createdAt을 Asia/Seoul, ISO 8601 기준으로 일관되게 반환
8. 생성된 S3 버킷에 IAM/CORS를 연결하고 실제 presignedUrl과 fileUrl 반환
```

프론트 팀 관리 화면은 `teamMemberId`가 도착하는 즉시 역할 변경·내보내기 API를 호출하도록 구현되어 있습니다. S3는 이미지 10MB, 문서 30MB 제한과 발급 요청 MIME/PUT `Content-Type` 일치를 이미 적용했습니다.
