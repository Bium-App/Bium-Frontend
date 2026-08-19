# Bium Frontend

> **필요한 정보는 필요한 만큼만, 중요한 정보는 오래도록.**

정보의 수명에 따라 메모를 **FIRE / ICE / TRASH** 상태로 구분하여 관리하는 모바일 메모 애플리케이션 **비움(Bium)**의 Frontend Repository입니다.

## Team

- Team: 비움
- GitHub Organization: Bium-App
- Repository: Bium-Frontend

## 프로젝트 소개

기존 메모 애플리케이션에서는 일시적으로 필요한 정보와 장기간 보관할 정보가 같은 방식으로 누적되면서, 사용자가 직접 메모를 분류하거나 삭제해야 하는 관리 부담이 발생할 수 있습니다.

**비움(Bium)**은 이러한 문제를 개선하기 위해 메모에 **정보 수명** 개념을 적용한 모바일 메모 애플리케이션입니다.

메모를 **FIRE / ICE / TRASH** 상태로 구분하고, 정보가 필요한 기간과 보관 목적에 따라 메모의 상태를 관리할 수 있도록 구성했습니다.

- **FIRE**: 일정 시간 동안 필요한 정보를 관리하는 메모
- **ICE**: 장기간 보관할 정보를 관리하는 메모
- **TRASH**: 만료되거나 삭제된 메모를 복구하거나 영구 삭제할 수 있는 영역

개인 중심의 메모 관리 기능과 함께 **TeamSpace**를 통해 팀 단위 정보 관리로 확장할 수 있는 구조를 제공합니다.

Frontend는 **React Native** 기반 모바일 클라이언트로 구성되어 있으며, REST API를 통해 Bium Backend와 통신합니다.

## 핵심 기능

### FIRE

일시적으로 필요한 정보를 관리하기 위한 메모 상태입니다.

- 6시간 / 12시간 / 24시간 만료 시간 설정
- 남은 만료 시간 표시
- 설정된 만료 시각을 기준으로 만료 상태 확인
- 만료된 FIRE 메모의 TRASH 이동
- 스와이프를 통한 ICE 상태 전환

FIRE 메모는 만료되더라도 즉시 영구 삭제되지 않고 TRASH로 이동합니다.

### ICE

장기간 보관할 정보를 관리하기 위한 메모 상태입니다.

- 자동 만료 대상에서 제외
- 중요 메모 상단 고정 / 고정 해제
- 스와이프를 통한 고정 상태 변경
- 메모 관리 기능을 통한 FIRE 상태 전환

### TRASH

만료되거나 사용자가 삭제한 메모를 관리하는 영역입니다.

- TRASH 메모 목록 조회
- 메모 복구
- 여러 메모 선택
- 선택 메모 영구 삭제

Bium에서는 **TRASH 이동과 영구 삭제를 서로 다른 동작으로 구분합니다.**

## 주요 기능

### 메모 관리

- 메모 생성 / 조회 / 수정
- 메모 상세 조회
- FIRE / ICE 상태 기반 메모 관리
- FIRE 메모 만료 시간 설정
- FIRE → ICE 상태 전환
- ICE → FIRE 상태 전환
- ICE 메모 상단 고정 / 고정 해제
- 메모 TRASH 이동
- TRASH 메모 복구 / 영구 삭제
- Home 및 Timeline 기반 메모 조회
- 작성 시각을 기준으로 한 최신순 정렬

### 메모 편집

메모 본문 편집에는 **TenTap Editor / Tiptap** 기반 Rich Text Editor를 적용했습니다.

- 제목 및 본문 작성
- 굵게
- 기울임
- 밑줄
- 텍스트 색상
- 서식이 포함된 메모 내용 저장 및 수정
- 이미지 선택 및 첨부
- S3 Presigned URL 기반 이미지 업로드 연동

### 인증 및 사용자

- 일반 회원가입
- 일반 로그인
- 아이디 찾기
- 비밀번호 찾기
- Access Token 기반 인증
- Refresh Token을 이용한 로그인 세션 갱신
- 2단계 인증
- 로그인 기기 조회
- 개별 기기 로그아웃
- 프로필 조회 / 수정
- 사용자 설정 관리
- 로그아웃
- 회원 탈퇴

인증이 필요한 API 요청에는 Access Token을 사용하며, Access Token이 만료된 경우 저장된 Refresh Token을 이용해 세션 갱신을 시도합니다.

Refresh Token은 `react-native-keychain`을 이용해 안전하게 저장하고, Access Token과 사용자·기기 식별 정보는 AsyncStorage에서 관리합니다.

### 검색 및 알림

- 통합 검색
- 최근 검색 기록 관리
- 알림 목록 조회
- 알림 읽음 처리
- 알림 삭제
- 알림 대상에 따른 관련 화면 이동

