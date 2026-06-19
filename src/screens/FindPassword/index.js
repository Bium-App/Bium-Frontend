import React, { useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
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
  DividerRow,
  DividerLine,
  DividerText,
  VerificationRow,
  VerificationInput,
  TimerText,
  ResendButton,
  ResendButtonText,
  HelperText
} from './FindPassword.styles';

export default function FindPassword({ navigation }) {
  const [id, setId] = useState('');
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [isCodeSent, setIsCodeSent] = useState(false);

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
            value={id}
            onChangeText={setId}
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

        <SubmitButton onPress={() => setIsCodeSent(true)}>
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
              <TimerText>02:31</TimerText>
              <ResendButton onPress={() => console.log('재전송')}>
                <ResendButtonText>재전송</ResendButtonText>
              </ResendButton>
            </VerificationRow>
            
            <HelperText>인증번호는 3분간 유효합니다.</HelperText>

            <SubmitButton onPress={() => console.log('비밀번호 재설정')}>
              <SubmitButtonText>비밀번호 재설정</SubmitButtonText>
            </SubmitButton>
          </View>
        )}

      </ScrollContent>
    </Container>
  );
}