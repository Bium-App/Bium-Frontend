import {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {searchApi} from '../api/common';
import {getApiErrorMessage} from '../utils/apiError';
import {
  mapSearchResponse,
  parseRecentSearches,
  type RecentSearch,
  type SearchResultItem,
} from '../utils/viewModelMappers';

export type {
  RecentSearch,
  SearchResultItem,
  SearchResultType,
} from '../utils/viewModelMappers';

const RECENT_SEARCH_KEY = '@recent_searches';

export const useSearch = () => {
  const [keyword, setKeyword] = useState('');
  const [recentSearches, setRecentSearches] = useState<RecentSearch[]>([]);
  const [recommendedSearches] = useState<string[]>([
    '발표',
    '회의',
    '독서',
    '아이디어',
    '계획',
    '운동',
    '여행',
    '인사이트',
  ]);
  const [searchResults, setSearchResults] = useState<SearchResultItem[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const loadRecentSearches = async (): Promise<void> => {
      try {
        const saved = await AsyncStorage.getItem(RECENT_SEARCH_KEY);
        if (saved) setRecentSearches(parseRecentSearches(saved));
      } catch (error) {
        console.error('최근 검색어 로드 실패', error);
      }
    };
    loadRecentSearches();
  }, []);

  const addRecentSearch = async (text: string): Promise<void> => {
    if (!text.trim()) return;
    try {
      const newSearch = {id: Date.now().toString(), text};
      const filtered = recentSearches.filter(item => item.text !== text);
      const updated = [newSearch, ...filtered].slice(0, 10);
      setRecentSearches(updated);
      await AsyncStorage.setItem(RECENT_SEARCH_KEY, JSON.stringify(updated));
    } catch (error) {
      console.error('최근 검색어 저장 실패', error);
    }
  };

  const deleteRecentSearch = async (id: string): Promise<void> => {
    try {
      const updated = recentSearches.filter(item => item.id !== id);
      setRecentSearches(updated);
      await AsyncStorage.setItem(RECENT_SEARCH_KEY, JSON.stringify(updated));
    } catch (error) {
      console.error('최근 검색어 삭제 실패', error);
    }
  };

  const deleteAllRecentSearches = async (): Promise<void> => {
    try {
      setRecentSearches([]);
      await AsyncStorage.removeItem(RECENT_SEARCH_KEY);
    } catch (error) {
      console.error('전체 검색어 삭제 실패', error);
    }
  };

  const handleSearchSubmit = async (searchKeyword = ''): Promise<void> => {
    const targetKeyword = searchKeyword || keyword;
    if (!targetKeyword.trim()) return;

    addRecentSearch(targetKeyword);
    setKeyword(targetKeyword);
    setHasSearched(true);
    setIsSearching(true);
    setErrorMessage('');

    try {
      const data = await searchApi(targetKeyword);
      setSearchResults(mapSearchResponse(data));
    } catch (error) {
      setSearchResults([]);
      setErrorMessage(
        getApiErrorMessage(error, '검색 결과를 불러오지 못했습니다.'),
      );
    } finally {
      setIsSearching(false);
    }
  };

  const clearSearch = (): void => {
    setKeyword('');
    setHasSearched(false);
    setSearchResults([]);
    setErrorMessage('');
  };

  return {
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
  };
};
