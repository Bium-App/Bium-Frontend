import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { searchApi } from '../api/common';
import { getApiErrorMessage } from '../utils/apiError';

const RECENT_SEARCH_KEY = '@recent_searches';

export const useSearch = () => {
  const [keyword, setKeyword] = useState('');
  const [recentSearches, setRecentSearches] = useState([]);
  const [recommendedSearches] = useState([
    '발표',
    '회의',
    '독서',
    '아이디어',
    '계획',
    '운동',
    '여행',
    '인사이트',
  ]);
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    loadRecentSearches();
  }, []);

  const loadRecentSearches = async () => {
    try {
      const saved = await AsyncStorage.getItem(RECENT_SEARCH_KEY);
      if (saved) {
        setRecentSearches(JSON.parse(saved));
      }
    } catch (error) {
      console.error('최근 검색어 로드 실패', error);
    }
  };

  const addRecentSearch = async text => {
    if (!text.trim()) return;
    try {
      const newSearch = { id: Date.now().toString(), text };
      const filtered = recentSearches.filter(item => item.text !== text);
      const updated = [newSearch, ...filtered].slice(0, 10);

      setRecentSearches(updated);
      await AsyncStorage.setItem(RECENT_SEARCH_KEY, JSON.stringify(updated));
    } catch (error) {
      console.error('최근 검색어 저장 실패', error);
    }
  };

  const deleteRecentSearch = async id => {
    try {
      const updated = recentSearches.filter(item => item.id !== id);
      setRecentSearches(updated);
      await AsyncStorage.setItem(RECENT_SEARCH_KEY, JSON.stringify(updated));
    } catch (error) {
      console.error('최근 검색어 삭제 실패', error);
    }
  };

  const deleteAllRecentSearches = async () => {
    try {
      setRecentSearches([]);
      await AsyncStorage.removeItem(RECENT_SEARCH_KEY);
    } catch (error) {
      console.error('전체 검색어 삭제 실패', error);
    }
  };

  const handleSearchSubmit = async searchKeyword => {
    const targetKeyword = searchKeyword || keyword;
    if (!targetKeyword.trim()) return;

    addRecentSearch(targetKeyword);
    setKeyword(targetKeyword);
    setHasSearched(true); // 검색 결과 화면으로 전환
    setIsSearching(true);
    setErrorMessage('');

    try {
      const data = await searchApi(targetKeyword);

      const mapped = [
        ...(data.memos ?? []).map(memo => ({
          id: `memo-${memo.memoId}`,
          resultType: 'MEMO',
          category: '메모',
          title: memo.title,
          desc: memo.content ?? '',
          targetId: memo.memoId,
          status: memo.status,
        })),
        ...(data.notices ?? []).map(notice => ({
          id: `notice-${notice.noticeId}`,
          resultType: 'NOTICE',
          category: '공지',
          title: notice.title,
          desc: notice.content ?? '',
          targetId: notice.noticeId,
        })),
        ...(data.todos ?? []).map(todo => ({
          id: `todo-${todo.todoId}`,
          resultType: 'TODO',
          category: '할 일',
          title: todo.title,
          desc: todo.content ?? todo.dueDate ?? '',
          targetId: todo.todoId,
        })),
        ...(data.schedules ?? []).map(schedule => ({
          id: `schedule-${schedule.scheduleId}`,
          resultType: 'SCHEDULE',
          category: '일정',
          title: schedule.title,
          desc: schedule.scheduleDate ?? '',
          targetId: schedule.scheduleId,
        })),
      ];

      setSearchResults(mapped);
    } catch (error) {
      setSearchResults([]);
      setErrorMessage(
        getApiErrorMessage(error, '검색 결과를 불러오지 못했습니다.'),
      );
    } finally {
      setIsSearching(false);
    }
  };

  // 검색창의 텍스트가 모두 지워졌을 때 기본 화면으로 복구
  const clearSearch = () => {
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
