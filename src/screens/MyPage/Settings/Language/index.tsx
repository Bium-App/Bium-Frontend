import React, { useEffect, useState } from 'react';
import type {RootScreenProps} from '../../../../types/navigation';
import { TouchableOpacity, Alert, Modal } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useTranslation } from 'react-i18next';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import Header from '../../../../components/Header';
import { useUserSettings } from '../../../../hooks/useUserSettings';
import {getApiResponseMessage} from '../../../../utils/apiError';

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
  ModalOptionText,
} from './Language.styles';

// dayjs 시차(Timezone) 플러그인 활성화
dayjs.extend(utc);
dayjs.extend(timezone);

export default function Language({navigation}: RootScreenProps<'Language'>) {
  const { t, i18n } = useTranslation();
  const { settings, isLoading, saveSettings } = useUserSettings();

  const [selectedLanguage, setSelectedLanguage] = useState(
    i18n.language === 'en' ? 'en-US' : 'ko-KR',
  );
  const [selectedTimezone, setSelectedTimezone] = useState('Asia/Seoul');
  const [selectedFormatType, setSelectedFormatType] = useState('YYYY-MM-DD');

  const [isTimezoneModalVisible, setTimezoneModalVisible] = useState(false);
  const [isDateModalVisible, setDateModalVisible] = useState(false);

  // 선택된 지역에 맞춰 실제 날짜를 계산해 주는 함수
  const getFormattedDate = (
    ianaTimezone: string,
    formatType: string,
  ): string => {
    const currentTime = dayjs().tz(ianaTimezone);

    // 선택된 형식에 맞춰서 텍스트로 변환
    if (formatType === 'YYYY-MM-DD') return currentTime.format('YYYY-MM-DD');
    if (formatType === 'YYYY.MM.DD') return currentTime.format('YYYY.MM.DD');
    if (formatType === 'MM/DD/YYYY') return currentTime.format('MM/DD/YYYY');
    if (formatType === 'DD-MM-YYYY') return currentTime.format('DD-MM-YYYY');

    return currentTime.format('YYYY-MM-DD');
  };

  useEffect(() => {
    setSelectedLanguage(settings.language);
    setSelectedTimezone(settings.timezone);
    setSelectedFormatType(settings.dateFormat);
  }, [settings]);

  const timezoneOptions = [
    { label: '(GMT +09:00)서울', value: 'Asia/Seoul' },
    { label: '(GMT -05:00)뉴욕', value: 'America/New_York' },
    { label: '(GMT +00:00)런던', value: 'Europe/London' },
  ];

  const timezoneLabel =
    timezoneOptions.find(option => option.value === selectedTimezone)?.label ??
    selectedTimezone;

  // 텍스트가 아닌 '형식 규칙' 자체를 관리합니다
  const formatTypes = ['YYYY-MM-DD', 'YYYY.MM.DD', 'MM/DD/YYYY', 'DD-MM-YYYY'];

  const handleSave = async () => {
    try {
      await saveSettings({
        language: selectedLanguage,
        timezone: selectedTimezone,
        dateFormat: selectedFormatType,
      });
      await i18n.changeLanguage(selectedLanguage.split('-')[0]);

      Alert.alert('알림', '설정이 성공적으로 저장되었습니다.', [
        { text: '확인', onPress: () => navigation.goBack() },
      ]);
    } catch (error) {
      Alert.alert(
        '오류',
        getApiResponseMessage(error) ?? '설정 저장에 실패했습니다.',
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
        title={t('language_region')}
      />

      <ScrollContainer showsVerticalScrollIndicator={false}>
        <Section>
          <SectionTitle>{t('language')}</SectionTitle>
          <Card>
            <RowItem
              activeOpacity={0.7}
              onPress={() => setSelectedLanguage('ko-KR')}
            >
              <RowText>{t('korean')}</RowText>
              {selectedLanguage.startsWith('ko') ? (
                <Icon name="checkmark-circle" size={24} color="#FF8933" />
              ) : (
                <Icon name="ellipse-outline" size={24} color="#EAEAEA" />
              )}
            </RowItem>

            <RowItem
              activeOpacity={0.7}
              onPress={() => setSelectedLanguage('en-US')}
            >
              <RowText>{t('english')}</RowText>
              {selectedLanguage.startsWith('en') ? (
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
            <RowItem
              activeOpacity={0.7}
              onPress={() => setTimezoneModalVisible(true)}
            >
              <RowText>{t('timezone')}</RowText>
              <RightContainer>
                <SubText>{timezoneLabel}</SubText>
                <Icon name="chevron-forward" size={16} color="#FF8933" />
              </RightContainer>
            </RowItem>

            <RowItem
              activeOpacity={0.7}
              onPress={() => setDateModalVisible(true)}
            >
              <RowText>{t('date_format')}</RowText>
              <RightContainer>
                {/* 💡 선택된 시간대와 형식을 계산해서 실제 날짜를 출력합니다 */}
                <SubText>
                  {getFormattedDate(selectedTimezone, selectedFormatType)}
                </SubText>
                <Icon name="chevron-forward" size={16} color="#FF8933" />
              </RightContainer>
            </RowItem>
          </Card>
        </Section>
      </ScrollContainer>

      <BottomContainer>
        <SaveButton
          activeOpacity={0.8}
          disabled={isLoading}
          onPress={handleSave}
        >
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
        <ModalOverlay
          activeOpacity={1}
          onPress={() => setTimezoneModalVisible(false)}
        >
          <ModalContent>
            <ModalTitle>시간대 선택</ModalTitle>
            {timezoneOptions.map(option => (
              <ModalOption
                key={option.value}
                onPress={() => {
                  setSelectedTimezone(option.value);
                  setTimezoneModalVisible(false);
                }}
              >
                <ModalOptionText isSelected={selectedTimezone === option.value}>
                  {option.label}
                </ModalOptionText>
                {selectedTimezone === option.value && (
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
        <ModalOverlay
          activeOpacity={1}
          onPress={() => setDateModalVisible(false)}
        >
          <ModalContent>
            <ModalTitle>날짜 형식 선택</ModalTitle>
            {formatTypes.map((type, index) => {
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
