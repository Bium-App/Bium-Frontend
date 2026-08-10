import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {
  createNativeStackNavigator,
  type NativeStackNavigationOptions,
} from '@react-navigation/native-stack';
import {
  createBottomTabNavigator,
  type BottomTabBarProps,
} from '@react-navigation/bottom-tabs';
import {navigationRef} from './navigationRef';
import type {MainTabParamList, RootStackParamList} from '../types/navigation';

import StartScreen from '../screens/StartScreen';
import Splash from '../screens/Splash';
import Login from '../screens/Login';
import SignUp from '../screens/SignUp';
import FindId from '../screens/FindId';
import FindPassword from '../screens/FindPassword';

import Home from '../screens/Home';
import Timeline from '../screens/Timeline';
import MemoEditor from '../screens/MemoEditor';
import Search from '../screens/Search';
import Notification from '../screens/Notification';

import Footer from '../components/Footer';

import TeamSpaceHome from '../screens/TeamSpace/Home';
import ProjectDetail from '../screens/TeamSpace/ProjectDetail';
import AddNotice from '../screens/TeamSpace/AddNotice';
import ProjectTodo from '../screens/TeamSpace/ProjectTodo';
import AddTodo from '../screens/TeamSpace/AddTodo';
import Schedule from '../screens/TeamSpace/Schedule';
import AddSchedule from '../screens/TeamSpace/AddSchedule';
import Files from '../screens/TeamSpace/Files';
import FriendAdd from '../screens/TeamSpace/FriendAdd';
import TeamCreate from '../screens/TeamSpace/TeamCreate';
import FriendRequestList from '../screens/TeamSpace/FriendRequestList';

// 🚨 마이페이지 그룹
import MyPage from '../screens/MyPage/Main';
import EditProfile from '../screens/MyPage/EditProfile';

// 마이페이지 하위 화면
import Language from '../screens/MyPage/Settings/Language';
import SettingNotification from '../screens/MyPage/Settings/SettingNotification';
import Privacy from '../screens/MyPage/Settings/PrivacySecurity';

// 2단계 인증 화면
import TwoFactorIntro from '../screens/MyPage/Settings/PrivacySecurity/TwoFactorAuth/TwoFactorIntro';
import PasswordCheck from '../screens/MyPage/Settings/PrivacySecurity/TwoFactorAuth/PasswordCheck';
import MethodSelect from '../screens/MyPage/Settings/PrivacySecurity/TwoFactorAuth/MethodSelect';
import VerifyCode from '../screens/MyPage/Settings/PrivacySecurity/TwoFactorAuth/VerifyCode';
import Success from '../screens/MyPage/Settings/PrivacySecurity/TwoFactorAuth/Success';
import Management from '../screens/MyPage/Settings/PrivacySecurity/TwoFactorAuth/Management';

import DeviceManagement from '../screens/MyPage/Settings/PrivacySecurity/DeviceManagement';
import ServiceSuggestion from '../screens/MyPage/Settings/PrivacySecurity/ServiceSuggestion';
import PrivacyPolicy from '../screens/MyPage/Settings/PrivacySecurity/PrivacyPolicy';
import MarketingConsent from '../screens/MyPage/Settings/PrivacySecurity/MarketingConsent';
import PermissionSetup from '../screens/MyPage/Settings/PrivacySecurity/PermissionSetup';

import Trash from '../screens/MyPage/Settings/Trash';

import Notice from '../screens/MyPage/Service/Notice';
import CustomerCenter from '../screens/MyPage/Service/CustomerCenter';
import Inquiry from '../screens/MyPage/Service/Inquiry';
import InquiryHistory from '../screens/MyPage/Service/InquiryHistory';
import FAQ from '../screens/MyPage/Service/FAQ';
import PhoneInquiry from '../screens/MyPage/Service/PhoneInquiry';

