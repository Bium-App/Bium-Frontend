import React from 'react';
import { Swipeable } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';

import FireIcon from '../../assets/icons/ic_fire.svg';
import IceIcon from '../../assets/icons/ic_ice.svg';
import PinIcon from '../../assets/icons/ic_icepin.svg';

import {
  CardContainer,
  IconWrapper,
  ContentWrapper,
  TitleText,
  ContentText,
  TimeText,
  ExpireText,
  RightWrapper,
  ActionBackground
} from './MemoCard.styles';

export default function MemoCard({ item }) {
  const renderLeftActions = () => (
    <ActionBackground color="#EAF3FF" align="flex-start"> 
      <PinIcon width={22} height={22} color="#7CC4FF" /> 
    </ActionBackground>
  );

  const renderRightActions = () => (
    <ActionBackground color="#FFE8D6" align="flex-end"> 
      {/* 아이콘 크기 20 -> 28로 확대 */}
      <IceIcon width={28} height={28} color="#FF8933" /> 
    </ActionBackground>
  );

  return (
    <Swipeable
      renderLeftActions={item.Status === 'ICE' ? renderLeftActions : null}
      renderRightActions={item.isPinned || item.Status === 'ICE' ? null : renderRightActions}
    >
      <CardContainer isPinned={item.isPinned}>
        <IconWrapper status={item.Status}>
          {item.Status === 'ICE' ? (
            <IceIcon width={28} height={28} color="#7CC4FF" /> 
          ) : (
            <FireIcon width={28} height={28} color="#FF8933" /> 
          )}
        </IconWrapper>
        <ContentWrapper>
          <TitleText>{item.MTitle}</TitleText>
          <ContentText>{item.MContent}</ContentText>
          {item.Status === 'FIRE' && (
            <ExpireText>소멸 예정 : {item.remainingTime}</ExpireText>
          )}
        </ContentWrapper>
        <RightWrapper>
          <TimeText>{item.time}</TimeText>
          <Icon name="ellipsis-vertical" size={20} color="#000000" /> 
        </RightWrapper>
      </CardContainer>
    </Swipeable>
  );
}