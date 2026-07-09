import React, { useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Header from '../../../../../../components/Header';
import IcMobile from '../../../../../../assets/icons/ic_device_phone.svg'; 
import IcEmail from '../../../../../../assets/icons/ic_mail_line.svg'; 

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
  SubmitButtonText
} from './MethodSelect.styles';

export default function MethodSelect({ navigation }) {
  const [selectedMethod, setSelectedMethod] = useState('phone');

  const handleNext = () => {
    navigation.navigate('VerifyCode');
  };

  return (
    <Container>
      <Header
        left={
          <TouchableOpacity onPress={() => navigation.goBack()} activeOpacity={0.7}>
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
                activeOpacity={0.7} 
                onPress={() => setSelectedMethod('phone')}
              >
                <RadioOuter isSelected={selectedMethod === 'phone'}>
                  {selectedMethod === 'phone' && <RadioInner />}
                </RadioOuter>

                <OptionTextContent>
                  <OptionTitle>휴대폰 인증</OptionTitle>
                  <OptionValueRow>
                    <OptionValue>+82 10-1234-1234</OptionValue>
                  </OptionValueRow>
                </OptionTextContent>

                <RightIconWrapper>
                  <IcMobile width={19} height={31} />
                </RightIconWrapper>
              </OptionItem>

              <Divider />

              <OptionItem 
                activeOpacity={0.7} 
                onPress={() => setSelectedMethod('email')}
              >
                <RadioOuter isSelected={selectedMethod === 'email'}>
                  {selectedMethod === 'email' && <RadioInner />}
                </RadioOuter>

                <OptionTextContent>
                  <OptionTitle>이메일 인증</OptionTitle>
                  <OptionValueRow>
                    <OptionValue>example@gmail.com</OptionValue>
                  </OptionValueRow>
                </OptionTextContent>

                <RightIconWrapper>
                  <IcEmail width={21} height={16} />
                </RightIconWrapper>
              </OptionItem>

            </OptionsCard>

            <InfoBox>
              <Icon name="information-circle-outline" size={17} color="#FF8933" />
              <InfoText>언제든지 설정 변경을 통해 인증 방법을 바꿀 수 있습니다.</InfoText>
            </InfoBox>
          </TopContentWrapper>

          <SubmitButton activeOpacity={0.8} onPress={handleNext}>
            <SubmitButtonText>다음</SubmitButtonText>
          </SubmitButton>

        </ContentWrapper>
      </MainContainer>
    </Container>
  );
}