import React from 'react';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Header from '../../../../components/Header'; // 경로에 맞게 점(.) 개수를 조절해 주세요

import {
  Container,
  NoticeList,
  NoticeItem,
  NoticeTitle,
  NoticeDate,
} from './Notice.styles';

export default function Notice({ navigation }) {
  
  const dummyNotices = [
    { id: '1', title: '공지사항 안내', date: '2026.4.15' },
    { id: '2', title: '공지사항 안내', date: '2026.4.15' },
    { id: '3', title: '공지사항 안내', date: '2026.4.15' },
    { id: '4', title: '공지사항 안내', date: '2026.4.15' },
    { id: '4', title: '공지사항 안내', date: '2026.4.15' },
    { id: '5', title: '공지사항 안내', date: '2026.4.15' },
    { id: '6', title: '공지사항 안내', date: '2026.4.15' },
    { id: '7', title: '공지사항 안내', date: '2026.4.15' },
  ];

  const renderItem = ({ item }) => (
    <NoticeItem 
      activeOpacity={0.7}
      // onPress={() => navigation.navigate('NoticeDetail', { id: item.id })} // 나중에 상세 페이지로 넘어가는 로직
    >
      <NoticeTitle>{item.title}</NoticeTitle>
      <NoticeDate>{item.date}</NoticeDate>
    </NoticeItem>
  );

  return (
    <Container>
      <Header
        left={
          <TouchableOpacity onPress={() => navigation.goBack()} activeOpacity={0.7}>
            <Icon name="chevron-back-outline" size={24} color="#FF8933" />
          </TouchableOpacity>
        }
        title="공지사항"
      />
      
      {/* 
        공지사항 리스트 렌더링 
        data: 뿌려줄 배열 데이터
        keyExtractor: 각 항목의 고유 ID 지정 (리액트 렌더링 최적화용)
        renderItem: 화면에 그릴 UI 컴포넌트
        showsVerticalScrollIndicator: 오른쪽 스크롤바 숨김 처리
      */}
      <NoticeList
        data={dummyNotices}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
      />
    </Container>
  );
}