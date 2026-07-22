import React, { useCallback, useState } from 'react';
import { StatusBar, RefreshControl } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import Header from '../../components/Header';
import AsyncState from '../../components/AsyncState';
import { useTimeline } from '../../hooks/useTimeline';

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
  TimerRing,
  TimerDot,
  TimerValue,
  TimerLabel,
  PinWrapper,
} from './Timeline.styles';

export default function Timeline({ navigation }) {
  const [activeTab, setActiveTab] = useState('ice');
  const [isPinnedExpanded, setIsPinnedExpanded] = useState(true);

  // 뷰모델에서 서버 데이터와 로딩 상태, 통신 함수를 가져옵니다.
  const {
    fireMemos,
    icePinnedMemos,
    iceRegularMemos,
    isLoading,
    errorMessage,
    fetchMemos,
  } = useTimeline();
  const hasActiveMemos =
    activeTab === 'fire'
      ? fireMemos.length > 0
      : icePinnedMemos.length > 0 || iceRegularMemos.length > 0;

  // 화면이 켜질 때 서버에서 데이터를 불러옵니다.
  useFocusEffect(
    useCallback(() => {
      fetchMemos();
    }, [fetchMemos]),
  );

  const openMemo = item => {
    navigation.navigate('MemoEditor', {
      memoData: {
        id: item.id,
        title: item.title,
        content: item.desc,
        status: item.status,
      },
    });
  };

  // 불 메모 렌더링 로직
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
            <CardRight>
              <TimerRing>
                <TimerValue>{item.remainingTime}</TimerValue>
                <TimerLabel>남음</TimerLabel>
                <TimerDot />
              </TimerRing>
            </CardRight>
          </MemoCard>
        </TimelineRow>
      );
    });
  };

  // 얼음 메모 렌더링 로직
  const renderIceItem = (item, index, totalLength, isPinned) => {
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
          <PinWrapper>
            {isPinned ? (
              <IcePinIcon width={16} height={16} />
            ) : (
              <PinIcon width={16} height={16} />
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
        title=""
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
            불 메모
          </TabText>
        </TabButton>
        <TabButton
          active={activeTab === 'ice'}
          tabType="ice"
          onPress={() => setActiveTab('ice')}
        >
          <TabText active={activeTab === 'ice'} tabType="ice">
            얼음 메모
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
                ? '저장된 불 메모가 없습니다.'
                : '저장된 얼음 메모가 없습니다.'
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
              <SectionTitle>고정된 메모</SectionTitle>
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
              <SectionTitle>메모</SectionTitle>
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
