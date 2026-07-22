import React from 'react';
import { Alert, TouchableOpacity, View } from 'react-native';
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
  DividerRow,
  DividerLine,
  DividerText,
  VerificationRow,
  VerificationInput,
  TimerText,
  ResendButton,
  ResendButtonText,
  HelperText,
} from './FindPassword.styles';

export default function FindPassword({ navigation }) {
  const {
    loginId,
    setLoginId,
    email,
    setEmail,
    code,
    setCode,
    newPassword,
    setNewPassword,
    isCodeSent,
    isLoading,
    timerText,
    sendCode,
    resetPassword,
  } = useFindPassword();

  const handleReset = () => {
    resetPassword(() => {
      Alert.alert('변경 완료', '새 비밀번호로 로그인해주세요.', [
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
        <TitleText>비밀번호를 잊으셨나요?</TitleText>

        <InputWrapper>
          <InputField
            placeholder="아이디"
            placeholderTextColor="#AAAAAA"
            value={loginId}
            onChangeText={setLoginId}
            autoCapitalize="none"
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

        <SubmitButton disabled={isLoading} onPress={sendCode}>
          <SubmitButtonText>인증번호 받기</SubmitButtonText>
        </SubmitButton>

        {isCodeSent && (
          <View>
            <DividerRow>
              <DividerLine />
              <DividerText>인증번호 입력</DividerText>
              <DividerLine />
            </DividerRow>

            <VerificationRow>
              <VerificationInput
                placeholder="인증 번호"
                placeholderTextColor="#AAAAAA"
                value={code}
                onChangeText={setCode}
                keyboardType="number-pad"
              />
              <TimerText>{timerText}</TimerText>
              <ResendButton disabled={isLoading} onPress={sendCode}>
                <ResendButtonText>재전송</ResendButtonText>
              </ResendButton>
            </VerificationRow>

            <HelperText>인증번호는 3분간 유효합니다.</HelperText>

            <InputWrapper>
              <InputField
                placeholder="새 비밀번호"
                placeholderTextColor="#AAAAAA"
                value={newPassword}
                onChangeText={setNewPassword}
                secureTextEntry
              />
            </InputWrapper>

            <SubmitButton disabled={isLoading} onPress={handleReset}>
              <SubmitButtonText>비밀번호 재설정</SubmitButtonText>
            </SubmitButton>
          </View>
        )}
      </ScrollContent>
    </Container>
  );
}
