import React, { useCallback, useMemo, useState } from 'react';
import {
  Alert,
  StatusBar,
  RefreshControl,
  type GestureResponderEvent,
} from 'react-native';
import { useFocusEffect, useIsFocused } from '@react-navigation/native';
import type { CompositeScreenProps } from '@react-navigation/native';
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/Ionicons';
import {useTranslation} from 'react-i18next';
import Header from '../../components/Header';
import AsyncState from '../../components/AsyncState';
import BurningTimer from '../../components/BurningTimer';
import { useTimeline } from '../../hooks/useTimeline';
import type { TimelineMemoItem } from '../../hooks/useTimeline';
import type {
  MainTabParamList,
  RootStackParamList,
} from '../../types/navigation';
import { getApiResponseMessage } from '../../utils/apiError';
import {getNextFireExpirationAt} from '../../utils/memoExpiration';
import {useMemoExpirationRefresh} from '../../hooks/useMemoExpirationRefresh';

import FireIcon from '../../assets/icons/ic_fire.svg';
import IceIcon from '../../assets/icons/ic_ice.svg';
import PinIcon from '../../assets/icons/ic_pin.svg';
import IcePinIcon from '../../assets/icons/ic_icepin.svg';

import {
  Container,
  HeaderIconRow,
  IconButton,
  SpacedIconButton,
  TabContainer,
  TabButton,
  TabText,
  ScrollContainer,
  SectionHeaderRow,
  SectionTitle,
  TimelineRow,
  TimelineLeft,
  TimelineLineTop,
  TimelineLineBottom,
  TimelineDotOuter,
  TimelineDotInner,
  MemoCard,
  CardLeft,
  IconWrapper,
  TextWrapper,
  CardTitle,
  CardTime,
  CardDesc,
  DateRow,
  DateText,
  CardRight,
  PinWrapper,
} from './Timeline.styles';

type TimelineScreenProps = CompositeScreenProps<
  BottomTabScreenProps<MainTabParamList, 'Timeline'>,
  NativeStackScreenProps<RootStackParamList>
>;

type TimelineTab = 'fire' | 'ice';

