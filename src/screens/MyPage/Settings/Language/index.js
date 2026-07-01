import React, { useState, useCallback } from 'react';
import { TouchableOpacity, Alert, Modal } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useTranslation } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import Header from '../../../../components/Header'; 

import {
  Container,
  ScrollContainer,
  Section,
  SectionTitle,
  Card,
  RowItem,
  RowText,
  RightContainer,
  SubText,
  HelperText,
  BottomContainer,
  SaveButton,
  SaveText,
  ModalOverlay,
  ModalContent,
  ModalTitle,
  ModalOption,
  ModalOptionText
} from './Language.styles';

// dayjs 시차(Timezone) 플러그인 활성화
dayjs.extend(utc);
dayjs.extend(timezone);

export default function Language({ navigation }) {
  const { t, i18n } = useTranslation();
  
  const [selectedLanguage, setSelectedLanguage] = useState(i18n.language || 'ko');
  const [selectedTimezone, setSelectedTimezone] = useState('(GMT +09:00)서울');
  const [selectedFormatType, setSelectedFormatType] = useState('YYYY.MM.DD');

  const [isTimezoneModalVisible, setTimezoneModalVisible] = useState(false);
  const [isDateModalVisible, setDateModalVisible] = useState(false);

  // 선택된 지역에 맞춰 실제 날짜를 계산해 주는 함수
  const getFormattedDate = (tzLabel, formatType) => {
    let ianaTimezone = 'Asia/Seoul';
    if (tzLabel.includes('뉴욕')) ianaTimezone = 'America/New_York';
    if (tzLabel.includes('런던')) ianaTimezone = 'Europe/London';

    // 해당 국가의 현재 시간을 가져옴
    const currentTime = dayjs().tz(ianaTimezone);
    
    // 선택된 형식에 맞춰서 텍스트로 변환
    if (formatType === 'YYYY.MM.DD') return currentTime.format('YYYY.MM.DD');
    if (formatType === 'MM/DD/YYYY') return currentTime.format('MM/DD/YYYY');
    if (formatType === 'DD-MM-YYYY') return currentTime.format('DD-MM-YYYY');
    
    return currentTime.format('YYYY.MM.DD');
  };

  useFocusEffect(
    useCallback(() => {
      const loadSettings = async () => {
        try {
          const savedLanguage = await AsyncStorage.getItem('userLanguage');
          const savedTimezone = await AsyncStorage.getItem('userTimezone');
          const savedFormatType = await AsyncStorage.getItem('userFormatType');
          
          if (savedLanguage) setSelectedLanguage(savedLanguage);
          if (savedTimezone) setSelectedTimezone(savedTimezone);
          if (savedFormatType) setSelectedFormatType(savedFormatType);
        } catch (error) {
          console.log(error);
        }
      };
      loadSettings();
    }, [])
  );

  const timezoneOptions = [
    '(GMT +09:00)서울',
    '(GMT -05:00)뉴욕',
    '(GMT +00:00)런던'
  ];

  // 텍스트가 아닌 '형식 규칙' 자체를 관리합니다
  const formatTypes = [
    'YYYY.MM.DD',
    'MM/DD/YYYY',
    'DD-MM-YYYY'
  ];

  const handleSave = async () => {
    try {
      await i18n.changeLanguage(selectedLanguage);
      await AsyncStorage.setItem('userLanguage', selectedLanguage);
      await AsyncStorage.setItem('userTimezone', selectedTimezone);
      await AsyncStorage.setItem('userFormatType', selectedFormatType);
      
      Alert.alert("알림", "설정이 성공적으로 저장되었습니다.", [
        { text: "확인", onPress: () => navigation.goBack() }
      ]);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container>
      <Header
        left={
          <TouchableOpacity onPress={() => navigation.goBack()} activeOpacity={0.7}>
            <Icon name="chevron-back-outline" size={24} color="#FF8933" />
          </TouchableOpacity>
        }
        title={t('language_region')}
      />
      
      <ScrollContainer showsVerticalScrollIndicator={false}>
        <Section>
          <SectionTitle>{t('language')}</SectionTitle>
          <Card>
            <RowItem activeOpacity={0.7} onPress={() => setSelectedLanguage('ko')}>
              <RowText>{t('korean')}</RowText>
              {selectedLanguage === 'ko' ? (
                <Icon name="checkmark-circle" size={24} color="#FF8933" />
              ) : (
                <Icon name="ellipse-outline" size={24} color="#EAEAEA" />
              )}
            </RowItem>
            
            <RowItem activeOpacity={0.7} onPress={() => setSelectedLanguage('en')}>
              <RowText>{t('english')}</RowText>
              {selectedLanguage === 'en' ? (
                <Icon name="checkmark-circle" size={24} color="#FF8933" />
              ) : (
                <Icon name="ellipse-outline" size={24} color="#EAEAEA" />
              )}
            </RowItem>
          </Card>
          <HelperText>{t('lang_helper')}</HelperText>
        </Section>

        <Section>
          <SectionTitle>{t('region')}</SectionTitle>
          <Card>
            <RowItem activeOpacity={0.7} onPress={() => setTimezoneModalVisible(true)}>
              <RowText>{t('timezone')}</RowText>
              <RightContainer>
                <SubText>{selectedTimezone}</SubText>
                <Icon name="chevron-forward" size={16} color="#FF8933" />
              </RightContainer>
            </RowItem>

            <RowItem activeOpacity={0.7} onPress={() => setDateModalVisible(true)}>
              <RowText>{t('date_format')}</RowText>
              <RightContainer>
                {/* 💡 선택된 시간대와 형식을 계산해서 실제 날짜를 출력합니다 */}
                <SubText>{getFormattedDate(selectedTimezone, selectedFormatType)}</SubText>
                <Icon name="chevron-forward" size={16} color="#FF8933" />
              </RightContainer>
            </RowItem>
          </Card>
        </Section>
      </ScrollContainer>

      <BottomContainer>
        <SaveButton activeOpacity={0.8} onPress={handleSave}>
          <SaveText>{t('save')}</SaveText>
        </SaveButton>
      </BottomContainer>

      {/* 🚨 에러를 방지하기 위해 animationType을 "slide"로 수정했습니다 */}
      <Modal
        visible={isTimezoneModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setTimezoneModalVisible(false)}
      >
        <ModalOverlay activeOpacity={1} onPress={() => setTimezoneModalVisible(false)}>
          <ModalContent>
            <ModalTitle>시간대 선택</ModalTitle>
            {timezoneOptions.map((option, index) => (
              <ModalOption 
                key={index} 
                onPress={() => {
                  setSelectedTimezone(option);
                  setTimezoneModalVisible(false);
                }}
              >
                <ModalOptionText isSelected={selectedTimezone === option}>
                  {option}
                </ModalOptionText>
                {selectedTimezone === option && (
                  <Icon name="checkmark" size={20} color="#FF8933" />
                )}
              </ModalOption>
            ))}
          </ModalContent>
        </ModalOverlay>
      </Modal>

      {/* 🚨 에러를 방지하기 위해 animationType을 "slide"로 수정했습니다 */}
      <Modal
        visible={isDateModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setDateModalVisible(false)}
      >
        <ModalOverlay activeOpacity={1} onPress={() => setDateModalVisible(false)}>
          <ModalContent>
            <ModalTitle>날짜 형식 선택</ModalTitle>
            {formatTypes.map((type, index) => {
              {/* 💡 팝업 안의 옵션 리스트들도 변경된 시간대에 맞춰서 동적으로 변환해 줍니다 */}
              const displayDate = getFormattedDate(selectedTimezone, type);
              
              return (
                <ModalOption 
                  key={index} 
                  onPress={() => {
                    setSelectedFormatType(type);
                    setDateModalVisible(false);
                  }}
                >
                  <ModalOptionText isSelected={selectedFormatType === type}>
                    {displayDate}
                  </ModalOptionText>
                  {selectedFormatType === type && (
                    <Icon name="checkmark" size={20} color="#FF8933" />
                  )}
                </ModalOption>
              );
            })}
          </ModalContent>
        </ModalOverlay>
      </Modal>

    </Container>
  );
}