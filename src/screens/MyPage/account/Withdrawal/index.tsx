import React from 'react';
import type {RootScreenProps} from '../../../../types/navigation';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
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
        title="회원 탈퇴"
      />

      <ScrollContainer showsVerticalScrollIndicator={false}>
        <IconBackground>
          <IcAlert width={12} height={55} color="#FFFFFF" />
        </IconBackground>

        <Title>정말 탈퇴하시겠습니까?</Title>
        <Description>
          탈퇴 시 계정과 모든 데이터가 삭제되며,{'\n'}
          복구할 수 없습니다.
        </Description>

        <InfoBox>
          <BulletRow>
            <BulletPoint>•</BulletPoint>
            <BulletText>모든 할일,일정,파일 데이터가 삭제됩니다.</BulletText>
          </BulletRow>

          <BulletRow>
            <BulletPoint>•</BulletPoint>
            <BulletText>
              탈퇴 후 동일한 이메일로 재가입이 가능하지만,{'\n'}이전데이터는
              복구되지 않습니다.
            </BulletText>
          </BulletRow>

          <BulletRow isLast={true}>
            <BulletPoint>•</BulletPoint>
            <BulletText>진행중인 서비스 이용이 제한됩니다.</BulletText>
          </BulletRow>
        </InfoBox>

        {/* 동의 체크박스 터치 영역 */}
        <AgreeContainer
          activeOpacity={0.7}
          onPress={() => setIsAgreed(!isAgreed)}
        >
          <Icon
            name={isAgreed ? 'checkmark-circle' : 'ellipse-outline'}
            size={20} /* 24 -> 20 */
            color={isAgreed ? '#FF8933' : '#D9D9D9'} /* C7C7C7 -> D9D9D9 */
          />
          <AgreeText>위 내용을 모두 확인했으며, 탈퇴에 동의합니다.</AgreeText>
        </AgreeContainer>
      </ScrollContainer>

      <ButtonContainer>
        <PrimaryButton
          activeOpacity={0.8}
          disabled={isLoading}
          onPress={handleWithdrawal}
        >
          <PrimaryButtonText>탈퇴하기</PrimaryButtonText>
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
