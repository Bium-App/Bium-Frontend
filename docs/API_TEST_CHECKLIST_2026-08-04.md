# Blazememo 프론트엔드 API 연동 테스트 체크리스트

- 테스트 일시: 2026-08-04 (KST)
- 서버: `http://13.124.250.181:8080`
- 대상: iOS React Native 프론트엔드 및 7/28 API 규격
- 테스트 계정: `testuser01`, `testuser02`
- 판정 기준
  - `[x] ✅`: 실서버 직접 호출 정상 및 프론트 규격과 일치
  - `[ ] ❌`: 직접 호출했으나 오류 또는 응답 규격 불일치
  - `[ ] ⏸`: 외부 인프라 미준비, 파괴적 작업 또는 선행 데이터 부족으로 보류

## 1. 인증 및 계정 화면

### SignUp

- [x] ✅ 회원가입 `POST /api/auth/signup` — `201`, 두 테스트 계정 생성 확인
- [x] ✅ 중복/검증 오류 공통 형식 — `code`, `message`, `fieldErrors` Root 객체 확인

### Login

- [x] ✅ 로그인 `POST /api/auth/login` — `200`
- [x] ✅ 로그인 응답 camelCase — `accessToken`, `refreshToken`, `userId`, `deviceId`
- [x] ✅ Access/Refresh Token JWT 형식 확인
- [x] ✅ 토큰 재발급 `POST /api/auth/refresh` — `200`, 실제 JWT 반환 확인
- [x] ✅ 비밀번호 확인 `POST /api/auth/verify-password` — `isMatched: true`

### FindId / FindPassword

- [ ] ❌ 아이디 찾기 `POST /api/auth/find` — `200`이지만 `loginId` 값이 실제 아이디가 아니라 `요청하신 정보가 전송되었습니다.`로 반환됨
- [ ] ⏸ 비밀번호 찾기 — 임시 비밀번호 발급/메일 전송으로 기존 테스트 비밀번호가 변경될 수 있어 보류

### TwoFactorAuth

- [ ] ⏸ 인증번호 발송·검증 — 실제 SMS 인프라 및 인증번호 필요

### DeviceManagement

- [x] ✅ 로그인 기기 목록 `GET /api/auth/devices` — `200`, `deviceId`, `deviceName`, `lastLoginAt`
- [x] ✅ 단일 기기 로그아웃 `DELETE /api/auth/devices/{deviceId}` — `200`
- [ ] ⏸ 현재/전체 기기 로그아웃 — 테스트 세션 전체가 만료되므로 최종 수동 테스트로 보류

## 2. 마이페이지

### MyPageMain / EditProfile

- [x] ✅ 내 정보 조회 `GET /api/users/me` — `200`
- [x] ✅ 프로필 수정 `PATCH /api/users/me` — `200`
- [ ] ⏸ 프로필 이미지 업로드 — S3 버킷 미생성

### Language / SettingNotification / MarketingConsent / TwoFactorAuth

- [x] ✅ 사용자 설정 조회 `GET /api/users/me/settings` — `200`
- [x] ✅ 사용자 설정 수정 `PATCH /api/users/me/settings` — `200`
- [ ] ⏸ 2단계 인증 활성화 — SMS 인프라 필요

### Withdrawal

- [ ] ⏸ 회원 탈퇴 `DELETE /api/users/me` — 테스트 계정이 영구 삭제되는 파괴적 작업이라 보류

### Service Notice / Inquiry / ServiceSuggestion

- [x] ✅ 서비스 공지 목록 `GET /api/service-notices` — `200`, Root 배열
- [x] ✅ 문의 등록 `POST /api/inquiries` — `201`
- [x] ✅ 내 문의 목록 `GET /api/inquiries/me` — `200`, 상태 `WAITING` 확인
- [ ] ⏸ 문의 첨부파일 — S3 버킷 미생성

## 3. 홈·타임라인·메모

### Home / Timeline

- [x] ✅ 개인 메모 목록 `GET /api/memos` — `200`, Root 배열
- [x] ✅ 생성된 메모의 `content`, `createdAt`, 상태 필드 확인

### MemoEditor

- [x] ✅ 메모 생성 `POST /api/memos` — `201`, `memoId` 반환
- [x] ✅ 메모 상세 `GET /api/memos/{memoId}` — `200`
- [x] ✅ 메모 수정 `PATCH /api/memos/{memoId}` — `200`
- [x] ✅ PIN 변경 `PATCH /api/memos/{memoId}/status?action=PIN&value=true` — `200`
- [x] ✅ FIRE/ICE 변경 `PATCH /api/memos/{memoId}/status?action=STATUS&value=ICE` — `200`
- [ ] ⏸ 메모 이미지 첨부 — S3 버킷 미생성

