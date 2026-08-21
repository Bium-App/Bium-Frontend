import React from 'react';
import type {RootScreenProps} from '../../../../types/navigation';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useTranslation} from 'react-i18next';
import Header from '../../../../components/Header';
import { useUserSettings } from '../../../../hooks/useUserSettings';

import {
  Container,
  ScrollContainer,
  MenuCard,
  MenuText,
} from './PrivacySecurity.styles';

// 📋 기존 메뉴 리스트 (1번 메뉴의 targetScreen은 상황에 따라 바뀌어야 하므로 삭제했습니다)
const MENU_LIST = [
  { id: 1, titleKey: 'my_page.two_factor' }, // 💡 목적지를 동적으로 결정할 예정!
  { id: 2, titleKey: 'my_page.devices', targetScreen: 'DeviceManagement' },
  { id: 3, titleKey: 'my_page.suggestion', targetScreen: 'ServiceSuggestion' },
  { id: 4, titleKey: 'my_page.privacy_policy', targetScreen: 'PrivacyPolicy' },
  { id: 5, titleKey: 'my_page.marketing', targetScreen: 'MarketingConsent' },
  { id: 6, titleKey: 'my_page.permissions', targetScreen: 'PermissionSetup' },
] as const;

type PrivacyMenuItem = (typeof MENU_LIST)[number];

export default function PrivacySecurity({navigation}: RootScreenProps<'Privacy'>) {
  const {t} = useTranslation();
  const { settings } = useUserSettings();

  const handlePressMenu = (menuItem: PrivacyMenuItem) => {
    // 1번 메뉴(2단계 인증 설정)를 눌렀을 때의 특별 처리
    if (menuItem.id === 1) {
      if (settings.use2fa) {
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
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            activeOpacity={0.7}
          >
            <Icon name="chevron-back-outline" size={24} color="#FF8933" />
          </TouchableOpacity>
        }
        title={t('my_page.privacy_security')}
      />

      <ScrollContainer showsVerticalScrollIndicator={false}>
        {MENU_LIST.map(menu => (
          <MenuCard
            key={menu.id}
            activeOpacity={0.7}
            onPress={() => handlePressMenu(menu)}
          >
            <MenuText>{t(menu.titleKey)}</MenuText>
            <Icon name="chevron-forward" size={22} color="#000000" />
          </MenuCard>
        ))}
      </ScrollContainer>
    </Container>
  );
}
