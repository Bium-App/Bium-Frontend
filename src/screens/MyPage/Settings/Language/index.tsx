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
import {storeUserSettings} from '../../../../utils/userSettingsStorage';

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

  const currentLanguage = selectedLanguage || 'ko-KR';
  const currentTimezone = selectedTimezone || 'Asia/Seoul';
  const currentFormatType = selectedFormatType || 'YYYY-MM-DD';

  const getFormattedDate = (
    ianaTimezone: string,
    formatType: string,
  ): string => {
    const currentTime = dayjs().tz(ianaTimezone);

    if (formatType === 'YYYY-MM-DD') return currentTime.format('YYYY-MM-DD');
    if (formatType === 'YYYY.MM.DD') return currentTime.format('YYYY.MM.DD');
    if (formatType === 'MM/DD/YYYY') return currentTime.format('MM/DD/YYYY');
    if (formatType === 'DD-MM-YYYY') return currentTime.format('DD-MM-YYYY');

    return currentTime.format('YYYY-MM-DD');
  };

  useEffect(() => {
    setSelectedLanguage(settings.language || 'ko-KR');
    setSelectedTimezone(settings.timezone || 'Asia/Seoul');
    setSelectedFormatType(settings.dateFormat || 'YYYY-MM-DD');
  }, [settings]);

  const timezoneOptions = [
    { label: '(GMT +09:00)서울', value: 'Asia/Seoul' },
    { label: '(GMT -05:00)뉴욕', value: 'America/New_York' },
    { label: '(GMT +00:00)런던', value: 'Europe/London' },
  ];

  const timezoneLabel =
    timezoneOptions.find(option => option.value === currentTimezone)?.label ??
    currentTimezone;

  const formatTypes = ['YYYY-MM-DD', 'YYYY.MM.DD', 'MM/DD/YYYY', 'DD-MM-YYYY'];

  const handleSave = async () => {
    const patch = {
      language: currentLanguage,
      timezone: currentTimezone,
      dateFormat: currentFormatType,
    };

    await storeUserSettings({...settings, ...patch});
    await i18n.changeLanguage(currentLanguage.split('-')[0]);

    try {
      await saveSettings(patch, {rollbackOnError: false});

      Alert.alert(t('language_screen.saved_title'), t('language_screen.saved_message'), [
        { text: t('common.confirm'), onPress: () => navigation.goBack() },
      ]);
    } catch (error) {
      setSelectedLanguage(currentLanguage);
      setSelectedTimezone(currentTimezone);
      setSelectedFormatType(currentFormatType);
      Alert.alert(
        t('language_screen.saved_locally_title'),
        getApiResponseMessage(error)
          ? `${t('language_screen.saved_locally_message')}\n\n${getApiResponseMessage(error)}`
          : t('language_screen.saved_locally_message'),
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
              {currentLanguage.startsWith('ko') ? (
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
              {currentLanguage.startsWith('en') ? (
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
                <SubText>
                  {getFormattedDate(currentTimezone, currentFormatType)}
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

      {/* fade 애니메이션 사용 시 모달 전환 오류가 발생해 slide를 사용한다 */}
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
            <ModalTitle>{t('language_screen.select_timezone')}</ModalTitle>
            {timezoneOptions.map(option => (
              <ModalOption
                key={option.value}
                onPress={() => {
                  setSelectedTimezone(option.value);
                  setTimezoneModalVisible(false);
                }}
              >
                <ModalOptionText isSelected={currentTimezone === option.value}>
                  {option.label}
                </ModalOptionText>
                {currentTimezone === option.value && (
                  <Icon name="checkmark" size={20} color="#FF8933" />
                )}
              </ModalOption>
            ))}
          </ModalContent>
        </ModalOverlay>
      </Modal>

      {/* fade 애니메이션 사용 시 모달 전환 오류가 발생해 slide를 사용한다 */}
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
            <ModalTitle>{t('language_screen.select_date_format')}</ModalTitle>
            {formatTypes.map((type, index) => {
              const displayDate = getFormattedDate(currentTimezone, type);

              return (
                <ModalOption
                  key={index}
                  onPress={() => {
                    setSelectedFormatType(type);
                    setDateModalVisible(false);
                  }}
                >
                  <ModalOptionText isSelected={currentFormatType === type}>
                    {displayDate}
                  </ModalOptionText>
                  {currentFormatType === type && (
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
