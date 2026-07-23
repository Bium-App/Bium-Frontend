# BlazeMemo 백엔드 확인 요청서

> 기준: API 명세 7/23, ERD 7/23
>
> 프론트: React Native iOS
>
> 작성일: 2026-07-23

프론트의 Method, URI, Query, Body는 7/23 명세로 갱신했습니다. 7/22에서 불일치했던 회원가입, 메모 만료, 할 일·일정 필드, 검색 teamSpaceId, 서비스 공지 내용은 해결됐습니다.

## 1. 공통 통신 규약

7/23 문서에는 Base URL, Bearer, 토큰 만료, 공통 오류 규격이 빠져 있습니다. 아래 7/22 규약이 그대로 유지되는지 확인 부탁드립니다.

- Access Token 30분, Refresh Token 14일
- 성공 응답은 wrapper 없는 Root 객체/배열
- 오류는 `{code,message,fieldErrors}`
- 상태 코드 400/401/403/404/409/500

## 2. 메모 PIN

`PATCH /api/memos/{memoId}/status?action=PIN&value=...`의 PIN value 형식을 확인 부탁드립니다. 프론트는 현재 `true/false` 문자열을 보냅니다.

## 3. 문의 첨부

문의 Body와 ERD에는 `attachmentUrl`이 추가됐지만 Presigned URL domain은 `PROFILE/MEMO/TEAM`만 있습니다.

문의 이미지 첨부를 지원한다면 아래 정보가 필요합니다.

- 문의용 domain 값
- 허용 MIME과 확장자
- 이미지 용량 제한
- 문의 제출 실패 시 업로드 파일 정리 정책

domain 확정 전 프론트는 `attachmentUrl: null`을 보냅니다.

## 4. TEAM_TODO 알림

TEAM_TODO는 `targetId=todoId`이지만 todo 단건 조회 API와 teamSpaceId가 없습니다. 다음 중 하나가 필요합니다.

- 알림 응답에 `teamSpaceId` 추가
- `GET /api/todos/{todoId}` 상세 응답에 `teamSpaceId` 제공

## 5. 로그인 기기

단일 기기 로그아웃은 있지만 기기 목록 조회 API가 없습니다.

```http
GET /api/auth/devices
```

응답에는 `deviceId`, `deviceName`, `lastLoginAt`, 현재 기기 여부가 필요합니다.

## 6. 알림 읽음 경로

7/23 표에는 `PATCH /api/notifications/{id}`와 “/read 추가 가능”이 함께 적혀 있습니다. 최종 경로가 아래 중 무엇인지 확인 부탁드립니다.

- `PATCH /api/notifications/{id}`
- `PATCH /api/notifications/{id}/read`

## 7. S3

프론트는 발급 요청의 `fileType`과 S3 PUT의 `Content-Type`을 동일하게 보냅니다.

- 이미지 10MB, 문서 30MB 서버 검증
- 파일명 인코딩과 중복 처리
- 명세 CORS 설정의 실제 개발 버킷 반영
- 미사용 업로드 파일 정리 정책

## 8. E2E 준비 정보

```text
개발 Base URL:
테스트 계정 1:
테스트 계정 2:
S3 CORS 설정 완료 여부:
```
