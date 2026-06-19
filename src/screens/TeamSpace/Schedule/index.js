import React from 'react';
import { StatusBar, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Header from '../../../components/Header'; 
import CalendarIcon from '../../../assets/icons/ic_calendar.svg';
import PlusIcon from '../../../assets/icons/ic_plus.svg';

import {
  Container,
  SearchContainer,
  SearchInput,
  TabContainer,
  TabItem,
  TabSeparator,
  TabText,
  SectionContainer,
  SectionHeader,
  SectionTitle,
  SmallAddButton,
  DateHeader,
  ListCard,
  TouchableListItem,
  ListItemLeft,
  IconCircle,
  TextColumn,
  ListItemTitle,
  ListItemTime,
  HeaderBackButton
} from './Schedule.styles';

export default function Schedule({ navigation }) {
  const todaySchedules = [
    { id: 1, title: '일정1', time: '09:00 - 10:00' },
    { id: 2, title: '일정1', time: '09:00 - 10:00' },
    { id: 3, title: '일정1', time: '09:00 - 10:00' },
  ];
  const futureSchedules1 = [
    { id: 4, title: '일정1', time: '09:00 - 10:00' },
    { id: 5, title: '일정1', time: '09:00 - 10:00' },
    { id: 6, title: '일정1', time: '09:00 - 10:00' },
  ];
  const futureSchedules2 = [
    { id: 7, title: '일정1', time: '09:00 - 10:00' },
    { id: 8, title: '일정1', time: '09:00 - 10:00' },
    { id: 9, title: '일정1', time: '09:00 - 10:00' },
  ];
  const backButton = (
    <HeaderBackButton onPress={() => navigation.goBack()} activeOpacity={0.8}>
      <Icon name="chevron-back" size={26} color="#FF8933" />
    </HeaderBackButton>
  );
  const ellipsisButton = (
    <HeaderBackButton onPress={() => {}} activeOpacity={0.8}>
      <Icon name="ellipsis-horizontal" size={24} color="#FF8933" />
    </HeaderBackButton>
  );
  return (
    <Container>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <Header title="프로젝트1" left={backButton} right={ellipsisButton} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <SearchContainer>
          <Icon name="search-outline" size={20} color="#000000" />
          <SearchInput placeholder="검색" placeholderTextColor="#000000" />
        </SearchContainer>        
        <TabContainer>
          <TabItem isActive={false} onPress={() => navigation.replace('ProjectDetail')} activeOpacity={0.7}>
            <TabText isActive={false}>홈</TabText>
          </TabItem>
          <TabSeparator />
          <TabItem isActive={false} onPress={() => navigation.replace('ProjectTodo')} activeOpacity={0.7}>
            <TabText isActive={false}>할일</TabText>
          </TabItem>
          <TabSeparator />
          <TabItem isActive={true} activeOpacity={1}>
            <TabText isActive={true}>일정</TabText>
          </TabItem>
          <TabSeparator />
          <TabItem isActive={false} onPress={() => navigation.replace('Files')} activeOpacity={0.7}>
            <TabText isActive={false}>파일</TabText>
          </TabItem>
        </TabContainer>
        <SectionContainer>
          <SectionHeader>
            <SectionTitle>오늘 일정</SectionTitle>
            <SmallAddButton activeOpacity={0.7} onPress={() => navigation.navigate('AddSchedule')}>
              <PlusIcon width={16} height={16} color="#FF8933" />
            </SmallAddButton>
          </SectionHeader>
          <ListCard>
            {todaySchedules.map((item, index) => (
              <TouchableListItem 
                key={item.id} 
                isLast={index === todaySchedules.length - 1}
                activeOpacity={0.7}
                onPress={() => navigation.navigate('EditSchedule')} 
              >
                <ListItemLeft>
                  <IconCircle>
                    <CalendarIcon width={24} height={24} color="#FF8933" />
                  </IconCircle>
                  <TextColumn>
                    <ListItemTitle>{item.title}</ListItemTitle>
                    <ListItemTime>{item.time}</ListItemTime>
                  </TextColumn>
                </ListItemLeft>
                <Icon name="chevron-forward" size={18} color="#AAAAAA" />
              </TouchableListItem>
            ))}
          </ListCard>
          <DateHeader>4월 25일 (목)</DateHeader>
          <ListCard>
            {futureSchedules1.map((item, index) => (
              <TouchableListItem 
                key={item.id} 
                isLast={index === futureSchedules1.length - 1}
                activeOpacity={0.7}
                onPress={() => navigation.navigate('EditSchedule')} 
              >
                <ListItemLeft>
                  <IconCircle>
                    <CalendarIcon width={16} height={16} color="#FF8933" />
                  </IconCircle>
                  <TextColumn>
                    <ListItemTitle>{item.title}</ListItemTitle>
                    <ListItemTime>{item.time}</ListItemTime>
                  </TextColumn>
                </ListItemLeft>
                <Icon name="chevron-forward" size={18} color="#BBBBBB" />
              </TouchableListItem>
            ))}
          </ListCard>
          <DateHeader>4월 26일 (금)</DateHeader>
          <ListCard>
            {futureSchedules2.map((item, index) => (
              <TouchableListItem 
                key={item.id} 
                isLast={index === futureSchedules2.length - 1}
                activeOpacity={0.7}
                onPress={() => navigation.navigate('EditSchedule')} 
              >
                <ListItemLeft>
                  <IconCircle>
                    <CalendarIcon width={16} height={16} color="#FF8933" />
                  </IconCircle>
                  <TextColumn>
                    <ListItemTitle>{item.title}</ListItemTitle>
                    <ListItemTime>{item.time}</ListItemTime>
                  </TextColumn>
                </ListItemLeft>
                <Icon name="chevron-forward" size={18} color="#BBBBBB" />
              </TouchableListItem>
            ))}
          </ListCard>
        </SectionContainer>
      </ScrollView>
    </Container>
  );
}