import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Header from '../../../../components/Header'; 

import {
  Container,
  ScrollContainer,
  MenuCard,
  MenuText
} from './PrivacySecurity.styles';

// 📋 기존 메뉴 리스트 (1번 메뉴의 targetScreen은 상황에 따라 바뀌어야 하므로 삭제했습니다)
const MENU_LIST = [
  { id: 1, title: '2단계 인증 설정' }, // 💡 목적지를 동적으로 결정할 예정!
  { id: 2, title: '로그인 기기 관리', targetScreen: 'DeviceManagement' },
  { id: 3, title: '서비스 개선 제안', targetScreen: 'ServiceSuggestion' },
  { id: 4, title: '개인정보 처리방침', targetScreen: 'PrivacyPolicy' },
  { id: 5, title: '마케팅 정보 수신 동의', targetScreen: 'MarketingConsent' },
  { id: 6, title: '필수 권한 설정', targetScreen: 'PermissionSetup' },
];

export default function PrivacySecurity({ navigation }) {
  
  // 💡 [핵심 해결] 2단계 인증 설정 완료 여부를 체크하는 가짜 상태(Mock State)입니다.
  // 서버 연동 전까지 이 값을 true / false 로 바꿔가며 두 화면을 모두 테스트할 수 있습니다!
  // - true: 이미 설정 완료된 유저 -> 'Management(관리)' 화면으로 이동
  // - false: 처음 설정하는 유저 -> 'TwoFactorIntro(인트로)' 화면으로 이동
  const [is2FASetupComplete, setIs2FASetupComplete] = useState(true);

  const handlePressMenu = (menuItem) => {
    // 1번 메뉴(2단계 인증 설정)를 눌렀을 때의 특별 처리
    if (menuItem.id === 1) {
      if (is2FASetupComplete) {
        navigation.navigate('Management'); // 완료된 유저는 관리 페이지로!
      } else {
        navigation.navigate('TwoFactorIntro'); // 안 된 유저는 설정 페이지로!
      }
    } 
    // 나머지 메뉴들은 기존처럼 정해진 타겟 스크린으로 이동
    else if (menuItem.targetScreen) {
      navigation.navigate(menuItem.targetScreen);
    }
  };

  return (
    <Container>
      <Header
        left={
          <TouchableOpacity onPress={() => navigation.goBack()} activeOpacity={0.7}>
            <Icon name="chevron-back-outline" size={24} color="#FF8933" />
          </TouchableOpacity>
        }
        title="개인정보 및 보안" 
      />

      <ScrollContainer showsVerticalScrollIndicator={false}>
        {MENU_LIST.map((menu) => (
          <MenuCard 
            key={menu.id} 
            activeOpacity={0.7} 
            onPress={() => handlePressMenu(menu)}
          >
            <MenuText>{menu.title}</MenuText>
            <Icon name="chevron-forward" size={22} color="#000000" />
          </MenuCard>
        ))}
      </ScrollContainer>
    </Container>
  );
}