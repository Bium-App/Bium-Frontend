import React from 'react';
import { Alert, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Header from '../../components/Header';
import { useFindId } from '../../hooks/useFindId';

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
  LinkDivider,
} from './FindId.styles';

export default function FindId({ navigation }) {
  const { email, setEmail, isLoading, findLoginId } = useFindId();

  const handleSubmit = () => {
    findLoginId(loginId => {
      Alert.alert('아이디 찾기 완료', `회원님의 아이디는 ${loginId}입니다.`, [
        { text: '로그인', onPress: () => navigation.navigate('Login') },
      ]);
    });
  };
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
            placeholder="이메일"
            placeholderTextColor="#AAAAAA"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </InputWrapper>
        <SubmitButton disabled={isLoading} onPress={handleSubmit}>
          <SubmitButtonText>아이디 찾기</SubmitButtonText>
        </SubmitButton>
        <LinksRow>
          <TouchableOpacity onPress={() => navigation.navigate('FindPassword')}>
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
