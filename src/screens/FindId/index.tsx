import React from 'react';
import type {RootScreenProps} from '../../types/navigation';
import { Alert, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useTranslation} from 'react-i18next';
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

export default function FindId({navigation}: RootScreenProps<'FindId'>) {
  const {t} = useTranslation();
  const { email, setEmail, isLoading, findLoginId } = useFindId();

  const handleSubmit = () => {
    findLoginId(loginId => {
      Alert.alert(t('auth.find_id_complete'), t('auth.found_id', {loginId}), [
        { text: t('common.login'), onPress: () => navigation.navigate('Login') },
      ]);
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
        <TitleText>{t('auth.forgot_id')}</TitleText>
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
        <SubmitButton disabled={isLoading} onPress={handleSubmit}>
          <SubmitButtonText>{t('auth.find_id')}</SubmitButtonText>
        </SubmitButton>
        <LinksRow>
          <TouchableOpacity onPress={() => navigation.navigate('FindPassword')}>
            <LinkText>{t('auth.find_password')}</LinkText>
          </TouchableOpacity>
          <LinkDivider>|</LinkDivider>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <LinkText>{t('common.login')}</LinkText>
          </TouchableOpacity>
        </LinksRow>
      </ScrollContent>
    </Container>
  );
}
