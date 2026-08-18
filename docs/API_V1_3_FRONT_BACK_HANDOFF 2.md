# Bium API v1.3 프론트·백엔드 공동 확인서

> 기준 문서: API 명세 v1.3 (2026-08-13), ERD v1.3 (2026-08-13)
>
> 앱 이름: 비움(Bium)
>
> 개발 서버: `http://13.124.250.181:8080`

## 1. 현재 결론

- 프론트엔드는 8월 13일 v1.3 명세의 Method, URI, Query, Request Body와 주요 Response 타입을 반영했다.
- 잘못되거나 만료된 Access Token은 `401`일 때만 Refresh Token으로 재발급하고, 원 요청을 한 번 재시도한다.
- `403`은 토큰 만료가 아니라 실제 권한 부족으로 처리한다.
- 프론트 타입 검사, ESLint, 전체 테스트 52개가 통과했다.
- 남은 작업은 백엔드 실제 배포 상태 확인과 두 테스트 계정을 이용한 E2E 테스트다.
- `richContent`는 기존 합의로 프론트에 구현되어 있지만, v1.3 명세와 ERD에는 아직 없으므로 별도 협의가 필요하다.

## 2. 공통 통신 규격

| 항목 | 확정 규격 | 프론트 상태 | 백엔드 확인 |
| --- | --- | --- | --- |
| Base URL | `http://13.124.250.181:8080` | AWS 환경 실행 스크립트 적용 | 서버 실행 상태 유지 |
| 인증 Header | `Authorization: Bearer {AccessToken}` | 보호 API에 자동 첨부 | 보호 API에서 검증 |
| 성공 응답 | Wrapper 없이 Root 객체 또는 배열 | Root 응답 직접 파싱 | `success`, `data` Wrapper를 사용하지 않음 |
| 에러 응답 | `{code, message, fieldErrors}` | 공통 에러 메시지 처리 | 빈 Body·문자열·XML 대신 JSON 반환 |
| 401 | 토큰 없음·만료·오류 | Refresh 후 한 번 재요청 | `401 UNAUTHORIZED` 반환 |
| 403 | 정상 토큰이지만 권한 부족 | 재발급하지 않고 권한 오류 표시 | 실제 권한 부족에만 사용 |
| 날짜 | KST, ISO 8601 | ISO 8601 전송·표시 변환 | 응답 날짜 형식 통일 |

공통 에러 예시:

```json
{
  "code": "UNAUTHORIZED",
  "message": "인증 정보가 없거나 만료되었습니다.",
  "fieldErrors": null
}
```

## 3. 기능별 진행 상태

표시 기준:

- `완료`: 프론트 코드와 계약 테스트 반영 완료
- `서버 확인`: 프론트는 준비됐으며 실제 서버 응답 검증 필요
- `추가 협의`: v1.3 명세 밖의 확장 기능

### 3.1 인증·사용자

| 기능 | API | 프론트 | 백엔드·E2E 확인 |
| --- | --- | --- | --- |
| 회원가입 | `POST /api/auth/signup` | 완료 | 7개 필드 DB 저장, `{userId}` 반환 |
| 로그인 | `POST /api/auth/login` | 완료 | Access/Refresh Token, `userId`, `deviceId` 반환 |
| 토큰 갱신 | `POST /api/auth/refresh` | 완료 | 회전된 두 토큰과 `userId`, `deviceId` 반환 |
| 로그아웃 | `POST /api/auth/logout?type=CURRENT/ALL` | 완료 | 현재/전체 로그아웃 구분 |
| 기기 목록 | `GET /api/auth/devices` | 완료 | `deviceId`, `deviceName`, `lastLoginAt` 반환 |
| 단일 기기 로그아웃 | `DELETE /api/auth/devices/{deviceId}` | 완료 | 해당 세션만 종료 |
| 계정 찾기 | `POST /api/auth/find` | 완료 | ID 찾기는 실제 `loginId` 반환 |
| 비밀번호 확인 | `POST /api/auth/verify-password` | 완료 | `{isMatched}` 반환 |
| 2FA | `POST /api/auth/2fa` | 완료 | SETUP/SEND/VERIFY 동작 확인 |
| 내 정보 조회 | `GET /api/users/me` | 완료 | 다섯 정보 필드와 이미지 URL 반환 |
| 내 정보 수정 | `PATCH /api/users/me` | 완료 | DB 저장 후 재조회 값 일치 확인 |
| 설정 조회·수정 | `GET/PATCH /api/users/me/settings` | 완료 | PATCH는 전달된 필드만 수정 |
| 회원 탈퇴 | `DELETE /api/users/me` | 완료 | 탈퇴 및 토큰 무효화 확인 |

