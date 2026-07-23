# BlazeMemo 프로젝트 진행 현황

> 프론트: React Native 0.85.2
>
> 계약 기준: API 명세 7/22, ERD 7/22
>
> 배포 범위: iOS
>
> 상태: 7/22 프론트 계약 반영 완료, 실제 서버 E2E 대기

## 완료한 작업

- 개발용 Mock 제거 및 실제 Base URL 전용 구조
- local/AWS/production 환경 분리
- Bearer 자동 첨부, 401 refresh, 세션 만료 처리
- Refresh Token iOS Keychain 저장
- 공통 오류 `code/message/fieldErrors` 처리
- 7/22 토큰 기반 `/me`·통합 컬렉션 URI로 API 전면 교체
- 이미지·문서 네이티브 선택기와 PROFILE/MEMO/TEAM 업로드
- 메모·공지 축약 목록의 상세 재조회 안전 처리
- 일정 `scheduleDate` 제거 및 `startAt/endAt` 적용
- 서비스 공지 API 신규 연결
- 알림 targetId 타입 매핑 적용
- 화면별/백엔드 전달 문서 7/22 갱신

## 7/22에서 크게 바뀐 영역

1. URL에 반복되던 userId가 제거되고 Bearer 사용자 기준으로 통합됐다.
2. 친구·메모·팀·공지·할 일·일정이 컬렉션형 REST 경로로 재정리됐다.
3. 휴지통이 `/api/trash`로 분리됐다.
4. 2FA가 action 기반 단일 API로 통합됐다.
5. 일정이 시작/종료 일시 모델로 바뀌었다.
6. 파일 업로드가 prefix 대신 `domain + fileType`을 사용한다.
7. 알림 type과 targetId 의미가 확정됐다.

## 서버 없이 완료한 검증

- ESLint
- Jest 렌더·설정·오류·세션·파일 선택 테스트
- 7/22 API Method/URI/Body/Query 계약 테스트
- iOS 이미지·문서 선택 라이브러리 Pod 연결
- iOS 시뮬레이터 네이티브 빌드

## 서버가 있어야 가능한 작업

1. 로그인과 refresh 만료 시나리오
2. 메모·휴지통·친구·팀 협업 전체 E2E
3. PROFILE/MEMO/TEAM Presigned URL과 S3 CORS
4. 서비스 공지·문의·알림 실제 응답
5. 공통 400/401/403/404/409/500 UI 확인
6. iOS 실제 기기 파일 선택과 업로드

## 백엔드 답변이 필요한 항목

- 회원가입 name/email과 ERD 불일치
- 메모 expiredAt 및 PIN value
- 문의 attachmentUrl과 업로드 domain
- 일정 content/endAt 생성·수정 범위
- TEAM_TODO 딥링크용 단건 조회 또는 teamSpaceId
- 로그인 기기 목록 조회 API

자세한 전달 내용은 `docs/BACKEND_HANDOFF_7_22.md`를 참고한다.
