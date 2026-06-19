import React, { useEffect } from 'react';
import { StatusBar } from 'react-native';

import LogoWhite from '../../assets/icons/logo_white.svg';

import {
  Container,
  LogoWrapper,
  SubTitleText
} from './StartScreen.styles';

export default function StartScreen({ navigation }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Splash');
    }, 2000);

    return () => clearTimeout(timer);
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