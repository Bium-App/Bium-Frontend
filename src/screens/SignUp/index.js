import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Header from '../../components/Header';

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
  LoginLinkText
} from './SignUp.styles';

export default function SignUp({ navigation }) {
  const [name, setName] = useState('');
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [email, setEmail] = useState('');

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
          />
        </InputWrapper>

        <InputWrapper>
          <InputField
            placeholder="아이디"
            placeholderTextColor="#AAAAAA" 
            value={id}
            onChangeText={setId}
            autoCapitalize="none"
          />
        </InputWrapper>

        <InputWrapper>
          <InputField
            placeholder="비밀번호"
            placeholderTextColor="#AAAAAA" 
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
        </InputWrapper>

        <InputWrapper>
          <InputField
            placeholder="비밀번호 확인"
            placeholderTextColor="#AAAAAA" 
            value={passwordConfirm}
            onChangeText={setPasswordConfirm}
            secureTextEntry
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
          />
        </InputWrapper>

        <SignUpButton onPress={() => navigation.navigate('Login')}>
          <SignUpButtonText>가입하기</SignUpButtonText>
        </SignUpButton>

        <FooterRow>
          <FooterText>이미 계정이 있으신가요?</FooterText>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <LoginLinkText>로그인</LoginLinkText>
          </TouchableOpacity>
        </FooterRow>

      </ScrollContent>
    </Container>
  );
}