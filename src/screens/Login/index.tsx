import React, { useRef } from 'react';
import type {RootScreenProps} from '../../types/navigation';
import { Animated, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useTranslation} from 'react-i18next';
import Header from '../../components/Header';
import { useLogin } from '../../hooks/useLogin';

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
} from './Login.styles';

export default function Login({navigation}: RootScreenProps<'Login'>) {
  const {t} = useTranslation();
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
            editable={!isLoading}
          />
        </InputWrapper>
        <InputWrapper>
          <Input
            placeholder={t('auth.password')}
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
      </ScrollContent>
    </Container>
  );
}
