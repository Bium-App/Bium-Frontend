import React from 'react';
import { TouchableOpacity, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
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

export default function SignUp({ navigation }) {
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
            <Icon name="chevron-back-outline" size={24} color="#AAAAAA" />
          </TouchableOpacity>
        }
      />
      <HeaderDivider />
      <ScrollContent>
        <TitleText>회원가입</TitleText>

        <InputWrapper>
          <InputField
            placeholder="이름"
            placeholderTextColor="#AAAAAA"
            value={name}
            onChangeText={setName}
            editable={!isLoading}
          />
        </InputWrapper>

        <InputWrapper>
          <InputField
            placeholder="닉네임"
            placeholderTextColor="#AAAAAA"
            value={nickname}
            onChangeText={setNickname}
            editable={!isLoading}
          />
        </InputWrapper>

        <InputWrapper>
          <InputField
            placeholder="아이디"
            placeholderTextColor="#AAAAAA"
            value={loginId}
            onChangeText={setLoginId}
            autoCapitalize="none"
            editable={!isLoading}
          />
        </InputWrapper>

        <InputWrapper>
          <InputField
            placeholder="비밀번호"
            placeholderTextColor="#AAAAAA"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            editable={!isLoading}
          />
        </InputWrapper>

        <InputWrapper>
          <InputField
            placeholder="비밀번호 확인"
            placeholderTextColor="#AAAAAA"
            value={passwordConfirm}
            onChangeText={setPasswordConfirm}
            secureTextEntry
            editable={!isLoading}
          />
        </InputWrapper>

        <InputWrapper>
          <InputField
            placeholder="이메일"
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
            placeholder="휴대폰 번호"
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
            <SignUpButtonText>가입하기</SignUpButtonText>
          )}
        </SignUpButton>

        <FooterRow>
          <FooterText>이미 계정이 있으신가요?</FooterText>
          <TouchableOpacity
            onPress={() => navigation.navigate('Login')}
            disabled={isLoading}
          >
            <LoginLinkText>로그인</LoginLinkText>
          </TouchableOpacity>
        </FooterRow>
      </ScrollContent>
    </Container>
  );
}