import Logout from '../screens/MyPage/account/Logout';
import Withdrawal from '../screens/MyPage/account/Withdrawal';

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<MainTabParamList>();

const renderTabBar = (props: BottomTabBarProps) => <Footer {...props} />;

const noAnimation: NativeStackNavigationOptions = {animation: 'none'};

function FooterTabs() {
  return (
    <Tab.Navigator tabBar={renderTabBar} screenOptions={{headerShown: false}}>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Timeline" component={Timeline} />
      <Tab.Screen name="MemoEditor" component={MemoEditor} />
      <Tab.Screen name="TeamSpace" component={TeamSpaceHome} />
      <Tab.Screen name="MyPage" component={MyPage} />
    </Tab.Navigator>
  );
}

export default function Navigation() {
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator
        initialRouteName="StartScreen"
        screenOptions={{headerShown: false}}
      >
        <Stack.Screen name="StartScreen" component={StartScreen} />
        <Stack.Screen name="Splash" component={Splash} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="FindId" component={FindId} />
        <Stack.Screen name="FindPassword" component={FindPassword} />
        <Stack.Screen name="MainTabs" component={FooterTabs} />
        <Stack.Screen name="Search" component={Search} />
        <Stack.Screen name="Notification" component={Notification} />

        {/* 팀 스페이스 */}
        <Stack.Screen
          name="ProjectDetail"
          component={ProjectDetail}
          options={noAnimation}
        />
        <Stack.Screen
          name="ProjectTodo"
          component={ProjectTodo}
          options={noAnimation}
        />
        <Stack.Screen
          name="Schedule"
          component={Schedule}
          options={noAnimation}
        />
        <Stack.Screen
          name="Files"
          component={Files}
          options={noAnimation}
        />
        <Stack.Screen name="AddNotice" component={AddNotice} />
        <Stack.Screen name="AddTodo" component={AddTodo} />
        <Stack.Screen name="AddSchedule" component={AddSchedule} />
        <Stack.Screen name="FriendAdd" component={FriendAdd} />
        <Stack.Screen name="FriendRequestList" component={FriendRequestList} />
        <Stack.Screen name="TeamCreate" component={TeamCreate} />

        {/* 🚨 마이페이지 하위 스택 */}
        <Stack.Screen name="EditProfile" component={EditProfile} />
        <Stack.Screen name="Language" component={Language} />
        <Stack.Screen
          name="SettingNotification"
          component={SettingNotification}
        />
        <Stack.Screen name="Privacy" component={Privacy} />

        {/* 💡 [2단계 인증 스택 등록 완료!] */}
        <Stack.Screen name="TwoFactorIntro" component={TwoFactorIntro} />
        <Stack.Screen name="PasswordCheck" component={PasswordCheck} />
        <Stack.Screen name="MethodSelect" component={MethodSelect} />
        <Stack.Screen name="VerifyCode" component={VerifyCode} />
        <Stack.Screen name="Success" component={Success} />
        <Stack.Screen name="Management" component={Management} />

        <Stack.Screen name="DeviceManagement" component={DeviceManagement} />
        <Stack.Screen name="ServiceSuggestion" component={ServiceSuggestion} />
        <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicy} />
        <Stack.Screen name="MarketingConsent" component={MarketingConsent} />
        <Stack.Screen name="PermissionSetup" component={PermissionSetup} />

        <Stack.Screen name="Trash" component={Trash} />
        <Stack.Screen name="Notice" component={Notice} />
        <Stack.Screen name="CustomerCenter" component={CustomerCenter} />
        <Stack.Screen name="Inquiry" component={Inquiry} />
        <Stack.Screen name="InquiryHistory" component={InquiryHistory} />
        <Stack.Screen name="FAQ" component={FAQ} />
        <Stack.Screen name="PhoneInquiry" component={PhoneInquiry} />
        <Stack.Screen name="Logout" component={Logout} />
        <Stack.Screen name="Withdrawal" component={Withdrawal} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
