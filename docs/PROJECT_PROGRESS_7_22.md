# BlazeMemo 프로젝트 전체 진행 현황

> 기준일: 2026-07-22  
> 프론트: React Native 0.85.2  
> 계약 기준: API 명세 7/21, ERD 7/21  
> 현재 상태: 실제 서버 API 연결 코드는 준비됐고, 백엔드 서버가 없어 E2E는 대기 중이다.

## 1. 현재 결론

- 개발용 Mock API와 Mock 데이터는 전부 제거했다.
- 프론트 API 함수는 `src/config/api.js`의 실제 Base URL만 사용한다.
- 7/21 API PDF 11페이지와 ERD PDF 9페이지를 기준으로 Method, URI, Body, 주요 응답 필드를 대조했다.
- 화면 이벤트에서 API까지 연결된 기능이 많지만, 아직 실제 서버 성공 응답을 확인한 것은 아니다.
- 서버 계약이 부족한 일정 상세, 검색의 팀 식별자, 일부 알림 딥링크는 백엔드 보완이 필요하다.
- 이미지와 문서 업로드는 API 함수는 준비됐지만 네이티브 파일 선택 UI가 남아 있다.

## 2. 프론트 구조

```text
src/screens/.../index.js
  -> src/hooks/use기능.js
    -> src/api/도메인.js
      -> src/api/client.js
        -> 실제 백엔드 또는 S3
```

| 위치 | 역할 |
| --- | --- |
| `src/screens` | 화면 렌더링, 입력, 버튼과 제스처 |
| `src/hooks` | 상태, 검증, API 실행 순서, 응답 매핑 |
| `src/api` | API Method, URI, Body, Query |
| `src/api/client.js` | Base URL, Bearer, 401 refresh |
| `src/config/api.js` | 실제 서버 주소와 timeout |
| `src/utils` | 세션 저장, 설정 캐시, 날짜 직렬화 |

## 3. 공통 통신 기반

| 항목 | 프론트 코드 상태 | 서버 준비 후 확인 |
| --- | --- | --- |
| Base URL | `http://localhost:8080` 단일 실제 서버 주소 | 개발/AWS/운영 주소 분리 |
| Authorization | 보호 요청에 Bearer 자동 첨부 | 실제 Header 확인 |
| 401 refresh | 동시 요청 중복 방지, 토큰 갱신 후 1회 재시도 | 30분 만료 시나리오 |
| refresh 실패 | 세션 삭제 후 Login 초기화 | 만료·위조 토큰 확인 |
| 세션 | accessToken, refreshToken, userId, deviceId 저장 | Keychain/Keystore 이전 |
| 응답 | wrapper 없이 Root 배열·객체 직접 파싱 | 실제 응답 확인 |
| DateTime | `YYYY-MM-DDTHH:mm:ss`, KST 기준 생성 | 자정·월말 왕복 확인 |
| S3 | Presigned URL -> S3 PUT -> 메타 저장 함수 | Header·CORS·제한 확인 |

AsyncStorage는 3.x API인 `setMany`, `getMany`, `removeMany`를 사용하며 iOS Pod 연결도 완료했다.

## 4. 화면별 진행 현황

`완료`는 화면 -> Hook -> API 코드 연결 완료를 의미한다. 실서버 검증은 별도다.

### 시작과 인증

| 화면 | 상태 | 구현 내용 |
| --- | --- | --- |
| StartScreen, Splash | 로컬 화면 | 시작·온보딩·인증 화면 이동 |
| Login | 코드 연결 완료 | 로그인, 4개 세션 값 저장 |
| SignUp | 코드 연결 완료 | 인증번호 발송·검증, 회원가입 |
| FindId | 코드 연결 완료 | 이름·이메일 아이디 조회 |
| FindPassword | 코드 연결 완료 | 코드 검증 후 비밀번호 재설정 |

### 개인 메모와 공통 화면

