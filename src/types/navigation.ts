import type {NavigatorScreenParams} from '@react-navigation/native';
import type {CompositeScreenProps} from '@react-navigation/native';
import type {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import type {EntityId} from './api';
import type {MemoImage} from './file';
import type {MemoRichContent} from './memo';
import type {TwoFactorMethod} from './auth';

export interface MemoEditorData {
  id: string;
  title: string;
  content: string;
  richContent?: MemoRichContent | null;
  status?: string;
  expiredAt?: string | null;
  createdAt?: string;
  images?: MemoImage[];
}

export interface TeamTodoRouteData {
  todoId?: EntityId;
  id?: EntityId;
  title: string;
  content: string;
  dueDate: string | null;
  isChecked?: boolean;
  isDone?: boolean;
  sendPush: boolean;
}

export interface ScheduleRouteData {
  scheduleId?: EntityId;
  id?: EntityId;
  title: string;
  content: string;
  startAt: string;
  endAt: string;
}

export type MainTabParamList = {
  Home: undefined;
  Timeline: undefined;
  MemoEditor: {memoData?: MemoEditorData} | undefined;
  TeamSpace: undefined;
  MyPage: undefined;
};

export type RootStackParamList = {
  StartScreen: undefined;
  Splash: undefined;
  Login: undefined;
  SignUp: undefined;
  FindId: undefined;
  FindPassword: undefined;
  MainTabs: NavigatorScreenParams<MainTabParamList> | undefined;
  Search: undefined;
  Notification: undefined;
  MemoDetail: {memoId: EntityId};
  ProjectDetail: {projectId: EntityId; projectName?: string};
  ProjectTodo: {
    projectId: EntityId;
    projectName?: string;
    todoId?: EntityId;
  };
  Schedule: {projectId: EntityId; projectName?: string};
  Files: {projectId: EntityId; projectName?: string};
  AddNotice: {projectId: EntityId};
  AddTodo: {projectId: EntityId; todoData?: TeamTodoRouteData};
  AddSchedule: {
    projectId: EntityId;
    scheduleData?: ScheduleRouteData;
  };
  FriendAdd: undefined;
  FriendRequestList: undefined;
  TeamCreate: undefined;
  EditProfile: undefined;
  Language: undefined;
  SettingNotification: undefined;
  Privacy: undefined;
  TwoFactorIntro: undefined;
  PasswordCheck: undefined;
  MethodSelect: undefined;
  VerifyCode: {method: TwoFactorMethod; destination: string};
  Success: {method: TwoFactorMethod; destination: string};
  Management: undefined;
  DeviceManagement: undefined;
  ServiceSuggestion: undefined;
  PrivacyPolicy: undefined;
  MarketingConsent: undefined;
  PermissionSetup: undefined;
  Trash: undefined;
  Notice: undefined;
  CustomerCenter: undefined;
  Inquiry: undefined;
  InquiryHistory: undefined;
  FAQ: undefined;
  PhoneInquiry: undefined;
  Logout: undefined;
  Withdrawal: undefined;
};

export type RootScreenProps<RouteName extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, RouteName>;

export type MyPageTabScreenProps = CompositeScreenProps<
  BottomTabScreenProps<MainTabParamList, 'MyPage'>,
  NativeStackScreenProps<RootStackParamList>
>;
