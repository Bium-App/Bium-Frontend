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
import { getApiErrorMessage } from '../utils/apiError';

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
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const fetchRequests = useCallback(async () => {
    setIsLoading(true);
    setErrorMessage('');
    try {
      const userId = await getUserId();
      if (!userId) {
        setErrorMessage('로그인 정보를 찾을 수 없습니다. 다시 로그인해주세요.');
        return;
      }
      const [receivedData, sentData] = await Promise.all([
        getReceivedFriendRequestsApi(userId),
        getSentFriendRequestsApi(userId),
      ]);
      setReceived(receivedData.map(mapRequest));
      setSent(sentData.map(mapRequest));
    } catch (error) {
      setErrorMessage(
        getApiErrorMessage(error, '친구 요청함을 불러오지 못했습니다.'),
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
    setIsProcessing(true);
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
      setIsProcessing(false);
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
    isProcessing,
    errorMessage,
    fetchRequests,
    hasRequests: received.length > 0 || sent.length > 0,
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
