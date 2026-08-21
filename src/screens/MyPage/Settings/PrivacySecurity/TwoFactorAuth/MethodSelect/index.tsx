import React, {useState} from 'react';
import type {RootScreenProps} from '../../../../../../types/navigation';
import { Alert, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Header from '../../../../../../components/Header';
import IcMobile from '../../../../../../assets/icons/ic_device_phone.svg';
import { useCurrentUser } from '../../../../../../hooks/useCurrentUser';
import { useTwoFactorAuth } from '../../../../../../hooks/useTwoFactorAuth';
import {getApiResponseMessage} from '../../../../../../utils/apiError';
import type {TwoFactorMethod} from '../../../../../../types/auth';

import {
  Container,
  MainContainer,
  ContentWrapper,
  TopContentWrapper,
  TitleText,
  SectionLabel,
  OptionsCard,
  OptionItem,
  Divider,
  RadioOuter,
  RadioInner,
  OptionTextContent,
  OptionTitle,
  OptionValueRow,
  OptionValue,
  RightIconWrapper,
  InfoBox,
  InfoText,
  SubmitButton,
  SubmitButtonText,
} from './MethodSelect.styles';

export default function MethodSelect({navigation}: RootScreenProps<'MethodSelect'>) {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedMethod, setSelectedMethod] =
    useState<TwoFactorMethod>('PHONE');
  const {user, isLoading: isUserLoading} = useCurrentUser();
  const { setupMethod } = useTwoFactorAuth();
  const phoneNumber = user?.phoneNumber?.trim() ?? '';
  const email = user?.email?.trim() ?? '';

  const handleNext = async () => {
    const destination = selectedMethod === 'EMAIL' ? email : phoneNumber;
    if (!destination) {
      Alert.alert(
        '알림',
        selectedMethod === 'EMAIL'
          ? '2단계 인증에 사용할 이메일을 입력해주세요.'
          : '2단계 인증에 사용할 휴대폰 번호를 입력해주세요.',
      );
      return;
    }
    if (
      selectedMethod === 'EMAIL' &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(destination)
    ) {
      Alert.alert('알림', '올바른 이메일 형식을 입력해주세요.');
      return;
    }
    setIsLoading(true);
    try {
      await setupMethod(selectedMethod, destination);
      navigation.navigate('VerifyCode', {
        method: selectedMethod,
        destination,
      });
    } catch (error) {
      Alert.alert(
        '오류',
        getApiResponseMessage(error) ??
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
              <OptionItem
                activeOpacity={0.8}
                onPress={() => setSelectedMethod('PHONE')}
              >
                <RadioOuter isSelected={selectedMethod === 'PHONE'}>
                  <RadioInner />
                </RadioOuter>

                <OptionTextContent>
                  <OptionTitle>휴대폰 인증</OptionTitle>
                  <OptionValueRow>
                    <OptionValue>
                      {phoneNumber ||
                        (isUserLoading
                          ? '사용자 정보 불러오는 중...'
                          : '등록된 휴대폰 번호 없음')}
                    </OptionValue>
                  </OptionValueRow>
                </OptionTextContent>

                <RightIconWrapper>
                  <IcMobile width={19} height={31} />
                </RightIconWrapper>
              </OptionItem>

              <Divider />

              <OptionItem
                activeOpacity={0.8}
                onPress={() => setSelectedMethod('EMAIL')}
              >
                <RadioOuter isSelected={selectedMethod === 'EMAIL'}>
                  <RadioInner />
                </RadioOuter>

                <OptionTextContent>
                  <OptionTitle>이메일 인증</OptionTitle>
                  <OptionValueRow>
                    <OptionValue>
                      {email ||
                        (isUserLoading
                          ? '사용자 정보 불러오는 중...'
                          : '등록된 이메일 없음')}
                    </OptionValue>
                  </OptionValueRow>
                </OptionTextContent>

                <RightIconWrapper>
                  <Icon name="mail-outline" size={24} color="#000000" />
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
                휴대폰 문자 또는 이메일로 인증번호를 받을 수 있습니다.
              </InfoText>
            </InfoBox>
          </TopContentWrapper>

          <SubmitButton
            activeOpacity={0.8}
            disabled={isLoading || isUserLoading}
            onPress={handleNext}
          >
            <SubmitButtonText>다음</SubmitButtonText>
          </SubmitButton>
        </ContentWrapper>
      </MainContainer>
    </Container>
  );
}
