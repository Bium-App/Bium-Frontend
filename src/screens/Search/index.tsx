import React from 'react';
import type {RootScreenProps} from '../../types/navigation';
import {TouchableOpacity, FlatList, Alert} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import {useTranslation} from 'react-i18next';
import { useSearch } from '../../hooks/useSearch';
import type {SearchResultItem} from '../../hooks/useSearch';
import AsyncState from '../../components/AsyncState';
import {getApiResponseMessage} from '../../utils/apiError';

import {
  Container,
  SearchHeaderContainer,
  SearchInputContainer,
  SearchLabel,
  VerticalDivider,
  SearchInput,
  HeaderDivider,
  SectionContainer,
  SectionHeader,
  SectionTitle,
  DeleteAllText,
  ChipContainer,
  RecentChip,
  RecentChipText,
  ChipDeleteButton,
  RecommendChip,
  RecommendIcon,
  RecommendChipText,
  RecommendSectionContainer,
  RecommendSectionHeader,
  SearchResultsContainer,
  ResultButton,
  ResultTitle,
  ResultCategory,
  ResultDescription,
  EmptyResultText,
} from './Search.styles';

export default function Search({navigation}: RootScreenProps<'Search'>) {
  const {t} = useTranslation();
  const insets = useSafeAreaInsets();

  const {
    keyword,
    setKeyword,
    recentSearches,
    recommendedSearches,
    searchResults,
    isSearching,
    hasSearched,
    errorMessage,
    deleteRecentSearch,
    deleteAllRecentSearches,
    handleSearchSubmit,
    clearSearch,
    getMemoDetail,
  } = useSearch();

  const onChangeKeyword = (text: string) => {
    setKeyword(text);
    if (text.length === 0) {
      clearSearch();
    }
  };

  const handleResultPress = async (item: SearchResultItem) => {
    if (item.resultType === 'MEMO') {
      try {
        const memo = await getMemoDetail(item.targetId);
        navigation.navigate('MainTabs', {
          screen: 'MemoEditor',
          params: {
            memoData: {
              id: String(memo.memoId),
              title: memo.title,
              content: memo.content,
              richContent: memo.richContent,
              status: memo.status,
              expiredAt: memo.expiredAt,
              createdAt: memo.createdAt,
            },
          },
        });
      } catch (error) {
        Alert.alert(
          t('common.error'),
          getApiResponseMessage(error) ??
            t('home.memo_detail_failed'),
        );
      }
      return;
    }

    if (!item.teamSpaceId) {
      Alert.alert(
        t('search.detail_pending'),
        t('search.missing_team'),
      );
      return;
    }

    const projectId = String(item.teamSpaceId);
    if (item.resultType === 'TODO') {
      navigation.navigate('ProjectTodo', {
        projectId,
        todoId: item.targetId,
      });
    } else if (item.resultType === 'SCHEDULE') {
      navigation.navigate('Schedule', {projectId});
    } else {
      navigation.navigate('ProjectDetail', {projectId});
    }
  };

  const renderSearchResultItem = ({item}: {item: SearchResultItem}) => (
    <ResultButton
      activeOpacity={0.7}
      onPress={() => handleResultPress(item)}
    >
      <ResultTitle>{item.title}</ResultTitle>
      <ResultCategory>{item.category}</ResultCategory>
      <ResultDescription numberOfLines={2}>
        {item.desc}
      </ResultDescription>
    </ResultButton>
  );

  return (
    <Container>
      <SearchHeaderContainer paddingTop={insets.top}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          activeOpacity={0.7}
        >
          <Icon name="chevron-back-outline" size={24} color="#FF8933" />
        </TouchableOpacity>
        <SearchInputContainer>
          <Icon name="search-outline" size={28} color="#FF8933" />
          <SearchLabel>{t('search.title')}</SearchLabel>
          <VerticalDivider />
          <SearchInput
            placeholder=""
            value={keyword}
            onChangeText={onChangeKeyword}
            autoFocus
            onSubmitEditing={() => handleSearchSubmit()}
            returnKeyType="search"
          />
        </SearchInputContainer>
      </SearchHeaderContainer>

      <HeaderDivider />

      {/* 검색 여부에 따른 화면 분기 처리 */}
      {hasSearched ? (
        <SearchResultsContainer>
          {isSearching || errorMessage ? (
            <AsyncState
              isLoading={isSearching}
              errorMessage={errorMessage}
              onRetry={() => handleSearchSubmit(keyword)}
            />
          ) : searchResults.length === 0 ? (
            <EmptyResultText>{t('state.no_search_results')}</EmptyResultText>
          ) : (
            <FlatList
              data={searchResults}
              keyExtractor={item => item.id}
              renderItem={renderSearchResultItem}
              showsVerticalScrollIndicator={false}
            />
          )}
        </SearchResultsContainer>
      ) : (
        <>
          <SectionContainer>
            <SectionHeader>
              <SectionTitle>{t('search.recent')}</SectionTitle>
              <TouchableOpacity
                onPress={deleteAllRecentSearches}
                activeOpacity={0.7}
              >
                <DeleteAllText>{t('search.delete_all')}</DeleteAllText>
              </TouchableOpacity>
            </SectionHeader>
            <ChipContainer>
              {recentSearches.map(item => (
                <RecentChip key={item.id}>
                  <TouchableOpacity
                    onPress={() => handleSearchSubmit(item.text)}
                    activeOpacity={0.7}
                  >
                    <RecentChipText>{item.text}</RecentChipText>
                  </TouchableOpacity>
                  <ChipDeleteButton
                    onPress={() => deleteRecentSearch(item.id)}
                    activeOpacity={0.7}
                  >
                    <Icon name="close" size={16} color="#FF8933" />
                  </ChipDeleteButton>
                </RecentChip>
              ))}
            </ChipContainer>
          </SectionContainer>

          <RecommendSectionContainer>
            <RecommendSectionHeader>
              <SectionTitle>{t('search.recommended')}</SectionTitle>
            </RecommendSectionHeader>
            <ChipContainer>
              {recommendedSearches.map((text, index) => (
                <RecommendChip
                  key={index}
                  onPress={() => handleSearchSubmit(text)}
                  activeOpacity={0.7}
                >
                  <RecommendIcon>
                    <Icon name="search-outline" size={16} color="#FF8933" />
                  </RecommendIcon>
                  <RecommendChipText>{text}</RecommendChipText>
                </RecommendChip>
              ))}
            </ChipContainer>
          </RecommendSectionContainer>
        </>
      )}
    </Container>
  );
}
