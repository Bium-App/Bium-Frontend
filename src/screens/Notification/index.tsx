import React, { useEffect } from 'react';
import type {RootScreenProps} from '../../types/navigation';
import { TouchableOpacity, RefreshControl } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useTranslation} from 'react-i18next';

import FireIcon from '../../assets/icons/ic_fire.svg';
import IceIcon from '../../assets/icons/ic_ice.svg';

import Header from '../../components/Header';
import AsyncState from '../../components/AsyncState';
import { useNotification } from '../../hooks/useNotification';
import type {NotificationListItem} from '../../hooks/useNotification';
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

export default function Notification({
  navigation,
}: RootScreenProps<'Notification'>) {
  const {t} = useTranslation();
  const {
    notifications,
    isLoading,
    errorMessage,
    fetchNotifications,
    openNotification,
    deleteNotification,
  } = useNotification();

  const handleOpenNotification = (item: NotificationListItem) => {
    openNotification(item, {
      onMemoReady: memoData => {
        navigation.navigate('MainTabs', {
          screen: 'MemoEditor',
          params: { memoData },
        });
      },
      onNavigate: (screen, params) => {
        if (screen === 'FriendRequestList') {
          navigation.navigate(screen);
        } else if (screen === 'ProjectDetail' && params) {
          navigation.navigate(screen, {projectId: params.projectId});
        } else if (screen === 'ProjectTodo' && params) {
          navigation.navigate(screen, {
            projectId: params.projectId,
            todoId: params.todoId,
          });
        }
      },
    });
  };

  useEffect(() => {
    fetchNotifications();
  }, [fetchNotifications]);

  return (
    <Container>
      <Header
        title={t('common.notification')}
        left={
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            activeOpacity={0.7}
          >
            <Icon name="chevron-back-outline" size={24} color="#FF8933" />
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
            emptyMessage={t('state.no_notifications')}
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