### TeamSpace

TeamSpace는 개인 중심의 정보 관리 구조를 팀 단위로 확장하기 위한 협업 기능입니다.

현재 Frontend에는 TeamSpace 관련 화면과 API 연동 구조가 포함되어 있습니다.

- TeamSpace 생성 및 조회
- TeamSpace 상세 화면
- 팀원 관리
- 친구 검색 및 요청 관리
- 팀 공지 관리
- 팀 할 일 관리
- 팀 일정 관리
- 팀 파일 관리

### 사용자 설정 및 지원

- 한국어 / 영어 언어 설정
- 시간 및 날짜 형식 관련 설정
- 알림 설정
- 개인정보 및 보안 설정
- 2단계 인증 설정
- 로그인 기기 관리
- 서비스 공지 조회
- 문의 / 제안 등록
- 문의 내역 조회

## 기술 스택

| 구분 | 기술 | 버전 |
| --- | --- | --- |
| Mobile Framework | React Native | `0.85.2` |
| UI | React | `^19.2.3` |
| Language | TypeScript | `^5.8.3` |
| Navigation | @react-navigation/native | `^7.2.4` |
| Navigation | @react-navigation/bottom-tabs | `^7.16.0` |
| Navigation | @react-navigation/native-stack | `^7.15.0` |
| API Communication | Axios | `^1.18.1` |
| Styling | styled-components | `^6.4.1` |
| Gesture | react-native-gesture-handler | `^2.31.2` |
| Rich Text Editor | @10play/tentap-editor | `^1.0.1` |
| Rich Text Core | @tiptap/core | `^3.30.0` |
| Rich Text React | @tiptap/react | `3.30.0` |
| Secure Storage | react-native-keychain | `^10.0.0` |
| Local Storage | AsyncStorage | `^3.1.1` |
| Date / Time | Day.js | `^1.11.21` |
| Localization | i18next | `^26.3.1` |
| Localization | react-i18next | `^17.0.8` |
| Image Picker | react-native-image-picker | `^8.2.1` |
| File Picker | @react-native-documents/picker | `^12.0.1` |
| Test | Jest | `^29.6.3` |
| Code Quality | ESLint | `^8.19.0` |
| Code Quality | Prettier | `2.8.8` |

## 프로젝트 구조

```text
Bium-Frontend/
├── android/                # Android 네이티브 프로젝트
├── ios/                    # iOS 네이티브 프로젝트
├── docs/                   # 개발 관련 문서
├── editor-web/             # Rich Text Editor 빌드 소스
├── patches/                # Dependency patch 관리
│
├── src/
│   ├── api/                # Backend REST API 통신
│   ├── assets/             # 이미지 및 아이콘 리소스
│   ├── components/         # 공통 UI 컴포넌트
│   ├── config/             # API 실행 환경 설정
│   ├── editor/             # Rich Text Editor 설정
│   ├── hooks/              # 화면 상태 및 주요 기능 로직
│   ├── locales/            # 다국어 리소스
│   ├── navigation/         # 화면 이동 구조
│   ├── screens/            # 앱 화면
│   ├── types/              # TypeScript 타입 정의
│   └── utils/              # 공통 유틸리티
│
├── __tests__/              # 테스트 코드
├── App.tsx
├── app.json
├── babel.config.js
├── package.json
├── package-lock.json
└── README.md
```

## 주요 화면

현재 Navigation에 등록된 화면 이름을 기준으로 정리했습니다.

### 메모

- `Home`
- `Timeline`
- `MemoEditor`
- `MemoDetail`
- `Search`
- `Notification`

### 인증

- `StartScreen`
- `Splash`
- `Login`
- `SignUp`
- `FindId`
- `FindPassword`

### TeamSpace

- `TeamSpace`
- `TeamCreate`
- `ProjectDetail`
- `ProjectTodo`
- `Schedule`
- `Files`
- `AddNotice`
- `AddTodo`
- `AddSchedule`
- `FriendAdd`
- `FriendRequestList`

### MyPage

- `MyPage`
- `EditProfile`
- `Language`
- `SettingNotification`
- `Privacy`
- `DeviceManagement`
- `ServiceSuggestion`
- `PrivacyPolicy`
- `MarketingConsent`
- `PermissionSetup`
- `Trash`
- `Notice`
- `CustomerCenter`
- `Inquiry`
- `InquiryHistory`
- `FAQ`
- `PhoneInquiry`
- `Logout`
- `Withdrawal`

### 2단계 인증

- `TwoFactorIntro`
- `PasswordCheck`
- `MethodSelect`
- `VerifyCode`
- `Success`
- `Management`

## API 연동

Frontend는 **Axios** 기반의 공통 API Client를 통해 Bium Backend REST API와 통신합니다.

