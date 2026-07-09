import React, { useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Header from '../../../../../../components/Header';

import {
  Container,
  MainContainer,
  ContentWrapper,
  TopContentWrapper,
  TitleText,
  VerificationRow,
  InputContainer,
  CodeInput,
  TimerText,
  ResendButton,
  ResendButtonText,
  HelperText,
  SubmitButton,
  SubmitButtonText
} from './VerifyCode.styles';

export default function VerifyCode({ navigation }) {
  const [code, setCode] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const handleNext = () => {
    navigation.navigate('Success');
  };

  return (
    <Container>
      <Header
        left={
          <TouchableOpacity onPress={() => navigation.goBack()} activeOpacity={0.7}>
            <Icon name="chevron-back-outline" size={24} color="#FF8933" />
          </TouchableOpacity>
        }
        title="2단계 인증 설정"
      />

      <MainContainer>
        <ContentWrapper>
          <TopContentWrapper>
            
            <TitleText>
              문자로 전송된 인증번호{'\n'}6자리를 입력해주세요.
            </TitleText>

            <VerificationRow>
              
              <InputContainer isFocused={isFocused}>
                <CodeInput
                  value={code}
                  onChangeText={setCode}
                  keyboardType="number-pad" 
                  maxLength={6}
                  onFocus={() => setIsFocused(true)} 
                  onBlur={() => setIsFocused(false)} 
                />
              </InputContainer>

              <TimerText>02:31</TimerText>

              <ResendButton onPress={() => console.log('인증번호 재전송 API 호출')} activeOpacity={0.7}>
                <ResendButtonText>재전송</ResendButtonText>
              </ResendButton>

            </VerificationRow>
            
            <HelperText>인증번호는 3분간 유효합니다.</HelperText>
          </TopContentWrapper>

          <SubmitButton activeOpacity={0.8} onPress={handleNext}>
            <SubmitButtonText>다음</SubmitButtonText>
          </SubmitButton>

        </ContentWrapper>
      </MainContainer>
    </Container>
  );
}