import React, { useCallback, useState } from 'react';
import { Alert, RefreshControl, TouchableOpacity } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
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
import {getApiResponseMessage} from '../../utils/apiError';

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

export default function Home({navigation}: HomeScreenProps) {
  const {t} = useTranslation();
  const [showTooltip, setShowTooltip] = useState(true);
  const {
    memoSections,
    isLoading,
    errorMessage,
    fetchMemos,
    getMemoDetail,
    changeMemoStatus,
    toggleMemoPin,
    moveMemoToTrash,
  } = useHome();

  useFocusEffect(
    useCallback(() => {
      fetchMemos();
    }, [fetchMemos]),
  );

  const openMemoEditor = async (item: HomeMemoItem) => {
    try {
      const memo = await getMemoDetail(item.id);
      navigation.navigate('MemoEditor', {
        memoData: {
          id: String(memo.memoId),
          title: memo.title,
          content: memo.content,
          richContent: memo.richContent,
          status: memo.status,
          expiredAt: memo.expiredAt,
          createdAt: memo.createdAt,
        },
      });
    } catch (error) {
      Alert.alert(
        t('common.error'),
        getApiResponseMessage(error) ??
          t('home.memo_detail_failed'),
      );
    }
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
          changeMemoStatus(item.id, item.Status === 'ICE' ? 'FIRE' : 'ICE'),
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
            onPin={memo => toggleMemoPin(memo.id, memo.isPinned)}
            onStatusChange={(memo, status) => changeMemoStatus(memo.id, status)}
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
