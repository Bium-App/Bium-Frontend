import React from 'react';
import type {RootScreenProps} from '../../types/navigation';
import { Alert, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useTranslation} from 'react-i18next';
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

// 비밀번호 찾기 화면. 이메일을 입력받아 임시 비밀번호를 발급받도록 안내한다.
export default function FindPassword({
  navigation,
}: RootScreenProps<'FindPassword'>) {
  const {t} = useTranslation();
  const { email, setEmail, isLoading, findPassword } = useFindPassword();

  const handleFindPassword = () => {
    findPassword(() => {
      Alert.alert(
        t('auth.sent'),
        t('auth.temporary_password_sent'),
        [{ text: t('common.login'), onPress: () => navigation.navigate('Login') }],
      );
    });
  };

  return (
    <Container>
      <Header
        left={
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="chevron-back-outline" size={24} color="#FF8933" />
          </TouchableOpacity>
        }
      />
      <HeaderDivider />
      <ScrollContent>
        <TitleText>{t('auth.forgot_password')}</TitleText>
        <InputWrapper>
          <InputField
            placeholder={t('common.email')}
            placeholderTextColor="#AAAAAA"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </InputWrapper>
        <HelperText>{t('auth.temporary_password_helper')}</HelperText>
        <SubmitButton disabled={isLoading} onPress={handleFindPassword}>
          <SubmitButtonText>{t('auth.get_temporary_password')}</SubmitButtonText>
        </SubmitButton>
      </ScrollContent>
    </Container>
  );
}
