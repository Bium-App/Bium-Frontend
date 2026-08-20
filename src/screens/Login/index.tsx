import React, { useRef } from 'react';
import type {RootScreenProps} from '../../types/navigation';
import { Animated, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useTranslation} from 'react-i18next';
import Header from '../../components/Header';
import { useLogin } from '../../hooks/useLogin';
import { useSocialLogin } from '../../hooks/useSocialLogin';

import GoogleIcon from '../../assets/icons/ic_google.svg';

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
  GoogleButton,
  GoogleButtonText,
} from './Login.styles';

export default function Login({navigation}: RootScreenProps<'Login'>) {
  const {t} = useTranslation();
  const { loginId, setLoginId, password, setPassword, isLoading, handleLoginSubmit } = useLogin();
  const { isLoading: isSocialLoading, handleGoogleLogin } = useSocialLogin();
  const fillAnimation = useRef(new Animated.Value(0)).current;
  const pressAnimation = useRef(new Animated.Value(1)).current;
  const isSubmittingRef = useRef(false);
  const isAnyLoginLoading = isLoading || isSocialLoading;

  const handleLogin = () => {
    // isLoading 상태는 애니메이션이 끝난 뒤에야 true가 되므로, 그 사이
    // 버튼을 빠르게 두 번 누르면 로그인 요청이 중복으로 나갈 수 있다.
    // 애니메이션 시작 전에 ref로 즉시 막는다.
    if (isSubmittingRef.current) return;
    isSubmittingRef.current = true;
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
        isSubmittingRef.current = false;
      });
    });
  };

  const handleSocialLogin = () => {
    if (isSubmittingRef.current) return;
    isSubmittingRef.current = true;
    handleGoogleLogin(session => {
      if (session.isNewUser) {
        navigation.reset({
          index: 0,
          routes: [{name: 'EditProfile', params: {onboarding: true}}],
        });
        return;
      }
      navigation.reset({index: 0, routes: [{name: 'MainTabs'}]});
    }).finally(() => {
      isSubmittingRef.current = false;
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
            <Icon name="chevron-back-outline" size={24} color="#FF8933" />
          </TouchableOpacity>
        }
      />
      <HeaderDivider />
      <ScrollContent>
        <GreetingText>{t('auth.ignite_memo')}</GreetingText>
        <InputWrapper>
          <Input
            placeholder={t('auth.login_id')}
            placeholderTextColor="#AAAAAA"
            value={loginId}
            onChangeText={setLoginId}
            autoCapitalize="none"
            editable={!isAnyLoginLoading}
          />
        </InputWrapper>
        <InputWrapper>
          <Input
            placeholder={t('auth.password')}
            placeholderTextColor="#AAAAAA"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            editable={!isAnyLoginLoading}
          />
        </InputWrapper>
        <AnimatedButtonContainer style={{ backgroundColor }}>
          <LoginButtonTouch
            onPress={handleLogin}
            disabled={isAnyLoginLoading}
            activeOpacity={1}
          >
            <AnimatedButtonText style={{ color: textColor, transform: [{ scale: pressAnimation }] }}>
              {isLoading ? t('auth.logging_in') : t('common.login')}
            </AnimatedButtonText>
          </LoginButtonTouch>
        </AnimatedButtonContainer>
        <LinksRow>
          <TouchableOpacity onPress={() => navigation.navigate('FindId')}>
            <LinkText>{t('auth.find_id')}</LinkText>
          </TouchableOpacity>
          <LinkDivider> | </LinkDivider>
          <TouchableOpacity onPress={() => navigation.navigate('FindPassword')}>
            <LinkText>{t('auth.find_password')}</LinkText>
          </TouchableOpacity>
          <LinkDivider> | </LinkDivider>
          <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
            <LinkText>{t('auth.sign_up')}</LinkText>
          </TouchableOpacity>
        </LinksRow>

        <DividerRow>
          <DividerLine />
          <DividerText>{t('auth.sns_login')}</DividerText>
          <DividerLine />
        </DividerRow>
        <GoogleButton
          accessibilityRole="button"
          accessibilityLabel="Google"
          activeOpacity={0.7}
          onPress={handleSocialLogin}
          disabled={isAnyLoginLoading}
        >
          <GoogleIcon width={20} height={20} />
          <GoogleButtonText>
            {isSocialLoading ? t('auth.logging_in') : t('auth.google_login')}
          </GoogleButtonText>
        </GoogleButton>
      </ScrollContent>
    </Container>
  );
}
