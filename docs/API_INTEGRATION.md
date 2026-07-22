# BlazeMemo API 연동 가이드

> 기준: API 명세 7/21, ERD 7/21  
> 갱신일: 2026-07-22  
> 실제 서버 E2E는 백엔드 실행 주소와 테스트 계정이 준비된 뒤 진행한다.

- 화면별 현황: [`FRONTEND_API_PAGE_STATUS.md`](./FRONTEND_API_PAGE_STATUS.md)
- 백엔드 전달본: [`BACKEND_HANDOFF_7_21.md`](./BACKEND_HANDOFF_7_21.md)

## 1. 확정된 공통 통신 규약

| 항목              | 확정 규격                                              | 프론트 적용                                 |
| ----------------- | ------------------------------------------------------ | ------------------------------------------- |
| 로컬 Base URL     | iOS `localhost:8080`, Android `10.0.2.2:8080`          | `local` 환경에서 플랫폼별 자동 선택         |
| 임시/운영 URL     | AWS 임시 IP, 출시 전 운영 도메인                       | 빌드 시 `BLAZE_API_BASE_URL`로 주입          |
| 인증              | 보호 API에 `Authorization: Bearer {Access_Token}`      | axios 요청 interceptor에서 자동 첨부        |
| 일반 Content-Type | `application/json`                                     | 공통 client 기본 헤더                       |
| 바이너리          | S3에 직접 PUT 후 API에는 URL 메타데이터만 전달         | Presigned URL 발급·PUT·메타 저장 함수 분리  |
| 서버 시간대       | `Asia/Seoul`                                           | 날짜 생성 시 KST 기준 사용                  |
| DateTime          | ISO 8601 `YYYY-MM-DDTHH:mm:ss`                         | `formatApiDateTime()` 사용                  |
| Access Token      | 30분                                                   | 401 발생 시 refresh 후 원 요청 1회 재시도   |
| Refresh Token     | 14일                                                   | 로그인 응답 body에서 저장                   |
| 성공 응답         | wrapper 없이 `[...]` 또는 `{...}`를 Root에서 직접 반환 | 모든 API 함수가 `response.data`를 직접 반환 |
| 확정 오류         | `400` 유효성 실패, `401` 인증 없음/만료                | 서버 `message`를 우선 표시                  |

정상 목록 응답 예시:

```json
[
  {
    "memoId": 1,
    "title": "메모"
  }
]
```

프론트는 다음과 같은 공통 wrapper를 파싱하지 않는다.

```json
{
  "success": true,
  "data": [],
  "message": "성공"
}
```

## 2. 프론트 코드 구조

```text
src/screens/.../index.js
  → src/hooks/use기능.js
    → src/api/도메인.js
      → src/api/client.js
        → 백엔드 또는 S3
```

| 위치                | 역할                                             |
| ------------------- | ------------------------------------------------ |
| `src/screens`       | 렌더링, 입력, 버튼 이벤트                        |
| `src/hooks`         | 상태, 검증, API 실행 순서, 응답의 화면 모델 변환 |
| `src/api`           | Method, URI, Body, Query                         |
| `src/api/client.js` | Base URL, Bearer, 401 refresh                    |
| `src/utils`         | 세션 저장, 설정 캐시, 날짜 직렬화                |

## 3. 7/18에서 7/21로 변경된 내용과 적용 결과

| 도메인        | 7/21 변경                                          | 적용 결과                                               |
| ------------- | -------------------------------------------------- | ------------------------------------------------------- |
| 로그인        | 응답에 `deviceId` 추가                             | access/refresh/userId/deviceId 저장, 현재 기기 표시     |
| 계정 찾기     | `POST /api/auth/find-id` 추가                      | FindId 화면 연결                                        |
| 비밀번호 확인 | `POST /api/auth/verify-password` 추가              | 2FA 진입 전 실제 비밀번호 검증                          |
| 2FA           | setup/verify API 추가                              | 휴대폰 등록 → 코드 검증 → 새 토큰 저장 → `use2fa` 반영  |
| 사용자 설정   | `GET /api/users/{userId}/settings` 추가            | 서버 설정을 먼저 조회하고 로컬 캐시는 fallback으로 사용 |
| 메모 목록     | `content`, `createdAt` 추가                        | 홈/타임라인의 항목별 상세 조회 제거                     |
| 파일          | S3 Presigned URL 방식으로 확정                     | URL 발급 → S3 PUT → 메타 저장 함수 구현                 |
| 메모 이미지   | multipart에서 JSON 메타 `{memoId,imageUrl}`로 변경 | FormData 제거                                           |
| 친구          | 검색·요청·받은/보낸 목록·수락·거절·취소 추가       | 친구 추가/요청함 화면 연결                              |
| 추천 친구     | `name` 대신 `nickname`                             | 화면 매핑 수정                                          |
| 팀 목록       | `memberCount` 추가                                 | 팀별 멤버 목록 추가 호출 제거                           |
| 공지 목록     | `content` 추가                                     | 프로젝트 홈에서 바로 표시                               |
| 공지 상세     | `GET /api/team-notices/{noticeId}` 추가            | API 함수 추가                                           |
| 할 일         | `dueDate` null 허용 명시                           | 날짜 미선택 시 null 전송                                |
| 일정          | 개인 월별 목록 추가                                | API 함수 추가; 현재 개인 캘린더 화면은 없음             |
| 통합 검색     | 4개 결과 묶음 유지                                 | 메모·공지·할 일·일정 모두 결과에 표시                   |
| 문의 목록     | `createdAt`, `updatedAt` 추가                      | 문의 내역에 접수/수정 시각 표시                         |
| 알림 ERD      | 딥링크 ID가 `target_id`로 정리                     | `targetId` 매핑; 화면 이동 규칙은 추가 확정 필요        |

