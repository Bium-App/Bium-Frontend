import React, { useEffect, useState } from 'react';
import type {RootScreenProps} from '../../../../../../types/navigation';
import { Alert, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Header from '../../../../../../components/Header';
import { useTwoFactorAuth } from '../../../../../../hooks/useTwoFactorAuth';
import {getApiResponseMessage} from '../../../../../../utils/apiError';

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

const CODE_EXPIRES_IN_SECONDS = 180;

export default function VerifyCode({route, navigation}: RootScreenProps<'VerifyCode'>) {
  const [code, setCode] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [remainingSeconds, setRemainingSeconds] = useState(
    CODE_EXPIRES_IN_SECONDS,
  );
  const { phoneNumber } = route.params ?? {};
  const { sendCode, verifyCode } = useTwoFactorAuth();

  useEffect(() => {
    if (!remainingSeconds) return undefined;
    const timerId = setInterval(() => {
      setRemainingSeconds(current => Math.max(current - 1, 0));
    }, 1000);
    return () => clearInterval(timerId);
  }, [remainingSeconds]);

  const timerText = `${String(Math.floor(remainingSeconds / 60)).padStart(
    2,
    '0',
  )}:${String(remainingSeconds % 60).padStart(2, '0')}`;

  const handleNext = async () => {
    if (!remainingSeconds) {
      Alert.alert('알림', '인증번호가 만료되었습니다. 다시 받아주세요.');
      return;
    }
    if (code.trim().length !== 6) {
      Alert.alert('알림', '인증번호 6자리를 입력해주세요.');
      return;
    }
    setIsLoading(true);
    try {
      await verifyCode(phoneNumber, code.trim());
      navigation.replace('Success', { phoneNumber });
    } catch (error) {
      Alert.alert(
        '인증 실패',
        getApiResponseMessage(error) ?? '인증번호를 확인해주세요.',
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleResend = async () => {
    if (!phoneNumber || isLoading) return;
    setIsLoading(true);
    try {
      await sendCode(phoneNumber);
      setRemainingSeconds(CODE_EXPIRES_IN_SECONDS);
      Alert.alert('완료', '인증번호를 다시 전송했습니다.');
    } catch (error) {
      Alert.alert(
        '오류',
        getApiResponseMessage(error) ?? '인증번호를 다시 보내지 못했습니다.',
      );
    } finally {
      setIsLoading(false);
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

              <TimerText>{timerText}</TimerText>

              <ResendButton
                disabled={isLoading}
                onPress={handleResend}
                activeOpacity={0.7}
              >
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
