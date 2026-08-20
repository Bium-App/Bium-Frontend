import i18n from 'i18next';
import type {LanguageDetectorAsyncModule} from 'i18next';
import { initReactI18next } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';

// 언어 및 지역 화면에서 사용하는 번역 데이터
const resources = {
  ko: {
    translation: {
      language_region: "언어 및 지역",
      language: "언어",
      korean: "한국어",
      english: "English",
      lang_helper: "앱에서 사용할 언어를 선택해주세요.",
      region: "지역",
      timezone: "시간대",
      date_format: "날짜 형식",
      save: "저장",
      common: {
        login: "로그인",
        email: "이메일",
        user: "사용자",
        notification: "알림",
        error: "오류",
        confirm: "확인",
        upload: "업로드",
        search: "검색",
        file: "파일",
        image_select: "이미지 선택",
        file_select: "파일 선택"
      },
      async_state: {
        empty: "표시할 내용이 없습니다.",
        loading: "불러오는 중...",
        loading_label: "데이터를 불러오는 중",
        failed: "불러오지 못했습니다.",
        retry: "다시 시도"
      },
      attachment: {
        add_file: "파일 추가",
        close: "파일 추가 창 닫기",
        method: "추가 방식",
        device: "기기",
        album: "앨범",
        audio: "오디오",
        cloud: "클라우드",
        recent: "최근 파일",
        recent_empty: "최근에 선택한 파일이 없습니다.",
        select_recent: "{{name}} 최근 파일 선택",
        remove_selected: "선택 파일 제거"
      },
      memo_card: {
        expires_in: "소멸 예정 : {{time}}"
      },
      memo_editor: {
        cancel: "취소",
        edit_title: "메모 수정",
        new_title: "새 메모",
        title_placeholder: "제목 입력",
        content_placeholder: "내용 입력...",
        editor_failed: "편집기 내용을 불러오지 못했습니다.",
        add_image: "이미지 추가",
        optional: "(선택)",
        remove_attachment: "{{name}} 첨부 제거",
        select_image: "이미지 선택",
        image_limit: "이미지 1개, 최대 10MB 이하",
        timer_info: "소멸 시간 안내 보기",
        timer_title: "소멸 시간 설정",
        timer_description: "설정한 시간이 지나면 FIRE 메모가 자동으로 소멸합니다.",
        after_6h: "6시간 후",
        after_12h: "12시간 후",
        after_24h: "24시간 후",
        timer_set: "소멸 시간이 설정된 메모입니다.",
        timer_edit_unavailable: "현재 명세에서는 메모 수정 시 소멸 시간을 변경할 수 없습니다.",
        fire_memo: "불 메모",
        disappears_prefix: "는 설정한 시간이 지나면",
        automatically: "자동으로",
        disappears_suffix: " 사라져요.",
        important_prefix: "중요한 내용은",
        ice: "'얼음'",
        preserve_suffix: "으로 보관해보세요!",
        close_info: "안내 닫기",
        do_not_show_again: "다시 보지 않기"
      },
      auth: {
        ignite_memo: "메모 점화하기",
        login_id: "아이디",
        password: "비밀번호",
        logging_in: "로그인 중...",
        find_id: "아이디 찾기",
        find_password: "비밀번호 찾기",
        sign_up: "회원가입",
        name: "이름",
        nickname: "닉네임",
        confirm_password: "비밀번호 확인",
        phone_number: "휴대폰 번호",
        create_account: "가입하기",
        already_have_account: "이미 계정이 있으신가요?",
        forgot_id: "아이디를 잊으셨나요?",
        forgot_password: "비밀번호를 잊으셨나요?",
        find_id_complete: "아이디 찾기 완료",
        found_id: "회원님의 아이디는 {{loginId}}입니다.",
        sent: "발송 완료",
        temporary_password_sent: "가입한 이메일로 임시 비밀번호를 발송했습니다.",
        temporary_password_helper: "가입한 이메일로 임시 비밀번호가 발송됩니다.",
        get_temporary_password: "임시 비밀번호 받기",
        sns_login: "SNS 계정으로 로그인",
        google_login: "Google로 로그인",
      },
      my_page: {
        edit_profile: "내 정보 수정",
        settings: "설정",
        privacy_security: "개인정보 및 보안",
        trash: "휴지통",
        service: "서비스",
        notices: "공지사항",
        customer_center: "고객센터",
        account: "계정",
        logout: "로그아웃",
        withdrawal: "탈퇴하기",
        two_factor: "2단계 인증 설정",
        devices: "로그인 기기 관리",
        suggestion: "서비스 개선 제안",
        privacy_policy: "개인정보 처리방침",
        marketing: "마케팅 정보 수신 동의",
        permissions: "필수 권한 설정"
      },
      profile: {
        select_image: "프로필 이미지 선택",
        image_limit: "이미지 최대 10MB",
        change_photo: "사진 변경",
        cancel_selection: "선택 취소",
        user_number: "사용자 번호"
      },
      notification_settings: {
        save_failed: "알림 설정 저장에 실패했습니다.",
        all: "모든 알림 받기",
        event: "이벤트/혜택 알림",
        push: "푸시알림"
      },
      trash: {
        edit: "편집",
        cancel: "취소",
        all: "전체",
        selected_count: "{{count}}개 선택됨",
        empty: "휴지통이 비어 있습니다.",
        restore: "복구",
        permanent_delete: "영구 삭제",
        confirm_action: "선택한 {{count}}개의 항목을 {{action}}하시겠습니까?",
        restore_count: "복구({{count}})",
        delete_count: "삭제({{count}})"
      },
      state: {
        no_notifications: "새로운 알림이 없습니다.",
        no_memos: "저장된 메모가 없습니다.",
        no_fire_memos: "저장된 불 메모가 없습니다.",
        no_ice_memos: "저장된 얼음 메모가 없습니다.",
        no_search_results: "검색 결과가 없습니다."
      },
      home: {
        title: "홈",
        tooltip_ice: "왼쪽 : 얼음 (보관)",
        tooltip_pin: "오른쪽 : 상단 고정 (얼음 메모만 가능)",
        memo_detail_failed: "메모 상세 내용을 불러오지 못했습니다.",
        move_to_trash: "휴지통 이동",
        move_to_trash_confirm: "'{{title}}' 메모를 이동하시겠습니까?",
        cancel: "취소",
        move: "이동",
        manage_memo: "메모 관리",
        change_to_fire: "FIRE로 변경",
        store_as_ice: "ICE로 보관",
        move_to_trash_action: "휴지통으로 이동"
      },
      timeline: {
        title: "타임라인",
        fire_memo: "불 메모",
        ice_memo: "얼음 메모",
        remaining: "남음",
        pin: "메모 고정",
        unpin: "메모 고정 해제",
        pin_failed: "고정 변경 실패",
        pin_failed_message: "메모 고정 상태를 변경하지 못했습니다.",
        pinned_memos: "고정된 메모",
        memos: "메모"
      },
      search: {
        title: "검색",
        detail_pending: "상세 이동 준비 중",
        missing_team: "검색 결과에서 이동할 팀 정보를 확인할 수 없습니다.",
        recent: "최근검색",
        delete_all: "전체삭제",
        recommended: "추천 검색어"
      },
      team: {
        title: "팀스페이스",
        all_count: "전체 ({{count}})",
        create: "팀 생성",
        add_friend: "친구추가",
        no_search_results: "검색 결과가 없습니다.",
        no_teams: "참여 중인 팀이 없습니다.",
        member_count: "멤버 {{count}}명",
        home: "홈",
        todo: "할일",
        schedule: "일정",
        files: "파일",
        team_todo: "팀 할 일",
        manage_todo: "할일 관리",
        edit: "수정",
        delete: "삭제",
        checklist: "할일 체크리스트",
        no_filtered_todos: "검색된 할 일이 없습니다.",
        no_todos: "등록된 할 일이 없습니다.",
        add_todo: "새로운 할 일 추가",
        team_schedule: "팀 일정",
        schedule_detail_failed: "일정 상세를 불러오지 못했습니다.",
        this_month: "이번 달 일정",
        no_filtered_schedules: "검색된 일정이 없습니다.",
        no_schedules: "등록된 일정이 없습니다.",
        create_team: "팀 생성",
        team_name: "팀 이름",
        team_name_placeholder: "팀 이름을 입력하세요",
        team_name_helper: "팀 이름은 나중에 변경할 수 있어요",
        add_members: "팀 멤버 추가",
        search_nickname: "닉네임으로 검색",
        recommended_friends: "추천 친구",
        added_members: "추가된 멤버 ({{count}})",
        create_team_action: "팀 생성하기"
      },
      splash: {
        slogan: "기록에도 온도가 있으니까",
        app_name: "비움",
        intro_question: "당신의 기록은\n어떤 온도인가요?",
        fire_title: "불 메모",
        fire_subtitle: "시간이 지나면\n메모가 사라집니다.",
        ice_title: "얼음 메모",
        ice_subtitle: "중요한 기록은\n얼려서 보관하세요.",
        team_title: "팀스페이스",
        team_subtitle: "함께 쓰고\n함께 기록하세요.",
        start: "오늘부터 메모앱 시작하기"
      },
      logout_screen: {
        question: "로그아웃하시겠어요?",
        description: "로그아웃 시 모든 데이터는 저장되며\n다음 로그인 시 기기에서 계속 이용할 수 있습니다."
      },
      withdrawal_screen: {
        title: "회원 탈퇴",
        question: "정말 탈퇴하시겠습니까?",
        description: "탈퇴 시 계정과 모든 데이터가 삭제되며,\n복구할 수 없습니다.",
        data_deleted: "모든 할일, 일정, 파일 데이터가 삭제됩니다.",
        rejoin: "탈퇴 후 동일한 이메일로 재가입이 가능하지만,\n이전 데이터는 복구되지 않습니다.",
        service_limited: "진행 중인 서비스 이용이 제한됩니다.",
        agree: "위 내용을 모두 확인했으며, 탈퇴에 동의합니다."
      },
      language_screen: {
        saved_title: "알림",
        saved_message: "설정이 성공적으로 저장되었습니다.",
        save_failed: "설정 저장에 실패했습니다.",
        select_timezone: "시간대 선택",
        select_date_format: "날짜 형식 선택",
        saved_locally_title: "기기에 저장됨",
        saved_locally_message: "언어 설정은 이 기기에 적용되었습니다. 서버 연결 후 다시 저장하면 계정에도 동기화됩니다."
      }
    }
  },
  en: {
    translation: {
      language_region: "Language & Region",
      language: "Language",
      korean: "Korean",
      english: "English",
      lang_helper: "Please select the language to use in the app.",
      region: "Region",
      timezone: "Timezone",
      date_format: "Date Format",
      save: "Save",
      common: {
        login: "Log In",
        email: "Email",
        user: "User",
        notification: "Notifications",
        error: "Error",
        confirm: "OK",
        upload: "Upload",
        search: "Search",
        file: "File",
        image_select: "Select Image",
        file_select: "Select File"
      },
      async_state: {
        empty: "Nothing to display.",
        loading: "Loading...",
        loading_label: "Loading data",
        failed: "Unable to load.",
        retry: "Try Again"
      },
      attachment: {
        add_file: "Add File",
        close: "Close add file window",
        method: "Add From",
        device: "Device",
        album: "Album",
        audio: "Audio",
        cloud: "Cloud",
        recent: "Recent Files",
        recent_empty: "There are no recently selected files.",
        select_recent: "Select recent file {{name}}",
        remove_selected: "Remove selected file"
      },
      memo_card: {
        expires_in: "Expires in: {{time}}"
      },
      memo_editor: {
        cancel: "Cancel",
        edit_title: "Edit Memo",
        new_title: "New Memo",
        title_placeholder: "Enter a title",
        content_placeholder: "Enter content...",
        editor_failed: "Failed to load the editor content.",
        add_image: "Add Image",
        optional: "(Optional)",
        remove_attachment: "Remove attachment {{name}}",
        select_image: "Select Image",
        image_limit: "1 image, up to 10 MB",
        timer_info: "View expiration information",
        timer_title: "Expiration Time",
        timer_description: "FIRE memos disappear automatically after the selected time.",
        after_6h: "After 6 hours",
        after_12h: "After 12 hours",
        after_24h: "After 24 hours",
        timer_set: "This memo has an expiration time.",
        timer_edit_unavailable: "The current API does not allow changing expiration while editing a memo.",
        fire_memo: "Fire memos",
        disappears_prefix: " disappear after the selected time and",
        automatically: "automatically",
        disappears_suffix: " vanish.",
        important_prefix: "Keep important content as",
        ice: "Ice",
        preserve_suffix: " to preserve it!",
        close_info: "Close information",
        do_not_show_again: "Don't show again"
      },
      auth: {
        ignite_memo: "Ignite your memo",
        login_id: "Login ID",
        password: "Password",
        logging_in: "Logging in...",
        find_id: "Find ID",
        find_password: "Find Password",
        sign_up: "Sign Up",
        name: "Name",
        nickname: "Nickname",
        confirm_password: "Confirm Password",
        phone_number: "Phone Number",
        create_account: "Create Account",
        already_have_account: "Already have an account?",
        forgot_id: "Forgot your ID?",
        forgot_password: "Forgot your password?",
        find_id_complete: "ID Found",
        found_id: "Your login ID is {{loginId}}.",
        sent: "Sent",
        temporary_password_sent: "A temporary password was sent to your registered email.",
        temporary_password_helper: "A temporary password will be sent to your registered email.",
        get_temporary_password: "Get Temporary Password",
        sns_login: "Log in with SNS account",
        google_login: "Sign in with Google",
      },
      my_page: {
        edit_profile: "Edit Profile",
        settings: "Settings",
        privacy_security: "Privacy & Security",
        trash: "Trash",
        service: "Service",
        notices: "Notices",
        customer_center: "Customer Center",
        account: "Account",
        logout: "Log Out",
        withdrawal: "Delete Account",
        two_factor: "Two-Factor Authentication",
        devices: "Login Devices",
        suggestion: "Suggest an Improvement",
        privacy_policy: "Privacy Policy",
        marketing: "Marketing Preferences",
        permissions: "Required Permissions"
      },
      profile: {
        select_image: "Select profile image",
        image_limit: "Maximum image size: 10 MB",
        change_photo: "Change Photo",
        cancel_selection: "Cancel Selection",
        user_number: "User Number"
      },
      notification_settings: {
        save_failed: "Failed to save notification settings.",
        all: "Receive All Notifications",
        event: "Events & Benefits",
        push: "Push Notifications"
      },
      trash: {
        edit: "Edit",
        cancel: "Cancel",
        all: "All",
        selected_count: "{{count}} selected",
        empty: "Trash is empty.",
        restore: "Restore",
        permanent_delete: "Delete Permanently",
        confirm_action: "Would you like to {{action}} the selected {{count}} items?",
        restore_count: "Restore ({{count}})",
        delete_count: "Delete ({{count}})"
      },
      state: {
        no_notifications: "There are no new notifications.",
        no_memos: "There are no saved memos.",
        no_fire_memos: "There are no saved fire memos.",
        no_ice_memos: "There are no saved ice memos.",
        no_search_results: "No search results found."
      },
      home: {
        title: "Home",
        tooltip_ice: "Left: Ice (archive)",
        tooltip_pin: "Right: Pin to top (ice memos only)",
        memo_detail_failed: "Failed to load memo details.",
        move_to_trash: "Move to Trash",
        move_to_trash_confirm: "Move '{{title}}' to Trash?",
        cancel: "Cancel",
        move: "Move",
        manage_memo: "Manage Memo",
        change_to_fire: "Change to FIRE",
        store_as_ice: "Store as ICE",
        move_to_trash_action: "Move to Trash"
      },
      timeline: {
        title: "Timeline",
        fire_memo: "Fire Memos",
        ice_memo: "Ice Memos",
        remaining: "left",
        pin: "Pin memo",
        unpin: "Unpin memo",
        pin_failed: "Failed to Change Pin",
        pin_failed_message: "Failed to change the memo's pinned state.",
        pinned_memos: "Pinned Memos",
        memos: "Memos"
      },
      search: {
        title: "Search",
        detail_pending: "Details Unavailable",
        missing_team: "The team information for this result is unavailable.",
        recent: "Recent Searches",
        delete_all: "Delete All",
        recommended: "Suggested Searches"
      },
      team: {
        title: "Team Space",
        all_count: "All ({{count}})",
        create: "Create Team",
        add_friend: "Add Friend",
        no_search_results: "No search results found.",
        no_teams: "You have not joined any teams.",
        member_count: "{{count}} members",
        home: "Home",
        todo: "Tasks",
        schedule: "Schedule",
        files: "Files",
        team_todo: "Team Tasks",
        manage_todo: "Manage Task",
        edit: "Edit",
        delete: "Delete",
        checklist: "Task Checklist",
        no_filtered_todos: "No matching tasks found.",
        no_todos: "No tasks have been added.",
        add_todo: "Add New Task",
        team_schedule: "Team Schedule",
        schedule_detail_failed: "Failed to load schedule details.",
        this_month: "This Month",
        no_filtered_schedules: "No matching schedules found.",
        no_schedules: "No schedules have been added.",
        create_team: "Create Team",
        team_name: "Team Name",
        team_name_placeholder: "Enter a team name",
        team_name_helper: "You can change the team name later",
        add_members: "Add Team Members",
        search_nickname: "Search by nickname",
        recommended_friends: "Suggested Friends",
        added_members: "Added Members ({{count}})",
        create_team_action: "Create Team"
      },
      splash: {
        slogan: "Every record has its own temperature",
        app_name: "Bium",
        intro_question: "What temperature\nis your record?",
        fire_title: "Fire Memo",
        fire_subtitle: "The memo disappears\nafter its time runs out.",
        ice_title: "Ice Memo",
        ice_subtitle: "Freeze and preserve\nyour important records.",
        team_title: "Team Space",
        team_subtitle: "Write together.\nRecord together.",
        start: "Start Using Bium"
      },
      logout_screen: {
        question: "Would you like to log out?",
        description: "All data will remain saved after logout,\nand you can continue on this device next time."
      },
      withdrawal_screen: {
        title: "Delete Account",
        question: "Are you sure you want to delete your account?",
        description: "Your account and all data will be deleted\nand cannot be recovered.",
        data_deleted: "All tasks, schedules, and file data will be deleted.",
        rejoin: "You may sign up again with the same email,\nbut your previous data cannot be recovered.",
        service_limited: "Access to active services will be restricted.",
        agree: "I have reviewed the information above and agree to delete my account."
      },
      language_screen: {
        saved_title: "Notice",
        saved_message: "Your settings have been saved.",
        save_failed: "Failed to save settings.",
        select_timezone: "Select Timezone",
        select_date_format: "Select Date Format",
        saved_locally_title: "Saved on Device",
        saved_locally_message: "The language setting was applied to this device. Save again after the server reconnects to sync it with your account."
      }
    }
  }
};

// 2. 사용자가 이전에 저장한 언어 설정이 있는지 확인하는 로직
const languageDetector: LanguageDetectorAsyncModule = {
  type: 'languageDetector',
  async: true,
  detect: callback => {
    AsyncStorage.getItem('userLanguage')
      .then(savedLanguage => callback(savedLanguage || 'ko'))
      .catch(() => callback('ko'));
  },
  init: () => {},
  cacheUserLanguage: async (language: string) => {
    try {
      await AsyncStorage.setItem('userLanguage', language);
    } catch {}
  }
};

// 3. i18n 초기화
i18n
  .use(languageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'ko', // 에러 시 기본 언어
    interpolation: {
      escapeValue: false // React는 자체적으로 XSS를 방지하므로 false
    }
  });

export default i18n;
