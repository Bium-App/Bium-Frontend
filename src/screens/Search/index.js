import React from 'react';
import { TouchableOpacity, FlatList, View, Text, Alert } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import { useSearch } from '../../hooks/useSearch';
import AsyncState from '../../components/AsyncState';

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
} from './Search.styles';

export default function Search({ navigation }) {
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

  const onChangeKeyword = text => {
    setKeyword(text);
    if (text.length === 0) {
      clearSearch();
    }
  };

  const handleResultPress = async item => {
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
              status: memo.status,
            },
          },
        });
      } catch (error) {
        Alert.alert(
          '오류',
          error.response?.data?.message ??
            '메모 상세 내용을 불러오지 못했습니다.',
        );
      }
      return;
    }

    if (item.resultType === 'NOTICE' && item.teamSpaceId) {
      navigation.navigate('ProjectDetail', {
        projectId: String(item.teamSpaceId),
      });
      return;
    }

    Alert.alert(
      '상세 이동 준비 중',
      '할일·일정 검색 결과에는 소속 teamSpaceId가 없어 해당 팀 화면으로 이동할 수 없습니다.',
    );
  };

  const renderSearchResultItem = ({ item }) => (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={() => handleResultPress(item)}
      style={{
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#F0F0F0',
        backgroundColor: '#FFFFFF',
      }}
    >
      <Text
        style={{
          fontSize: 16,
          fontWeight: 'bold',
          color: '#333',
          marginBottom: 4,
        }}
      >
        {item.title}
      </Text>
      <Text style={{ fontSize: 12, color: '#FF8933', marginBottom: 4 }}>
        {item.category}
      </Text>
      <Text style={{ fontSize: 14, color: '#888' }} numberOfLines={2}>
        {item.desc}
      </Text>
    </TouchableOpacity>
  );

  return (
    <Container>
      <SearchHeaderContainer paddingTop={insets.top}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          activeOpacity={0.7}
        >
          <Icon name="chevron-back-outline" size={24} color="#AAAAAA" />
        </TouchableOpacity>
        <SearchInputContainer>
          <Icon name="search-outline" size={28} color="#FF8933" />
          <SearchLabel>검색</SearchLabel>
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
        <View style={{ flex: 1 }}>
          {isSearching || errorMessage ? (
            <AsyncState
              isLoading={isSearching}
              errorMessage={errorMessage}
              onRetry={() => handleSearchSubmit(keyword)}
            />
          ) : searchResults.length === 0 ? (
            <Text
              style={{ textAlign: 'center', marginTop: 50, color: '#AAAAAA' }}
            >
              검색 결과가 없습니다.
            </Text>
          ) : (
            <FlatList
              data={searchResults}
              keyExtractor={item => item.id}
              renderItem={renderSearchResultItem}
              showsVerticalScrollIndicator={false}
            />
          )}
        </View>
      ) : (
        <>
          <SectionContainer>
            <SectionHeader>
              <SectionTitle>최근검색</SectionTitle>
              <TouchableOpacity
                onPress={deleteAllRecentSearches}
                activeOpacity={0.7}
              >
                <DeleteAllText>전체삭제</DeleteAllText>
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
              <SectionTitle>추천 검색어</SectionTitle>
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
