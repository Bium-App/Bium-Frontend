import React from 'react';
import type {RootScreenProps} from '../../../../../types/navigation';
import { Alert, RefreshControl, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Header from '../../../../../components/Header';
import AsyncState from '../../../../../components/AsyncState';
import IcMobile from '../../../../../assets/icons/ic_mobile.svg';
import IcLaptop from '../../../../../assets/icons/ic_laptop.svg';
import IcTablet from '../../../../../assets/icons/ic_tablet.svg';
import { useDeviceManagement } from '../../../../../hooks/useDeviceManagement';
import type {DeviceListItem} from '../../../../../hooks/useDeviceManagement';
import {getApiResponseMessage} from '../../../../../utils/apiError';

import {
  Container,
  ScrollContainer,
  SectionTitle,
  ListCard,
  DeviceRow,
  DeviceIconWrapper,
  DeviceTextCol,
  DeviceName,
  DeviceDesc,
  DeviceRightCol,
  CurrentBadge,
  CurrentBadgeText,
  TimeText,
  LogoutButton,
  LogoutButtonText,
} from './DeviceManagement.styles';

export default function DeviceManagement({navigation}: RootScreenProps<'DeviceManagement'>) {
  const {
    devices,
    isLoading,
    errorMessage,
    fetchDevices,
    logoutDevice,
    logoutAllDevices,
  } = useDeviceManagement();

  const renderDeviceIcon = (type: DeviceListItem['type']) => {
    if (type === 'laptop') {
      return <IcLaptop width={32} height={32} color="#000000" />;
    }
    if (type === 'tablet') {
      return <IcTablet width={50} height={38} color="#000000" />;
    }
    return <IcMobile width={32} height={32} color="#000000" />;
  };

  const confirmLogoutAll = () => {
    Alert.alert(
      '로그아웃',
      '현재 기기를 포함한 모든 기기에서 로그아웃하시겠습니까?',
      [
        { text: '취소', style: 'cancel' },
        {
          text: '로그아웃',
          style: 'destructive',
          onPress: async () => {
            try {
              await logoutAllDevices();
              navigation.reset({ index: 0, routes: [{ name: 'Login' }] });
            } catch (error) {
              Alert.alert(
                '오류',
                getApiResponseMessage(error) ??
                  '전체 기기 로그아웃에 실패했습니다.',
              );
            }
          },
        },
      ],
    );
  };

  const confirmLogoutDevice = (device: DeviceListItem) => {
    Alert.alert(
      '기기 로그아웃',
      `${device.name} 기기를 로그아웃하시겠습니까?`,
      [
        { text: '취소', style: 'cancel' },
        {
          text: '로그아웃',
          style: 'destructive',
          onPress: async () => {
            try {
              const loggedOutCurrentDevice = await logoutDevice(device.id);
              if (loggedOutCurrentDevice) {
                navigation.reset({ index: 0, routes: [{ name: 'Login' }] });
              }
            } catch (error) {
              Alert.alert(
                '오류',
                getApiResponseMessage(error) ??
                  '기기 로그아웃에 실패했습니다.',
              );
            }
          },
        },
      ],
    );
  };

  return (
    <Container>
      <Header
        left={
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            activeOpacity={0.7}
          >
            <Icon name="chevron-back-outline" size={24} color="#FF8933" />
          </TouchableOpacity>
        }
        title="로그인 기기 관리"
      />

      <ScrollContainer
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={isLoading}
            onRefresh={fetchDevices}
            tintColor="#FF8933"
          />
        }
      >
        <SectionTitle isFirst={true}>로그인 기기</SectionTitle>
        <ListCard>
          {devices.length ? (
            devices.map((device, index) => (
              <DeviceRow
                key={device.id}
                isLast={index === devices.length - 1}
                activeOpacity={0.7}
                disabled={isLoading}
                onPress={() => confirmLogoutDevice(device)}
              >
                <DeviceIconWrapper>
                  {renderDeviceIcon(device.type)}
                </DeviceIconWrapper>
                <DeviceTextCol>
                  <DeviceName>{device.name}</DeviceName>
                  <DeviceDesc>
                    {device.isCurrent ? '현재 로그인 기기' : '로그인 기기'}
                  </DeviceDesc>
                </DeviceTextCol>
                <DeviceRightCol>
                  {device.isCurrent ? (
                    <CurrentBadge>
                      <CurrentBadgeText>현재 기기</CurrentBadgeText>
                    </CurrentBadge>
                  ) : null}
                  <TimeText>{device.time}</TimeText>
                </DeviceRightCol>
              </DeviceRow>
            ))
          ) : (
            <AsyncState
              isLoading={isLoading}
              errorMessage={errorMessage}
              emptyMessage="로그인 기기가 없습니다."
              onRetry={fetchDevices}
            />
          )}
        </ListCard>

        <LogoutButton
          activeOpacity={0.8}
          disabled={isLoading}
          onPress={confirmLogoutAll}
        >
          <LogoutButtonText>모든 기기에서 로그아웃</LogoutButtonText>
        </LogoutButton>
      </ScrollContainer>
    </Container>
  );
}
