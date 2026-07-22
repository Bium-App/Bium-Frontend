import React, { useEffect, useState } from 'react';
import { Alert, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Header from '../../../../../../components/Header';
import IcMobile from '../../../../../../assets/icons/ic_device_phone.svg';
import { useCurrentUser } from '../../../../../../hooks/useCurrentUser';
import { useTwoFactorAuth } from '../../../../../../hooks/useTwoFactorAuth';

import {
  Container,
  MainContainer,
  ContentWrapper,
  TopContentWrapper,
  TitleText,
  SectionLabel,
  OptionsCard,
  OptionItem,
  RadioOuter,
  RadioInner,
  OptionTextContent,
  OptionTitle,
  OptionValueRow,
  OptionValueInput,
  RightIconWrapper,
  InfoBox,
  InfoText,
  SubmitButton,
  SubmitButtonText,
} from './MethodSelect.styles';

export default function MethodSelect({ navigation }) {
  const [isLoading, setIsLoading] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const { user } = useCurrentUser();
  const { setupPhone } = useTwoFactorAuth();

  useEffect(() => {
    if (user?.phoneNumber) setPhoneNumber(user.phoneNumber);
  }, [user?.phoneNumber]);

  const handleNext = async () => {
    if (!phoneNumber.trim()) {
      Alert.alert('알림', '2단계 인증에 사용할 휴대폰 번호를 입력해주세요.');
      return;
    }
    setIsLoading(true);
    try {
      await setupPhone(phoneNumber.trim());
      navigation.navigate('VerifyCode', {
        phoneNumber: phoneNumber.trim(),
      });
    } catch (error) {
      Alert.alert(
        '오류',
        error.response?.data?.message ??
          '2단계 인증 수단을 저장하지 못했습니다.',
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
          <TopContentWrapper>
            <TitleText>인증방식을 선택하세요.</TitleText>

            <SectionLabel>인증 방법</SectionLabel>

            <OptionsCard>
              <OptionItem activeOpacity={1}>
                <RadioOuter isSelected={true}>
                  <RadioInner />
                </RadioOuter>

                <OptionTextContent>
                  <OptionTitle>휴대폰 인증</OptionTitle>
                  <OptionValueRow>
                    <OptionValueInput
                      value={phoneNumber}
                      onChangeText={setPhoneNumber}
                      placeholder="010-0000-0000"
                      placeholderTextColor="#AAAAAA"
                      keyboardType="phone-pad"
                    />
                  </OptionValueRow>
                </OptionTextContent>

                <RightIconWrapper>
                  <IcMobile width={19} height={31} />
                </RightIconWrapper>
              </OptionItem>
            </OptionsCard>

            <InfoBox>
              <Icon
                name="information-circle-outline"
                size={17}
                color="#FF8933"
              />
              <InfoText>
                현재 명세에서 지원하는 2단계 인증 수단은 휴대폰입니다.
              </InfoText>
            </InfoBox>
          </TopContentWrapper>

          <SubmitButton
            activeOpacity={0.8}
            disabled={isLoading}
            onPress={handleNext}
          >
            <SubmitButtonText>다음</SubmitButtonText>
          </SubmitButton>
        </ContentWrapper>
      </MainContainer>
    </Container>
  );
}
