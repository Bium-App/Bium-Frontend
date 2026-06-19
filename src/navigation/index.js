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
import MyPage from '../screens/MyPage';
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

        <Stack.Screen 
          name="ProjectDetail" 
          component={ProjectDetail} 
          options={{ animation: 'none' }} 
        />
        <Stack.Screen 
          name="ProjectTodo" 
          component={ProjectTodo} 
          options={{ animation: 'none' }} 
        />
        <Stack.Screen 
          name="Schedule" 
          component={Schedule} 
          options={{ animation: 'none' }} 
        />
        <Stack.Screen 
          name="Files" 
          component={Files} 
          options={{ animation: 'none' }} 
        />

        <Stack.Screen name="AddNotice" component={AddNotice} />
        <Stack.Screen name="AddTodo" component={AddTodo} />
        <Stack.Screen name="AddSchedule" component={AddSchedule} />
        <Stack.Screen name="EditSchedule" component={EditSchedule} />
        <Stack.Screen name="FriendAdd" component={FriendAdd} />
        <Stack.Screen name="FriendRequestList" component={FriendRequestList} />
        <Stack.Screen name="TeamCreate" component={TeamCreate} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}