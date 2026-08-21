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
          {/* 💡 [시각적 정중앙 맞추기]
              SVG 내부의 화살표 모양 때문에 눈으로 보기에 한쪽으로 치우쳐 보일 수 있습니다.
              transform을 사용해 아이콘을 살짝 위로(-4px), 오른쪽으로(4px) 밀어서 시각적 밸런스를 잡았습니다. 
              (원하시는 느낌에 맞춰 숫자를 조금씩 조절해 보세요!) */}
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
