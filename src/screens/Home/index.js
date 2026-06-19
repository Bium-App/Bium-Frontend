import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Header from '../../components/Header';
import MemoCard from '../../components/MemoCard';

import FingerIcon from '../../assets/icons/ic_swipe_finger.svg';

import {
  Container,
  RightIconContainer,
  SectionHeader,
  TooltipContainer,
  TooltipLeft,
  FingerWrapper,
  ArrowRow,
  TooltipTextWrapper,
  TooltipRow,
  TooltipText,
  CloseButton,
  ListContainer
} from './Home.styles';

const DUMMY_DATA = [
  {
    title: '고정된 메모',
    data: [
      { 
        id: '1', 
        MTitle: '산학연계 프로젝트 마감일', 
        MContent: '8월 31일까지 최종 결과물 제출 및 발표 준비', 
        Status: 'ICE', 
        time: '오전 10:30', 
        isPinned: true 
      },
    ],
  },
  {
    title: '메모',
    data: [
      { 
        id: '2', 
        MTitle: 'React Native Skia 학습 기록', 
        MContent: '구이 이펙트 구현을 위한 블러 필터와 컬러 매트릭스 공부하기', 
        Status: 'ICE', 
        time: '어제 14:20', 
        isPinned: false 
      },
      { 
        id: '3', 
        MTitle: '태정님한테 API 명세 물어보기', 
        MContent: '메모 생성 및 소멸 로직 API 엔드포인트 확인 필요', 
        Status: 'FIRE', 
        time: '오전 09:15', 
        remainingTime: '01:45:12', 
        isPinned: false 
      },
      { 
        id: '4', 
        MTitle: '오늘 점심 메뉴 후보', 
        MContent: '학생식당 돈까스 vs 정문 앞 김치찌개', 
        Status: 'FIRE', 
        time: '오전 11:50', 
        remainingTime: '00:30:05', 
        isPinned: false 
      },
      { 
        id: '5', 
        MTitle: '홈 화면 아이콘 리스트', 
        MContent: 'ic_fire, ic_ice, ic_pin, ic_swipe_finger 저장 완료', 
        Status: 'ICE', 
        time: '오후 18:30', 
        isPinned: false 
      },
    ],
  }
];

export default function Home({ navigation }) {
  const [showTooltip, setShowTooltip] = useState(true);

  const renderTooltip = () => {
    if (!showTooltip) return null;
    
    return (
      <TooltipContainer>
        <TooltipLeft>
          <FingerWrapper>
            <ArrowRow>
              <Icon name="arrow-back-outline" size={14} color="#FF8933" /> 
              <Icon name="arrow-forward-outline" size={14} color="#FF8933" /> 
            </ArrowRow>
            <FingerIcon width={28} height={28} color="#000000" /> 
          </FingerWrapper>
          <TooltipTextWrapper>
            <TooltipRow>
              <Icon name="arrow-back-outline" size={14} color="#FF8933" /> 
              <TooltipText>왼쪽 : 얼음 (보관)</TooltipText>
            </TooltipRow>
            <TooltipRow>
              <Icon name="arrow-forward-outline" size={14} color="#FF8933" /> 
              <TooltipText>오른쪽 : 상단 고정 (얼음 메모만 가능)</TooltipText>
            </TooltipRow>
          </TooltipTextWrapper>
        </TooltipLeft>
        <CloseButton onPress={() => setShowTooltip(false)}>
          <Icon name="close-outline" size={20} color="#000000" /> 
        </CloseButton>
      </TooltipContainer>
    );
  };

  return (
    <Container>
      <Header
        title="홈"
        right={
          <RightIconContainer>
            <TouchableOpacity onPress={() => navigation.navigate('Notification')} activeOpacity={0.7}>
              <Icon name="notifications-outline" size={24} color="#000000" /> 
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Search')} activeOpacity={0.7}>
              <Icon name="search-outline" size={24} color="#000000" /> 
            </TouchableOpacity>
          </RightIconContainer>
        }
      />
      <ListContainer
        sections={DUMMY_DATA}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={renderTooltip}
        renderSectionHeader={({ section: { title } }) => (
          <SectionHeader>{title}</SectionHeader>
        )}
        renderItem={({ item }) => <MemoCard item={item} />}
      />
    </Container>
  );
}