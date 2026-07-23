import React from 'react';
import { Alert, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Header from '../../components/Header';
import { useFindPassword } from '../../hooks/useFindPassword';

import {
  Container,
  HeaderDivider,
  ScrollContent,
  TitleText,
  InputWrapper,
  InputField,
  SubmitButton,
  SubmitButtonText,
  HelperText,
} from './FindPassword.styles';

export default function FindPassword({ navigation }) {
  const { email, setEmail, isLoading, findPassword } = useFindPassword();

  const handleFindPassword = () => {
    findPassword(() => {
      Alert.alert(
        '발송 완료',
        '가입한 이메일로 임시 비밀번호를 발송했습니다.',
        [{ text: '로그인', onPress: () => navigation.navigate('Login') }],
      );
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
        <TitleText>비밀번호를 잊으셨나요?</TitleText>
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
        <HelperText>가입한 이메일로 임시 비밀번호가 발송됩니다.</HelperText>
        <SubmitButton disabled={isLoading} onPress={handleFindPassword}>
          <SubmitButtonText>임시 비밀번호 받기</SubmitButtonText>
        </SubmitButton>
      </ScrollContent>
    </Container>
  );
}