내 정보 수정 요청:

```json
{
  "name": "변경 이름",
  "nickname": "변경 닉네임",
  "email": "user@example.com",
  "phoneNumber": "010-1234-5678",
  "profileImageUrl": "https://..."
}
```

### 3.2 친구

| 기능 | API | 프론트 | 백엔드·E2E 확인 |
| --- | --- | --- | --- |
| 검색 | `GET /api/friends?type=SEARCH&keyword=...` | 완료 | loginId·nickname 모두 검색 |
| 추천 | `GET /api/friends?type=RECOMMEND` | 완료 | 빈 목록은 `200 []` |
| 요청 전송 | `POST /api/friends/requests` | 완료 | `{requestId, message}` 반환 |
| 받은 요청 | `GET /api/friends/requests?type=RECEIVED` | 완료 | `200` 배열 반환 |
| 보낸 요청 | `GET /api/friends/requests?type=SENT` | 완료 | `200` 배열 반환 |
| 수락·거절 | `PATCH /api/friends/requests/{requestId}?action=...` | 완료 | ACCEPT/REJECT 상태 변경 |
| 요청 취소 | `DELETE /api/friends/requests/{requestId}` | 완료 | 보낸 요청 삭제 |
| 중복 요청 | 동일 요청 반복 | 오류 UI 완료 | `409 CONFLICT` 반환 |
| 친구 요청 알림 | `GET /api/notifications` | 이동 처리 완료 | `targetId=requestId`로 알림 생성 |

### 3.3 메모·휴지통

| 기능 | API | 프론트 | 백엔드·E2E 확인 |
| --- | --- | --- | --- |
| 생성 | `POST /api/memos` | 완료 | `{memoId}` 반환 |
| 목록 | `GET /api/memos` | 완료 | 본문 없는 목록 규격 확인 |
| 팀 메모 목록 | `GET /api/memos?teamSpaceId={id}` | 완료 | 팀별 배열 반환 |
| 상세 | `GET /api/memos/{memoId}` | 완료 | `content`, 상태, 날짜 반환 |
| 수정 | `PATCH /api/memos/{memoId}` | 완료 | 제목·평문 본문 저장 |
| 상태 변경 | `PATCH .../status?action=STATUS&value=FIRE/ICE` | 완료 | 변경된 상태 재조회 확인 |
| 고정 변경 | `PATCH .../status?action=PIN&value=true/false` | 완료 | 문자열 Boolean Query 처리 |
| 휴지통 이동 | `DELETE /api/memos/{memoId}` | 완료 | 휴지통 목록에 표시 |
| 복구 | `PATCH /api/trash/{memoId}/restore` | 완료 | 원 목록에 복구 |
| 영구 삭제 | `DELETE /api/trash` | 완료 | `{memoIds:[...]}` 처리 |
| 메모 이미지 | Presigned URL → S3 PUT → `/images` | 완료 | `{imageId}` 반환·조회 확인 |

### 3.4 팀스페이스·공지·할 일·일정