// 타임라인 화면. FIRE/ICE 탭 전환과 ICE 메모의 고정(pin) 표시를 처리한다.
export default function Timeline({ navigation }: TimelineScreenProps) {
  const {t} = useTranslation();
  const isFocused = useIsFocused();
  const [activeTab, setActiveTab] = useState<TimelineTab>('ice');
  const [isPinnedExpanded, setIsPinnedExpanded] = useState(true);

  const {
    fireMemos,
    icePinnedMemos,
    iceRegularMemos,
    isLoading,
    errorMessage,
    fetchMemos,
    toggleMemoPin,
  } = useTimeline();
  const nextExpirationAt = useMemo(
    () => getNextFireExpirationAt(fireMemos),
    [fireMemos],
  );

  useMemoExpirationRefresh(nextExpirationAt, fetchMemos, isFocused);
  const hasActiveMemos =
    activeTab === 'fire'
      ? fireMemos.length > 0
      : icePinnedMemos.length > 0 || iceRegularMemos.length > 0;

  useFocusEffect(
    useCallback(() => {
      fetchMemos();
    }, [fetchMemos]),
  );

  const openMemo = (item: TimelineMemoItem) => {
    navigation.navigate('MemoDetail', {memoId: item.id});
  };

  const handlePinPress = async (item: TimelineMemoItem): Promise<void> => {
    try {
      await toggleMemoPin(item.id, item.isPinned);
    } catch (error) {
      Alert.alert(
        t('timeline.pin_failed'),
        getApiResponseMessage(error) ?? t('timeline.pin_failed_message'),
      );
    }
  };

  const stopCardPressAndTogglePin = (
    event: GestureResponderEvent,
    item: TimelineMemoItem,
  ): void => {
    event.stopPropagation();
    handlePinPress(item);
  };

  const renderFireMemos = () => {
    return fireMemos.map((item, index) => {
      const isFirst = index === 0;
      const isLast = index === fireMemos.length - 1;
      const INACTIVE_COLOR = '#D1D5DB';
      const topColor = index === 1 ? '#FF8933' : INACTIVE_COLOR;
      const bottomColor = index === 0 ? '#FF8933' : INACTIVE_COLOR;

      return (
        <TimelineRow key={item.id}>
          <TimelineLeft>
            {!isFirst && <TimelineLineTop color={topColor} />}
            {!isLast && <TimelineLineBottom color={bottomColor} />}
            <TimelineDotOuter bgColor="#FFE8D6">
              {isFirst && <TimelineDotInner color="#FF8933" />}
            </TimelineDotOuter>
          </TimelineLeft>
          <MemoCard activeOpacity={0.8} onPress={() => openMemo(item)}>
            <CardLeft>
              <IconWrapper>
                <FireIcon width={30} height={30} color="#FF8933" />
              </IconWrapper>
              <TextWrapper>
                <CardTitle>{item.title}</CardTitle>
                <CardTime>{item.time}</CardTime>
                <CardDesc>{item.desc}</CardDesc>
              </TextWrapper>
            </CardLeft>
            {item.expiredAt ? (
              <CardRight>
                <BurningTimer
                  createdAt={item.createdAt}
                  expiredAt={item.expiredAt}
                  label={t('timeline.remaining')}
                />
              </CardRight>
            ) : null}
          </MemoCard>
        </TimelineRow>
      );
    });
  };

  const renderIceItem = (
    item: TimelineMemoItem,
    index: number,
    totalLength: number,
    isPinned: boolean,
  ) => {
    const isFirst = index === 0;
    const isLast = index === totalLength - 1;
    const ICE_ACTIVE = '#7CC4FF';
    const ICE_INACTIVE = '#D1D5DB';
    const ICE_OUTER_BG = '#EAF3FF';
    const topColor = index === 1 ? ICE_ACTIVE : ICE_INACTIVE;
    const bottomColor = index === 0 ? ICE_ACTIVE : ICE_INACTIVE;

    return (
      <TimelineRow key={item.id}>
        <TimelineLeft>
          {!isFirst && <TimelineLineTop color={topColor} />}
          {!isLast && <TimelineLineBottom color={bottomColor} />}
          <TimelineDotOuter bgColor={ICE_OUTER_BG}>
            {isFirst && <TimelineDotInner color={ICE_ACTIVE} />}
          </TimelineDotOuter>
        </TimelineLeft>
        <MemoCard activeOpacity={0.8} onPress={() => openMemo(item)}>
          <CardLeft>
            <IconWrapper>
              <IceIcon width={30} height={30} color="#7CC4FF" />
            </IconWrapper>
            <TextWrapper>
              <CardTitle>{item.title}</CardTitle>
              <CardDesc>{item.desc}</CardDesc>
              <DateRow>
                <Icon name="calendar-outline" size={12} color="#AAAAAA" />
                <DateText>{item.date}</DateText>
              </DateRow>
            </TextWrapper>
          </CardLeft>
          <PinWrapper
            accessibilityRole="button"
            accessibilityLabel={isPinned ? t('timeline.unpin') : t('timeline.pin')}
            activeOpacity={0.7}
            hitSlop={{ top: 8, right: 8, bottom: 8, left: 8 }}
            onPress={event => stopCardPressAndTogglePin(event, item)}
          >
            {isPinned ? (
              <IcePinIcon width={20} height={20} />
            ) : (
              <PinIcon width={20} height={20} color="#7CC4FF" />
            )}
          </PinWrapper>
        </MemoCard>
      </TimelineRow>
    );
  };

  return (
    <Container>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <Header
        title={t('timeline.title')}
        right={
          <HeaderIconRow>
            <IconButton onPress={() => navigation.navigate('Notification')}>
              <Icon name="notifications-outline" size={26} color="#000000" />
            </IconButton>
            <SpacedIconButton onPress={() => navigation.navigate('Search')}>
              <Icon name="search-outline" size={26} color="#000000" />
            </SpacedIconButton>
          </HeaderIconRow>
        }
      />

      <TabContainer>
        <TabButton
          active={activeTab === 'fire'}
          tabType="fire"
          onPress={() => setActiveTab('fire')}
        >
          <TabText active={activeTab === 'fire'} tabType="fire">
            {t('timeline.fire_memo')}
          </TabText>
        </TabButton>
        <TabButton
          active={activeTab === 'ice'}
          tabType="ice"
          onPress={() => setActiveTab('ice')}
        >
          <TabText active={activeTab === 'ice'} tabType="ice">
            {t('timeline.ice_memo')}
          </TabText>
        </TabButton>
      </TabContainer>

      <ScrollContainer
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={isLoading}
            onRefresh={fetchMemos}
            tintColor="#FF8933"
          />
        }
      >
        {!hasActiveMemos ? (
          <AsyncState
            isLoading={isLoading}
            errorMessage={errorMessage}
            emptyMessage={
              activeTab === 'fire'
                ? t('state.no_fire_memos')
                : t('state.no_ice_memos')
            }
            onRetry={fetchMemos}
          />
        ) : activeTab === 'fire' ? (
          renderFireMemos()
        ) : (
          <>
            <SectionHeaderRow
              activeOpacity={0.7}
              onPress={() => setIsPinnedExpanded(!isPinnedExpanded)}
            >
              <SectionTitle>{t('timeline.pinned_memos')}</SectionTitle>
              <Icon
                name={isPinnedExpanded ? 'chevron-up' : 'chevron-down'}
                size={17}
                color="#AAAAAA"
              />
            </SectionHeaderRow>

            {isPinnedExpanded &&
              icePinnedMemos.map((item, index) =>
                renderIceItem(item, index, icePinnedMemos.length, true),
              )}
            <SectionHeaderRow activeOpacity={1}>
              <SectionTitle>{t('timeline.memos')}</SectionTitle>
            </SectionHeaderRow>
            {iceRegularMemos.map((item, index) =>
              renderIceItem(item, index, iceRegularMemos.length, false),
            )}
          </>
        )}
      </ScrollContainer>
    </Container>
  );
}
