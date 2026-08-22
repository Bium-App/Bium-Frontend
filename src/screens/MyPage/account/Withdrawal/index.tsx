import React from 'react';
import type {RootScreenProps} from '../../../../types/navigation';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useTranslation} from 'react-i18next';
import Header from '../../../../components/Header';
import IcAlert from '../../../../assets/icons/ic_alert.svg';
import { useWithdrawal } from '../../../../hooks/useWithdrawal';

import {
  Container,
  ScrollContainer,
  IconBackground,
  Title,
  Description,
  InfoBox,
  BulletRow,
  BulletPoint,
  BulletText,
  AgreeContainer,
  AgreeText,
  ButtonContainer,
  PrimaryButton,
  PrimaryButtonText,
  SecondaryButton,
  SecondaryButtonText,
} from './Withdrawal.styles';

export default function Withdrawal({navigation}: RootScreenProps<'Withdrawal'>) {
  const {t} = useTranslation();
  const { isAgreed, setIsAgreed, isLoading, handleWithdrawal } =
    useWithdrawal(navigation);

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
        title={t('withdrawal_screen.title')}
      />

      <ScrollContainer showsVerticalScrollIndicator={false}>
        <IconBackground>
          <IcAlert width={12} height={55} color="#FFFFFF" />
        </IconBackground>

        <Title>{t('withdrawal_screen.question')}</Title>
        <Description>
          {t('withdrawal_screen.description')}
        </Description>

        <InfoBox>
          <BulletRow>
            <BulletPoint>•</BulletPoint>
            <BulletText>{t('withdrawal_screen.data_deleted')}</BulletText>
          </BulletRow>

          <BulletRow>
            <BulletPoint>•</BulletPoint>
            <BulletText>
              {t('withdrawal_screen.rejoin')}
            </BulletText>
          </BulletRow>

          <BulletRow isLast={true}>
            <BulletPoint>•</BulletPoint>
            <BulletText>{t('withdrawal_screen.service_limited')}</BulletText>
          </BulletRow>
        </InfoBox>

        <AgreeContainer
          activeOpacity={0.7}
          onPress={() => setIsAgreed(!isAgreed)}
        >
          <Icon
            name={isAgreed ? 'checkmark-circle' : 'ellipse-outline'}
            size={20}
            color={isAgreed ? '#FF8933' : '#D9D9D9'}
          />
          <AgreeText>{t('withdrawal_screen.agree')}</AgreeText>
        </AgreeContainer>
      </ScrollContainer>

      <ButtonContainer>
        <PrimaryButton
          activeOpacity={0.8}
          disabled={isLoading}
          onPress={handleWithdrawal}
        >
          <PrimaryButtonText>{t('my_page.withdrawal')}</PrimaryButtonText>
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
