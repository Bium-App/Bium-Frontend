import React from 'react';
import type {RootScreenProps} from '../../../../types/navigation';
import { TouchableOpacity, Linking, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'; 
import Header from '../../../../components/Header'; 
import ImgPhone from '../../../../assets/icons/img_phone.svg';        
import IcClock from '../../../../assets/icons/ic_clock.svg';          
import IcCallSolid from '../../../../assets/icons/ic_call_solid.svg'; 
import IcChatSolid from '../../../../assets/icons/ic_chat_solid.svg'; 

import {
  Container,
  ScrollContainer,
  IllustrationBackground,
  Title,
  Subtitle,
  InfoCard,
  InfoRow,
  InfoIconWrapper,
  InfoTextCol,
  InfoLabel,
  InfoValue,
  FooterNoticeText
} from './PhoneInquiry.styles';

export default function PhoneInquiry({navigation}: RootScreenProps<'PhoneInquiry'>) {
  
  const handleCall = () => {
    const phoneNumber = 'tel:15881234'; 
    Linking.canOpenURL(phoneNumber)
      .then(supported => {
        if (!supported) {
          Alert.alert('안내', '전화를 걸 수 없는 기기입니다.');
        } else {
          return Linking.openURL(phoneNumber);
        }
      })
      .catch(() => Alert.alert('안내', '전화 연결에 실패했습니다.'));
  };

  return (
    <Container>
      <Header
        left={
          <TouchableOpacity onPress={() => navigation.goBack()} activeOpacity={0.7}>
            <Icon name="chevron-back-outline" size={24} color="#FF8933" />
          </TouchableOpacity>
        }
        title="전화문의" 
      />

      <ScrollContainer showsVerticalScrollIndicator={false}>
        
        <IllustrationBackground>
          <ImgPhone width={122} height={118} />
        </IllustrationBackground>

        <Title>전화로 문의할 수 있어요</Title>
        <Subtitle>궁금한 사항을 상담원이 친절하게 안내해드립니다.</Subtitle>

        <InfoCard>
          <InfoRow>
            <InfoIconWrapper>
              <IcClock width={34} height={34} color="#7CC4FF" />
            </InfoIconWrapper>
            <InfoTextCol>
              <InfoLabel>운영시간</InfoLabel>
              <InfoValue>평일 9:00~18:00(주말 및 공휴일 제외)</InfoValue>
            </InfoTextCol>
          </InfoRow>

          <InfoRow>
            <InfoIconWrapper>
              <IcCallSolid width={34} height={34} color="#FF8933" />
            </InfoIconWrapper>
            <InfoTextCol>
              <InfoLabel>고객센터 전화번호</InfoLabel>
              <TouchableOpacity activeOpacity={0.7} onPress={handleCall}>
                <InfoValue isHighlight={true}>1588-1234</InfoValue>
              </TouchableOpacity>
            </InfoTextCol>
          </InfoRow>

          <InfoRow isLast={true}>
            <InfoIconWrapper>
              <IcChatSolid width={34} height={34} color="#6E6E6E" />
            </InfoIconWrapper>
            <InfoTextCol>
              <InfoLabel>상담 가능 내용</InfoLabel>
              <InfoValue>
                서비스 이용, 계정, 결제, 오류 등{'\n'}
                앱 사용 관련 문의
              </InfoValue>
            </InfoTextCol>
          </InfoRow>
          
        </InfoCard>
        <FooterNoticeText>
          통화료는 일반 유선전화 요금이 지불됩니다.{'\n'}
          연결이 지연될 수 있으니 잠시만 기다려주세요.
        </FooterNoticeText>

      </ScrollContainer>
    </Container>
  );
}
