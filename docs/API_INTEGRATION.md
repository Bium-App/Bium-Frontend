# BlazeMemo API 연동 가이드

> 기준: API 명세 v1.3 (8/13), ERD v1.3 (8/13)
>
> 갱신일: 2026-08-13
>
> 배포 대상: React Native iOS
>
> 코드 연결 상태와 실제 서버 E2E 완료 상태는 구분한다.

- 화면별 현황: [`FRONTEND_API_PAGE_STATUS.md`](./FRONTEND_API_PAGE_STATUS.md)
- 프론트·백엔드 공동 확인서: [`API_V1_3_FRONT_BACK_HANDOFF.md`](./API_V1_3_FRONT_BACK_HANDOFF.md)
- 백엔드 E2E 준비: [`BACKEND_HANDOFF_7_28.md`](./BACKEND_HANDOFF_7_28.md)
- 전체 진행 상황: [`PROJECT_PROGRESS_7_28.md`](./PROJECT_PROGRESS_7_28.md)

## 1. 공통 통신

| 항목          | 프론트 적용                                                  |
| ------------- | ------------------------------------------------------------ |
| Base URL      | 기본 `http://localhost:8080`, local/AWS/production 환경 분리 |
| 인증          | 보호 요청에 `Authorization: Bearer {Access_Token}` 자동 첨부 |
| 성공 응답     | wrapper 없는 Root 배열/객체 직접 파싱                        |
| 오류 응답     | `{code,message,fieldErrors}` 파싱                            |
| 상태 코드     | 400/401/403/404/409/500 사용자 문구 처리                     |
| Access Token  | 401 발생 시 refresh 후 원 요청 1회 재시도                    |
| Refresh Token | iOS Keychain 저장                                            |
| 토큰 만료     | Access 30분, Refresh 14일                                    |
| 날짜          | 서버 KST, ISO 8601 직렬화                                    |

## 2. 8/13 v1.3 변경 적용

| 영역          | 8/13 v1.3 확정 규격                                      | 프론트 적용                                      |
| ------------- | --------------------------------------------------------- | ------------------------------------------------ |
| 인증 오류     | 만료·잘못된 토큰 `401`, 실제 권한 부족 `403`              | `401`만 Refresh 후 원 요청 1회 재시도             |
| 토큰 재발급   | Access/Refresh Token과 `userId`, `deviceId` 반환           | 회전된 토큰과 사용자·기기 식별자 모두 갱신         |
| 사용자 설정   | PATCH 요청은 변경할 필드만 전송                            | 화면에서 수정된 설정 필드만 전송                   |
| 프로필 이미지 | 조회 가능한 공개 S3 URL을 `profileImageUrl`로 반환         | 반환 URL을 화면 이미지 URI로 직접 사용             |
| 메모 PIN      | `value=true/false` 문자열                                 | Boolean을 문자열로 변환해 Query 전송               |
| 팀 할 일      | `GET /api/todos/{todoId}`에 `teamSpaceId` 포함             | TEAM_TODO 알림에서 해당 팀 할 일 화면으로 이동      |
| 알림 읽음     | `PATCH /api/notifications/{id}/read`                      | 읽음 처리 후 화면 상태 즉시 갱신                   |
| S3 업로드     | Domain별 Presigned URL, 요청 MIME과 동일한 PUT Content-Type | PROFILE/MEMO/TEAM/INQUIRY 업로드 흐름 및 용량 제한 |

## 3. 도메인별 연결

### 인증·사용자

- `POST /api/auth/signup`
- `POST /api/auth/login`
- `POST /api/auth/refresh`
- `POST /api/auth/logout?type=CURRENT/ALL`
- `GET /api/auth/devices`
- `DELETE /api/auth/devices/{deviceId}`
- `POST /api/auth/find`
- `POST /api/auth/verify-password`
- `POST /api/auth/2fa`
- `GET/PATCH/DELETE /api/users/me`
- `GET/PATCH /api/users/me/settings`

회원가입 Body:

```json
{
  "loginId": "blaze",
  "password": "password",
  "name": "홍길동",
  "nickname": "불꽃",
  "email": "user@example.com",
  "phoneNumber": "01012345678",
  "provider": "LOCAL"
}
```

### 메모·휴지통

- `POST/GET /api/memos`
- `GET/PATCH/DELETE /api/memos/{memoId}`
- `PATCH /api/memos/{memoId}/status?action=PIN/STATUS&value=...`
- `GET/DELETE /api/trash`
- `PATCH /api/trash/{memoId}/restore`

FIRE 메모 생성 시 `expiredAt`을 ISO 8601 날짜로 보낸다. 목록에는 본문이 없으므로 편집 화면 진입 전 상세 API를 다시 호출한다. PIN은 `true/false` 문자열로 전송한다. 수정 Body에는 만료 필드가 없으므로 기존 메모의 만료 시간 변경은 노출하지 않는다.

서식 편집 기능은 이전 합의에 따라 `content` 평문과 Tiptap/ProseMirror JSON인 `richContent`를 함께 보낼 수 있게 유지했다. 단, `richContent`는 8/13 v1.3 명세와 ERD에는 아직 없으므로 백엔드 필드가 배포되기 전까지 확장 계약으로 관리한다.

### 친구