| 화면 | 상태 | 구현 내용 / 남은 내용 |
| --- | --- | --- |
| Home | 코드 연결 완료 | 목록, 수정 진입, FIRE/ICE, 고정, 휴지통, 새로고침 |
| Timeline | 코드 연결 완료 | 목록·수정 진입, 로딩·오류·빈 상태·새로고침 |
| MemoEditor | 일부 | 생성·수정 완료, 이미지 선택기 도입 후 업로드 UI 재노출 |
| Search | 일부 | 4개 도메인 표시, 메모 이동 완료, 팀 결과 `teamSpaceId` 필요 |
| Notification | 일부 | 목록·읽음·삭제, MEMO 이동 완료, FRIEND/TEAM 규칙 필요 |

### 팀스페이스

| 화면 | 상태 | 구현 내용 / 남은 내용 |
| --- | --- | --- |
| TeamSpace/Home | 코드 연결 완료 | 내 팀 목록·검색, memberCount, 재진입 새로고침 |
| TeamCreate | 코드 연결 완료 | 팀 생성, 친구 검색·추천·선택, 팀원 추가 |
| ProjectDetail | 일부 | 공지·할 일 CRUD, 월별 일정, 검색·조회 상태·새로고침 |
| AddNotice | 코드 연결 완료 | 제목·내용·isPinned 공지 생성 |
| ProjectTodo, AddTodo | 코드 연결 완료 | 목록·검색·생성·수정·삭제·완료 토글 |
| Schedule, AddSchedule | 일부 | 월별 목록·검색·그룹, 일정 생성 완료 |
| EditSchedule | 미노출 | 상세 API 또는 목록의 `content` 확정 전 라우트 제거 |
| Files | 일부 | 목록·검색·다운로드·이름 변경·삭제, 조회 상태·새로고침 |
| FriendAdd | 코드 연결 완료 | 검색·추천·요청, 받은 요청 수, 조회 상태·새로고침 |
| FriendRequestList | 코드 연결 완료 | 받은/보낸 요청 처리, 검색·조회 상태·새로고침 |

### 마이페이지 계정과 설정

| 화면 | 상태 | 구현 내용 / 남은 내용 |
| --- | --- | --- |
| MyPage/Main | 코드 연결 완료 | 사용자 정보와 프로필 표시 |
| EditProfile | 일부 | 닉네임 수정 완료, 프로필 이미지 업로드 남음 |
| Language | 코드 연결 완료 | language, timezone, dateFormat 조회·저장 |
| SettingNotification | 코드 연결 완료 | allowPush, allowEvent 조회·저장 |
| 2FA 흐름 | 일부 | 비밀번호 확인, setup, verify, 토큰 교체, 3분 타이머 연결 |
| DeviceManagement | 코드 연결 완료 | 기기 목록, 원격·전체 로그아웃 |
| Trash | 코드 연결 완료 | 목록, 복구, 선택 영구 삭제 |
| MarketingConsent | 코드 연결 완료 | allowEvent 저장 |
| Logout | 코드 연결 완료 | 현재 device 서버 로그아웃 후 세션 삭제 |
| Withdrawal | 코드 연결 완료 | Soft Delete 후 세션 삭제 |

### 마이페이지 서비스

| 화면 | 상태 | 구현 내용 / 남은 내용 |
| --- | --- | --- |
| Inquiry | 일부 | ONE_ON_ONE 등록만 노출, attachmentUrl 업로드 남음 |
| InquiryHistory | 코드 연결 완료 | 목록, WAITING/ANSWERED, response, 시간 표시 |
| ServiceSuggestion | 코드 연결 완료 | SUGGESTION 등록 |
| FAQ | 정적 화면 | 현재 API 불필요 |
| Service Notice | 대기 | 더미 제거, 명세에 별도 서비스 공지 API 없음 |
| PhoneInquiry | 로컬 기능 | `tel:` 연결 |

## 5. 7/21 명세 반영 핵심

