import React, { useState } from 'react';
import type {RootScreenProps} from '../../../../../../types/navigation';
import { Alert, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Header from '../../../../../../components/Header';
import { useCurrentUser } from '../../../../../../hooks/useCurrentUser';
import { useTwoFactorAuth } from '../../../../../../hooks/useTwoFactorAuth';
import {
  getApiResponseMessage,
  getErrorMessage,
} from '../../../../../../utils/apiError';

import {
  Container,
  MainContainer,
  ContentWrapper,
  TitleText,
  InputWrapper,
  ReadOnlyInput,
  PasswordInputContainer,
  PasswordInput,
  ClearIconWrapper,
  SubmitButton,
  SubmitButtonText,
  FindPasswordWrapper,
  FindPasswordText,
} from './PasswordCheck.styles';

export default function PasswordCheck({navigation}: RootScreenProps<'PasswordCheck'>) {
  const [password, setPassword] = useState('');
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useCurrentUser();
  const { verifyCurrentPassword } = useTwoFactorAuth();

  const handleSubmit = async () => {
    if (!password) {
      Alert.alert('알림', '현재 비밀번호를 입력해주세요.');
      return;
    }
    setIsLoading(true);
    try {
      const isMatched = await verifyCurrentPassword(password);
      if (!isMatched) {
        Alert.alert('확인 실패', '비밀번호가 일치하지 않습니다.');
        return;
      }
      navigation.navigate('MethodSelect');
    } catch (error) {
      Alert.alert(
        '오류',
        getApiResponseMessage(error) ??
          getErrorMessage(error) ??
          '비밀번호를 확인하지 못했습니다.',
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
          <TitleText>보안을 위해 현재 비밀번호를{'\n'}입력해주세요.</TitleText>

          <InputWrapper>
            <ReadOnlyInput value={user?.email ?? ''} editable={false} />
          </InputWrapper>

          <InputWrapper>
            <PasswordInputContainer isFocused={isPasswordFocused}>
              <PasswordInput
                placeholder="비밀번호"
                placeholderTextColor="#AAAAAA" /* 999999 -> AAAAAA */
                value={password}
                onChangeText={setPassword}
                secureTextEntry // 비밀번호를 마스킹 처리(••••)
                onFocus={() => setIsPasswordFocused(true)}
                onBlur={() => setIsPasswordFocused(false)}
              />

              {password.length > 0 && (
                <ClearIconWrapper
                  onPress={() => setPassword('')}
                  activeOpacity={0.7}
                >
                  <Icon name="close-circle" size={24} color="#BBBBBB" />
                </ClearIconWrapper>
              )}
            </PasswordInputContainer>
          </InputWrapper>

          <SubmitButton
            activeOpacity={0.8}
            disabled={isLoading}
            onPress={handleSubmit}
          >
            <SubmitButtonText>확인</SubmitButtonText>
          </SubmitButton>

          <FindPasswordWrapper
            activeOpacity={0.7}
            onPress={() => navigation.navigate('FindPassword')}
          >
            <FindPasswordText>비밀번호가 기억나지 않으세요?</FindPasswordText>
          </FindPasswordWrapper>
        </ContentWrapper>
      </MainContainer>
    </Container>
  );
}
