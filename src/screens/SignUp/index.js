import React from 'react';
import { TouchableOpacity, ActivityIndicator, Text } from 'react-native';
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
    email,
    setEmail,
    name,
    setName,
    nickname,
    setNickname, // 명세서 필수 파라미터 추가
    authCode,
    setAuthCode,
    isEmailSent,
    isEmailVerified,
    isLoading,
    handleSendCode,
    handleVerifyCode,
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

        {/* API 명세서에 맞추어 기존 스타일 그대로 닉네임 필드 추가 */}
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

        {/* 이메일 입력 및 인증 요청 버튼 (기존 컴포넌트 조합) */}
        <InputWrapper style={{ flexDirection: 'row', alignItems: 'center' }}>
          <InputField
            style={{ flex: 1 }}
            placeholder="이메일"
            placeholderTextColor="#AAAAAA"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            editable={!isEmailVerified && !isLoading}
          />
          <TouchableOpacity
            onPress={handleSendCode}
            disabled={isLoading || isEmailVerified}
            style={{
              marginLeft: 10,
              paddingVertical: 10,
              paddingHorizontal: 14,
              backgroundColor: isEmailVerified ? '#AAAAAA' : '#FF8933',
              borderRadius: 8,
            }}
          >
            <Text
              style={{ color: '#FFFFFF', fontWeight: 'bold', fontSize: 14 }}
            >
              {isEmailSent ? '재전송' : '인증요청'}
            </Text>
          </TouchableOpacity>
        </InputWrapper>

        {/* 인증번호 입력 폼 (이메일 발송 시에만 렌더링) */}
        {isEmailSent && !isEmailVerified && (
          <InputWrapper style={{ flexDirection: 'row', alignItems: 'center' }}>
            <InputField
              style={{ flex: 1 }}
              placeholder="인증번호 6자리"
              placeholderTextColor="#AAAAAA"
              value={authCode}
              onChangeText={setAuthCode}
              keyboardType="number-pad"
              editable={!isLoading}
            />
            <TouchableOpacity
              onPress={handleVerifyCode}
              disabled={isLoading}
              style={{
                marginLeft: 10,
                paddingVertical: 10,
                paddingHorizontal: 14,
                backgroundColor: '#FF8933',
                borderRadius: 8,
              }}
            >
              <Text
                style={{ color: '#FFFFFF', fontWeight: 'bold', fontSize: 14 }}
              >
                확인
              </Text>
            </TouchableOpacity>
          </InputWrapper>
        )}

        {/* 회원가입 제출 로직 연결 */}
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