| 기능 | API | 프론트 | 백엔드·E2E 확인 |
| --- | --- | --- | --- |
| 팀 생성·목록·상세·삭제 | `/api/team-spaces` | 완료 | 생성 ID, 빈 배열, 삭제 동작 |
| 팀원 추가 | `POST /api/team-spaces/{id}/members` | 완료 | `{teamMemberId}` 반환 |
| 팀원 목록 | `GET /api/team-members/team/{id}` | 완료 | 각 항목에 `teamMemberId` 포함 필요 |
| 역할 수정·삭제 | `PATCH/DELETE /api/team-members/{memberId}` | 완료 | 실제 memberId로 동작 |
| 공지 CRUD | `/api/notices` 관련 API | 완료 | 생성 시 `{noticeId}` 반환 |
| 할 일 CRUD | `/api/todos` 관련 API | 완료 | 생성 시 `{todoId}` 반환 |
| 할 일 상세 | `GET /api/todos/{todoId}` | 완료 | `teamSpaceId` 필수 반환 |
| 일정 CRUD | `/api/schedules` | 완료 | 생성 시 `{scheduleId}` 반환 |

### 3.5 검색·문의·공지·알림

| 기능 | API | 프론트 | 백엔드·E2E 확인 |
| --- | --- | --- | --- |
| 통합 검색 | `GET /api/search?keyword=...` | 완료 | memos/notices/todos/schedules Root 객체 |
| 서비스 공지 | `GET /api/service-notices` | 완료 | 없으면 `200 []` |
| 문의·제안 등록 | `POST /api/inquiries` | 완료 | `{inquiryId}` 반환 |
| 문의 내역 | `GET /api/inquiries/me` | 완료 | 없으면 `200 []` |
| 알림 목록 | `GET /api/notifications` | 완료 | 5개 타입과 `targetId` 반환 |
| 알림 읽음 | `PATCH /api/notifications/{id}/read` | 완료 | 읽음 상태 저장 |
| 알림 삭제 | `DELETE /api/notifications/{id}` | 완료 | 삭제 후 목록 미노출 |

알림 이동을 위한 `targetId`:

| type | targetId | 이동 위치 |
| --- | --- | --- |
| `MEMO` | memoId | 메모 상세 |
| `FRIEND_REQUEST` | requestId | 친구 요청함 |
| `TEAM_INVITE` | teamSpaceId | 팀스페이스 홈 |
| `TEAM_NOTICE` | noticeId | 공지 상세 |
| `TEAM_TODO` | todoId | 할 일 상세 조회 후 해당 팀 화면 |

### 3.6 S3 파일 업로드

공통 흐름:

```text
1. GET /api/files/presigned-url
2. presignedUrl로 S3 PUT
3. 1번의 fileType과 동일한 Content-Type 사용
4. 반환된 fileUrl을 각 도메인 API에 저장
```

| Domain | 사용 위치 | 제한 | 프론트 | 서버 확인 |
| --- | --- | --- | --- | --- |
| PROFILE | 프로필 사진 | 이미지 10MB | 완료 | 공개 조회 가능한 fileUrl |
| MEMO | 메모 이미지 | 이미지 10MB | 완료 | 이미지 메타 저장·조회 |
| TEAM | 팀 파일 | 이미지 10MB, 문서 30MB | 완료 | 목록·이름 변경·삭제 |
| INQUIRY | 문의 첨부 | 이미지 10MB, 문서 30MB | 완료 | attachmentUrl 저장 |

S3 확인 항목:

- `AllowedOrigins: ["*"]`
- `AllowedMethods: ["PUT"]`
- `AllowedHeaders: ["*"]`
- Presigned URL 요청 MIME과 PUT `Content-Type`이 반드시 동일
- `profileImageUrl`은 별도 인증 없이 앱에서 조회 가능한 최종 URL

## 4. v1.3 명세 밖의 확장 기능: richContent

메모 서식 기능은 프론트에 구현되어 있지만 현재 v1.3 API 명세와 ERD에는 `richContent`가 없다.