인증이 필요한 요청에는 Access Token을 Bearer Token 형태로 전달합니다.

Access Token이 만료된 경우 Refresh Token을 이용해 새로운 Access Token 발급을 시도하며, 갱신에 성공하면 기존 요청을 다시 수행합니다.

세션 갱신에 실패하면 저장된 인증 정보를 제거한 뒤 로그인 화면으로 이동합니다.

메모 이미지와 TeamSpace 파일 업로드에는 Backend에서 발급받은 **S3 Presigned URL**을 사용합니다.

## 실행 환경

API 실행 환경은 다음과 같이 구분합니다.

```text
local
aws
production
```

현재 코드에서는 다음 환경 변수를 사용합니다.

```text
BLAZE_API_ENV
BLAZE_API_BASE_URL
```

### Local

로컬에서 실행 중인 Backend와 연동합니다.

Android Emulator의 `localhost`는 Emulator 자신을 가리키기 때문에, PC에서 실행 중인 Backend에 접근할 때는 `10.0.2.2`를 사용합니다.

### AWS

AWS에 구성된 개발 서버와 연동하기 위한 환경입니다.

### Production

운영 API 주소를 `BLAZE_API_BASE_URL`을 통해 지정합니다.

## 실행 방법

### 요구 환경

```text
Node.js >= 22.11.0
npm
React Native 개발 환경
```

React Native 프로젝트 실행에 필요한 Android 또는 iOS 개발 환경이 사전에 구성되어 있어야 합니다.

### 패키지 설치

`package-lock.json`을 기준으로 동일한 의존성 환경을 구성할 때는 `npm ci` 사용을 권장합니다.

```bash
npm ci
```

패키지를 새로 추가하거나 의존성 정보를 갱신해야 하는 경우에는 `npm install`을 사용합니다.

```bash
npm install
```

패키지 설치 후 `postinstall` 스크립트를 통해 프로젝트에서 사용하는 Dependency Patch가 자동으로 적용됩니다.

### Local 환경 실행

Metro 실행:

```bash
npm run start:local
```

Android:

```bash
npm run android:local
```

iOS:

```bash
npm run ios:local
```

### AWS 환경 실행

Metro 실행:

```bash
npm run start:aws
```

Android:

```bash
npm run android:aws
```

iOS:

```bash
npm run ios:aws
```

### Production 환경 실행

Production 환경에서는 `BLAZE_API_BASE_URL`을 통해 운영 API 주소를 지정합니다.

Metro:

```bash
BLAZE_API_BASE_URL=<API_BASE_URL> npm run start:production
```

Android:

```bash
BLAZE_API_BASE_URL=<API_BASE_URL> npm run android:production
```

iOS:

```bash
BLAZE_API_BASE_URL=<API_BASE_URL> npm run ios:production
```

Metro와 애플리케이션은 동일한 API 환경을 기준으로 실행합니다.

### iOS Dependency 설치

최초 실행 또는 Native Dependency 변경 시 CocoaPods Dependency를 설치합니다.

```bash
bundle install

cd ios
bundle exec pod install
cd ..
```

### 코드 검사

ESLint:

```bash
npm run lint
```

TypeScript:

```bash
npm run typecheck
```

Test:

```bash
npm test
```

### Rich Text Editor 빌드

`editor-web`의 Editor 코드를 수정한 경우 Native App에서 사용할 Editor 파일을 다시 생성합니다.

```bash
npm run editor:build
```

## 브랜치 정책

### `main`

최종 제출 및 공개 확인용 브랜치입니다.

검토와 안정화가 완료된 코드를 반영합니다.

### `dev`

실제 개발 작업을 진행하는 브랜치입니다.

기능 추가와 수정 내용을 먼저 반영하고, 검토가 완료된 이후 `main`에 반영합니다.

## Repository Policy

공개 저장소에는 서비스 실행에 필요한 민감정보를 포함하지 않습니다.

GitHub에 포함하지 않는 항목은 다음과 같습니다.

- 비밀번호 및 개인 인증정보
- Access Token / Refresh Token
- JWT Secret
- AWS Access Key / Secret Access Key
- Private Key 및 인증서
- 운영 데이터베이스 접속 정보
- 개인용 환경설정 파일
- Dependency 및 Build 결과물
- IDE별 로컬 설정

환경별 서버 주소와 민감한 설정값은 코드에 직접 작성하지 않고 환경 변수 또는 별도의 로컬 설정을 통해 관리합니다.

## 향후 계획

- Android / iOS 정식 스토어 배포 및 모바일 환경 지원 확대
- TeamSpace 세부 협업 기능과 알림 연동 고도화
- 사용자 메모 작성 패턴을 활용한 FIRE / ICE 상태 선택 보조 기능 검토
