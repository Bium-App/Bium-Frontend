# BlazeMemo 프로젝트 진행 상황

> 기준: API 명세 7/23 V2(V9), ERD 7/23 V2(V7)
>
> 프론트: React Native iOS
>
> 상태: 코드 계약 반영 완료, 실제 서버 E2E 대기

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
- 7/23 회원가입 `name/email/phoneNumber` 반영
- FIRE 메모 `expiredAt` 설정과 표시
- 할 일 전체 필드 수정
- 일정 content/startAt/endAt 생성·수정·삭제
- 검색 todo/schedule teamSpaceId 이동
- 문의 이미지 선택·S3 업로드·attachmentUrl 전송
- 7/23 V2 API 계약 테스트
- ESLint·Jest 30개·iOS 프로덕션 번들 통과
- Android 배포 범위 제외

## 부분 완료

- TEAM_TODO 알림: todoId만으로 팀 화면을 찾을 수 없음
- 로그인 기기 관리: 기기 목록 GET이 없음
- 메모 PIN: value 형식 최종 확인 필요
- 알림 읽음: `/read` 사용 여부 확인 필요

## 서버 준비 후

1. 개발 Base URL과 테스트 계정을 설정한다.
2. 인증·토큰 만료·refresh를 검증한다.
3. 두 계정으로 친구와 팀 협업을 검증한다.
4. 메모 만료와 상태 배치를 검증한다.
5. 할 일·일정 전체 필드 저장을 검증한다.
6. S3 CORS와 네 가지 domain 업로드를 검증한다.
7. 검색·알림 딥링크를 검증한다.
8. iOS 실제 기기에서 파일·Keychain·네트워크를 검증한다.

세부 내용:

- [`API_INTEGRATION.md`](./API_INTEGRATION.md)
- [`FRONTEND_API_PAGE_STATUS.md`](./FRONTEND_API_PAGE_STATUS.md)
- [`BACKEND_HANDOFF_7_23.md`](./BACKEND_HANDOFF_7_23.md)
