import React, { useRef } from 'react';
import { Animated, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Header from '../../components/Header';
import { useLogin } from '../../hooks/useLogin';

import KakaoIcon from '../../assets/icons/ic_kakao.svg';
import NaverIcon from '../../assets/icons/ic_naver.svg';
import GoogleIcon from '../../assets/icons/ic_google.svg';
import FacebookIcon from '../../assets/icons/ic_facebook.svg';
import AppleIcon from '../../assets/icons/ic_apple.svg';

import {
  Container,
  HeaderDivider,
  ScrollContent,
  GreetingText,
  InputWrapper,
  Input,
  AnimatedButtonContainer,
  LoginButtonTouch,
  AnimatedButtonText,
  LinksRow,
  LinkText,
  LinkDivider,
  DividerRow,
  DividerLine,
  DividerText,
  SnsRow,
  SnsButton,
} from './Login.styles';

export default function Login({ navigation }) {
  const { loginId, setLoginId, password, setPassword, isLoading, handleLoginSubmit } = useLogin();
  const fillAnimation = useRef(new Animated.Value(0)).current;
  const pressAnimation = useRef(new Animated.Value(1)).current;

  const handleLogin = () => {
    Animated.sequence([
      Animated.parallel([
        Animated.timing(fillAnimation, { toValue: 1, duration: 250, useNativeDriver: false }),
        Animated.sequence([
          Animated.timing(pressAnimation, {
            toValue: 0.92,
            duration: 100,
            useNativeDriver: false,
          }),
          Animated.spring(pressAnimation, {
            toValue: 1,
            friction: 4,
            useNativeDriver: false,
          }),
        ]),
      ]),
    ]).start(() => {
      handleLoginSubmit(() => navigation.reset({ index: 0, routes: [{ name: 'MainTabs' }] })).finally(() => {
        fillAnimation.setValue(0);
      });
    });
  };

  const backgroundColor = fillAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ['#FFFFFF', '#FF8933'],
  });
  const textColor = fillAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ['#FF8933', '#FFFFFF'],
  });

  return (
    <Container>
      <Header
        left={
          <TouchableOpacity onPress={() => navigation.navigate('Splash')}>
            <Icon name="chevron-back-outline" size={24} color="#AAAAAA" />
          </TouchableOpacity>
        }
      />
      <HeaderDivider />
      <ScrollContent>
        <GreetingText>메모 점화하기</GreetingText>
        <InputWrapper>
          <Input
            placeholder="아이디"
            placeholderTextColor="#AAAAAA"
            value={loginId}
            onChangeText={setLoginId}
            autoCapitalize="none"
            editable={!isLoading}
          />
        </InputWrapper>
        <InputWrapper>
          <Input
            placeholder="비밀번호"
            placeholderTextColor="#AAAAAA"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            editable={!isLoading}
          />
        </InputWrapper>
        <AnimatedButtonContainer style={{ backgroundColor }}>
          <LoginButtonTouch onPress={handleLogin} disabled={isLoading} activeOpacity={1}>
            <AnimatedButtonText style={{ color: textColor, transform: [{ scale: pressAnimation }] }}>
              {isLoading ? '로그인 중...' : '로그인'}
            </AnimatedButtonText>
          </LoginButtonTouch>
        </AnimatedButtonContainer>
        <LinksRow>
          <TouchableOpacity onPress={() => navigation.navigate('FindId')}>
            <LinkText>아이디 찾기</LinkText>
          </TouchableOpacity>
          <LinkDivider> | </LinkDivider>
          <TouchableOpacity onPress={() => navigation.navigate('FindPassword')}>
            <LinkText>비밀번호 찾기</LinkText>
          </TouchableOpacity>
          <LinkDivider> | </LinkDivider>
          <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
            <LinkText>회원가입</LinkText>
          </TouchableOpacity>
        </LinksRow>
        <DividerRow>
          <DividerLine />
          <DividerText>SNS 계정으로 로그인</DividerText>
          <DividerLine />
        </DividerRow>
        <SnsRow>
          <SnsButton><KakaoIcon width={36} height={36} /></SnsButton>
          <SnsButton><NaverIcon width={36} height={36} /></SnsButton>
          <SnsButton><GoogleIcon width={36} height={36} /></SnsButton>
          <SnsButton><FacebookIcon width={36} height={36} /></SnsButton>
          <SnsButton><AppleIcon width={36} height={36} /></SnsButton>
        </SnsRow>
      </ScrollContent>
    </Container>
  );
}
