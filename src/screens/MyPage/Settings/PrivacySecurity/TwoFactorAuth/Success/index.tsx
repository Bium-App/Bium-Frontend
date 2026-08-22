import React from 'react';
import type {RootScreenProps} from '../../../../../../types/navigation';
import { Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import dayjs from 'dayjs';

import Header from '../../../../../../components/Header';

import ImgSuccessBadge from '../../../../../../assets/icons/img_success_badge.svg';
import IcShieldCheck from '../../../../../../assets/icons/ic_shield_check.svg';
import IcDevicePhone from '../../../../../../assets/icons/ic_device_phone.svg';
import IcCalendarLine from '../../../../../../assets/icons/ic_calendar_line.svg';
import { useUserSettings } from '../../../../../../hooks/useUserSettings';
import {getApiResponseMessage} from '../../../../../../utils/apiError';

import {
  Container,
  MainContainer,
  ContentWrapper,
  TopContentWrapper,
  IconWrapper,
  TitleText,
  DescText,
  BottomArea,
  SummaryBox,
  SummaryHeader,
  SummaryRow,
  LabelWrapper,
  IconContainer,
  LabelText,
  ValueText,
  SubmitButton,
  SubmitButtonText,
} from './Success.styles';

// 2단계 인증 설정 흐름의 마지막 단계: 인증 성공 후 설정을 저장하고 요약을 보여준 뒤 MyPage로 돌아간다.
export default function Success({route, navigation}: RootScreenProps<'Success'>) {
  const { saveSettings } = useUserSettings();
  const {method, destination} = route.params;

  const handleConfirm = async () => {
    try {
      await saveSettings({
        use2fa: true,
        twoFactorMethod: method,
        twoFactorDestination: destination,
      });
      navigation.navigate('MainTabs', {
        screen: 'MyPage',
      });
    } catch (error) {
      Alert.alert(
        '오류',
        getApiResponseMessage(error) ?? '2단계 인증 설정 저장에 실패했습니다.',
      );
    }
  };

  return (
    <Container>
      <Header title="2단계 인증 설정" />

      <MainContainer>
        <ContentWrapper>
          <TopContentWrapper>
            <IconWrapper>
              <ImgSuccessBadge width={103} height={121} />
            </IconWrapper>

            <TitleText>2단계 인증 설정이{'\n'}완료되었습니다!</TitleText>
            <DescText>
              이제 로그인 시 추가 인증을 통해{'\n'}계정이 안전하게 보호됩니다.
            </DescText>
          </TopContentWrapper>

          <BottomArea>
            <SummaryBox>
              <SummaryHeader>설정 요약</SummaryHeader>

              <SummaryRow>
                <LabelWrapper>
                  <IconContainer>
                    <IcShieldCheck width={21} height={21} />
                  </IconContainer>
                  <LabelText>인증방식</LabelText>
                </LabelWrapper>
                <ValueText>
                  {method === 'EMAIL' ? '이메일 인증' : '휴대폰 인증'}
                </ValueText>
              </SummaryRow>

              <SummaryRow>
                <LabelWrapper>
                  <IconContainer>
                    {method === 'EMAIL' ? (
                      <Icon name="mail-outline" size={21} color="#BBBBBB" />
                    ) : (
                      <IcDevicePhone width={15} height={25} />
                    )}
                  </IconContainer>
                  <LabelText>
                    {method === 'EMAIL' ? '등록 이메일' : '등록된 번호'}
                  </LabelText>
                </LabelWrapper>
                <ValueText>{destination || '등록 완료'}</ValueText>
              </SummaryRow>

              <SummaryRow>
                <LabelWrapper>
                  <IconContainer>
                    <IcCalendarLine width={16} height={16} />
                  </IconContainer>
                  <LabelText>설정일</LabelText>
                </LabelWrapper>
                <ValueText>{dayjs().format('YY.MM.DD')}</ValueText>
              </SummaryRow>
            </SummaryBox>

            <SubmitButton activeOpacity={0.8} onPress={handleConfirm}>
              <SubmitButtonText>확인</SubmitButtonText>
            </SubmitButton>
          </BottomArea>
        </ContentWrapper>
      </MainContainer>
    </Container>
  );
}
