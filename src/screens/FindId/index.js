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
  SubmitButton,
  SubmitButtonText,
  LinksRow,
  LinkText,
  LinkDivider
} from './FindId.styles';

export default function FindId({ navigation }) {
  const [name, setName] = useState('');
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
        <TitleText>아이디를 잊으셨나요?</TitleText>
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
            placeholder="이메일"
            placeholderTextColor="#AAAAAA" 
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </InputWrapper>
        <SubmitButton onPress={() => console.log('아이디 찾기 요청')}>
          <SubmitButtonText>아이디 찾기</SubmitButtonText>
        </SubmitButton>
        <LinksRow>
          <TouchableOpacity onPress={() => console.log('비밀번호 찾기 이동')}>
            <LinkText>비밀번호 찾기</LinkText>
          </TouchableOpacity>
          <LinkDivider>|</LinkDivider>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <LinkText>로그인</LinkText>
          </TouchableOpacity>
        </LinksRow>
      </ScrollContent>
    </Container>
  );
}