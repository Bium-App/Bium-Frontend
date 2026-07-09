import React, { useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Header from '../../../../../../components/Header';
import ImgSecurityLock from '../../../../../../assets/icons/img_security_lock.svg';
import IcDevicePhone from '../../../../../../assets/icons/ic_device_phone.svg';
import IcMailLine from '../../../../../../assets/icons/ic_mail_line.svg';

import {
  Container,
  MainContainer,
  ScrollWrapper,
  TopIconWrapper,
  IconImageWrapper,
  ToggleCard,
  ToggleRow,
  ToggleTitle,
  CustomToggle,
  ToggleCircle,
  ToggleDesc,
  SectionLabel,
  MethodsCard,
  MethodItem,
  Divider,
  RadioOuter,
  RadioInner,
  MethodTextContent,
  MethodTitle,
  MethodValueRow,
  MethodValue,
  IconContainer 
} from './Management.styles';

export default function Management({ navigation }) {
  const [is2FAEnabled, setIs2FAEnabled] = useState(true);
  const [selectedMethod, setSelectedMethod] = useState('phone');

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
        <ScrollWrapper showsVerticalScrollIndicator={false}>
          
          <TopIconWrapper>
            <IconImageWrapper>
              <ImgSecurityLock width={90} height={106} />
            </IconImageWrapper>
          </TopIconWrapper>

          <ToggleCard>
            <ToggleRow>
              <ToggleTitle>2단계 인증 사용</ToggleTitle>
              
              <CustomToggle 
                activeOpacity={0.8} 
                isOn={is2FAEnabled} 
                onPress={() => setIs2FAEnabled(!is2FAEnabled)}
              >
                <ToggleCircle isOn={is2FAEnabled} />
              </CustomToggle>
            </ToggleRow>
            
            <ToggleDesc>
              로그인 시 추가 인증 단계를 거쳐 계정을 보호하는{'\n'}이중 보안 서비스 입니다
            </ToggleDesc>
          </ToggleCard>

          <SectionLabel>인증 방법</SectionLabel>
          <MethodsCard>
            
            <MethodItem 
              activeOpacity={0.7} 
              onPress={() => setSelectedMethod('phone')}
            >
              <RadioOuter isSelected={selectedMethod === 'phone'}>
                {selectedMethod === 'phone' && <RadioInner />}
              </RadioOuter>

              <MethodTextContent>
                <MethodTitle>휴대폰 인증</MethodTitle>
                <MethodValueRow>
                  <MethodValue>+82 10-1234-1234</MethodValue>
                </MethodValueRow>
              </MethodTextContent>

              <IconContainer>
                <IcDevicePhone width={19} height={31} />
              </IconContainer>
            </MethodItem>

            <Divider />

            <MethodItem 
              activeOpacity={0.7} 
              onPress={() => setSelectedMethod('email')}
            >
              <RadioOuter isSelected={selectedMethod === 'email'}>
                {selectedMethod === 'email' && <RadioInner />}
              </RadioOuter>

              <MethodTextContent>
                <MethodTitle>이메일 인증</MethodTitle>
                <MethodValueRow>
                  <MethodValue>example@gmail.com</MethodValue>
                </MethodValueRow>
              </MethodTextContent>

              <IconContainer>
                <IcMailLine width={21} height={16} />
              </IconContainer>
            </MethodItem>

          </MethodsCard>
          
        </ScrollWrapper>
      </MainContainer>
    </Container>
  );
}