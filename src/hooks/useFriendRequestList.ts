import {useCallback, useMemo, useState} from 'react';
import {Alert} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import dayjs from 'dayjs';
import {
  acceptFriendRequestApi,
  cancelFriendRequestApi,
  getReceivedFriendRequestsApi,
  getSentFriendRequestsApi,
  rejectFriendRequestApi,
} from '../api/friends';
import {getApiErrorMessage, getApiResponseMessage} from '../utils/apiError';
import type {EntityId} from '../types/api';
import type {FriendRequest} from '../types/friend';

export interface FriendRequestListItem {
  id: string;
  handle: string;
  name: string;
  desc: string;
}

const mapRequest = (request: FriendRequest): FriendRequestListItem => ({
  id: String(request.requestId),
  handle: String(
    request.requesterId ?? request.receiverId ?? request.requestId,
  ),
  name: request.nickname ?? '',
  desc: request.createdAt
    ? `${dayjs(request.createdAt).format('YYYY.MM.DD HH:mm')} 요청`
    : '친구 요청',
});

export const useFriendRequestList = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [received, setReceived] = useState<FriendRequestListItem[]>([]);
  const [sent, setSent] = useState<FriendRequestListItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [receivedErrorMessage, setReceivedErrorMessage] = useState('');
  const [sentErrorMessage, setSentErrorMessage] = useState('');

  const fetchRequests = useCallback(async (): Promise<void> => {
    setIsLoading(true);
    setReceivedErrorMessage('');
    setSentErrorMessage('');
    const [receivedResult, sentResult] = await Promise.allSettled([
      getReceivedFriendRequestsApi(),
      getSentFriendRequestsApi(),
    ]);

    if (receivedResult.status === 'fulfilled') {
      setReceived(receivedResult.value.map(mapRequest));
    } else {
      setReceivedErrorMessage(
        getApiErrorMessage(
          receivedResult.reason,
          '받은 친구 요청을 불러오지 못했습니다.',
        ),
      );
    }
    if (sentResult.status === 'fulfilled') {
      setSent(sentResult.value.map(mapRequest));
    } else {
      setSentErrorMessage(
        getApiErrorMessage(
          sentResult.reason,
          '보낸 친구 요청을 불러오지 못했습니다.',
        ),
      );
    }
    setIsLoading(false);
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchRequests();
    }, [fetchRequests]),
  );

  const runAction = async (
    action: () => Promise<unknown>,
    successMessage: string,
  ): Promise<void> => {
    setIsProcessing(true);
    try {
      await action();
      await fetchRequests();
      Alert.alert('완료', successMessage);
    } catch (error) {
      Alert.alert(
        '처리 실패',
        getApiResponseMessage(error) ??
          '친구 요청을 처리하지 못했습니다.',
      );
    } finally {
      setIsProcessing(false);
    }
  };

  const keyword = searchQuery.trim().toLowerCase();
  const filterRequests = useCallback(
    (requests: FriendRequestListItem[]) =>
      keyword
        ? requests.filter(request =>
            request.name.toLowerCase().includes(keyword),
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
    receivedErrorMessage,
    sentErrorMessage,
    fetchRequests,
    hasRequests: received.length > 0 || sent.length > 0,
    handleAccept: (requestId: EntityId) =>
      runAction(
        () => acceptFriendRequestApi(requestId),
        '친구 요청을 수락했습니다.',
      ),
    handleReject: (requestId: EntityId) =>
      runAction(
        () => rejectFriendRequestApi(requestId),
        '친구 요청을 거절했습니다.',
      ),
    handleCancel: (requestId: EntityId) =>
      runAction(
        () => cancelFriendRequestApi(requestId),
        '보낸 요청을 취소했습니다.',
      ),
  };
};
