import React, { useEffect } from 'react';
import type {RootScreenProps} from '../../types/navigation';
import { StatusBar } from 'react-native';
import {
  clearSession,
  getRefreshToken,
  getUserId,
} from '../../utils/authStorage';

import LogoWhite from '../../assets/icons/logo_white.svg';

import { Container, LogoWrapper, SubTitleText } from './StartScreen.styles';

export default function StartScreen({
  navigation,
}: RootScreenProps<'StartScreen'>) {
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
        <LogoWhite width={120} height={120} />
      </LogoWrapper>
      <SubTitleText>기록에도 온도가 있으니까</SubTitleText>
    </Container>
  );
}
