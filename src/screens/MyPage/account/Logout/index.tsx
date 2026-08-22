import React from 'react';
import type {RootScreenProps} from '../../../../types/navigation';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useTranslation} from 'react-i18next';
import Header from '../../../../components/Header';
import IcLogout from '../../../../assets/icons/ic_logout.svg';
import { useLogout } from '../../../../hooks/useLogout';

import {
  Container,
  Content,
  IconBackground,
  Title,
  Description,
  ButtonContainer,
  PrimaryButton,
  PrimaryButtonText,
  SecondaryButton,
  SecondaryButtonText,
} from './Logout.styles';

export default function Logout({navigation}: RootScreenProps<'Logout'>) {
  const {t} = useTranslation();
  const { isLoading, handleLogout } = useLogout(navigation);

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
        title={t('my_page.logout')}
      />

      <Content>
        <IconBackground>
          <IcLogout width={81} height={95} color="#FF8933" />
        </IconBackground>

        <Title>{t('logout_screen.question')}</Title>
        <Description>
          {t('logout_screen.description')}
        </Description>
      </Content>

      <ButtonContainer>
        <PrimaryButton
          activeOpacity={0.8}
          disabled={isLoading}
          onPress={handleLogout}
        >
          <PrimaryButtonText>{t('my_page.logout')}</PrimaryButtonText>
        </PrimaryButton>

        <SecondaryButton
          activeOpacity={0.8}
          onPress={() => navigation.goBack()}
        >
          <SecondaryButtonText>{t('home.cancel')}</SecondaryButtonText>
        </SecondaryButton>
      </ButtonContainer>
    </Container>
  );
}
