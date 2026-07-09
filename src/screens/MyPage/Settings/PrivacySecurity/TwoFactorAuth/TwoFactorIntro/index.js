import React from 'react';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Header from '../../../../../../components/Header'; 
import ImgSecurityLock from '../../../../../../assets/icons/img_security_lock.svg';
import IcShieldCheck from '../../../../../../assets/icons/ic_shield_check.svg';
import IcUserBlock from '../../../../../../assets/icons/ic_user_block.svg';
import IcQuickTime from '../../../../../../assets/icons/ic_quick_time.svg';

import {
  Container,
  MainContainer,
  ContentWrapper, 
  TopContentWrapper,
  IntroSection,
  IllustrationWrapper,
  IntroText,
  FeaturesList,
  FeatureItem,
  IconWrapper,
  TextCol,
  FeatureTitle,
  FeatureDesc,
  SubmitButton,
  SubmitButtonText
} from './TwoFactorIntro.styles';

export default function TwoFactorIntro({ navigation }) {
  
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
            
            <IntroSection>
              <IllustrationWrapper>
                <ImgSecurityLock width={129} height={132} />
              </IllustrationWrapper>
              <IntroText>
                2단계 인증을 설정하면{'\n'}
                로그인 시 추가 인증 단계를 거쳐{'\n'}
                계정을 안전하게 보호할 수 있습니다.
              </IntroText>
            </IntroSection>

            <FeaturesList>
              
              <FeatureItem>
                <IconWrapper>
                  <IcShieldCheck width={41} height={41} />
                </IconWrapper>
                <TextCol>
                  <FeatureTitle>보안 강화</FeatureTitle>
                  <FeatureDesc>비밀번호가 노출되어도{'\n'}계정을 안전하게 보호</FeatureDesc>
                </TextCol>
              </FeatureItem>

              <FeatureItem>
                <IconWrapper>
                  <IcUserBlock width={58} height={58} />
                </IconWrapper>
                <TextCol>
                  <FeatureTitle>무단 접근 방지</FeatureTitle>
                  <FeatureDesc>허가되지 않은 접근 차단</FeatureDesc>
                </TextCol>
              </FeatureItem>

              <FeatureItem>
                <IconWrapper>
                  <IcQuickTime width={35} height={35} />
                </IconWrapper>
                <TextCol>
                  <FeatureTitle>간편한 사용</FeatureTitle>
                  <FeatureDesc>한번 설정 후 로그인 시{'\n'}간편하게 이용 가능</FeatureDesc>
                </TextCol>
              </FeatureItem>

            </FeaturesList>
          </TopContentWrapper>

          <SubmitButton 
            activeOpacity={0.8} 
            onPress={() => navigation.navigate('PasswordCheck')} 
          >
            <SubmitButtonText>2단계 인증 사용하기</SubmitButtonText>
          </SubmitButton>
          
        </ContentWrapper>
      </MainContainer>
    </Container>
  );
}