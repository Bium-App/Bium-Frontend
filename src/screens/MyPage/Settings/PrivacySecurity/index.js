import React from 'react';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Header from '../../../../components/Header'; // 💡 공통 헤더 

import {
  Container,
  ScrollContainer,
  MenuCard,
  MenuText
} from './PrivacySecurity.styles';

export default function PrivacySecurity({ navigation }) {
  
  // 💡 1. 2단계 인증 설정 이동 로직
  const handlePressTwoFactorAuth = () => {
    navigation.navigate('TwoFactorAuth');
  };

  // 💡 2. 로그인 기기 관리 이동 로직
  const handlePressDeviceManagement = () => {
    navigation.navigate('DeviceManagement');
  };

  // 💡 3. 서비스 개선 제안 이동 로직
  const handlePressServiceSuggestion = () => {
    navigation.navigate('ServiceSuggestion');
  };

  // 💡 4. 개인정보 처리방침 이동 로직
  const handlePressPrivacyPolicy = () => {
    navigation.navigate('PrivacyPolicy');
  };

  // 💡 5. 마케팅 정보 수신 동의 이동 로직
  const handlePressMarketingConsent = () => {
    navigation.navigate('MarketingConsent');
  };

  // 💡 6. 필수 권한 설정 이동 로직
  const handlePressPermissionSetup = () => {
    navigation.navigate('PermissionSetup');
  };

  return (
    <Container>
      <Header
        left={
          <TouchableOpacity onPress={() => navigation.goBack()} activeOpacity={0.7}>
            <Icon name="chevron-back-outline" size={28} color="#FF8933" />
          </TouchableOpacity>
        }
        title="개인정보 및 보안" 
      />

      <ScrollContainer showsVerticalScrollIndicator={false}>
        
        {/* 1. 2단계 인증 설정 */}
        <MenuCard activeOpacity={0.7} onPress={handlePressTwoFactorAuth}>
          <MenuText>2단계 인증 설정</MenuText>
          <Icon name="chevron-forward" size={22} color="#1A1A1A" />
        </MenuCard>

        {/* 2. 로그인 기기 관리 */}
        <MenuCard activeOpacity={0.7} onPress={handlePressDeviceManagement}>
          <MenuText>로그인 기기 관리</MenuText>
          <Icon name="chevron-forward" size={22} color="#1A1A1A" />
        </MenuCard>

        {/* 3. 서비스 개선 제안 */}
        <MenuCard activeOpacity={0.7} onPress={handlePressServiceSuggestion}>
          <MenuText>서비스 개선 제안</MenuText>
          <Icon name="chevron-forward" size={22} color="#1A1A1A" />
        </MenuCard>

        {/* 4. 개인정보 처리방침 */}
        <MenuCard activeOpacity={0.7} onPress={handlePressPrivacyPolicy}>
          <MenuText>개인정보 처리방침</MenuText>
          <Icon name="chevron-forward" size={22} color="#1A1A1A" />
        </MenuCard>

        {/* 5. 마케팅 정보 수신 동의 */}
        <MenuCard activeOpacity={0.7} onPress={handlePressMarketingConsent}>
          <MenuText>마케팅 정보 수신 동의</MenuText>
          <Icon name="chevron-forward" size={22} color="#1A1A1A" />
        </MenuCard>

        {/* 6. 필수 권한 설정 */}
        <MenuCard activeOpacity={0.7} onPress={handlePressPermissionSetup}>
          <MenuText>필수 권한 설정</MenuText>
          <Icon name="chevron-forward" size={22} color="#1A1A1A" />
        </MenuCard>

      </ScrollContainer>
    </Container>
  );
}