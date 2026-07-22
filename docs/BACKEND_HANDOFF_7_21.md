# BlazeMemo 백엔드 전달용 API 연동 확인서

> 기준 문서: API 명세 7/21, ERD 7/21  
> 프론트: React Native  
> 작성일: 2026-07-22  
> 목적: 개발 서버 E2E 전 요청·응답 계약과 미확정 항목 확인

## 1. 개발 서버 정보 요청

```text
개발 Base URL:
운영 예정 도메인:
HTTP / HTTPS:
테스트 계정 1:
테스트 계정 2(친구 요청 검증용):
S3 CORS 허용 Origin:
```

확정된 정책은 Access Token 30분, Refresh Token 14일, 서버 시간대 `Asia/Seoul`이다.

## 2. 공통 요청·응답 계약

보호 API 요청:

```http
Authorization: Bearer {Access_Token}
Content-Type: application/json
```

DateTime은 KST 기준 ISO 8601 `YYYY-MM-DDTHH:mm:ss`를 사용한다.

프론트는 성공 데이터를 wrapper 없이 Root에서 직접 읽는다.

```json
[
  {
    "memoId": 1,
    "title": "메모"
  }
]
```

다음 형식은 사용하지 않는다.

```json
{
  "success": true,
  "data": [],
  "message": "성공"
}
```

오류 응답은 최소 다음 형태가 필요하다.

```json
{
  "message": "사용자에게 표시할 오류 내용"
}
```

- [x] `400`: 유효성 검증 실패
- [x] `401`: 인증 정보 없음 또는 만료
- [ ] `403`: 권한 부족 정책
- [ ] `404`: 리소스 없음 정책
- [ ] `409`: 중복/상태 충돌 정책
- [ ] `500`: 서버 오류 정책

## 3. 인증·사용자 확인

| 기능                         | Method           | URI                                           | 프론트                        |
| ---------------------------- | ---------------- | --------------------------------------------- | ----------------------------- |
| 회원가입                     | POST             | `/api/auth/signup`                            | 연결                          |
| 로그인                       | POST             | `/api/auth/login`                             | 연결                          |
| 토큰 갱신                    | POST             | `/api/auth/refresh`                           | 401 자동 재시도 연결          |
| 아이디 찾기                  | POST             | `/api/auth/find-id`                           | 화면 연결                     |
| 인증번호 발송/검증           | POST             | `/api/auth/code`, `/api/auth/verify`          | 회원가입·비밀번호 재설정 연결 |
| 비밀번호 재설정              | POST             | `/api/auth/reset-password`                    | 화면 연결                     |
| 현재 비밀번호 확인           | POST             | `/api/auth/verify-password`                   | 2FA 진입에 연결               |
| 2FA 수단 저장/검증           | POST             | `/api/auth/2fa/setup`, `/api/auth/2fa/verify` | 휴대폰 흐름 연결              |
| 기기 목록/개별/전체 로그아웃 | GET/POST         | 명세 URI                                      | 연결                          |
| 사용자 정보 조회/수정/탈퇴   | GET/PATCH/DELETE | `/api/users/{userId}`                         | 연결                          |
| 설정 조회/수정               | GET/PATCH        | `/api/users/{userId}/settings`                | 연결                          |

로그인 응답은 네 필드가 모두 필요하다.

```json
{
  "accessToken": "String",
  "refreshToken": "String",
  "userId": 1,
  "deviceId": 10
}
```

확인 요청:

- [ ] 같은 기기에서 재로그인할 때 Device가 갱신되는지 새로 생성되는지
- [ ] 로그아웃된 device refresh token이 즉시 무효화되는지
- [ ] refresh token 재사용/회전 정책
- [ ] 2FA setup이 SMS 발송까지 수행하는지
- [ ] 2FA 인증번호 재발송은 setup 재호출이 맞는지
- [ ] 2FA verify의 새 refresh token이 기존 Device에 반영되는지

환경설정 요청/응답 필드는 아래 여섯 개로 통일한다.

```json
{
  "timezone": "Asia/Seoul",
  "dateFormat": "YYYY-MM-DD",
  "language": "ko-KR",
  "use2fa": false,
  "allowPush": true,
  "allowEvent": false
}
```

## 4. 메모·팀 목록 성능 계약

7/21 명세의 목록 필드가 구현되면 프론트는 N+1 호출을 하지 않는다.

개인/팀 메모 목록 항목:

```json
{
  "memoId": 1,
  "title": "String",
  "content": "String",
  "status": "NORMAL",
  "isPinned": false,
  "expiredAt": null,
  "createdAt": "2026-07-22T10:00:00"
}
```

내 팀 목록 항목:

```json
{
  "teamSpaceId": 1,
  "name": "프로젝트",
  "createdAt": "2026-07-22T10:00:00",
  "memberCount": 4
}
```

- [ ] 메모 목록에 `content`, `createdAt` 실제 포함
- [ ] 팀 목록에 `memberCount` 실제 포함
- [ ] 공지 목록에 `content` 실제 포함
- [ ] nullable `expiredAt`, `dueDate`가 JSON null로 반환되는지

휴지통 선택 삭제는 DELETE body를 사용한다.

```http
DELETE /api/memos/trash
```

