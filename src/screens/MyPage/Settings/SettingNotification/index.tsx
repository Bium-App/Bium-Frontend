import React from 'react';
import type {RootScreenProps} from '../../../../types/navigation';
import { Alert, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useTranslation} from 'react-i18next';
import Header from '../../../../components/Header';
import { useUserSettings } from '../../../../hooks/useUserSettings';
import type {UserSettings} from '../../../../types/user';
import {getApiResponseMessage} from '../../../../utils/apiError';

import {
  Container,
  Content,
  RowItem,
  RowText,
  CustomToggle,
  ToggleCircle,
} from './SettingNotification.styles';

// 전체/이벤트/푸시 알림 수신 여부를 개별 토글로 설정하는 화면.
export default function SettingNotification({navigation}: RootScreenProps<'SettingNotification'>) {
  const {t} = useTranslation();
  const { settings, isLoading, saveSettings } = useUserSettings();
  const isAllEnabled = settings.allowEvent && settings.allowPush;

  const updateSettings = async (patch: Partial<UserSettings>) => {
    try {
      await saveSettings(patch);
    } catch (error) {
      Alert.alert(
        t('common.error'),
        getApiResponseMessage(error) ?? t('notification_settings.save_failed'),
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
        title={t('common.notification')}
      />

      <Content>
        <RowItem>
          <RowText>{t('notification_settings.all')}</RowText>
          <CustomToggle
            activeOpacity={0.8}
            disabled={isLoading}
            isOn={isAllEnabled}
            onPress={() =>
              updateSettings({
                allowEvent: !isAllEnabled,
                allowPush: !isAllEnabled,
              })
            }
          >
            <ToggleCircle isOn={isAllEnabled} />
          </CustomToggle>
        </RowItem>

        <RowItem>
          <RowText>{t('notification_settings.event')}</RowText>
          <CustomToggle
            activeOpacity={0.8}
            disabled={isLoading}
            isOn={settings.allowEvent}
            onPress={() => updateSettings({ allowEvent: !settings.allowEvent })}
          >
            <ToggleCircle isOn={settings.allowEvent} />
          </CustomToggle>
        </RowItem>

        <RowItem>
          <RowText>{t('notification_settings.push')}</RowText>
          <CustomToggle
            activeOpacity={0.8}
            disabled={isLoading}
            isOn={settings.allowPush}
            onPress={() => updateSettings({ allowPush: !settings.allowPush })}
          >
            <ToggleCircle isOn={settings.allowPush} />
          </CustomToggle>
        </RowItem>
      </Content>
    </Container>
  );
}
