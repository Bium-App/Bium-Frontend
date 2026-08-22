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

// 1번 메뉴는 2단계 인증 설정 여부에 따라 이동할 화면이 달라져 targetScreen을 두지 않는다.
const MENU_LIST = [
  { id: 1, titleKey: 'my_page.two_factor' },
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
    if (menuItem.id === 1) {
      if (settings.use2fa) {
        navigation.navigate('Management');
      } else {
        navigation.navigate('TwoFactorIntro');
      }
    }
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
