import React from 'react';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
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

export default function Logout({ navigation }) {
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
        title="로그아웃"
      />

      <Content>
        <IconBackground>
          {/* 💡 [시각적 정중앙 맞추기]
              SVG 내부의 화살표 모양 때문에 눈으로 보기에 한쪽으로 치우쳐 보일 수 있습니다.
              transform을 사용해 아이콘을 살짝 위로(-4px), 오른쪽으로(4px) 밀어서 시각적 밸런스를 잡았습니다. 
              (원하시는 느낌에 맞춰 숫자를 조금씩 조절해 보세요!) */}
          <IcLogout width={81} height={95} color="#FF8933" />
        </IconBackground>

        <Title>로그아웃하시겠어요?</Title>
        <Description>
          로그아웃 시 모든 데이터는 저장되며{'\n'}
          다음 로그인 시 기기에서 계속 이용할 수 있습니다.
        </Description>
      </Content>

      <ButtonContainer>
        <PrimaryButton
          activeOpacity={0.8}
          disabled={isLoading}
          onPress={handleLogout}
        >
          <PrimaryButtonText>로그아웃</PrimaryButtonText>
        </PrimaryButton>

        <SecondaryButton
          activeOpacity={0.8}
          onPress={() => navigation.goBack()}
        >
          <SecondaryButtonText>취소</SecondaryButtonText>
        </SecondaryButton>
      </ButtonContainer>
    </Container>
  );
}
