import React from 'react';
import type {RootScreenProps} from '../../../../types/navigation';
import { Alert, RefreshControl, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import dayjs from 'dayjs';
import Header from '../../../../components/Header';
import AsyncState from '../../../../components/AsyncState';
import { useServiceNotices } from '../../../../hooks/useServiceNotices';

import {
  Container,
  NoticeList,
  NoticeItem,
  NoticeTitle,
  NoticeDate,
} from './Notice.styles';

// 공지사항 화면. 공지 목록을 보여주고 항목을 누르면 상세 내용을 Alert로 표시한다.
export default function Notice({navigation}: RootScreenProps<'Notice'>) {
  const { notices, isLoading, errorMessage, fetchNotices } =
    useServiceNotices();

  return (
    <Container>
      <Header
        left={
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            activeOpacity={0.7}
          >
            <Icon name="chevron-back-outline" size={24} color="#FF8933" />
          </TouchableOpacity>
        }
        title="공지사항"
      />
      <NoticeList
        data={notices}
        keyExtractor={item => String(item.noticeId)}
        renderItem={({ item }) => (
          <NoticeItem
            activeOpacity={0.7}
            onPress={() =>
              Alert.alert(
                item.title,
                item.content ?? '공지 상세 내용이 없습니다.',
              )
            }
          >
            <NoticeTitle>{item.title}</NoticeTitle>
            <NoticeDate>
              {item.createdAt ? dayjs(item.createdAt).format('YYYY.MM.DD') : ''}
            </NoticeDate>
          </NoticeItem>
        )}
        refreshControl={
          <RefreshControl
            refreshing={isLoading}
            onRefresh={fetchNotices}
            tintColor="#FF8933"
          />
        }
        ListEmptyComponent={
          <AsyncState
            isLoading={isLoading}
            errorMessage={errorMessage}
            emptyMessage="등록된 공지사항이 없습니다."
            onRetry={fetchNotices}
          />
        }
      />
    </Container>
  );
}
