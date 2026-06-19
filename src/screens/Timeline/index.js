import React, { useState } from 'react';
import { StatusBar } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Header from '../../components/Header';

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
  PinWrapper
} from './Timeline.styles';


const DUMMY_FIRE_DATA = [
  { id: '1', title: '기획안 최종 검토', time: '10:30', desc: '마케팅팀 공유 전 마지막 확인' },
  { id: '2', title: 'PT 발표 자료 완성', time: '11:30', desc: '디자인 시안 포함 완료하기' },
  { id: '3', title: '운동하기', time: '10:30', desc: '헬스장 1시간 루틴' },
];
const DUMMY_ICE_PINNED = [
  { id: 'p1', title: '프로젝트 레퍼런스', desc: '디자인 및 기능 레퍼런스 모음', date: '5월 12일 저장' },
  { id: 'p2', title: '독서 리스트', desc: '올해 읽고 싶은 책 목록', date: '5월 8일 저장' },
];
const DUMMY_ICE_REGULAR = [
  { id: 'r1', title: '아이디어 정리', desc: '떠오른 서비스 아이디어 정리해두기', date: '5월 16일 저장' },
  { id: 'r2', title: '여름 여행 계획', desc: '가고 싶은 여행지 리스트업', date: '5월 15일 저장' },
  { id: 'r3', title: '책 읽고 싶은 목록', desc: '나중에 읽고 싶은 책 리스트', date: '5월 14일 저장' },
  { id: 'r4', title: '블로그 글감 모음', desc: '포스팅 주제 아이디어 모음', date: '5월 12일 저장' },
  { id: 'r5', title: '운동 루틴 참고', desc: '좋은 루틴 발견하면 적어두기', date: '5월 11일 저장' },
  { id: 'r6', title: '장보기 리스트', desc: '우유, 계란, 파, 양파 등', date: '5월 10일 저장' },
  { id: 'r7', title: '업무 일지', desc: '이번 주 진행해야 할 주요 업무', date: '5월 9일 저장' },
  { id: 'r8', title: '회의록 모음', desc: '주간 회의록 정리 및 백업', date: '5월 8일 저장' },
];

export default function Timeline() {
  const [activeTab, setActiveTab] = useState('ice');
  const [isPinnedExpanded, setIsPinnedExpanded] = useState(true);

  const renderFireMemos = () => {
    return DUMMY_FIRE_DATA.map((item, index) => {
      const isFirst = index === 0;
      const isLast = index === DUMMY_FIRE_DATA.length - 1;
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
          <MemoCard activeOpacity={0.8}>
            <CardLeft>
              <IconWrapper>
                <FireIcon width={30} height={30} />
              </IconWrapper>
              <TextWrapper>
                <CardTitle>{item.title}</CardTitle>
                <CardTime>{item.time}</CardTime>
                <CardDesc>{item.desc}</CardDesc>
              </TextWrapper>
            </CardLeft>
            <CardRight>
              <TimerRing>
                <TimerValue>00:01</TimerValue>
                <TimerLabel>남음</TimerLabel>
                <TimerDot />
              </TimerRing>
            </CardRight>
          </MemoCard>
        </TimelineRow>
      );
    });
  };

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
        <MemoCard activeOpacity={0.8}>
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
            <IconButton>
              <Icon name="notifications-outline" size={26} color="#000000" />
            </IconButton>
            <SpacedIconButton>
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
          <TabText active={activeTab === 'fire'} tabType="fire">불 메모</TabText>
        </TabButton>
        <TabButton 
          active={activeTab === 'ice'} 
          tabType="ice"
          onPress={() => setActiveTab('ice')}
        >
          <TabText active={activeTab === 'ice'} tabType="ice">얼음 메모</TabText>
        </TabButton>
      </TabContainer>

      <ScrollContainer showsVerticalScrollIndicator={false}>
        {activeTab === 'fire' ? (
          renderFireMemos()
        ) : (
          <>
            <SectionHeaderRow 
              activeOpacity={0.7} 
              onPress={() => setIsPinnedExpanded(!isPinnedExpanded)}
            >
              <SectionTitle>고정된 메모</SectionTitle>
              <Icon name={isPinnedExpanded ? "chevron-up" : "chevron-down"} size={17} color="#AAAAAA" />
            </SectionHeaderRow>
            
            {isPinnedExpanded && 
              DUMMY_ICE_PINNED.map((item, index) => 
                renderIceItem(item, index, DUMMY_ICE_PINNED.length, true)
              )
            }
            <SectionHeaderRow activeOpacity={1}>
              <SectionTitle>메모</SectionTitle>
            </SectionHeaderRow>
            {DUMMY_ICE_REGULAR.map((item, index) => 
              renderIceItem(item, index, DUMMY_ICE_REGULAR.length, false)
            )}
          </>
        )}
      </ScrollContainer>
    </Container>
  );
}