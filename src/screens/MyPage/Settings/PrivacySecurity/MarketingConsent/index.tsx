import React, { useState, useEffect } from 'react';
import type {RootScreenProps} from '../../../../../types/navigation';
import { TouchableOpacity, Alert } from 'react-native'; // 💡 기본 Switch는 걷어내고 제거했습니다.
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/Ionicons';

// 💡 프로젝트 규칙: 헤더는 항상 공통 컴포넌트로 분리 사용
import Header from '../../../../../components/Header';
import ImgMegaphone from '../../../../../assets/icons/img_megaphone.svg';
import IcGift from '../../../../../assets/icons/ic_gift.svg';
import IcBell from '../../../../../assets/icons/ic_bell.svg';
import IcTipBulb from '../../../../../assets/icons/ic_tip_bulb.svg';
import IcUser from '../../../../../assets/icons/ic_user.svg';
import IcMail from '../../../../../assets/icons/ic_mail.svg';
import IcMessage from '../../../../../assets/icons/ic_message.svg';
import { useUserSettings } from '../../../../../hooks/useUserSettings';
import {getApiResponseMessage} from '../../../../../utils/apiError';

import {
  Container,
  MainContainer,
  TopBanner,
  TopBannerTextCol,
  BannerText,
  BannerSubText,
  HighlightText,
  IllustrationWrapper,
  AllConsentCard,
  AllConsentText,
  Section,
  SectionTitle,
  ListCard,
  ListItem,
  IconWrapper,
  ItemTextCol,
  ItemTitle,
  ItemDesc,
  CheckboxSquare,
  SubmitButton,
  SubmitButtonText,
  /* 💡 추가된 커스텀 토글 컴포넌트 */
  CustomToggle,
  ToggleCircle,
} from './MarketingConsent.styles';

interface MarketingAgreements {
  event: boolean;
  update: boolean;
  tip: boolean;
  custom: boolean;
  email: boolean;
  sms: boolean;
}

