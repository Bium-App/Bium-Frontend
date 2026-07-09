import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native'; 
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
  CustomToggle, 
  ToggleCircle  
} from './PermissionSetup.styles';

export default function PermissionSetup({ navigation }) {
  
  // 권한 상태 관리
  const [permissions, setPermissions] = useState({
    camera: true, 
    image: true,
    mic: true,    
    bell: true,   
  });

  const togglePermission = (key) => {
    setPermissions(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

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
        <PermissionCard>
          
          {/* 1. 카메라 권한 */}
          <PermissionRow>
            <RowLeft>
              <IconWrapper>
                {/* 💡 23x23 -> 24x24 로 미세 조정하여 시각적 안정감 부여 */}
                <IcCamera width={24} height={24} />
              </IconWrapper>
              <PermissionText>카메라</PermissionText>
            </RowLeft>
            
            <CustomToggle 
              activeOpacity={0.8} 
              isOn={permissions.camera} 
              onPress={() => togglePermission('camera')}
            >
              <ToggleCircle isOn={permissions.camera} />
            </CustomToggle>
          </PermissionRow>

          {/* 2. 사진 및 동영상 권한 */}
          <PermissionRow>
            <RowLeft>
              <IconWrapper>
                {/* 💡 26x26으로 너무 커서 박스를 삐져나가던 것을 24x24로 축소 통일 */}
                <IcImage width={24} height={24} />
              </IconWrapper>
              <PermissionText>사진 및 동영상</PermissionText>
            </RowLeft>
            
            <CustomToggle 
              activeOpacity={0.8} 
              isOn={permissions.image} 
              onPress={() => togglePermission('image')}
            >
              <ToggleCircle isOn={permissions.image} />
            </CustomToggle>
          </PermissionRow>

          {/* 3. 마이크 권한 */}
          <PermissionRow>
            <RowLeft>
              <IconWrapper>
                {/* 💡 13x20으로 너무 왜소했던 비율을 유지하면서 16x24로 키워 밸런스 맞춤 */}
                <IcMic width={16} height={24} />
              </IconWrapper>
              <PermissionText>마이크</PermissionText>
            </RowLeft>
            
            <CustomToggle 
              activeOpacity={0.8} 
              isOn={permissions.mic} 
              onPress={() => togglePermission('mic')}
            >
              <ToggleCircle isOn={permissions.mic} />
            </CustomToggle>
          </PermissionRow>

          {/* 4. 알림 권한 */}
          <PermissionRow isLast={true}>
            <RowLeft>
              <IconWrapper>
                {/* 💡 23x23 -> 24x24 로 미세 조정 */}
                <IcBell width={24} height={24} />
              </IconWrapper>
              <PermissionText>알림</PermissionText>
            </RowLeft>
            
            <CustomToggle 
              activeOpacity={0.8} 
              isOn={permissions.bell} 
              onPress={() => togglePermission('bell')}
            >
              <ToggleCircle isOn={permissions.bell} />
            </CustomToggle>
          </PermissionRow>

        </PermissionCard>
      </MainContainer>
    </Container>
  );
}