import React, { useCallback, useMemo, useState } from 'react';
import { Alert, RefreshControl, TouchableOpacity } from 'react-native';
import { useFocusEffect, useIsFocused } from '@react-navigation/native';
import type {CompositeScreenProps} from '@react-navigation/native';
import type {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/Ionicons';
import {useTranslation} from 'react-i18next';
import Header from '../../components/Header';
import MemoCard from '../../components/MemoCard';
import AsyncState from '../../components/AsyncState';

import FingerIcon from '../../assets/icons/ic_swipe_finger.svg';
import { useHome } from '../../hooks/useHome';
import type {HomeMemoItem} from '../../hooks/useHome';
import type {
  MainTabParamList,
  RootStackParamList,
} from '../../types/navigation';
import {getNextFireExpirationAt} from '../../utils/memoExpiration';
import {useMemoExpirationRefresh} from '../../hooks/useMemoExpirationRefresh';

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

type HomeScreenProps = CompositeScreenProps<
  BottomTabScreenProps<MainTabParamList, 'Home'>,
  NativeStackScreenProps<RootStackParamList>
>;

// 홈 화면. FIRE/ICE 메모를 섹션 목록으로 보여주고 상태 변경, pin, TRASH 이동을 처리한다.
export default function Home({navigation}: HomeScreenProps) {
  const {t} = useTranslation();
  const isFocused = useIsFocused();
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
  // 목록에서 가장 먼저 만료될 FIRE 메모의 시각을 구해, 그 시점에 자동으로
  // 목록을 다시 불러오도록 한다. 화면을 새로고침하지 않아도 만료된 메모가
  // TRASH로 이동된 최신 상태를 반영할 수 있다.
  const nextExpirationAt = useMemo(
    () =>
      getNextFireExpirationAt(
        memoSections.flatMap(section =>
          section.data.map(memo => ({
            status: memo.Status,
            expiredAt: memo.expiredAt,
          })),
        ),
      ),
    [memoSections],
  );

  useMemoExpirationRefresh(nextExpirationAt, fetchMemos, isFocused);

  useFocusEffect(
    useCallback(() => {
      fetchMemos();
    }, [fetchMemos]),
  );

  const openMemoDetail = (item: HomeMemoItem) => {
    navigation.navigate('MemoDetail', {memoId: item.id});
  };

  const confirmTrash = (item: HomeMemoItem) => {
    Alert.alert(t('home.move_to_trash'), t('home.move_to_trash_confirm', {title: item.MTitle}), [
      { text: t('home.cancel'), style: 'cancel' },
      {
        text: t('home.move'),
        style: 'destructive',
        onPress: () => moveMemoToTrash(item.id),
      },
    ]);
  };

  const openMemoMenu = (item: HomeMemoItem) => {
    Alert.alert(t('home.manage_memo'), item.MTitle, [
      {
        text: item.Status === 'ICE' ? t('home.change_to_fire') : t('home.store_as_ice'),
        onPress: () =>
          changeMemoStatus(
            item.id,
            item.Status === 'ICE' ? 'FIRE' : 'ICE',
            item.isPinned,
          ),
      },
      {
        text: t('home.move_to_trash_action'),
        style: 'destructive',
        onPress: () => confirmTrash(item),
      },
      { text: t('home.cancel'), style: 'cancel' },
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
              <TooltipText>{t('home.tooltip_ice')}</TooltipText>
            </TooltipRow>
            <TooltipRow>
              <Icon name="arrow-forward-outline" size={14} color="#FF8933" />
              <TooltipText>{t('home.tooltip_pin')}</TooltipText>
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
        title={t('home.title')}
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
        stickySectionHeadersEnabled={false}
        keyExtractor={item => item.id}
        ListHeaderComponent={renderTooltip}
        renderSectionHeader={({ section: { title } }) => (
          <SectionHeader>{title}</SectionHeader>
        )}
        renderItem={({ item }) => (
          <MemoCard
            item={item}
            onPress={openMemoDetail}
            onMore={openMemoMenu}
            onPin={memo => toggleMemoPin(memo.id, memo.isPinned)}
            onStatusChange={(memo, status) =>
              changeMemoStatus(memo.id, status, memo.isPinned)
            }
          />
        )}
        ListEmptyComponent={
          <AsyncState
            isLoading={isLoading}
            errorMessage={errorMessage}
            emptyMessage={t('state.no_memos')}
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