### Trash

- [x] ✅ 휴지통 이동 `DELETE /api/memos/{memoId}` — `200`
- [x] ✅ 휴지통 목록 `GET /api/trash` — `200`
- [x] ✅ 메모 복구 `PATCH /api/trash/{memoId}/restore` — `200`
- [x] ✅ 선택 영구삭제 `DELETE /api/trash` — `200`

## 4. 검색·알림

### Search

- [x] ✅ 통합 검색 `GET /api/search?keyword=test` — `200`
- [x] ✅ Root 객체에 `memos`, `notices`, `todos`, `schedules` 포함
- [ ] ⏸ 검색 결과별 실제 화면 이동 — 테스트 데이터가 없는 빈 결과라 수동 재시험 필요

### Notification

- [x] ✅ 알림 목록 `GET /api/notifications` — `200`, 빈 배열
- [ ] ⏸ 알림 읽음 `PATCH /api/notifications/{id}/read` — 테스트 알림 ID 없음
- [ ] ⏸ 알림 삭제 `DELETE /api/notifications/{id}` — 테스트 알림 ID 없음
- [ ] ⏸ 알림 클릭 후 MEMO/FRIEND/TEAM 화면 이동 — 알림 데이터 생성 필요

## 5. 친구

### FriendAdd

- [ ] ❌ 사용자 검색 `GET /api/friends?type=SEARCH&keyword=...` — 존재하는 두 테스트 계정을 서로 검색해도 `200 []`
- [x] ✅ 추천 친구 `GET /api/friends?type=RECOMMEND` — 친구 수락 후 상대 계정 반환 확인
- [x] ✅ 친구 요청 전송 `POST /api/friends/requests` — `200`

### FriendRequestList

- [ ] ❌ 받은 요청 목록 `GET /api/friends/requests?type=RECEIVED` — `500 INTERNAL_SERVER_ERROR`
- [ ] ❌ 보낸 요청 목록 `GET /api/friends/requests?type=SENT` — `500 INTERNAL_SERVER_ERROR`
- [x] ✅ 친구 요청 수락 `PATCH /api/friends/requests/{id}?action=ACCEPT` — `200`
- [ ] ⏸ 요청 거절·취소 — 목록 API `500`으로 프론트에서 `requestId` 확보 불가

## 6. 팀스페이스

### TeamSpaceHome / TeamCreate / ProjectDetail

- [x] ✅ 팀 생성 `POST /api/team-spaces` — `201`, `teamSpaceId` 반환
- [x] ✅ 팀 목록 `GET /api/team-spaces` — `200`, 없으면 `[]`
- [x] ✅ 팀 상세 `GET /api/team-spaces/{teamSpaceId}` — `200`
- [x] ✅ 팀 멤버 목록 `GET /api/team-members/team/{teamSpaceId}` — `200`
- [x] ✅ 팀 멤버 추가 `POST /api/team-spaces/{teamSpaceId}/members` — `201`
- [ ] ❌ 멤버 역할 수정·삭제 — 멤버 목록에 명세상 필요한 `teamMemberId`가 없어 경로 구성 불가
- [ ] ❌ 팀 삭제 `DELETE /api/team-spaces/{teamSpaceId}` — `500 INTERNAL_SERVER_ERROR`
- [ ] ❌ 일부 기존 팀 `createdAt`이 `15:53`에서 이후 `06:53`으로 반환되어 시간대가 일관되지 않음

### AddNotice / ProjectDetail

- [x] ✅ 팀 공지 생성 `POST /api/team-spaces/{teamSpaceId}/notices` — `201`
- [x] ✅ 팀 공지 목록 `GET /api/notices?teamSpaceId=...` — `200`
- [x] ✅ 팀 공지 상세 `GET /api/notices/{noticeId}` — `200`
- [x] ✅ 팀 공지 수정 `PATCH /api/notices/{noticeId}` — `200`
- [x] ✅ 팀 공지 삭제 `DELETE /api/notices/{noticeId}` — `200`

### AddTodo / ProjectTodo

