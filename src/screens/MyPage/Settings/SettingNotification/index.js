import React, { useState, useEffect } from 'react';
import { TouchableOpacity, Switch } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Header from '../../../../components/Header';

import {
  Container,
  Content,
  RowItem,
  RowText,
} from './SettingNotification.styles';

export default function SettingNotification({ navigation }) {
  const [isAllEnabled, setIsAllEnabled] = useState(true);
  const [isEventEnabled, setIsEventEnabled] = useState(true);
  const [isPushEnabled, setIsPushEnabled] = useState(true);

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
        <RowItem>
          <RowText>모든 알림 받기</RowText>
          <Switch
            trackColor={{ false: '#E8E8E8', true: '#FF8933' }}
            thumbColor="#FFFFFF"
            ios_backgroundColor="#E8E8E8"
            onValueChange={toggleAll}
            value={isAllEnabled}
          />
        </RowItem>

        <RowItem>
          <RowText>이벤트/혜택 알림</RowText>
          <Switch
            trackColor={{ false: '#E8E8E8', true: '#FF8933' }}
            thumbColor="#FFFFFF"
            ios_backgroundColor="#E8E8E8"
            onValueChange={toggleEvent}
            value={isEventEnabled}
          />
        </RowItem>

        <RowItem>
          <RowText>푸시알림</RowText>
          <Switch
            trackColor={{ false: '#E8E8E8', true: '#FF8933' }}
            thumbColor="#FFFFFF"
            ios_backgroundColor="#E8E8E8"
            onValueChange={togglePush}
            value={isPushEnabled}
          />
        </RowItem>
      </Content>
    </Container>
  );
}