export default function MarketingConsent({navigation}: RootScreenProps<'MarketingConsent'>) {
  const { settings, isLoading, saveSettings } = useUserSettings();

  const [agreements, setAgreements] = useState<MarketingAgreements>({
    event: false,
    update: false,
    tip: false,
    custom: false,
    email: false,
    sms: false,
  });

  const [isAllAgreed, setIsAllAgreed] = useState(false);

  useEffect(() => {
    const allChecked = Object.values(agreements).every(val => val === true);
    setIsAllAgreed(allChecked);
  }, [agreements]);

  useEffect(() => {
    const loadAgreements = async () => {
      const stored = await AsyncStorage.getItem('@marketing_agreements');
      if (stored) {
        try {
          setAgreements({
            ...JSON.parse(stored),
            event: settings.allowEvent,
          });
        } catch {
          setAgreements(current => ({
            ...current,
            event: settings.allowEvent,
          }));
        }
      } else {
        setAgreements(current => ({
          ...current,
          event: settings.allowEvent,
        }));
      }
    };
    loadAgreements();
  }, [settings.allowEvent]);

  const toggleAll = () => {
    const nextValue = !isAllAgreed; // 현재 상태를 반대로 뒤집음
    setIsAllAgreed(nextValue);
    setAgreements({
      event: nextValue,
      update: nextValue,
      tip: nextValue,
      custom: nextValue,
      email: nextValue,
      sms: nextValue,
    });
  };

  const toggleItem = (key: keyof MarketingAgreements) => {
    setAgreements(prev => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleSave = async () => {
    try {
      await saveSettings({ allowEvent: agreements.event });
      await AsyncStorage.setItem(
        '@marketing_agreements',
        JSON.stringify(agreements),
      );
      Alert.alert('저장 완료', '마케팅 정보 수신 동의 설정이 저장되었습니다.', [
        { text: '확인', onPress: () => navigation.goBack() },
      ]);
    } catch (error) {
      Alert.alert(
        '오류',
        getApiResponseMessage(error) ?? '마케팅 설정 저장에 실패했습니다.',
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
        title="마케팅 정보 수신 동의"
      />

      <MainContainer>
        <TopBanner>
          <TopBannerTextCol>
            <BannerText>
              불메모의 이벤트, 혜택, 신규 서비스 소식 등{'\n'}
              다양한 마케팅 정보를 받아보실 수 있습니다.
            </BannerText>
            <BannerSubText>
              동의하지 않아도 불메모 서비스를{'\n'}
              이용하는 데에는 <HighlightText>제한이 없습니다.</HighlightText>
            </BannerSubText>
          </TopBannerTextCol>
          <IllustrationWrapper>
            <ImgMegaphone width="100%" height="100%" />
          </IllustrationWrapper>
        </TopBanner>

        <AllConsentCard>
          <AllConsentText>마케팅 정보 전체 수신 동의</AllConsentText>
          {/* 💡 기존의 크기를 줄이던 View 래퍼를 완전히 걷어내고 완벽한 원형 토글을 바짝 적용 완료 */}
          <CustomToggle
            activeOpacity={0.8}
            isOn={isAllAgreed}
            onPress={toggleAll}
          >
            <ToggleCircle isOn={isAllAgreed} />
          </CustomToggle>
        </AllConsentCard>

        <Section>
          <SectionTitle>수신 정보 종류</SectionTitle>
          <ListCard>
            <ListItem activeOpacity={0.7} onPress={() => toggleItem('event')}>
              <IconWrapper type="bg">
                <IcGift width={18} height={16} />
              </IconWrapper>
              <ItemTextCol>
                <ItemTitle>이벤트 및 혜택 안내</ItemTitle>
                <ItemDesc
                  numberOfLines={1}
                  adjustsFontSizeToFit
                  minimumFontScale={0.8}
                >
                  프로모션, 할인, 쿠폰 등 다양한 혜택 정보를 알려드려요.
                </ItemDesc>
              </ItemTextCol>
              <CheckboxSquare isChecked={agreements.event}>
                {agreements.event && (
                  <Icon name="checkmark" size={16} color="#FFFFFF" />
                )}
              </CheckboxSquare>
            </ListItem>

            <ListItem activeOpacity={0.7} onPress={() => toggleItem('update')}>
              <IconWrapper type="bg">
                <IcBell width={19} height={19} />
              </IconWrapper>
              <ItemTextCol>
                <ItemTitle>신규 기능 및 업데이트 안내</ItemTitle>
                <ItemDesc
                  numberOfLines={1}
                  adjustsFontSizeToFit
                  minimumFontScale={0.8}
                >
                  새로운 기능, 서비스 업데이트 소식을 보내드려요.
                </ItemDesc>
              </ItemTextCol>
              <CheckboxSquare isChecked={agreements.update}>
                {agreements.update && (
                  <Icon name="checkmark" size={16} color="#FFFFFF" />
                )}
              </CheckboxSquare>
            </ListItem>

            <ListItem activeOpacity={0.7} onPress={() => toggleItem('tip')}>
              <IconWrapper type="bg">
                <IcTipBulb width={20} height={20} />
              </IconWrapper>
              <ItemTextCol>
                <ItemTitle>앱 사용 팁 및 활용 가이드</ItemTitle>
                <ItemDesc
                  numberOfLines={1}
                  adjustsFontSizeToFit
                  minimumFontScale={0.8}
                >
                  불메모를 더 잘 활용할 수 있는 팁과 가이드를 보내드려요.
                </ItemDesc>
              </ItemTextCol>
              <CheckboxSquare isChecked={agreements.tip}>
                {agreements.tip && (
                  <Icon name="checkmark" size={16} color="#FFFFFF" />
                )}
              </CheckboxSquare>
            </ListItem>

            <ListItem
              activeOpacity={0.7}
              isLast={true}
              onPress={() => toggleItem('custom')}
            >
              <IconWrapper type="bg">
                <IcUser width={18} height={18} />
              </IconWrapper>
              <ItemTextCol>
                <ItemTitle>맞춤형 기능 추천</ItemTitle>
                <ItemDesc
                  numberOfLines={1}
                  adjustsFontSizeToFit
                  minimumFontScale={0.8}
                >
                  사용 패턴에 맞는 기능이나 콘텐츠를 추천해드려요.
                </ItemDesc>
              </ItemTextCol>
              <CheckboxSquare isChecked={agreements.custom}>
                {agreements.custom && (
                  <Icon name="checkmark" size={16} color="#FFFFFF" />
                )}
              </CheckboxSquare>
            </ListItem>
          </ListCard>
        </Section>

        <Section>
          <SectionTitle>수신 채널</SectionTitle>
          <ListCard>
            <ListItem activeOpacity={0.7} onPress={() => toggleItem('email')}>
              <IconWrapper type="border">
                <IcMail width={18} height={14} />
              </IconWrapper>
              <ItemTextCol>
                <ItemTitle>이메일</ItemTitle>
                <ItemDesc
                  numberOfLines={1}
                  adjustsFontSizeToFit
                  minimumFontScale={0.8}
                >
                  이벤트, 혜택 정보를 이메일로 보내드려요.
                </ItemDesc>
              </ItemTextCol>
              <CheckboxSquare isChecked={agreements.email}>
                {agreements.email && (
                  <Icon name="checkmark" size={16} color="#FFFFFF" />
                )}
              </CheckboxSquare>
            </ListItem>

            <ListItem
              activeOpacity={0.7}
              isLast={true}
              onPress={() => toggleItem('sms')}
            >
              <IconWrapper type="border">
                <IcMessage width={20} height={18} />
              </IconWrapper>
              <ItemTextCol>
                <ItemTitle>문자 메세지(SMS)</ItemTitle>
                <ItemDesc
                  numberOfLines={1}
                  adjustsFontSizeToFit
                  minimumFontScale={0.8}
                >
                  이메일, 혜택 정보를 문자로 보내드려요.
                </ItemDesc>
              </ItemTextCol>
              <CheckboxSquare isChecked={agreements.sms}>
                {agreements.sms && (
                  <Icon name="checkmark" size={16} color="#FFFFFF" />
                )}
              </CheckboxSquare>
            </ListItem>
          </ListCard>
        </Section>

        <SubmitButton
          activeOpacity={0.8}
          disabled={isLoading}
          onPress={handleSave}
        >
          <SubmitButtonText>저장하기</SubmitButtonText>
        </SubmitButton>
      </MainContainer>
    </Container>
  );
}
