import React from 'react';
import { Alert, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Header from '../../../../components/Header';
import { useUserSettings } from '../../../../hooks/useUserSettings';

import {
  Container,
  Content,
  RowItem,
  RowText,
  CustomToggle,
  ToggleCircle,
} from './SettingNotification.styles';

export default function SettingNotification({ navigation }) {
  const { settings, isLoading, saveSettings } = useUserSettings();
  const isAllEnabled = settings.allowEvent && settings.allowPush;

  const updateSettings = async patch => {
    try {
      await saveSettings(patch);
    } catch (error) {
      Alert.alert(
        '오류',
        error.response?.data?.message ?? '알림 설정 저장에 실패했습니다.',
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
        title="알림"
      />

      <Content>
        <RowItem>
          <RowText>모든 알림 받기</RowText>
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
          <RowText>이벤트/혜택 알림</RowText>
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
          <RowText>푸시알림</RowText>
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
