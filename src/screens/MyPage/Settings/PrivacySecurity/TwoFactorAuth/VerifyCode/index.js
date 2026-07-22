import React, { useState } from 'react';
import { Alert, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Header from '../../../../../../components/Header';
import { useTwoFactorAuth } from '../../../../../../hooks/useTwoFactorAuth';

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
  SubmitButtonText,
} from './VerifyCode.styles';

export default function VerifyCode({ route, navigation }) {
  const [code, setCode] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { phoneNumber } = route.params ?? {};
  const { setupPhone, verifyCode } = useTwoFactorAuth();

  const handleNext = async () => {
    if (code.trim().length !== 6) {
      Alert.alert('알림', '인증번호 6자리를 입력해주세요.');
      return;
    }
    setIsLoading(true);
    try {
      await verifyCode(code.trim());
      navigation.replace('Success', { phoneNumber });
    } catch (error) {
      Alert.alert(
        '인증 실패',
        error.response?.data?.message ?? '인증번호를 확인해주세요.',
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleResend = async () => {
    if (!phoneNumber) return;
    try {
      await setupPhone(phoneNumber);
      Alert.alert('완료', '인증번호를 다시 전송했습니다.');
    } catch (error) {
      Alert.alert(
        '오류',
        error.response?.data?.message ?? '인증번호를 다시 보내지 못했습니다.',
      );
    }
  };

  return (
    <Container>
      <Header
        left={
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            activeOpacity={0.7}
          >
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

              <ResendButton onPress={handleResend} activeOpacity={0.7}>
                <ResendButtonText>재전송</ResendButtonText>
              </ResendButton>
            </VerificationRow>

            <HelperText>인증번호는 3분간 유효합니다.</HelperText>
          </TopContentWrapper>

          <SubmitButton
            activeOpacity={0.8}
            disabled={isLoading}
            onPress={handleNext}
          >
            <SubmitButtonText>다음</SubmitButtonText>
          </SubmitButton>
        </ContentWrapper>
      </MainContainer>
    </Container>
  );
}
