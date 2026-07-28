# BlazeMemo 화면별 API 연동 현황

> 기준: API 명세 7/28, ERD 7/28
>
> 배포 대상: iOS
>
> `연결`은 프론트 코드 기준이며 실제 서버 E2E 완료를 의미하지 않는다.

## 공통

| 기능            | 상태 | 적용                                 | 남은 확인     |
| --------------- | ---- | ------------------------------------ | ------------- |
| Base URL/Bearer | 연결 | 환경 분리, 보호 요청 자동 인증       | 개발 서버     |
| 401 refresh     | 연결 | 동시 갱신 방지, 원 요청 1회 재시도   | 토큰 만료 E2E |
| 오류 처리       | 연결 | code/message/fieldErrors와 상태 코드 | 실서버 오류   |
| Refresh Token   | 연결 | iOS Keychain 저장                    | 실제 기기     |
| S3              | 연결 | 4개 domain/fileType, 동일 MIME PUT   | 실제 업로드   |

## 시작·인증

| 페이지       | 상태 | 7/28 연결                            | 남은 확인      |
| ------------ | ---- | ------------------------------------ | -------------- |
| Splash       | 연결 | 저장 세션 분기                       | 만료 세션      |
| Login        | 연결 | access/refresh/userId/deviceId 저장  | 실서버 로그인  |
| SignUp       | 연결 | name/email/phoneNumber 포함 7개 필드 | 중복·형식 오류 |
| FindId       | 연결 | `/api/auth/find`, type ID            | 메일 응답      |
| FindPassword | 연결 | type PW 임시 비밀번호 발송           | 메일 발송      |

## 메모

| 페이지       | 상태 | 7/28 연결                             | 남은 확인                |
| ------------ | ---- | ------------------------------------- | ------------------------ |
| Home         | 연결 | 목록·상세·상태·문자열 PIN·휴지통·만료 | 실서버                   |
| Timeline     | 연결 | FIRE/ICE/PIN·만료 시간                | 만료 배치 동작           |
| MemoEditor   | 연결 | 생성·수정·expiredAt·MEMO 이미지       | 수정 시 만료 변경 미지원 |
| Trash        | 연결 | 목록·복구·영구 삭제                   | DELETE Body              |
| Search       | 연결 | 4개 결과, 메모 상세, 팀 결과 이동     | 실응답 확인              |
| Notification | 연결 | 목록·`/read`·삭제, 5개 타입 이동      | 실서버                   |

## 팀스페이스

| 페이지            | 상태 | 7/28 연결                            | 남은 확인      |
| ----------------- | ---- | ------------------------------------ | -------------- |
| TeamSpace/Home    | 연결 | 팀 목록·상세                         | 실서버         |
| TeamCreate        | 연결 | 검색/추천·생성·멤버 추가             | 부분 실패 처리 |
| ProjectDetail     | 연결 | 공지·할 일 전체 필드·일정 목록       | 실응답         |
| AddNotice         | 연결 | title/content/isPinned               | 실서버         |
| ProjectTodo       | 연결 | 목록·상세·전체 수정·체크·삭제        | 실서버         |
| AddTodo           | 연결 | content/dueDate/sendPush 수정        | 실서버         |
| Schedule          | 연결 | 월별 목록·상세                       | 실서버         |
| AddSchedule       | 연결 | content/startAt/endAt 생성·수정·삭제 | 시간대         |
| Files             | 연결 | 업로드·목록·다운로드·이름 변경·삭제  | S3 E2E         |
| FriendAdd         | 연결 | 검색/추천·요청                       | 두 계정        |
| FriendRequestList | 연결 | SENT/RECEIVED·수락·거절·취소         | 두 계정        |

## 마이페이지

| 페이지           | 상태 | 7/28 연결                                   | 남은 확인      |
| ---------------- | ---- | ------------------------------------------- | -------------- |
| MyPage/Main      | 연결 | `/api/users/me`                             | 실응답         |
| EditProfile      | 연결 | name/email/phone 표시, nickname/이미지 수정 | S3 E2E         |
| Language/알림    | 연결 | 설정 6개 필드 GET/PATCH                     | 기기 간 동기화 |
| PasswordCheck    | 연결 | 비밀번호 확인                               | 실서버         |
| 2FA              | 연결 | SETUP → SEND → VERIFY                       | VERIFY 토큰    |
| DeviceManagement | 연결 | 기기 목록·현재 기기 구분·개별/전체 로그아웃 | 실서버         |
| Logout           | 연결 | CURRENT                                     | 실서버         |
| Withdrawal       | 연결 | `DELETE /api/users/me`                      | 실서버         |

## 서비스

| 페이지            | 상태 | 7/28 연결                                     | 남은 확인  |
| ----------------- | ---- | --------------------------------------------- | ---------- |
| Inquiry           | 연결 | 이미지 선택·INQUIRY 업로드·attachmentUrl 전송 | S3 E2E     |
| InquiryHistory    | 연결 | 전체 응답 필드 표시                           | 실서버     |
| ServiceSuggestion | 연결 | SUGGESTION 등록                               | 500자 검증 |
| Notice            | 연결 | title/content/createdAt 표시                  | 실서버     |
| FAQ               | 로컬 | 정적 FAQ                                      | 없음       |
| PhoneInquiry      | 로컬 | tel 링크                                      | 운영 번호  |

## 검증

- ESLint: 통과
- Jest: 6 suites, 30 tests 통과
- iOS 프로덕션 번들: 통과
- 실제 서버 E2E: 서버 준비 후 진행
- Android: 배포 범위 제외
