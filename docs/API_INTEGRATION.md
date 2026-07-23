# BlazeMemo API 연동 가이드

> 기준: API 명세 7/23 V2(V9), ERD 7/23 V2(V7)
>
> 갱신일: 2026-07-23
>
> 배포 대상: React Native iOS
>
> 코드 연결 상태와 실제 서버 E2E 완료 상태는 구분한다.

- 화면별 현황: [`FRONTEND_API_PAGE_STATUS.md`](./FRONTEND_API_PAGE_STATUS.md)
- 백엔드 확인 요청: [`BACKEND_HANDOFF_7_23.md`](./BACKEND_HANDOFF_7_23.md)
- 전체 진행 상황: [`PROJECT_PROGRESS_7_23.md`](./PROJECT_PROGRESS_7_23.md)

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

## 2. 7/23 V2 변경 적용

| 영역        | 7/23 V2 규격                                   | 프론트 적용                                   |
| ----------- | ---------------------------------------------- | --------------------------------------------- |
| 공통        | 통신·토큰·오류 규격 재명시                     | 기존 공통 client 동작과 일치                  |
| 회원가입    | `name`, `email`, `phoneNumber`                 | 입력 UI, 유효성 검사, Body 반영               |
| 내 정보     | `name`, `phoneNumber`, `profileImageUrl` 응답  | 프로필 화면 표시                              |
| 설정        | 6개 설정 필드                                  | 전체 필드를 GET/PATCH와 로컬 캐시에 동기화    |
| 메모        | `expiredAt`, `createdAt`, `updatedAt`          | FIRE 메모 만료 설정·남은 시간 표시            |
| 공지        | 목록에 `content`, 시각 필드                    | 목록 렌더 및 수정 데이터 보존                 |
| 할 일       | 목록·수정에 전체 필드                          | 내용·마감일·푸시·체크 전체 수정               |
| 일정        | 생성·수정에 `content/endAt`                    | 생성·상세·수정·삭제 UI 연결                   |
| 검색        | todo/schedule에 `teamSpaceId`                  | 검색 결과에서 팀 화면 이동                    |
| 서비스 공지 | `content`                                      | 공지 내용 표시                                |
| 문의        | `attachmentUrl`, Presigned domain `INQUIRY`    | 이미지 선택·S3 업로드·문의 URL 전송·목록 표시 |
| 알림        | `createdAt`                                    | 상대 시간 표시                                |
| 팀 파일     | `fileSize`, `uploadedAt`                       | 파일 정보 표시 데이터 수용                    |
| S3          | `PROFILE/MEMO/TEAM/INQUIRY`, CORS 및 용량 제한 | 발급 요청과 S3 PUT에 동일 MIME 사용           |

## 3. 도메인별 연결

### 인증·사용자

- `POST /api/auth/signup`
- `POST /api/auth/login`
- `POST /api/auth/refresh`
- `POST /api/auth/logout?type=CURRENT/ALL`
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

FIRE 메모 생성 시 `expiredAt`을 ISO 8601 날짜로 보낸다. 목록에는 본문이 없으므로 편집 화면 진입 전 상세 API를 다시 호출한다. 수정 Body에는 만료 필드가 없으므로 기존 메모의 만료 시간 변경은 노출하지 않는다.

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
- `PATCH/DELETE /api/todos/{todoId}`

할 일 PATCH는 `title`, `content`, `dueDate`, `isChecked`, `sendPush`를 모두 보존해서 전송한다.

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
- `PATCH/DELETE /api/notifications/{notificationId}`

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
- 문의 이미지: `POST /api/inquiries`의 `attachmentUrl`
- 이미지: 최대 10MB
- 문서: 최대 30MB
- 명세 CORS: `AllowedOrigins: [*]`, `AllowedMethods: [PUT]`, `AllowedHeaders: [*]`

문의 작성 화면은 이미지 1개를 선택할 수 있다. 선택한 이미지를 `INQUIRY` domain으로 업로드한 뒤 반환된 `fileUrl`을 `attachmentUrl`로 전송하며, 미첨부 시 `null`을 전송한다.

## 5. 서버 준비 후 E2E 순서

1. 회원가입 7개 필드 저장과 로그인 응답을 확인한다.
2. Access Token 만료, refresh, 원 요청 재시도를 확인한다.
3. 내 정보·설정·2FA·현재/전체 로그아웃·탈퇴를 확인한다.
4. 메모 생성·만료·상세·수정·상태·고정·휴지통을 확인한다.
5. 친구 검색·추천·요청 상태 전이를 두 계정으로 확인한다.
6. 팀 생성·팀원·공지·할 일 전체 수정·일정 CRUD를 확인한다.
7. PROFILE/MEMO/TEAM/INQUIRY Presigned URL과 S3 PUT을 확인한다.
8. 검색 이동·문의·서비스 공지·알림 targetId를 확인한다.
9. iOS 시뮬레이터와 실제 기기에서 네트워크·날짜·파일 선택을 확인한다.

## 6. 남은 백엔드 확인

- PIN 변경의 `value`가 `true/false` 문자열이 맞는지
- TEAM_TODO 알림에서 팀 화면으로 이동할 `teamSpaceId` 또는 todo 상세 API
- 로그인 기기 목록을 조회할 API
- 알림 읽음 PATCH가 기본 경로인지 `/{id}/read`인지
