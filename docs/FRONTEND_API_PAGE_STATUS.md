# BlazeMemo 화면별 API 연동 현황

> 기준: API 명세 7/28, ERD 7/28
>
> 배포 대상: iOS
>
> `연결`은 프론트 코드 기준이며 실제 서버 E2E 완료를 의미하지 않는다.
>
> 최종 점검: 2026-08-10

## 공통

| 기능            | 상태 | 적용                                 | 남은 확인     |
| --------------- | ---- | ------------------------------------ | ------------- |
| Base URL/Bearer | 연결 | 환경 분리, 보호 요청 자동 인증       | 개발 서버     |
| 401 refresh     | 연결 | 동시 갱신 방지, 원 요청 1회 재시도   | 토큰 만료 E2E |
| 오류 처리       | 연결 | code/message/fieldErrors와 상태 코드 | 실서버 오류   |
| Refresh Token   | 연결 | iOS Keychain 저장                    | 실제 기기     |
| 목록 응답 검증  | 연결 | Root 배열, 빈 본문 fallback, 오형식 감지 | 실서버 재시험 |
| S3              | 연결 | 4개 domain/fileType, 동일 MIME PUT   | 네 도메인 실업로드 완료, 크기 제한 확인 |

## 시작·인증

| 페이지       | 상태 | 7/28 연결                            | 남은 확인      |
| ------------ | ---- | ------------------------------------ | -------------- |
| Splash       | 연결 | 저장 세션 분기                       | 만료 세션      |
| Login        | 완료 | access/refresh/userId/deviceId 저장  | 만료 자동갱신 수동 확인 |
| SignUp       | 완료 | name/email/phoneNumber 포함 7개 필드 | 완료 |
| FindId       | 연결 | 실제 아이디 형식 검증                | 서버 응답값 오류 |
| FindPassword | 연결 | type PW 임시 비밀번호 발송           | 메일 발송      |

## 메모

| 페이지       | 상태 | 7/28 연결                             | 남은 확인                |
| ------------ | ---- | ------------------------------------- | ------------------------ |
| Home         | 연결 | 목록·상세·상태·문자열 PIN·휴지통·만료 | 실서버                   |
| Timeline     | 연결 | FIRE/ICE/PIN·만료 시간                | 만료 배치 동작           |
| MemoEditor   | 연결 | 생성·수정·expiredAt·MEMO 이미지       | 서버 상세 imageUrls 누락·이미지 메모 영구삭제 500 |
| Trash        | 연결 | 목록·복구·영구 삭제                   | DELETE Body              |
| Search       | 연결 | 4개 결과, 메모 상세, 팀 결과 이동     | 실응답 확인              |
| Notification | 연결 | 목록·`/read`·삭제, 5개 타입 이동      | 실서버                   |

## 팀스페이스

| 페이지            | 상태 | 7/28 연결                            | 남은 확인      |
| ----------------- | ---- | ------------------------------------ | -------------- |
| TeamSpace/Home    | 완료 | 팀 목록·상세·빈 응답 처리            | 생성시각 일관성 |
| TeamCreate        | 연결 | 검색/추천·생성·멤버 부분 실패 처리   | 검색 서버 오류 |
| ProjectDetail     | 연결 | 공지·할 일·일정·팀 상세·멤버 관리·팀 삭제 | 멤버 추가 500·teamMemberId 누락 |
| AddNotice         | 연결 | title/content/isPinned               | 실서버         |
| ProjectTodo       | 연결 | 목록·상세·전체 수정·체크·삭제        | 실서버         |
| AddTodo           | 연결 | content/dueDate/sendPush 수정        | 실서버         |
| Schedule          | 연결 | 월별 목록·상세                       | 실서버         |
| AddSchedule       | 연결 | content/startAt/endAt 생성·수정·삭제 | 시간대         |
| Files             | 완료 | 업로드·목록·다운로드·이름 변경·삭제  | 실 S3 PUT·빈 목록·메타데이터 E2E 완료 |
| FriendAdd         | 연결 | 검색/추천·요청, 요청함 실패와 추천 분리 | 검색/요청함 서버 오류 |
| FriendRequestList | 연결 | SENT/RECEIVED 독립 로딩·수락·거절·취소 | 목록 500 |

## 마이페이지

| 페이지           | 상태 | 7/28 연결                                   | 남은 확인      |
| ---------------- | ---- | ------------------------------------------- | -------------- |
| MyPage/Main      | 연결 | `/api/users/me`                             | 실응답         |
| EditProfile      | 완료 | name/email/phone 표시, nickname/이미지 수정 | PROFILE S3 E2E 완료 |
| Language/알림    | 연결 | 설정 6개 필드 GET/PATCH                     | 기기 간 동기화 |
| PasswordCheck    | 연결 | 비밀번호 확인                               | 실서버         |
| 2FA              | 연결 | SETUP → SEND → VERIFY                       | VERIFY 토큰    |
| DeviceManagement | 연결 | 기기 목록·현재 기기 구분·개별/전체 로그아웃 | 실서버         |
| Logout           | 연결 | CURRENT                                     | 실서버         |
| Withdrawal       | 연결 | `DELETE /api/users/me`                      | 실서버         |

## 서비스

| 페이지            | 상태 | 7/28 연결                                     | 남은 확인  |
| ----------------- | ---- | --------------------------------------------- | ---------- |
| Inquiry           | 완료 | 이미지 선택·INQUIRY 업로드·attachmentUrl 전송 | S3 첨부 문의 E2E 완료 |
| InquiryHistory    | 완료 | 전체 응답 필드 표시                           | 첨부 문의 내역 실응답 확인 |
| ServiceSuggestion | 연결 | SUGGESTION 등록                               | 500자 검증 |
| Notice            | 연결 | title/content/createdAt 표시                  | 실서버     |
| FAQ               | 로컬 | 정적 FAQ                                      | 없음       |
| PhoneInquiry      | 로컬 | tel 링크                                      | 운영 번호  |

## 검증

- ESLint: 통과
- Jest: 9 suites, 47 tests 통과
- iOS 프로덕션 번들: 통과
- 실제 서버 E2E: 인증·메모·팀 공지/할 일/일정·사용자/설정 등 직접 검증
- Android: 배포 범위 제외

## 현재 화면 범위 밖 API

- 팀 메모 목록 `GET /api/memos?teamSpaceId=...`는 API 모듈과 계약 테스트까지 준비되어 있으나 현재 디자인에 팀 메모 페이지·탭이 없어 화면에서는 호출하지 않는다.
- 개인 일정 목록 `GET /api/schedules?year&month`는 API 모듈이 준비되어 있으나 개인 캘린더 페이지가 없어 화면에서는 호출하지 않는다.
- 두 기능을 제품 범위에 포함하려면 화면 위치와 생성·편집 진입 방식부터 확정해야 한다.