- `GET /api/friends?type=SEARCH/RECOMMEND&keyword=...`
- `POST /api/friends/requests`
- `GET /api/friends/requests?type=SENT/RECEIVED`
- `PATCH/DELETE /api/friends/requests/{requestId}`

### 팀스페이스

- `POST/GET /api/team-spaces`
- `GET /api/team-spaces/{teamSpaceId}`
- `POST /api/team-spaces/{teamSpaceId}/members`
- `GET /api/team-members/team/{teamSpaceId}`
- `PATCH/DELETE /api/team-members/{memberId}`
- `POST /api/team-spaces/{teamSpaceId}/notices`
- `GET /api/notices?teamSpaceId=...`
- `GET/PATCH/DELETE /api/notices/{noticeId}`
- `POST /api/team-spaces/{teamSpaceId}/todos`
- `GET /api/todos?teamSpaceId=...`
- `GET /api/todos/{todoId}`
- `PATCH/DELETE /api/todos/{todoId}`

할 일 PATCH는 `title`, `content`, `dueDate`, `isChecked`, `sendPush`를 모두 보존해서 전송한다. 할 일 상세의 `teamSpaceId`는 TEAM_TODO 알림 이동에 사용한다.

### 일정

- `POST /api/schedules`
- `GET /api/schedules?year&month&teamSpaceId?`
- `GET/PATCH/DELETE /api/schedules/{scheduleId}`

생성·수정 Body는 `title`, `content`, `startAt`, `endAt`을 사용하며 생성 시에만 `teamSpaceId`를 포함한다.

### 공통 서비스

- `GET /api/search?keyword=...`
- `GET /api/service-notices`
- `POST /api/inquiries`
- `GET /api/inquiries/me`
- `GET /api/notifications`
- `PATCH /api/notifications/{notificationId}/read`
- `DELETE /api/notifications/{notificationId}`

검색 결과의 notice/todo/schedule `teamSpaceId`를 팀 화면 이동에 사용한다.

## 4. 파일 업로드

```text
GET /api/files/presigned-url
  ?fileName={name}
  &fileType={MIME}
  &domain=PROFILE/MEMO/TEAM/INQUIRY
→ presignedUrl로 S3 PUT
  Content-Type: 발급 요청과 동일한 MIME
→ fileUrl을 메타데이터 API에 저장
```

- 프로필: `PATCH /api/users/me`
- 메모 이미지: `POST /api/memos/{memoId}/images`
- 팀 파일: `POST /api/team-spaces/{teamSpaceId}/files`
- 문의 첨부: `POST /api/inquiries`의 `attachmentUrl`
- 이미지: 최대 10MB
- 문서: 최대 30MB
- 명세 CORS: `AllowedOrigins: [*]`, `AllowedMethods: [PUT]`, `AllowedHeaders: [*]`
- 2026-08-06 버킷 생성 완료 전달을 받았다. 개발 서버 재가동 후 실제 Presigned URL, PUT, CORS Header를 재시험한다.

문의 작성 화면은 이미지 또는 문서 1개를 선택할 수 있다. 선택한 파일을 `INQUIRY` domain으로 업로드한 뒤 반환된 `fileUrl`을 `attachmentUrl`로 전송하며, 미첨부 시 `null`을 전송한다.

## 5. 잔여 E2E 순서

1. 회원가입 7개 필드 저장과 로그인 응답을 확인한다.
2. Access Token 만료, refresh, 원 요청 재시도를 확인한다.
3. 내 정보·설정·2FA·기기 목록·개별/전체 로그아웃·탈퇴를 확인한다.
4. 메모 생성·만료·상세·수정·상태·고정·휴지통을 확인한다.
5. 친구 검색·추천·요청 상태 전이를 두 계정으로 확인한다.
6. 팀 생성·팀원·공지·할 일 전체 수정·일정 CRUD를 확인한다.
7. PROFILE/MEMO/TEAM/INQUIRY Presigned URL과 S3 PUT을 확인한다.
8. 검색 이동·문의·서비스 공지·5개 알림 targetId를 확인한다.
9. iOS 시뮬레이터와 실제 기기에서 네트워크·날짜·파일 선택을 확인한다.

## 6. 현재 남은 서버·E2E 확인

- 잘못된 Access Token의 `401` Root JSON 응답은 2026-08-13 실서버에서 확인 완료
- 친구 검색·추천·SENT/RECEIVED·요청 ID·알림 생성·중복 409를 두 계정으로 재시험
- 사용자 정보 5개 필드의 DB 저장과 공개 `profileImageUrl` 조회를 재시험
- 팀 멤버 응답의 `teamMemberId`, 팀 삭제, 빈 팀 파일 `200 []`를 재시험
- PROFILE/MEMO/TEAM/INQUIRY Presigned URL, S3 PUT, 실제 조회 URL을 재시험
- 검색 결과 4개 그룹과 알림 5개 타입의 `targetId` 이동을 재시험
- `richContent` 필드가 백엔드·ERD에 추가된 뒤 서식 생성·수정·상세 조회를 재시험

프론트는 위 API가 정상화되면 추가 구조 변경 없이 재시험할 수 있도록 오류 상태, 부분 실패 격리, 팀 관리 UI와 응답 검증을 반영했다.