- [x] ✅ 팀 할 일 생성 `POST /api/team-spaces/{teamSpaceId}/todos` — `201`
- [x] ✅ 팀 할 일 목록 `GET /api/todos?teamSpaceId=...` — `200`
- [x] ✅ 팀 할 일 상세 `GET /api/todos/{todoId}` — `200`, `teamSpaceId` 포함
- [x] ✅ 팀 할 일 수정/체크 `PATCH /api/todos/{todoId}` — `200`
- [x] ✅ 팀 할 일 삭제 `DELETE /api/todos/{todoId}` — `200`
- [x] ✅ `dueDate` 요청값과 응답값 일치 확인 (`2026-08-12`)

### AddSchedule / Schedule

- [x] ✅ 일정 생성 `POST /api/schedules` — `201`
- [x] ✅ 일정 목록 `GET /api/schedules?year=&month=&teamSpaceId=` — `200`
- [x] ✅ 일정 상세 `GET /api/schedules/{scheduleId}` — `200`, `content` 포함
- [x] ✅ 일정 수정 `PATCH /api/schedules/{scheduleId}` — `200`
- [x] ✅ 일정 삭제 `DELETE /api/schedules/{scheduleId}` — `200`

### Files

- [ ] ❌ 빈 팀 파일 목록 `GET /api/team-spaces/{teamSpaceId}/files` — `500 INTERNAL_SERVER_ERROR`
- [ ] ⏸ 파일 업로드·이름 변경·삭제 — S3 버킷과 실제 파일 데이터 미준비

## 7. S3 이미지·문서 업로드

- [x] ✅ 개발용 S3 버킷 생성 완료 전달 받음 (2026-08-06)
- [ ] ⏸ IAM 권한 및 Presigned PUT 정책 설정 필요
- [ ] ⏸ 실제 `presignedUrl`, `fileUrl` 발급 필요
- [ ] ⏸ `Content-Type` 서명 Header와 PUT Header 일치 확인 필요
- [ ] ⏸ 이미지 10MB, 문서 30MB 서버 제한 확인 필요
- [ ] ⏸ 메모 이미지·프로필 이미지·문의 첨부·팀 파일 E2E 업로드 필요

기존 Presigned URL은 `s3-put-url...` 형태의 가짜 주소였다. 2026-08-06 버킷 생성 후 즉시 재시험을 시도했으나 개발 API 서버가 연결 거부 상태여서, 서버 재가동 후 실제 URL 발급과 PUT을 확인해야 한다.

## 8. 프론트엔드 자체 검증

- [x] ✅ TypeScript 타입 검사 통과
- [x] ✅ ESLint 통과
- [x] ✅ Jest 8개 Suite, 45개 테스트 통과
- [x] ✅ iOS AWS 번들 생성 및 서버 주소 포함 확인
- [x] ✅ iPhone 17 Pro 시뮬레이터 빌드·설치·실행 성공
- [x] ✅ 47개 화면과 47개 스타일 파일 분리 확인
- [x] ✅ 실행 코드의 Mock 제거 확인
- [x] ✅ 화면에서 API 직접 호출하지 않고 Hook/API 계층 사용 확인
- [x] ✅ Root 목록 응답 공통 검증 및 빈 본문 fallback
- [x] ✅ 친구 추천/요청함과 팀 대시보드 부분 실패 격리
- [x] ✅ 팀 상세·멤버·역할 변경·내보내기·팀 삭제 UI/API 연결
- [x] ✅ 팀 할 일·일정·문의 내역·휴지통·프로필 재시도 상태 보완
- [x] ✅ 잘못된 아이디 찾기 응답을 성공 화면에 표시하지 않도록 검증

## 9. 재시험 우선순위

1. 친구 요청 `RECEIVED`/`SENT` 목록의 `500` 수정
2. 팀 삭제 `500` 수정
3. 빈 팀 파일 목록은 `200 []`로 수정
4. 친구 사용자 검색 결과 수정
5. 팀 멤버 목록에 `teamMemberId` 추가
6. 아이디 찾기 응답의 `loginId`에 실제 로그인 아이디 반환
7. 모든 `createdAt`의 KST/ISO 8601 직렬화 일관성 확인
8. 개발 서버 재가동 후 S3 전체 업로드 흐름 재시험

## 10. 테스트 데이터 정리 상태

- 메모·일정·팀 공지·팀 할 일 테스트 데이터: 삭제 완료
- 이전 로그인 기기 1개: 로그아웃 완료
- `testuser01`, `testuser02`: 친구 요청 수락 상태
- 문의 테스트 데이터: 삭제 API가 없어 1건 유지
- 테스트 팀 `teamSpaceId: 2`: 팀 삭제 API `500`으로 유지됨
- S3 테스트 객체: 아직 업로드되지 않음
