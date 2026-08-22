import React from 'react';
import type {RootScreenProps} from '../../../../../types/navigation';
import { Linking, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Header from '../../../../../components/Header';
import IcCamera from '../../../../../assets/icons/ic_camera.svg';
import IcImage from '../../../../../assets/icons/ic_image.svg';
import IcMic from '../../../../../assets/icons/ic_mic.svg';
import IcBell from '../../../../../assets/icons/ic_bell.svg';

import {
  Container,
  MainContainer,
  PermissionCard,
  PermissionRow,
  RowLeft,
  IconWrapper,
  PermissionText,
  HelperText,
  SettingsLinkRow,
  SettingsLinkText,
} from './PermissionSetup.styles';

const PERMISSION_ROWS = [
  {key: 'camera', label: '카메라', Icon: IcCamera, width: 24, height: 24},
  {key: 'image', label: '사진 및 동영상', Icon: IcImage, width: 24, height: 24},
  {key: 'mic', label: '마이크', Icon: IcMic, width: 16, height: 24},
  {key: 'bell', label: '알림', Icon: IcBell, width: 24, height: 24},
] as const;

// 필수 권한 설정 화면. 앱이 사용하는 권한 목록을 보여주고, 항목을 누르면 기기 설정 앱으로 이동시킨다.
export default function PermissionSetup({navigation}: RootScreenProps<'PermissionSetup'>) {
  return (
    <Container>
      <Header
        left={
          <TouchableOpacity onPress={() => navigation.goBack()} activeOpacity={0.7}>
            <Icon name="chevron-back-outline" size={24} color="#FF8933" />
          </TouchableOpacity>
        }
        title="필수 권한 설정"
      />

      <MainContainer>
        <HelperText>
          권한은 앱에서 직접 켜고 끌 수 없고, 기기의 설정 앱에서만 변경할 수 있어요. 항목을 누르면 설정으로 이동합니다.
        </HelperText>
        <PermissionCard>
          {PERMISSION_ROWS.map(({key, label, Icon: RowIcon, width, height}, index) => (
            <PermissionRow key={key} isLast={index === PERMISSION_ROWS.length - 1}>
              <RowLeft>
                <IconWrapper>
                  <RowIcon width={width} height={height} />
                </IconWrapper>
                <PermissionText>{label}</PermissionText>
              </RowLeft>

              <SettingsLinkRow activeOpacity={0.7} onPress={() => Linking.openSettings()}>
                <SettingsLinkText>설정</SettingsLinkText>
                <Icon name="chevron-forward" size={14} color="#FF8933" />
              </SettingsLinkRow>
            </PermissionRow>
          ))}
        </PermissionCard>
      </MainContainer>
    </Container>
  );
}