```json
{
  "memoIds": [1, 2, 3]
}
```

- [ ] Spring에서 DELETE body 바인딩 확인
- [ ] 다른 사용자의 ID 또는 존재하지 않는 ID가 섞일 때 원자성 확인

## 5. S3 Presigned URL 업로드 계약

프론트 순서:

```text
GET /api/files/presigned-url?prefix=...&fileName=...
→ presignedUrl로 S3 PUT (Bearer 없음)
→ fileUrl을 메모 이미지/팀 파일/사용자/문의 메타데이터에 저장
```

Prefix는 `PROFILES`, `MEMOS`, `TEAMS` 중 하나를 사용한다.

메모 이미지는 JSON이다.

```http
POST /api/memo-images
Content-Type: application/json
```

```json
{
  "memoId": 1,
  "imageUrl": "https://..."
}
```

확인 요청:

- [ ] PUT 요청의 필수 `Content-Type`
- [ ] `Content-Type`이 Presigned 서명에 포함되는지
- [ ] 파일명 URL encoding 규칙과 중복 파일명 처리
- [ ] 허용 확장자, MIME, 최대 크기, 메모 이미지 최대 개수
- [ ] 업로드 실패/중단 파일 정리 정책
- [ ] S3 CORS의 iOS/Android 요청 허용
- [ ] `fileUrl` 공개 접근인지 GET Presigned URL이 필요한지

## 6. 친구 API 확인

프론트는 검색, 추천, 요청 전송, 받은/보낸 요청, 수락, 거절, 취소를 모두 연결했다.

- [ ] 자기 자신 검색 제외 여부
- [ ] 이미 친구/요청 중인 사용자 검색 결과 처리
- [ ] 양방향 동시 요청 발생 시 처리
- [ ] 중복 요청의 상태 코드와 message
- [ ] REJECTED 이후 재요청 가능 정책
- [ ] 취소/거절 후 Friend row 삭제 또는 상태 보존 정책

요청 목록은 다음 식별자를 반드시 유지해야 한다.

```text
받은 요청: requestId, requesterId, nickname, createdAt
보낸 요청: requestId, receiverId, nickname, createdAt
```

## 7. 공지·할 일·일정 확인

- [x] 공지 목록 `content`와 공지 상세 URI가 7/21 명세에 추가됨
- [x] 할 일 `dueDate` null 허용이 명시됨
- [x] 개인 월별 일정 목록 URI가 추가됨

일정 수정에는 아직 응답 계약 보완이 필요하다.

현재 월별 목록은 `scheduleId`, `title`, `scheduleDate`만 반환하고 수정 body는 `content`까지 요구한다. 다음 중 하나가 필요하다.

- [ ] `GET /api/schedules/{scheduleId}` 상세 조회 추가
- [ ] 월별 목록 응답에 `content` 추가

추가 확인:

- [ ] `month=04`와 `month=4` 모두 허용되는지
- [ ] KST 자정/월말 경계 조회 기준
- [ ] 일정 생성/수정의 content null 또는 빈 문자열 허용 여부

## 8. 검색·문의·알림 확인

통합 검색 Root 응답은 다음 형태다.

```json
{
  "memos": [],
  "notices": [],
  "todos": [],
  "schedules": []
}
```

- [ ] 각 배열 항목의 전체 필드 명세
- [ ] 상세 이동에 필요한 `memoId/noticeId/todoId/scheduleId` 보장
- [ ] 검색 권한 범위: 개인 데이터와 참여 팀 데이터만 반환

문의 목록의 `createdAt`, `updatedAt`은 화면에 표시한다.

알림은 `type`, `targetId`로 딥링크를 구성할 예정이다.

- [ ] FRIEND/TEAM/MEMO별 `targetId` 대상 테이블
- [ ] 대상이 삭제됐을 때 알림 클릭 처리
- [ ] 읽음 처리의 멱등성

## 9. 프론트 E2E 체크 순서

- [ ] 회원가입 → 인증 → 로그인
- [ ] 보호 API Bearer 헤더
- [ ] access token 30분 만료 → refresh → 원 요청 재시도
- [ ] refresh token 만료/무효 → 세션 제거
- [ ] 로그인 deviceId와 기기 목록 현재 기기 일치
- [ ] 사용자 설정 조회 → 수정 → 재로그인 후 유지
- [ ] 메모 전체 CRUD·휴지통 선택 삭제
- [ ] 팀 공지·할 일·일정
- [ ] 두 계정 간 친구 요청 전체 상태 전이
- [ ] Presigned URL → S3 PUT → 메타 저장 → 다운로드
- [ ] 통합 검색 4개 도메인
- [ ] 문의 날짜와 답변 상태
- [ ] 알림 읽음·삭제
- [ ] 400/401 및 추가 오류 상태별 message

## 10. 현재 프론트에서 남은 작업

- 실제 개발 Base URL 연결
- 네이티브 파일/이미지 선택기 설치와 Blob 변환
- 일정 상세 계약 확정 후 수정 화면 연결
- FRIEND/TEAM 알림 딥링크 매핑
- Keychain/Keystore 보안 저장소 이전
- 실서버 E2E 및 iOS/Android 실제 기기 검증
