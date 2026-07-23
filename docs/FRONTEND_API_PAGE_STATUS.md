# BlazeMemo 화면별 API 연동 현황

> 기준 문서: API 명세 7/22, ERD 7/22
>
> 기준일: 2026-07-22
>
> `연결`은 프론트 코드 기준이며 실제 서버 E2E 완료를 뜻하지 않는다.

## 공통

| 기능            | 상태 | 7/22 적용                                | 남은 작업           |
| --------------- | ---- | ---------------------------------------- | ------------------- |
| Base URL/Bearer | 연결 | 환경 분리, 보호 요청 자동 인증           | 개발 서버 확인      |
| 401 refresh     | 연결 | 동시 요청 방지, 1회 재시도               | 토큰 만료 E2E       |
| 오류            | 연결 | code/message/fieldErrors와 6개 상태 코드 | 실제 오류 응답 확인 |
| Refresh Token   | 연결 | iOS Keychain 저장                        | 실제 기기 확인      |
| S3              | 연결 | fileName/fileType/domain, 동일 MIME PUT  | CORS·서버 제한 확인 |

## 시작·인증

| 페이지             | 상태 | 연결 내용                           | 확인 필요             |
| ------------------ | ---- | ----------------------------------- | --------------------- |
| StartScreen/Splash | 연결 | 저장 세션 분기                      | 만료 세션 확인        |
| Login              | 연결 | access/refresh/userId/deviceId 저장 | 실서버 로그인         |
| SignUp             | 연결 | 7/22 Body 네 필드                   | ERD name/email 불일치 |
| FindId             | 연결 | `/api/auth/find`, type ID           | 실서버 응답           |
| FindPassword       | 연결 | type PW 임시 비밀번호 메일          | 메일 발송 확인        |

## 개인 메모·공통

| 페이지       | 상태 | 연결 내용                                                   | 확인 필요                 |
| ------------ | ---- | ----------------------------------------------------------- | ------------------------- |
| Home         | 연결 | 축약 목록, 상세 진입, 상태/PIN, 휴지통                      | PIN value 확인            |
| Timeline     | 부분 | FIRE/ICE/PIN 분류, 상세 진입                                | expiredAt API 없음        |
| MemoEditor   | 연결 | 생성·수정, MEMO 이미지 업로드                               | 만료 필드 확인            |
| Search       | 부분 | 4개 결과, 메모 상세, 공지 팀 이동                           | todo/schedule teamSpaceId |
| Notification | 부분 | 목록·읽음·삭제, MEMO/FRIEND_REQUEST/TEAM_INVITE/TEAM_NOTICE | TEAM_TODO 상세 경로       |

## 팀스페이스

| 페이지            | 상태 | 연결 내용                                | 확인 필요               |
| ----------------- | ---- | ---------------------------------------- | ----------------------- |
| TeamSpace/Home    | 연결 | `/api/team-spaces` 목록                  | 실서버 확인             |
| TeamCreate        | 연결 | 추천/검색, 생성, 멤버 추가               | 부분 실패 확인          |
| ProjectDetail     | 연결 | 공지 상세 재조회, 할 일, 일정 목록       | 축약 응답 확인          |
| AddNotice         | 연결 | title/content/isPinned 등록              | 실서버 확인             |
| ProjectTodo       | 연결 | 목록·제목/체크 수정·삭제                 | 할 일 상세 API 없음     |
| AddTodo           | 연결 | title/content/dueDate/sendPush 생성      | 수정은 제목/체크만 지원 |
| Schedule          | 연결 | startAt/endAt 월별 그룹, 상세 조회       | 수정 UI 미구현          |
| AddSchedule       | 연결 | 시작/종료 일시 생성                      | content/endAt 수정 계약 |
| Files             | 연결 | TEAM 업로드·목록·다운로드·이름 변경·삭제 | S3 E2E                  |
| FriendAdd         | 연결 | type SEARCH/RECOMMEND, 요청 전송         | 두 계정 E2E             |
| FriendRequestList | 연결 | SENT/RECEIVED, ACCEPT/REJECT/DELETE      | 두 계정 E2E             |

## 마이페이지

| 페이지             | 상태 | 연결 내용                     | 확인 필요             |
| ------------------ | ---- | ----------------------------- | --------------------- |
| MyPage/Main        | 연결 | `/api/users/me`               | 응답 필드 확인        |
| EditProfile        | 연결 | nickname, PROFILE 이미지      | S3 E2E                |
| Language/알림 설정 | 연결 | `/api/users/me/settings`      | 기기 간 동기화        |
| PasswordCheck      | 연결 | password 단독 Body            | 실서버 확인           |
| 2FA 설정           | 연결 | SETUP → SEND → VERIFY         | VERIFY 토큰 응답 확인 |
| DeviceManagement   | 부분 | 현재 기기 표시, 전체 로그아웃 | 기기 목록 GET 없음    |
| Trash              | 연결 | `/api/trash` 목록·복구·삭제   | DELETE Body 확인      |
| Logout             | 연결 | type CURRENT                  | 실서버 확인           |
| Withdrawal         | 연결 | `DELETE /api/users/me`        | 실서버 확인           |

## 서비스

| 페이지            | 상태 | 연결 내용                           | 확인 필요                 |
| ----------------- | ---- | ----------------------------------- | ------------------------- |
| Inquiry           | 연결 | `/api/inquiries` ONE_ON_ONE         | ERD attachment_url 불일치 |
| InquiryHistory    | 연결 | `/api/inquiries/me`, 축약 응답 대응 | 실서버 필드 확인          |
| ServiceSuggestion | 연결 | SUGGESTION 등록                     | 500자 검증                |
| Notice            | 연결 | `/api/service-notices`              | 상세 내용 제공 여부       |
| FAQ               | 로컬 | 정적 FAQ, 파일 10/30MB 표시         | 없음                      |
| PhoneInquiry      | 로컬 | tel 링크                            | 운영 번호                 |

## 검증

- ESLint: 통과
- Jest: 기존 23개 통과, 7/22 API 계약 테스트 추가
- iOS 네이티브 빌드: 파일 선택기 추가 시점에 성공
- 실제 서버 E2E: 서버 미준비로 대기
- Android: 배포 범위 제외
