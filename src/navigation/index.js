import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

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
import EditSchedule from '../screens/TeamSpace/EditSchedule';
import Files from '../screens/TeamSpace/Files';
import FriendAdd from '../screens/TeamSpace/FriendAdd';
import TeamCreate from '../screens/TeamSpace/TeamCreate';
import FriendRequestList from '../screens/TeamSpace/FriendRequestList';

// 🚨 마이페이지 그룹
import MyPage from '../screens/MyPage/Main';
import EditProfile from '../screens/MyPage/EditProfile';

// --- 🚧 미개발 마이페이지 하위 화면들 ---
import Language from '../screens/MyPage/Settings/Language';
import SettingNotification from '../screens/MyPage/Settings/SettingNotification';
import Privacy from '../screens/MyPage/Settings/PrivacySecurity';

// 💡 [추가됨] 개인정보 및 보안 하위 6개 화면 import
// import TwoFactorAuth from '../screens/MyPage/Settings/PrivacySecurity/TwoFactorAuth';
import DeviceManagement from '../screens/MyPage/Settings/PrivacySecurity/DeviceManagement';
import ServiceSuggestion from '../screens/MyPage/Settings/PrivacySecurity/ServiceSuggestion';
import PrivacyPolicy from '../screens/MyPage/Settings/PrivacySecurity/PrivacyPolicy';
// import MarketingConsent from '../screens/MyPage/Settings/PrivacySecurity/MarketingConsent';
// import PermissionSetup from '../screens/MyPage/Settings/PrivacySecurity/PermissionSetup';

import Trash from '../screens/MyPage/Settings/Trash'; 

import Notice from '../screens/MyPage/Service/Notice';
import CustomerCenter from '../screens/MyPage/Service/CustomerCenter';
import Inquiry from '../screens/MyPage/Service/Inquiry';
import FAQ from '../screens/MyPage/Service/FAQ';
import PhoneInquiry from '../screens/MyPage/Service/PhoneInquiry';

import Logout from '../screens/MyPage/account/Logout';
import Withdrawal from '../screens/MyPage/account/Withdrawal';


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const renderTabBar = (props) => <Footer {...props} />;

function FooterTabs() {
  return (
    <Tab.Navigator
      tabBar={renderTabBar}
      screenOptions={{ headerShown: false }}
    >
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
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="StartScreen" 
        screenOptions={{ headerShown: false }}
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
        <Stack.Screen name="ProjectDetail" component={ProjectDetail} options={{ animation: 'none' }} />
        <Stack.Screen name="ProjectTodo" component={ProjectTodo} options={{ animation: 'none' }} />
        <Stack.Screen name="Schedule" component={Schedule} options={{ animation: 'none' }} />
        <Stack.Screen name="Files" component={Files} options={{ animation: 'none' }} />
        <Stack.Screen name="AddNotice" component={AddNotice} />
        <Stack.Screen name="AddTodo" component={AddTodo} />
        <Stack.Screen name="AddSchedule" component={AddSchedule} />
        <Stack.Screen name="EditSchedule" component={EditSchedule} />
        <Stack.Screen name="FriendAdd" component={FriendAdd} />
        <Stack.Screen name="FriendRequestList" component={FriendRequestList} />
        <Stack.Screen name="TeamCreate" component={TeamCreate} />

        {/* 🚨 마이페이지 하위 스택 */}
        <Stack.Screen name="EditProfile" component={EditProfile} />
        <Stack.Screen name="Language" component={Language} />
        <Stack.Screen name="SettingNotification" component={SettingNotification} />
        <Stack.Screen name="Privacy" component={Privacy} />
        
        {/* 💡 [추가됨] 개인정보 및 보안 하위 6개 스택 등록 */}
        {/* <Stack.Screen name="TwoFactorAuth" component={TwoFactorAuth} /> */}
        <Stack.Screen name="DeviceManagement" component={DeviceManagement} />
        <Stack.Screen name="ServiceSuggestion" component={ServiceSuggestion} />
        <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicy} />
        {/* <Stack.Screen name="MarketingConsent" component={MarketingConsent} /> */}
        {/* <Stack.Screen name="PermissionSetup" component={PermissionSetup} /> */}

        <Stack.Screen name="Trash" component={Trash} />
        <Stack.Screen name="Notice" component={Notice} />
        <Stack.Screen name="CustomerCenter" component={CustomerCenter} />
        <Stack.Screen name="Inquiry" component={Inquiry} />
        <Stack.Screen name="FAQ" component={FAQ} />
        <Stack.Screen name="PhoneInquiry" component={PhoneInquiry} />
        <Stack.Screen name="Logout" component={Logout} />
        <Stack.Screen name="Withdrawal" component={Withdrawal} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}