import React from 'react';
import { Alert, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Header from '../../../../../../components/Header';
import ImgSecurityLock from '../../../../../../assets/icons/img_security_lock.svg';
import IcDevicePhone from '../../../../../../assets/icons/ic_device_phone.svg';
import { useCurrentUser } from '../../../../../../hooks/useCurrentUser';
import { useUserSettings } from '../../../../../../hooks/useUserSettings';

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
  RadioOuter,
  RadioInner,
  MethodTextContent,
  MethodTitle,
  MethodValueRow,
  MethodValue,
  IconContainer,
} from './Management.styles';

export default function Management({ navigation }) {
  const { user } = useCurrentUser();
  const { settings, isLoading, saveSettings } = useUserSettings();

  const handleToggle2fa = async () => {
    try {
      await saveSettings({ use2fa: !settings.use2fa });
    } catch (error) {
      Alert.alert(
        '오류',
        error.response?.data?.message ?? '2단계 인증 설정 저장에 실패했습니다.',
      );
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
                disabled={isLoading}
                isOn={settings.use2fa}
                onPress={handleToggle2fa}
              >
                <ToggleCircle isOn={settings.use2fa} />
              </CustomToggle>
            </ToggleRow>

            <ToggleDesc>
              로그인 시 추가 인증 단계를 거쳐 계정을 보호하는{'\n'}이중 보안
              서비스 입니다
            </ToggleDesc>
          </ToggleCard>

          <SectionLabel>인증 방법</SectionLabel>
          <MethodsCard>
            <MethodItem activeOpacity={1}>
              <RadioOuter isSelected={true}>
                <RadioInner />
              </RadioOuter>

              <MethodTextContent>
                <MethodTitle>휴대폰 인증</MethodTitle>
                <MethodValueRow>
                  <MethodValue>
                    {user?.phoneNumber || '등록된 번호 없음'}
                  </MethodValue>
                </MethodValueRow>
              </MethodTextContent>

              <IconContainer>
                <IcDevicePhone width={19} height={31} />
              </IconContainer>
            </MethodItem>
          </MethodsCard>
        </ScrollWrapper>
      </MainContainer>
    </Container>
  );
}
