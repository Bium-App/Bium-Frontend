import React, { useState, useEffect } from 'react';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';

// 💡 프로젝트 공동 헤더 컴포넌트 사용 원칙 적용
import Header from '../../../../components/Header';

import {
  Container,
  Content,
  RowItem,
  RowText,
  CustomToggle, // 💡 커스텀 토글 배경 임포트
  ToggleCircle, // 💡 커스텀 토글 동그라미 임포트
} from './SettingNotification.styles';

export default function SettingNotification({ navigation }) {
  const [isAllEnabled, setIsAllEnabled] = useState(true);
  const [isEventEnabled, setIsEventEnabled] = useState(true);
  const [isPushEnabled, setIsPushEnabled] = useState(true);

  // 설정값 불러오기 로직 유지
  useEffect(() => {
    const loadSettings = async () => {
      try {
        const savedEvent = await AsyncStorage.getItem('notiEvent');
        const savedPush = await AsyncStorage.getItem('notiPush');
        
        if (savedEvent !== null) setIsEventEnabled(JSON.parse(savedEvent));
        if (savedPush !== null) setIsPushEnabled(JSON.parse(savedPush));
        
        if (savedEvent !== 'false' && savedPush !== 'false') {
          setIsAllEnabled(true);
        } else {
          setIsAllEnabled(false);
        }
      } catch (error) {
        console.log("알림 설정 불러오기 실패", error);
      }
    };
    loadSettings();
  }, []);

  // 설정값 저장 로직 유지
  const saveSetting = async (key, value) => {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.log("저장 실패", error);
    }
  };

  const toggleAll = (value) => {
    setIsAllEnabled(value);
    setIsEventEnabled(value);
    setIsPushEnabled(value);
    
    saveSetting('notiEvent', value);
    saveSetting('notiPush', value);
  };

  const toggleEvent = (value) => {
    setIsEventEnabled(value);
    saveSetting('notiEvent', value);
    if (!value) setIsAllEnabled(false);
    if (value && isPushEnabled) setIsAllEnabled(true);
  };

  const togglePush = (value) => {
    setIsPushEnabled(value);
    saveSetting('notiPush', value);

    if (!value) setIsAllEnabled(false);
    if (value && isEventEnabled) setIsAllEnabled(true);
  };

  return (
    <Container>
      <Header
        left={
          <TouchableOpacity onPress={() => navigation.goBack()} activeOpacity={0.7}>
            <Icon name="chevron-back-outline" size={24} color="#FF8933" />
          </TouchableOpacity>
        }
        title="알림"
      />
      
      <Content>
        {/* 1. 모든 알림 받기 */}
        <RowItem>
          <RowText>모든 알림 받기</RowText>
          <CustomToggle 
            activeOpacity={0.8} 
            isOn={isAllEnabled} 
            onPress={() => toggleAll(!isAllEnabled)}
          >
            <ToggleCircle isOn={isAllEnabled} />
          </CustomToggle>
        </RowItem>

        {/* 2. 이벤트/혜택 알림 */}
        <RowItem>
          <RowText>이벤트/혜택 알림</RowText>
          <CustomToggle 
            activeOpacity={0.8} 
            isOn={isEventEnabled} 
            onPress={() => toggleEvent(!isEventEnabled)}
          >
            <ToggleCircle isOn={isEventEnabled} />
          </CustomToggle>
        </RowItem>

        {/* 3. 푸시알림 */}
        <RowItem>
          <RowText>푸시알림</RowText>
          <CustomToggle 
            activeOpacity={0.8} 
            isOn={isPushEnabled} 
            onPress={() => togglePush(!isPushEnabled)}
          >
            <ToggleCircle isOn={isPushEnabled} />
          </CustomToggle>
        </RowItem>
      </Content>
    </Container>
  );
}