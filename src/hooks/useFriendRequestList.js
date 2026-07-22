import { useCallback, useMemo, useState } from 'react';
import { Alert } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import dayjs from 'dayjs';
import {
  acceptFriendRequestApi,
  cancelFriendRequestApi,
  getReceivedFriendRequestsApi,
  getSentFriendRequestsApi,
  rejectFriendRequestApi,
} from '../api/friends';
import { getUserId } from '../utils/authStorage';

const mapRequest = request => ({
  id: String(request.requestId),
  handle: String(request.requesterId ?? request.receiverId),
  name: request.nickname,
  desc: request.createdAt
    ? `${dayjs(request.createdAt).format('YYYY.MM.DD HH:mm')} 요청`
    : '친구 요청',
});

export const useFriendRequestList = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [received, setReceived] = useState([]);
  const [sent, setSent] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchRequests = useCallback(async () => {
    setIsLoading(true);
    try {
      const userId = await getUserId();
      if (!userId) return;
      const [receivedData, sentData] = await Promise.all([
        getReceivedFriendRequestsApi(userId),
        getSentFriendRequestsApi(userId),
      ]);
      setReceived(receivedData.map(mapRequest));
      setSent(sentData.map(mapRequest));
    } catch (error) {
      Alert.alert(
        '오류',
        error.response?.data?.message ?? '친구 요청함을 불러오지 못했습니다.',
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchRequests();
    }, [fetchRequests]),
  );

  const runAction = async (action, successMessage) => {
    setIsLoading(true);
    try {
      await action();
      await fetchRequests();
      Alert.alert('완료', successMessage);
    } catch (error) {
      Alert.alert(
        '처리 실패',
        error.response?.data?.message ?? '친구 요청을 처리하지 못했습니다.',
      );
    } finally {
      setIsLoading(false);
    }
  };

  const keyword = searchQuery.trim().toLowerCase();
  const filterRequests = useCallback(
    requests =>
      keyword
        ? requests.filter(request =>
            request.name?.toLowerCase().includes(keyword),
          )
        : requests,
    [keyword],
  );

  const filteredReceived = useMemo(
    () => filterRequests(received),
    [filterRequests, received],
  );
  const filteredSent = useMemo(
    () => filterRequests(sent),
    [filterRequests, sent],
  );

  return {
    searchQuery,
    setSearchQuery,
    filteredReceived,
    filteredSent,
    isLoading,
    handleAccept: requestId =>
      runAction(
        () => acceptFriendRequestApi(requestId),
        '친구 요청을 수락했습니다.',
      ),
    handleReject: requestId =>
      runAction(
        () => rejectFriendRequestApi(requestId),
        '친구 요청을 거절했습니다.',
      ),
    handleCancel: requestId =>
      runAction(
        () => cancelFriendRequestApi(requestId),
        '보낸 요청을 취소했습니다.',
      ),
  };
};
