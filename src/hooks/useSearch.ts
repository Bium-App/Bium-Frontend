import {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {searchApi} from '../api/common';
import {getMemoApi} from '../api/memos';
import {getApiErrorMessage} from '../utils/apiError';
import type {EntityId} from '../types/api';
import type {MemoStatus} from '../types/memo';

const RECENT_SEARCH_KEY = '@recent_searches';

export interface RecentSearch {
  id: string;
  text: string;
}

export type SearchResultType = 'MEMO' | 'NOTICE' | 'TODO' | 'SCHEDULE';

export interface SearchResultItem {
  id: string;
  resultType: SearchResultType;
  category: string;
  title: string;
  desc: string;
  targetId: EntityId;
  teamSpaceId?: EntityId | null;
  status?: MemoStatus;
}

const parseRecentSearches = (stored: string): RecentSearch[] => {
  const parsed: unknown = JSON.parse(stored);
  if (!Array.isArray(parsed)) return [];
  return parsed.filter(
    (item): item is RecentSearch =>
      Boolean(item) &&
      typeof item === 'object' &&
      typeof item.id === 'string' &&
      typeof item.text === 'string',
  );
};

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
      const mapped: SearchResultItem[] = [
        ...(data.memos ?? []).map(memo => ({
          id: `memo-${memo.memoId}`,
          resultType: 'MEMO' as const,
          category: '메모',
          title: memo.title,
          desc: memo.content ?? '',
          targetId: memo.memoId,
          status: memo.status,
        })),
        ...(data.notices ?? []).map(notice => ({
          id: `notice-${notice.noticeId}`,
          resultType: 'NOTICE' as const,
          category: '공지',
          title: notice.title,
          desc: notice.content ?? '',
          targetId: notice.noticeId,
          teamSpaceId: notice.teamSpaceId,
        })),
        ...(data.todos ?? []).map(todo => ({
          id: `todo-${todo.todoId}`,
          resultType: 'TODO' as const,
          category: '할 일',
          title: todo.title,
          desc: todo.content ?? todo.dueDate ?? '',
          targetId: todo.todoId,
          teamSpaceId: todo.teamSpaceId,
        })),
        ...(data.schedules ?? []).map(schedule => ({
          id: `schedule-${schedule.scheduleId}`,
          resultType: 'SCHEDULE' as const,
          category: '일정',
          title: schedule.title,
          desc: [schedule.startAt, schedule.endAt].filter(Boolean).join(' ~ '),
          targetId: schedule.scheduleId,
          teamSpaceId: schedule.teamSpaceId,
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
    getMemoDetail: getMemoApi,
  };
};