- 로그인 응답의 `deviceId` 저장과 현재 기기 표시
- `POST /api/auth/find-id`, `verify-password`, 2FA setup/verify 연결
- 사용자 설정 GET/PATCH 연결
- 메모 목록의 `content`, `createdAt` 사용으로 상세 N+1 제거
- 메모 상세 조회 API 연결
- S3 Presigned URL 방식과 JSON 메타 저장 구조 적용
- 친구 검색·추천·요청·수락·거절·취소 전체 연결
- 팀 목록 `memberCount` 사용으로 팀원 목록 N+1 제거
- 공지 목록 `content`, 공지 상세 API 반영
- 할 일 `dueDate: null` 허용
- 개인·팀 월별 일정 API 함수 준비
- 통합 검색 Root의 memos/notices/todos/schedules 처리
- 문의 목록의 createdAt, updatedAt, response 처리
- 알림 `targetId`를 MEMO 이동에 적용

## 6. API 함수는 준비됐지만 화면에서 전부 사용하지 않는 기능

- 개인 월별 일정 조회
- 공지 상세 조회
- 팀원 역할 변경과 제거
- 일정 수정과 삭제
- Presigned URL 업로드 전체 순서
- 메모 이미지와 팀 파일 메타 저장

## 7. 백엔드 확인 또는 보완이 필요한 항목

1. 일정 상세 API를 추가하거나 월별 목록에 `content` 제공
2. 통합 검색 각 항목의 전체 필드와 공지·할 일·일정의 `teamSpaceId` 제공
3. FRIEND/TEAM/MEMO별 알림 `targetId` 대상 규칙 제공
4. 2FA setup의 SMS 발송 여부와 재발송 방식
5. Presigned PUT의 Content-Type, 필수 Header, 확장자·MIME·크기 제한과 CORS
6. `403`, `404`, `409`, `500` 오류 상태와 Root 에러 형식
7. 서비스 공지와 FAQ를 서버 관리형으로 만들 경우 별도 API 추가

현재 기기 로그아웃 API는 7/21 명세에 이미 있으므로 추가 요청 대상이 아니다.

## 8. 프론트에 남은 작업

### 서버 없이 가능한 작업

- 개발/AWS/운영 Base URL 환경 분리
- 이미지·문서 선택기 설치와 URI -> Blob 변환
- 메모·프로필·문의·팀 파일 업로드 UI
- Refresh Token을 Keychain/Keystore로 이전
- 나머지 화면의 로딩·빈 상태·오류·중복 클릭 UX 추가 점검

### 서버 또는 계약이 있어야 가능한 작업

- 실제 로그인과 401 refresh E2E
- 메모·팀·친구·설정 전체 성공·실패 E2E
- 일정 수정 화면 연결
- 검색의 팀 상세 이동
- FRIEND/TEAM 알림 딥링크
- S3 실제 업로드와 다운로드 검증

## 9. 서버 준비 후 검증 순서

1. 개발 Base URL과 테스트 계정 두 개를 받는다.
2. 회원가입, 코드 검증, 로그인과 4개 세션 필드를 확인한다.
3. Bearer와 401 refresh, refresh 실패 로그아웃을 확인한다.
4. 사용자 정보·설정·기기·로그아웃·탈퇴를 확인한다.
5. 메모 생성부터 휴지통 영구 삭제까지 확인한다.
6. 팀 생성, 팀원, 공지, 할 일, 일정을 확인한다.
7. 두 계정으로 친구 요청 상태 전이를 확인한다.
8. Presigned URL, S3 PUT, 메타 저장을 확인한다.
9. 검색, 문의, 알림을 확인한다.
10. iOS와 Android 실제 기기에서 날짜·네트워크·오류 UX를 확인한다.

## 10. 현재 검증과 Git 상태

- ESLint: 오류 0, 경고 0
- iOS Metro bundle: 성공
- iOS AsyncStorage Pod 설치 및 네이티브 빌드: 성공
- 실제 서버 E2E: 서버 미준비로 대기
- 개발용 Mock API: 제거 완료
- 변경 파일은 로컬 워크스페이스에 저장됐지만 아직 Git 커밋하지 않았다.

## 관련 문서

- 화면별 상세 현황: `docs/FRONTEND_API_PAGE_STATUS.md`
- API 연동 가이드: `docs/API_INTEGRATION.md`
- 백엔드 전달용 확인서: `docs/BACKEND_HANDOFF_7_21.md`
