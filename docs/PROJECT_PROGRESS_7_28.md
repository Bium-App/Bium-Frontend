# BlazeMemo 프로젝트 진행 상황

> 기준: API 명세 7/28, ERD 7/28
>
> 프론트: React Native iOS
>
> 상태: 코드 계약 반영 완료, 1차 실서버 E2E 완료

## 완료

- Mock 제거 및 실제 API 모듈 사용
- 환경별 Base URL 분리
- Bearer 자동 첨부와 401 refresh 재시도
- Refresh Token iOS Keychain 저장
- 공통 오류 상태 UI
- 인증·사용자·친구·메모·휴지통 연동
- 팀스페이스·멤버·공지·할 일·일정 연동
- 통합 검색·서비스 공지·문의·알림 연동
- PROFILE/MEMO/TEAM/INQUIRY Presigned URL 업로드
- 이미지·문서 네이티브 선택기
- 회원가입 `name/email/phoneNumber` 반영
- FIRE 메모 `expiredAt` 설정과 표시
- 할 일 전체 필드 수정
- 일정 content/startAt/endAt 생성·수정·삭제
- 검색 todo/schedule teamSpaceId 이동
- 문의 이미지 선택·S3 업로드·attachmentUrl 전송
- 7/28 기기 목록·개별 로그아웃 연동
- 7/28 TEAM_TODO 상세 조회·팀 화면 이동
- 7/28 알림 읽음 `/read` 경로 반영
- 7/28 API 계약 테스트
- ESLint·Jest 30개·iOS 프로덕션 번들 통과
- Android 배포 범위 제외
- 팀 상세 이름·멤버 목록·리더 권한·역할 변경·내보내기·팀 삭제 UI 연결
- 친구 추천/요청함과 팀 대시보드의 부분 실패 격리
- 모든 Root 목록 응답 공통 검증과 아이디 찾기 응답 검증
- 팀 할 일·일정·문의 내역·휴지통·프로필 오류/빈/재시도 상태 보완
- Jest 8개 Suite, 45개 테스트 통과

## 명세 확정

- 메모 PIN은 `true/false` 문자열
- TEAM_TODO는 todo 상세 응답의 `teamSpaceId`로 이동
- 기기 목록 GET 경로 확정
- 알림 읽음 `/read` 경로 확정
- 개발 S3 CORS와 용량 제한 확정

## 실서버 1차 검증 결과

인증, refresh, 사용자/설정, 메모/휴지통, 팀 생성·상세·멤버 추가, 공지, 할 일, 일정, 문의, 공지, 검색/알림 목록은 정상 응답을 확인했다.

남은 차단 항목은 친구 검색 빈 응답, 친구 요청 목록 500, 팀 멤버 `teamMemberId` 누락, 팀 삭제 500, 빈 팀 파일 목록 500, 아이디 찾기 응답값, 일부 생성시각 불일치다. S3 버킷은 2026-08-06 생성됐으며 서버 재가동 후 Presigned URL·PUT·CORS를 검증한다. 상세 결과는 [`API_TEST_CHECKLIST_2026-08-04.md`](./API_TEST_CHECKLIST_2026-08-04.md)에 기록한다.

세부 내용:

- [`API_INTEGRATION.md`](./API_INTEGRATION.md)
- [`FRONTEND_API_PAGE_STATUS.md`](./FRONTEND_API_PAGE_STATUS.md)
- [`BACKEND_HANDOFF_7_28.md`](./BACKEND_HANDOFF_7_28.md)
