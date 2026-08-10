import {useCallback, useEffect, useRef, useState} from 'react';
import {Alert} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import {
  getReceivedFriendRequestsApi,
  getRecommendedFriendsApi,
  searchFriendsApi,
  sendFriendRequestApi,
} from '../api/friends';
import {
  getApiErrorMessage,
  getApiResponseMessage,
  getErrorMessage,
} from '../utils/apiError';
import type {EntityId} from '../types/api';
import type {FriendUser} from '../types/friend';

export interface FriendListItem {
  id: string;
  name: string;
  profileImageUrl: string | null;
  desc: string;
}

const mapFriend = (friend: FriendUser): FriendListItem => ({
  id: String(friend.userId),
  name: friend.nickname,
  profileImageUrl: friend.profileImageUrl ?? null,
  desc:
    friend.commonProjects === undefined
      ? ''
      : `함께 참여한 프로젝트 ${friend.commonProjects}개`,
});

export const useFriendAdd = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<FriendListItem[]>([]);
  const [recommendedFriends, setRecommendedFriends] = useState<
    FriendListItem[]
  >([]);
  const [requestCount, setRequestCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [initialErrorMessage, setInitialErrorMessage] = useState('');
  const [searchErrorMessage, setSearchErrorMessage] = useState('');
  const searchRequestIdRef = useRef(0);

  const fetchInitialData = useCallback(async (): Promise<void> => {
    setIsLoading(true);
    setInitialErrorMessage('');
    const [recommendedResult, receivedResult] = await Promise.allSettled([
      getRecommendedFriendsApi(),
      getReceivedFriendRequestsApi(),
    ]);

    if (recommendedResult.status === 'fulfilled') {
      setRecommendedFriends(recommendedResult.value.map(mapFriend));
    }
    if (receivedResult.status === 'fulfilled') {
      setRequestCount(receivedResult.value.length);
    }

    const failedResult = [recommendedResult, receivedResult].find(
      result => result.status === 'rejected',
    );
    if (failedResult?.status === 'rejected') {
      setInitialErrorMessage(
        getApiErrorMessage(
          failedResult.reason,
          '일부 친구 정보를 불러오지 못했습니다.',
        ),
      );
    }
    setIsLoading(false);
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchInitialData();
    }, [fetchInitialData]),
  );

  const searchFriends = useCallback(async (keyword: string): Promise<void> => {
    const normalizedKeyword = keyword.trim();
    if (!normalizedKeyword) {
      searchRequestIdRef.current += 1;
      setSearchResults([]);
      setSearchErrorMessage('');
      setIsSearching(false);
      return;
    }

    const requestId = searchRequestIdRef.current + 1;
    searchRequestIdRef.current = requestId;
    setIsSearching(true);
    setSearchErrorMessage('');
    try {
      const result = await searchFriendsApi(normalizedKeyword);
      if (searchRequestIdRef.current === requestId) {
        setSearchResults(result.map(mapFriend));
      }
    } catch (error) {
      if (searchRequestIdRef.current === requestId) {
        setSearchResults([]);
        setSearchErrorMessage(
          getApiErrorMessage(error, '친구를 검색하지 못했습니다.'),
        );
      }
    } finally {
      if (searchRequestIdRef.current === requestId) setIsSearching(false);
    }
  }, []);

  useEffect(() => {
    const keyword = searchQuery.trim();
    searchRequestIdRef.current += 1;
    if (!keyword) {
      setSearchResults([]);
      setSearchErrorMessage('');
      setIsSearching(false);
      return undefined;
    }

    setIsSearching(true);
    setSearchErrorMessage('');
    const timerId = setTimeout(() => searchFriends(keyword), 300);
    return () => {
      clearTimeout(timerId);
      searchRequestIdRef.current += 1;
    };
  }, [searchFriends, searchQuery]);

  const handleAddFriend = async (receiverId: EntityId): Promise<void> => {
    setIsSubmitting(true);
    try {
      await sendFriendRequestApi(receiverId);
      Alert.alert('완료', '친구 요청을 보냈습니다.');
    } catch (error) {
      Alert.alert(
        '요청 실패',
        getApiResponseMessage(error) ??
          getErrorMessage(error) ??
          '친구 요청에 실패했습니다.',
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    searchQuery,
    handleSearch: setSearchQuery,
    searchResults,
    recommendedFriends,
    requestCount,
    isLoading,
    isSearching,
    isSubmitting,
    initialErrorMessage,
    searchErrorMessage,
    fetchInitialData,
    searchFriends,
    handleAddFriend,
  };
};
