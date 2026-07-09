import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Header from '../../../../../../components/Header';

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
  FindPasswordText
} from './PasswordCheck.styles';

export default function PasswordCheck({ navigation }) {
  // 💾 상태 관리 (State)
  // 아이디는 고정이므로 상태로 관리할 필요가 없고, 입력되는 비밀번호만 상태로 관리합니다.
  const [password, setPassword] = useState('');
  
  // 비밀번호 입력창에 커서가 깜빡이고 있는지(포커스 상태) 여부를 추적하여 테두리 색을 바꾸기 위함
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);

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
          
          <TitleText>
            보안을 위해 현재 비밀번호를{'\n'}입력해주세요.
          </TitleText>

          <InputWrapper>
            <ReadOnlyInput
              value="example@gmail.com"
              editable={false} 
            />
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
                <ClearIconWrapper onPress={() => setPassword('')} activeOpacity={0.7}>
                  <Icon name="close-circle" size={24} color="#BBBBBB" />
                </ClearIconWrapper>
              )}
            </PasswordInputContainer>
          </InputWrapper>

          <SubmitButton activeOpacity={0.8} onPress={() => navigation.navigate('MethodSelect')}>
            <SubmitButtonText>확인</SubmitButtonText>
          </SubmitButton>

          <FindPasswordWrapper activeOpacity={0.7} onPress={() => navigation.navigate('FindPassword')}>
            <FindPasswordText>비밀번호가 기억나지 않으세요?</FindPasswordText>
          </FindPasswordWrapper>
          
        </ContentWrapper>
      </MainContainer>
    </Container>
  );
}