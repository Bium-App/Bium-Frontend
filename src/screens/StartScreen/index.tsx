import React, { useEffect } from 'react';
import type {RootScreenProps} from '../../types/navigation';
import { StatusBar } from 'react-native';
import {useTranslation} from 'react-i18next';
import {
  clearSession,
  getRefreshToken,
  getUserId,
} from '../../utils/authStorage';

import Logo from '../../assets/icons/logo_white.svg';

import { Container, LogoWrapper, SubTitleText } from './StartScreen.styles';

export default function StartScreen({
  navigation,
}: RootScreenProps<'StartScreen'>) {
  const {t} = useTranslation();
  useEffect(() => {
    let isMounted = true;

    const timer = setTimeout(async () => {
      let hasRestorableSession = false;
      try {
        const [refreshToken, userId] = await Promise.all([
          getRefreshToken(),
          getUserId(),
        ]);
        hasRestorableSession = Boolean(refreshToken && userId);
        if (!hasRestorableSession && (refreshToken || userId)) {
          await clearSession();
        }
      } catch {
        hasRestorableSession = false;
      }

      if (!isMounted) return;
      navigation.replace(hasRestorableSession ? 'MainTabs' : 'Splash');
    }, 2000);

    return () => {
      isMounted = false;
      clearTimeout(timer);
    };
  }, [navigation]);

  return (
    <Container>
      <StatusBar barStyle="light-content" backgroundColor="#FF8933" />
      <LogoWrapper>
        <Logo width={120} height={120} />
      </LogoWrapper>
      <SubTitleText>{t('splash.slogan')}</SubTitleText>
    </Container>
  );
}
