# BlazeMemo 백엔드 전달용 확인서

> 기준: API 명세 7/22, ERD 7/22
> 프론트: React Native iOS
> 작성일: 2026-07-22

프론트의 Method, URI, Query, Body는 7/22 명세로 교체했습니다. 서버 연결 전에 아래 불일치만 확인 부탁드립니다.

## 1. 회원가입과 계정 찾기

회원가입 Body는 `loginId`, `password`, `nickname`, `provider`만 정의되어 있습니다. 하지만 ERD의 `name`은 NOT NULL이고 `POST /api/auth/find`는 email을 사용합니다.

- 회원가입 Body에 `name`, `email`을 다시 포함할지
- 또는 서버에서 name/email을 어떤 시점에 저장할지
- 회원가입 이메일 인증이 완전히 제거된 것이 맞는지

## 2. 메모 만료와 PIN value

ERD에는 `expired_at`이 있지만 메모 생성·상세 API에는 `expiredAt`이 없습니다. 프론트는 현재 소멸 시간 입력을 제거했습니다.

`PATCH /api/memos/{memoId}/status?action=PIN&value=...`의 PIN value도 명시 부탁드립니다. 프론트는 현재 `true/false` 문자열을 전송합니다.

## 3. 일정 필드

- 생성 Body: `teamSpaceId`, `title`, `startAt`, `endAt`
- 상세 응답/ERD: `content`, `startAt`, `endAt`
- 수정 Body: `title`, `startAt`

생성 시 `content`를 저장할 수 있는지, 수정 시 `content`와 `endAt`도 받을지 확인 부탁드립니다. 프론트는 현재 명세대로 생성 시 메모를 보내지 않고, 수정 UI를 노출하지 않습니다.

## 4. 문의 첨부

Inquiry ERD에는 `attachment_url`이 있지만 `POST /api/inquiries` Body에는 없고 Presigned URL domain도 `PROFILE/MEMO/TEAM`만 있습니다.

문의 첨부를 지원한다면 다음이 필요합니다.

- 문의용 domain 값
- 등록 Body의 `attachmentUrl`
- 이미지/문서 허용 범위와 크기 제한

## 5. 딥링크와 검색

알림 targetId 매핑은 반영했습니다.

- MEMO → memoId
- FRIEND_REQUEST → requestId
- TEAM_INVITE → teamSpaceId
- TEAM_NOTICE → noticeId
- TEAM_TODO → todoId

TEAM_TODO는 todoId 단건 조회 API가 없고 teamSpaceId도 없어 화면 이동이 불가능합니다. `GET /api/todos/{todoId}` 또는 알림 응답의 `teamSpaceId`가 필요합니다.

통합 검색도 notices에는 teamSpaceId 예시가 있지만 todos/schedules에는 없습니다. 팀 화면 이동이 필요하면 두 결과에도 teamSpaceId를 포함해 주세요.

## 6. 로그인 기기

단일 기기 로그아웃 `DELETE /api/auth/devices/{deviceId}`는 있지만 기기 목록 조회가 없습니다. 다른 기기의 deviceId를 선택 로그아웃하려면 다음 API가 필요합니다.

```http
GET /api/auth/devices
```

응답에는 `deviceId`, `deviceName`, `lastLoginAt`, 현재 기기 여부 판단 정보가 필요합니다.

## 7. 파일 업로드 확인

프론트는 발급 요청의 `fileType`과 S3 PUT의 `Content-Type`을 동일하게 보냅니다.

- 이미지 10MB, 문서 30MB 서버 검증
- 허용 MIME/확장자
- 파일명 인코딩과 중복 처리
- S3 CORS와 실패 파일 정리 정책

## 8. 개발 서버 E2E 준비

```text
개발 Base URL:
테스트 계정 1:
테스트 계정 2:
S3 CORS 설정:
```

공통 오류는 모든 400/401/403/404/409/500에서 아래 Root 형식을 유지해 주세요.

```json
{
  "code": "INVALID_INPUT_VALUE",
  "message": "입력값이 올바르지 않습니다.",
  "fieldErrors": {
    "title": "제목을 입력해주세요."
  }
}
```
