import React from 'react';
import type {RootScreenProps} from '../../types/navigation';
import { TouchableOpacity, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useTranslation} from 'react-i18next';
import Header from '../../components/Header';
import { useSignUp } from '../../hooks/useSignUp'; // ViewModel Hook Import

import {
  Container,
  HeaderDivider,
  ScrollContent,
  TitleText,
  InputWrapper,
  InputField,
  SignUpButton,
  SignUpButtonText,
  FooterRow,
  FooterText,
  LoginLinkText,
} from './SignUp.styles';

export default function SignUp({navigation}: RootScreenProps<'SignUp'>) {
  const {t} = useTranslation();
  // 기존 useState -> 훅에서 상태와 함수를 모두 가져옴
  const {
    loginId,
    setLoginId,
    password,
    setPassword,
    passwordConfirm,
    setPasswordConfirm,
    name,
    setName,
    nickname,
    setNickname,
    email,
    setEmail,
    phoneNumber,
    setPhoneNumber,
    isLoading,
    handleSignUpSubmit,
  } = useSignUp();

  return (
    <Container>
      <Header
        left={
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="chevron-back-outline" size={24} color="#FF8933" />
          </TouchableOpacity>
        }
      />
      <HeaderDivider />
      <ScrollContent>
        <TitleText>{t('auth.sign_up')}</TitleText>

        <InputWrapper>
          <InputField
            placeholder={t('auth.name')}
            placeholderTextColor="#AAAAAA"
            value={name}
            onChangeText={setName}
            editable={!isLoading}
          />
        </InputWrapper>

        <InputWrapper>
          <InputField
            placeholder={t('auth.nickname')}
            placeholderTextColor="#AAAAAA"
            value={nickname}
            onChangeText={setNickname}
            editable={!isLoading}
          />
        </InputWrapper>

        <InputWrapper>
          <InputField
            placeholder={t('auth.login_id')}
            placeholderTextColor="#AAAAAA"
            value={loginId}
            onChangeText={setLoginId}
            autoCapitalize="none"
            editable={!isLoading}
          />
        </InputWrapper>

        <InputWrapper>
          <InputField
            placeholder={t('auth.password')}
            placeholderTextColor="#AAAAAA"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            editable={!isLoading}
          />
        </InputWrapper>

        <InputWrapper>
          <InputField
            placeholder={t('auth.confirm_password')}
            placeholderTextColor="#AAAAAA"
            value={passwordConfirm}
            onChangeText={setPasswordConfirm}
            secureTextEntry
            editable={!isLoading}
          />
        </InputWrapper>

        <InputWrapper>
          <InputField
            placeholder={t('common.email')}
            placeholderTextColor="#AAAAAA"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            editable={!isLoading}
          />
        </InputWrapper>

        <InputWrapper>
          <InputField
            placeholder={t('auth.phone_number')}
            placeholderTextColor="#AAAAAA"
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            keyboardType="phone-pad"
            editable={!isLoading}
          />
        </InputWrapper>

        <SignUpButton
          onPress={() => handleSignUpSubmit(() => navigation.navigate('Login'))}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color="#ffffff" />
          ) : (
            <SignUpButtonText>{t('auth.create_account')}</SignUpButtonText>
          )}
        </SignUpButton>

        <FooterRow>
          <FooterText>{t('auth.already_have_account')}</FooterText>
          <TouchableOpacity
            onPress={() => navigation.navigate('Login')}
            disabled={isLoading}
          >
            <LoginLinkText>{t('common.login')}</LoginLinkText>
          </TouchableOpacity>
        </FooterRow>
      </ScrollContent>
    </Container>
  );
}
