import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import FireIcon from '../../assets/icons/ic_fire.svg';
import IceIcon from '../../assets/icons/ic_ice.svg';

import Header from '../../components/Header';
import {
  Container,
  ListContainer,
  NotificationCard,
  IconWrapper,
  TextContent,
  CardTitle,
  CardDescription,
  RightContent,
  TimeText,
  DeleteButton
} from './Notification.styles';

export default function Notification({ navigation }) {
  const [notifications, setNotifications] = useState([
    { id: '1', title: '발표 자료 준비하기', description: '10분 뒤 소멸 예정', time: '1분 전', type: 'FIRE' },
    { id: '2', title: '회의록 0415', description: '얼음 메모로 보관됨', time: '10분 전', type: 'ICE' },
    { id: '3', title: '아이디어 정리', description: '30분 뒤 소멸 예정', time: '40분 전', type: 'FIRE' },
    { id: '4', title: '운동 계획', description: '2시간 뒤 소멸 예정', time: '어제', type: 'FIRE' },
    { id: '5', title: '독서 노트', description: '얼음 메모로 보관됨', time: '어제', type: 'ICE' },
    { id: '6', title: '일정 체크', description: '오늘 중 소멸 예정', time: '어제', type: 'FIRE' },
    { id: '7', title: '장보기 리스트', description: '얼음 메모로 보관됨', time: '어제', type: 'ICE' },
    { id: '8', title: '여행 계획', description: '얼음 메모로 보관됨', time: '어제', type: 'ICE' },
  ]);

  const handleDelete = (id) => {
    setNotifications(notifications.filter(item => item.id !== id));
  };

  return (
    <Container>
      <Header 
        title="알림"
        left={
          <TouchableOpacity onPress={() => navigation.goBack()} activeOpacity={0.7}>
            <Icon name="chevron-back-outline" size={24} color="#AAAAAA" /> 
          </TouchableOpacity>
        }
      />

      <ListContainer showsVerticalScrollIndicator={false}>
        {notifications.map((item) => (
          <NotificationCard key={item.id}>
            <IconWrapper type={item.type}>
              {item.type === 'FIRE' ? (
                <FireIcon width={28} height={28} fill="#FF8933" /> 
              ) : (
                <IceIcon width={28} height={28} fill="#7CC4FF" /> 
              )}
            </IconWrapper>

            <TextContent>
              <CardTitle>{item.title}</CardTitle>
              <CardDescription>{item.description}</CardDescription>
            </TextContent>

            <RightContent>
              <TimeText>{item.time}</TimeText>
              <DeleteButton onPress={() => handleDelete(item.id)}>
                <Icon name="close" size={20} color="#BBBBBB" /> 
              </DeleteButton>
            </RightContent>
          </NotificationCard>
        ))}
      </ListContainer>
    </Container>
  );
}