## 4. 현재 구현된 공통 처리

- 보호 요청에 Bearer access token 자동 첨부
- 동시 401에서 refresh 중복 호출 방지
- refresh 성공 후 실패한 요청 1회 재시도
- refresh 실패 시 access/refresh/userId/deviceId 제거
- 로그인 시 현재 `deviceId` 저장
- Root 배열/객체 직접 파싱
- API body의 DateTime을 `YYYY-MM-DDTHH:mm:ss`로 생성
- DELETE body `{ "memoIds": [...] }` 지원
- Presigned URL은 API 인증 요청, S3 PUT은 Base URL/Bearer 없이 별도 요청
- `local`, `aws`, `production` API 환경을 빌드 시점에 분리

### API 환경 실행 명령

```sh
# 로컬: iOS 시뮬레이터
npm run start:local
npm run ios:local

# AWS 임시 서버
BLAZE_API_BASE_URL=http://서버IP:8080 npm run start:aws
BLAZE_API_BASE_URL=http://서버IP:8080 npm run ios:aws

# 운영
BLAZE_API_BASE_URL=https://api.example.com npm run start:production
BLAZE_API_BASE_URL=https://api.example.com npm run ios:production
```

Android는 같은 방식으로 `android:local`, `android:aws`,
`android:production`을 사용한다. 환경을 변경하면 Metro를 종료한 뒤 다시
시작해야 한다. 실제 기기 로컬 테스트는 `BLAZE_API_BASE_URL`에 개발 PC의
LAN 주소를 넣는다.

## 5. 실서버 연동 순서

1. 백엔드 개발 주소를 `BLAZE_API_BASE_URL`에 넣고 `aws` 환경으로 실행한다.
2. 회원가입 → 인증번호 발송/검증 → 로그인을 확인한다.
3. 로그인 응답 4개 필드와 보호 API의 Bearer 헤더를 확인한다.
4. access token을 만료시켜 refresh → 원 요청 재시도를 확인한다.
5. 사용자 정보·설정 조회/수정, 기기 목록·원격 로그아웃을 확인한다.
6. 메모 생성 → 목록 → 수정 → 상태/고정 → 휴지통 → 복구/선택 삭제를 확인한다.
7. 팀 목록 → 공지 → 할 일 → 일정 → 파일 메타데이터를 확인한다.
8. 친구 검색 → 요청 → 받은/보낸 요청 → 수락/거절/취소를 두 계정으로 확인한다.
9. Presigned URL → S3 PUT → 최종 URL 접근 → 메타 저장을 확인한다.
10. 통합 검색, 문의, 알림을 확인한다.
11. iOS/Android 실제 기기에서 KST 날짜, 네트워크 정책, 오류 문구를 확인한다.

## 6. 아직 남은 프론트 작업

- refresh token을 AsyncStorage에서 Keychain/Keystore로 이전
- 이미지/문서 선택기 패키지 연결과 URI → Blob 변환
- 메모 이미지, 프로필 이미지, 문의 첨부, 팀 파일 업로드 UI 완성
- 공지·할 일·일정 검색 결과에 `teamSpaceId`가 제공되면 팀 상세 이동 연결
- FRIEND/TEAM 알림의 `type + targetId` 이동 연결
- 실제 서버 기반 E2E 및 실패 응답별 UI 검증

미지원 업로드·SNS 로그인·파일 이동/공유 버튼과 서비스 공지 더미 데이터는
사용자가 실제 기능으로 오인하지 않도록 화면에서 제거했다. 일정 수정 화면도
상세 응답 계약이 확정될 때까지 라우트에서 제외했다.

## 7. 백엔드와 추가 확정할 부분

- 일정 월별 목록에는 `content`가 없고 일정 상세 API도 없다. 안전한 수정 화면을 위해 상세 API 또는 목록의 `content`가 필요하다.
- 통합 검색의 `memos/notices/todos/schedules` 각 항목 필드를 명시해야 한다.
- `targetId`가 FRIEND/TEAM/MEMO에서 가리키는 리소스와 이동 화면 매핑이 필요하다.
- 2FA setup 호출이 인증번호 발송까지 수행하는지, 별도 재발송 방식이 무엇인지 확인해야 한다.
- Presigned PUT 시 서명에 포함되는 `Content-Type`과 파일 크기·확장자 제한이 필요하다.
- `400`, `401` 외 `403`, `404`, `409`, `500`의 공통 오류 정책을 확정해야 한다.
- 마이페이지 서비스 공지/FAQ는 현재 정적 화면이며 별도 API가 명세에 없다.
