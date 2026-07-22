import React, { useCallback, useState } from 'react';
import { Alert, RefreshControl, TouchableOpacity } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import Header from '../../components/Header';
import MemoCard from '../../components/MemoCard';
import AsyncState from '../../components/AsyncState';

import FingerIcon from '../../assets/icons/ic_swipe_finger.svg';
import { useHome } from '../../hooks/useHome';

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
  ListContainer,
} from './Home.styles';

export default function Home({ navigation }) {
  const [showTooltip, setShowTooltip] = useState(true);
  const {
    memoSections,
    isLoading,
    errorMessage,
    fetchMemos,
    changeMemoStatus,
    toggleMemoPin,
    moveMemoToTrash,
  } = useHome();

  useFocusEffect(
    useCallback(() => {
      fetchMemos();
    }, [fetchMemos]),
  );

  const openMemoEditor = item => {
    navigation.navigate('MemoEditor', {
      memoData: {
        id: item.id,
        title: item.MTitle,
        content: item.MContent,
        status: item.Status,
      },
    });
  };

  const confirmTrash = item => {
    Alert.alert('휴지통 이동', `'${item.MTitle}' 메모를 이동하시겠습니까?`, [
      { text: '취소', style: 'cancel' },
      {
        text: '이동',
        style: 'destructive',
        onPress: () => moveMemoToTrash(item.id),
      },
    ]);
  };

  const openMemoMenu = item => {
    Alert.alert('메모 관리', item.MTitle, [
      {
        text: item.Status === 'ICE' ? 'FIRE로 변경' : 'ICE로 보관',
        onPress: () =>
          changeMemoStatus(item.id, item.Status === 'ICE' ? 'FIRE' : 'ICE'),
      },
      {
        text: '휴지통으로 이동',
        style: 'destructive',
        onPress: () => confirmTrash(item),
      },
      { text: '취소', style: 'cancel' },
    ]);
  };

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
            <TouchableOpacity
              onPress={() => navigation.navigate('Notification')}
              activeOpacity={0.7}
            >
              <Icon name="notifications-outline" size={24} color="#000000" />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate('Search')}
              activeOpacity={0.7}
            >
              <Icon name="search-outline" size={24} color="#000000" />
            </TouchableOpacity>
          </RightIconContainer>
        }
      />
      <ListContainer
        sections={memoSections}
        keyExtractor={item => item.id}
        ListHeaderComponent={renderTooltip}
        renderSectionHeader={({ section: { title } }) => (
          <SectionHeader>{title}</SectionHeader>
        )}
        renderItem={({ item }) => (
          <MemoCard
            item={item}
            onPress={openMemoEditor}
            onMore={openMemoMenu}
            onPin={memo => toggleMemoPin(memo.id)}
            onStatusChange={(memo, status) => changeMemoStatus(memo.id, status)}
          />
        )}
        ListEmptyComponent={
          <AsyncState
            isLoading={isLoading}
            errorMessage={errorMessage}
            emptyMessage="저장된 메모가 없습니다."
            onRetry={fetchMemos}
          />
        }
        refreshControl={
          <RefreshControl
            refreshing={isLoading}
            onRefresh={fetchMemos}
            tintColor="#FF8933"
          />
        }
      />
    </Container>
  );
}
