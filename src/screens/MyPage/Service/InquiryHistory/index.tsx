import React from 'react';
import type {RootScreenProps} from '../../../../types/navigation';
import { ActivityIndicator, RefreshControl } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import dayjs from 'dayjs';
import Header from '../../../../components/Header';
import { useInquiryHistory } from '../../../../hooks/useInquiryHistory';
import {
  Container,
  ContentScroll,
  EmptyText,
  HeaderBackButton,
  InquiryCard,
  InquiryContent,
  InquiryDate,
  InquiryHeader,
  InquiryStatusText,
  InquiryTitle,
  InquiryTypeText,
  ResponseBox,
  ResponseText,
  ResponseTitle,
} from './InquiryHistory.styles';

const getTypeLabel = (type: string): string =>
  type === 'SUGGESTION' ? '서비스 개선 제안' : '1:1 문의';

const getStatusLabel = (status?: string): string =>
  status === 'ANSWERED' ? '답변 완료' : '답변 대기';

export default function InquiryHistory({navigation}: RootScreenProps<'InquiryHistory'>) {
  const { inquiries, isLoading, fetchInquiries } = useInquiryHistory();

  return (
    <Container>
      <Header
        left={
          <HeaderBackButton
            onPress={() => navigation.goBack()}
            activeOpacity={0.7}
          >
            <Icon name="chevron-back-outline" size={24} color="#FF8933" />
          </HeaderBackButton>
        }
        title="문의 내역"
      />

      <ContentScroll
        refreshControl={
          <RefreshControl
            refreshing={isLoading}
            onRefresh={fetchInquiries}
            tintColor="#FF8933"
          />
        }
      >
        {isLoading && !inquiries.length ? (
          <ActivityIndicator color="#FF8933" />
        ) : null}

        {!isLoading && !inquiries.length ? (
          <EmptyText>등록된 문의가 없습니다.</EmptyText>
        ) : null}

        {inquiries.map(inquiry => (
          <InquiryCard key={String(inquiry.inquiryId)}>
            <InquiryHeader>
              <InquiryTypeText>
                {inquiry.type ? getTypeLabel(inquiry.type) : '문의'}
              </InquiryTypeText>
              <InquiryStatusText isAnswered={inquiry.status === 'ANSWERED'}>
                {getStatusLabel(inquiry.status)}
              </InquiryStatusText>
            </InquiryHeader>
            <InquiryTitle>
              {inquiry.title ?? `문의 #${inquiry.inquiryId}`}
            </InquiryTitle>
            {inquiry.content ? (
              <InquiryContent>{inquiry.content}</InquiryContent>
            ) : null}
            {inquiry.createdAt ? (
              <InquiryDate>
                접수 {dayjs(inquiry.createdAt).format('YYYY.MM.DD HH:mm')}
                {inquiry.updatedAt
                  ? ` · 수정 ${dayjs(inquiry.updatedAt).format(
                      'YYYY.MM.DD HH:mm',
                    )}`
                  : ''}
              </InquiryDate>
            ) : null}
            {inquiry.response ? (
              <ResponseBox>
                <ResponseTitle>답변</ResponseTitle>
                <ResponseText>{inquiry.response}</ResponseText>
              </ResponseBox>
            ) : null}
          </InquiryCard>
        ))}
      </ContentScroll>
    </Container>
  );
}
