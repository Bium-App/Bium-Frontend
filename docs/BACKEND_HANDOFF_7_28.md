# BlazeMemo 백엔드 E2E 준비 요청서

> 기준: API 명세 7/28, ERD 7/28
>
> 프론트: React Native iOS
>
> 작성일: 2026-07-28

7/28 명세로 프론트 Method, URI, Query, Body를 갱신했습니다. 이전 확인 요청 다섯 건은 아래 규격으로 해결됐습니다.

- PIN `value`: `true/false` 문자열
- TEAM_TODO: `GET /api/todos/{todoId}` 응답의 `teamSpaceId`
- 기기 목록: `GET /api/auth/devices`
- 알림 읽음: `PATCH /api/notifications/{id}/read`
- 개발 S3 CORS: Origins `*`, Methods `PUT`, Headers `*`

## E2E 준비 정보 요청

```text
개발 Base URL:
테스트 계정 1:
테스트 계정 2:
S3 CORS 설정 완료 여부:
서버 실행 가능 일시:
```
