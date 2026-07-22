import { useCallback, useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import {
  getReceivedFriendRequestsApi,
  getRecommendedFriendsApi,
  searchFriendsApi,
  sendFriendRequestApi,
} from '../api/friends';
import { getUserId } from '../utils/authStorage';

const mapFriend = friend => ({
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
  const [searchResults, setSearchResults] = useState([]);
  const [recommendedFriends, setRecommendedFriends] = useState([]);
  const [requestCount, setRequestCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const fetchInitialData = useCallback(async () => {
    setIsLoading(true);
    try {
      const userId = await getUserId();
      if (!userId) return;
      const [recommended, received] = await Promise.all([
        getRecommendedFriendsApi(userId),
        getReceivedFriendRequestsApi(userId),
      ]);
      setRecommendedFriends(recommended.map(mapFriend));
      setRequestCount(received.length);
    } catch (error) {
      Alert.alert(
        '오류',
        error.response?.data?.message ?? '친구 정보를 불러오지 못했습니다.',
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchInitialData();
    }, [fetchInitialData]),
  );

  useEffect(() => {
    const keyword = searchQuery.trim();
    if (!keyword) {
      setSearchResults([]);
      return undefined;
    }

    const timerId = setTimeout(async () => {
      try {
        const result = await searchFriendsApi(keyword);
        setSearchResults(result.map(mapFriend));
      } catch (error) {
        Alert.alert(
          '검색 실패',
          error.response?.data?.message ?? '친구를 검색하지 못했습니다.',
        );
      }
    }, 300);

    return () => clearTimeout(timerId);
  }, [searchQuery]);

  const handleAddFriend = async receiverId => {
    setIsLoading(true);
    try {
      const requesterId = await getUserId();
      if (!requesterId) throw new Error('사용자 정보를 찾을 수 없습니다.');
      await sendFriendRequestApi({ requesterId, receiverId });
      Alert.alert('완료', '친구 요청을 보냈습니다.');
    } catch (error) {
      Alert.alert(
        '요청 실패',
        error.response?.data?.message ??
          error.message ??
          '친구 요청에 실패했습니다.',
      );
    } finally {
      setIsLoading(false);
    }
  };

  return {
    searchQuery,
    handleSearch: setSearchQuery,
    searchResults,
    recommendedFriends,
    requestCount,
    isLoading,
    handleAddFriend,
  };
};
