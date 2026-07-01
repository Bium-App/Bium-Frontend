import React from 'react';
import { TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Header from '../../../../../components/Header'; 
import IcMobile from '../../../../../assets/icons/ic_mobile.svg';
import IcLaptop from '../../../../../assets/icons/ic_laptop.svg';
import IcTablet from '../../../../../assets/icons/ic_tablet.svg';

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
  LogoutButtonText
} from './DeviceManagement.styles';

const CURRENT_DEVICE = {
  id: 1,
  type: 'mobile',
  name: 'iPhone 16 pro',
  desc: 'ios 17 · 대한민국 · 서울',
};

const RECENT_DEVICES = [
  { id: 101, type: 'laptop', name: 'Windows PC', desc: 'Chrome · 대한민국 · 서울', time: '2일 전' },
  { id: 102, type: 'tablet', name: 'iPad Air', desc: 'ios 17 · 대한민국 · 서울', time: '5일 전' },
  { id: 103, type: 'laptop', name: 'Macbook Air', desc: 'safari · 대한민국 · 서울', time: '한달 전' },
];

export default function DeviceManagement({ navigation }) {

  const renderDeviceIcon = (type) => {
    switch (type) {
      case 'mobile':
        return <IcMobile width={32} height={32} color="#000000" />;
      case 'laptop':
        return <IcLaptop width={32} height={32} color="#000000" />;
      case 'tablet':
        return <IcTablet width={50} height={38} color="#000000" />;
      default:
        return <IcMobile width={32} height={32} color="#000000" />; 
    }
  };

  const handleLogoutAll = () => {
    Alert.alert(
      "로그아웃", 
      "현재 기기를 포함한 모든 기기에서 로그아웃 하시겠습니까?",
      [
        { text: "취소", style: "cancel" },
        { text: "로그아웃", style: "destructive", onPress: () => console.log("로그아웃 실행") }
      ]
    );
  };

  return (
    <Container>
      <Header
        left={
          <TouchableOpacity onPress={() => navigation.goBack()} activeOpacity={0.7}>
            <Icon name="chevron-back-outline" size={24} color="#FF8933" />
          </TouchableOpacity>
        }
        title="로그인 기기 관리" 
      />

      <ScrollContainer showsVerticalScrollIndicator={false}>
        <SectionTitle isFirst={true}>현재 로그인 기기</SectionTitle>
        <ListCard>
          <DeviceRow isLast={true}>
            <DeviceIconWrapper>
              {renderDeviceIcon(CURRENT_DEVICE.type)}
            </DeviceIconWrapper>
            
            <DeviceTextCol>
              <DeviceName>{CURRENT_DEVICE.name}</DeviceName>
              <DeviceDesc>{CURRENT_DEVICE.desc}</DeviceDesc>
            </DeviceTextCol>
            
            <DeviceRightCol>
              <CurrentBadge>
                <CurrentBadgeText>현재 기기</CurrentBadgeText>
              </CurrentBadge>
            </DeviceRightCol>
          </DeviceRow>
        </ListCard>

        <SectionTitle isFirst={false}>최근 로그인 기록</SectionTitle>
        <ListCard>
          {RECENT_DEVICES.map((device, index) => {
            const isLast = index === RECENT_DEVICES.length - 1;

            return (
              <DeviceRow key={device.id} isLast={isLast}>
                <DeviceIconWrapper>
                  {renderDeviceIcon(device.type)}
                </DeviceIconWrapper>

                <DeviceTextCol>
                  <DeviceName>{device.name}</DeviceName>
                  <DeviceDesc>{device.desc}</DeviceDesc>
                </DeviceTextCol>
                
                <DeviceRightCol>
                  <TimeText>{device.time}</TimeText>
                </DeviceRightCol>
              </DeviceRow>
            );
          })}
        </ListCard>

        <LogoutButton activeOpacity={0.8} onPress={handleLogoutAll}>
          <LogoutButtonText>모든 기기에서 로그아웃</LogoutButtonText>
        </LogoutButton>

      </ScrollContainer>
    </Container>
  );
}