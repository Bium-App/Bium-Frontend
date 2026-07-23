# BlazeMemo API 연동 가이드

> 기준: API 명세 7/22, ERD 7/22
>
> 갱신일: 2026-07-22
>
> 배포 대상: iOS
>
> 실제 서버 E2E는 개발 서버와 테스트 계정이 준비된 뒤 진행한다.

- 화면별 현황: [`FRONTEND_API_PAGE_STATUS.md`](./FRONTEND_API_PAGE_STATUS.md)
- 백엔드 확인 요청: [`BACKEND_HANDOFF_7_22.md`](./BACKEND_HANDOFF_7_22.md)

## 1. 공통 통신 규약

| 항목          | 7/22 규격                              | 프론트 적용                                |
| ------------- | -------------------------------------- | ------------------------------------------ |
| Base URL      | 개발/테스트 `http://localhost:8080`    | local/AWS/production 환경 분리             |
| 인증          | `Authorization: Bearer {Access_Token}` | axios interceptor 자동 첨부                |
| 성공 응답     | wrapper 없는 Root 배열/객체            | `response.data` 직접 사용                  |
| 오류 응답     | `{code,message,fieldErrors}`           | `message` 우선 표시, fieldErrors 파싱 가능 |
| 상태 코드     | 400/401/403/404/409/500                | 상태별 기본 사용자 문구 적용               |
| Access Token  | 30분                                   | 401 시 refresh 후 원 요청 1회 재시도       |
| Refresh Token | 14일                                   | iOS Keychain 저장                          |

## 2. 7/22 핵심 변경과 적용

| 도메인      | 7/22 계약                                                  | 프론트 적용                                    |
| ----------- | ---------------------------------------------------------- | ---------------------------------------------- |
| 계정 찾기   | `POST /api/auth/find`, `type=ID/PW`                        | 아이디 조회와 임시 비밀번호 메일 발송으로 변경 |
| 로그아웃    | `POST /api/auth/logout?type=CURRENT/ALL`                   | 현재/전체 로그아웃 연결                        |
| 2FA         | `POST /api/auth/2fa`, action 방식                          | SETUP → SEND → VERIFY 순서 적용                |
| 사용자      | `/api/users/me`, `/me/settings`                            | URL의 userId 제거                              |
| 친구        | `/api/friends`, `/requests` + type/action                  | 검색·추천·요청함·수락·거절·취소 갱신           |
| 메모        | `POST/GET /api/memos`                                      | 개인은 query 없음, 팀은 `teamSpaceId` query    |
| 메모 상태   | `/api/memos/{id}/status?action=...&value=...`              | STATUS/PIN 통합 경로 적용                      |
| 휴지통      | `/api/trash`                                               | 목록·복구·선택 영구 삭제 갱신                  |
| 팀          | `/api/team-spaces`                                         | 내 팀 목록에서 userId 제거                     |
| 공지        | 목록 `/api/notices?teamSpaceId=`, 상세 `/api/notices/{id}` | 축약 목록 클릭 시 상세 재조회                  |
| 할 일       | `/api/todos?teamSpaceId=`                                  | 생성·목록·제목/체크 수정·삭제 갱신             |
| 일정        | `startAt`, `endAt`                                         | 시작/종료 일시 입력과 월별 목록·상세 조회 적용 |
| 문의        | `/api/inquiries`, `/api/inquiries/me`                      | userId와 명세 밖 attachmentUrl 제거            |
| 서비스 공지 | `GET /api/service-notices`                                 | 마이페이지 공지 화면 연결                      |
| 알림        | `/api/notifications/{id}`                                  | 목록·읽음·삭제 및 타입별 targetId 처리         |
| 파일        | `fileName`, `fileType`, `domain`                           | PROFILE/MEMO/TEAM과 동일 MIME PUT 적용         |

## 3. 파일 업로드 순서

```text
GET /api/files/presigned-url
  ?fileName={name}
  &fileType={MIME}
  &domain=PROFILE/MEMO/TEAM
→ presignedUrl로 S3 PUT
  Content-Type: 발급 요청과 동일한 MIME
→ fileUrl 메타데이터 저장
```

- 프로필: `PATCH /api/users/me`
- 메모 이미지: `POST /api/memos/{memoId}/images`
- 팀 파일: `POST /api/team-spaces/{teamSpaceId}/files`
- 제한: 이미지 10MB, 문서 30MB

## 4. 화면 데이터 안전 처리

- 메모 목록에는 본문이 없으므로 수정 화면 진입 전에 `GET /api/memos/{memoId}`를 호출한다.
- 공지 목록에는 본문이 없으므로 수정 모달 진입 전에 `GET /api/notices/{noticeId}`를 호출한다.
- 할 일 목록에는 상세 API가 없으므로 기존 항목은 제목과 체크 상태만 수정한다.
- 문의 목록은 명세에 있는 `inquiryId`, `status`, `response`만으로도 렌더링한다.
- 일정은 `scheduleDate`를 사용하지 않고 `startAt/endAt`으로 표시한다.
- 문서에 없는 이메일 인증, 직접 비밀번호 재설정, 문의 첨부 요청은 호출하지 않는다.

## 5. 서버 준비 후 E2E 순서

1. 회원가입 → 로그인 → Bearer 보호 요청을 확인한다.
2. Access Token 만료 → refresh → 원 요청 재시도를 확인한다.
3. 내 정보·설정·2FA·현재/전체 로그아웃·탈퇴를 확인한다.
4. 메모 생성 → 상세 → 수정 → 상태/고정 → 휴지통을 확인한다.
5. 친구 검색·추천·요청함 상태 전이를 두 계정으로 확인한다.
6. 팀 생성 → 팀원 → 공지 → 할 일 → 일정을 확인한다.
7. PROFILE/MEMO/TEAM Presigned URL과 S3 PUT을 확인한다.
8. 검색·문의·서비스 공지·알림 targetId를 확인한다.
9. iOS 시뮬레이터와 실제 기기에서 네트워크·날짜·파일 선택을 확인한다.

## 6. 백엔드 확인이 필요한 명세 불일치

- 회원가입 Body에는 `name`, `email`이 없지만 ERD의 `name`은 NOT NULL이고 계정 찾기는 email을 사용한다.
- ERD에는 `expired_at`이 있지만 메모 생성·상세 계약에는 만료 설정 필드가 없다.
- Inquiry ERD에는 `attachment_url`이 있지만 등록 API와 파일 domain에는 문의 첨부가 없다.
- Schedule ERD/상세에는 `content`, `endAt`이 있지만 생성·수정 Body 지원 범위가 서로 다르다.
- TEAM_TODO 알림은 todoId만 제공하지만 할 일 단건 조회 API와 teamSpaceId가 없다.
- 로그인 기기 목록 API가 없어 현재 기기 외의 개별 `deviceId`를 프론트에서 얻을 수 없다.

세부 전달 문구는 `BACKEND_HANDOFF_7_22.md`에 정리되어 있다.
