import React, { useEffect } from 'react';
import { TouchableOpacity, RefreshControl } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import FireIcon from '../../assets/icons/ic_fire.svg';
import IceIcon from '../../assets/icons/ic_ice.svg';

import Header from '../../components/Header';
import AsyncState from '../../components/AsyncState';
import { useNotification } from '../../hooks/useNotification';
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
  DeleteButton,
} from './Notification.styles';

export default function Notification({ navigation }) {
  const {
    notifications,
    isLoading,
    errorMessage,
    fetchNotifications,
    openNotification,
    deleteNotification,
  } = useNotification();

  const handleOpenNotification = item => {
    openNotification(item, {
      onMemoReady: memoData => {
        navigation.navigate('MainTabs', {
          screen: 'MemoEditor',
          params: { memoData },
        });
      },
      onNavigate: (screen, params) => navigation.navigate(screen, params),
    });
  };

  useEffect(() => {
    fetchNotifications();
  }, [fetchNotifications]);

  return (
    <Container>
      <Header
        title="알림"
        left={
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            activeOpacity={0.7}
          >
            <Icon name="chevron-back-outline" size={24} color="#AAAAAA" />
          </TouchableOpacity>
        }
      />

      <ListContainer
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={isLoading}
            onRefresh={fetchNotifications}
            tintColor="#FF8933"
          />
        }
      >
        {notifications.length === 0 ? (
          <AsyncState
            isLoading={isLoading}
            errorMessage={errorMessage}
            emptyMessage="새로운 알림이 없습니다."
            onRetry={fetchNotifications}
          />
        ) : null}
        {notifications.map(item => (
          <NotificationCard
            key={item.id}
            activeOpacity={0.7}
            onPress={() => handleOpenNotification(item)}
          >
            <IconWrapper type={item.type}>
              {item.type === 'FIRE' ? (
                <FireIcon width={28} height={28} color="#FF8933" />
              ) : (
                <IceIcon width={28} height={28} color="#7CC4FF" />
              )}
            </IconWrapper>

            <TextContent>
              <CardTitle>{item.title}</CardTitle>
              <CardDescription>{item.description}</CardDescription>
            </TextContent>

            <RightContent>
              <TimeText>{item.time}</TimeText>
              <DeleteButton onPress={() => deleteNotification(item.id)}>
                <Icon name="close" size={20} color="#BBBBBB" />
              </DeleteButton>
            </RightContent>
          </NotificationCard>
        ))}
      </ListContainer>
    </Container>
  );
}