프론트 구성:

- `@10play/tentap-editor 1.0.1`
- Tiptap/ProseMirror JSON을 직렬화한 문자열
- `content`: 검색·목록용 평문
- `richContent`: 서식 보존용 JSON 직렬화 문자열

백엔드에서 서식 기능을 지원하려면 다음이 필요하다.

- Memo 테이블에 `rich_content` TEXT 계열 컬럼 추가
- `POST /api/memos`에 `richContent` 추가
- `PATCH /api/memos/{memoId}`에 `richContent` 추가
- `GET /api/memos/{memoId}` 응답에 `richContent` 추가
- 기존 메모는 `richContent: null` 허용

지원 전까지 이 필드는 v1.3 정식 계약이 아니라 확장 계약으로 본다.

## 5. 공동 E2E 테스트 순서

1. testuser01 로그인 후 토큰·userId·deviceId를 확인한다.
2. 잘못된 Access Token으로 보호 API를 호출해 `401` JSON Body를 확인한다.
3. Refresh Token으로 갱신한 뒤 원 요청이 한 번만 재시도되는지 확인한다.
4. 사용자 정보 5개 필드와 프로필 이미지를 변경하고 재조회한다.
5. testuser01에서 testuser02를 loginId와 nickname으로 각각 검색한다.
6. 친구 요청 전송 → testuser02 알림 및 받은 요청 → 수락 순서로 확인한다.
7. 메모 생성·상세·수정·고정·상태·휴지통·복구·영구 삭제를 확인한다.
8. 팀 생성 → testuser02 추가 → 역할 변경 → 공지·할 일·일정 CRUD를 확인한다.
9. PROFILE/MEMO/TEAM/INQUIRY 파일을 실제 S3에 업로드하고 최종 URL을 조회한다.
10. 통합 검색 네 종류와 알림 다섯 종류의 화면 이동을 확인한다.

## 6. 테스트 계정

| 구분 | testuser01 | testuser02 |
| --- | --- | --- |
| 로그인 ID | `testuser01` | `testuser02` |
| 비밀번호 | `Test1234!` | `Test5678!` |
| 이름 | `test1` | `test2` |
| 닉네임 | `tester1` | `tester2` |
| 이메일 | `testuser01@example.com` | `testuser02@example.com` |
| 휴대전화 | `010-1111-2222` | `010-3333-4444` |

## 7. 실행 및 검증 명령

AWS 서버를 사용하는 iOS 시뮬레이터 실행:

```bash
npm run start:aws
npm run ios:aws -- --simulator="iPhone 17 (26.5)"
```

프론트 정적 검증:

```bash
npm run typecheck
npm run lint
npm test -- --runInBand --watchman=false
```

현재 검증 결과:

- TypeScript: 통과
- ESLint: 통과
- Jest: 10개 Suite, 52개 Test 통과

## 8. 역할별 바로 할 일

### 프론트엔드

- AWS 환경으로 앱을 실행한다.
- 화면에서 위 E2E 시나리오를 순서대로 확인한다.
- 실패 시 개발 네트워크 로그의 Method, URL, Status, Response Body를 전달한다.
- 명세 밖의 `richContent` 지원 여부가 확정되면 전송 정책을 최종 확정한다.

### 백엔드

- 각 생성 API가 명세에 적힌 ID를 반환하는지 확인한다.
- 빈 목록은 `200 []`, 오류는 공통 Root JSON으로 반환한다.
- 친구 요청·알림 `targetId` 매핑과 중복 요청 `409`를 확인한다.
- 프로필 정보 다섯 필드가 DB에 저장되고 공개 이미지 URL이 반환되는지 확인한다.
- S3 Presigned URL, CORS, MIME, 공개 프로필 URL을 실제 버킷에서 확인한다.
- `richContent` 지원 여부와 배포 일정을 프론트에 전달한다.
