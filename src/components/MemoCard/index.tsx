import React, {useRef} from 'react';
import {Swipeable} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';
import {useTranslation} from 'react-i18next';

import FireIcon from '../../assets/icons/ic_fire.svg';
import IceIcon from '../../assets/icons/ic_ice.svg';
import PinIcon from '../../assets/icons/ic_pin.svg';
import PinnedPinIcon from '../../assets/icons/ic_icepin.svg';
import type {MemoStatus} from '../../types/memo';

import {
  CardContainer,
  IconWrapper,
  ContentWrapper,
  TitleText,
  ContentText,
  TimeText,
  ExpireText,
  RightWrapper,
  ActionBackground,
  MoreButton,
} from './MemoCard.styles';

export interface MemoCardItem {
  id: string;
  MTitle: string;
  MContent: string;
  Status: MemoStatus;
  time: string;
  isPinned: boolean;
  remainingTime: string | null;
  expiredAt: string | null;
}

interface MemoCardProps {
  item: MemoCardItem;
  onPress?: (item: MemoCardItem) => void;
  onMore?: (item: MemoCardItem) => void;
  onPin?: (item: MemoCardItem) => void;
  onStatusChange?: (item: MemoCardItem, status: MemoStatus) => void;
}

export default function MemoCard({
  item,
  onPress,
  onMore,
  onPin,
  onStatusChange,
}: MemoCardProps) {
  const {t} = useTranslation();
  const swipeableRef = useRef<Swipeable>(null);

  const handlePin = () => {
    swipeableRef.current?.close();
    onPin?.(item);
  };

  const handleStatusChange = () => {
    swipeableRef.current?.close();
    onStatusChange?.(item, 'ICE');
  };

  const renderLeftActions = () => (
    <ActionBackground
      color="#EAF3FF"
      align="flex-start"
      activeOpacity={0.8}
      onPress={handlePin}>
      {item.isPinned ? (
        <PinnedPinIcon width={22} height={22} />
      ) : (
        <PinIcon width={22} height={22} color="#7CC4FF" />
      )}
    </ActionBackground>
  );

  const renderRightActions = () => (
    <ActionBackground
      color="#FFE8D6"
      align="flex-end"
      activeOpacity={0.8}
      onPress={handleStatusChange}>
      <IceIcon width={28} height={28} color="#FF8933" />
    </ActionBackground>
  );

  return (
    <Swipeable
      ref={swipeableRef}
      renderLeftActions={
        item.Status === 'ICE' ? renderLeftActions : undefined
      }
      renderRightActions={
        item.isPinned || item.Status === 'ICE'
          ? undefined
          : renderRightActions
      }>
      <CardContainer
        isPinned={item.isPinned}
        activeOpacity={0.8}
        onPress={() => onPress?.(item)}>
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
          {item.Status === 'FIRE' && item.remainingTime ? (
            <ExpireText>{t('memo_card.expires_in', {time: item.remainingTime})}</ExpireText>
          ) : null}
        </ContentWrapper>
        <RightWrapper>
          <TimeText>{item.time}</TimeText>
          <MoreButton onPress={() => onMore?.(item)} activeOpacity={0.7}>
            <Icon name="ellipsis-vertical" size={20} color="#000000" />
          </MoreButton>
        </RightWrapper>
      </CardContainer>
    </Swipeable>
  );
}
