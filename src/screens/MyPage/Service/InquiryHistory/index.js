import React from 'react';
import {
  ActivityIndicator,
  RefreshControl,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import dayjs from 'dayjs';
import Header from '../../../../components/Header';
import { useInquiryHistory } from '../../../../hooks/useInquiryHistory';

const getTypeLabel = type =>
  type === 'SUGGESTION' ? '서비스 개선 제안' : '1:1 문의';

const getStatusLabel = status =>
  status === 'ANSWERED' ? '답변 완료' : '답변 대기';

export default function InquiryHistory({ navigation }) {
  const { inquiries, isLoading, fetchInquiries } = useInquiryHistory();

  return (
    <View style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
      <Header
        left={
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            activeOpacity={0.7}
          >
            <Icon name="chevron-back-outline" size={24} color="#FF8933" />
          </TouchableOpacity>
        }
        title="문의 내역"
      />

      <ScrollView
        contentContainerStyle={{ padding: 20, paddingBottom: 40 }}
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
          <Text
            style={{ textAlign: 'center', color: '#999999', marginTop: 40 }}
          >
            등록된 문의가 없습니다.
          </Text>
        ) : null}

        {inquiries.map(inquiry => (
          <View
            key={String(inquiry.inquiryId)}
            style={{
              borderWidth: 1,
              borderColor: '#E8E8E8',
              borderRadius: 12,
              padding: 16,
              marginBottom: 12,
            }}
          >
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginBottom: 10,
              }}
            >
              <Text style={{ color: '#FF8933', fontWeight: '600' }}>
                {getTypeLabel(inquiry.type)}
              </Text>
              <Text
                style={{
                  color: inquiry.status === 'ANSWERED' ? '#248A3D' : '#999999',
                }}
              >
                {getStatusLabel(inquiry.status)}
              </Text>
            </View>
            <Text style={{ fontSize: 16, fontWeight: '600', marginBottom: 8 }}>
              {inquiry.title}
            </Text>
            <Text style={{ color: '#555555', lineHeight: 20 }}>
              {inquiry.content}
            </Text>
            {inquiry.createdAt ? (
              <Text style={{ color: '#999999', fontSize: 12, marginTop: 10 }}>
                접수 {dayjs(inquiry.createdAt).format('YYYY.MM.DD HH:mm')}
                {inquiry.updatedAt
                  ? ` · 수정 ${dayjs(inquiry.updatedAt).format(
                      'YYYY.MM.DD HH:mm',
                    )}`
                  : ''}
              </Text>
            ) : null}
            {inquiry.response ? (
              <View
                style={{
                  backgroundColor: '#FFF4EC',
                  borderRadius: 8,
                  padding: 12,
                  marginTop: 12,
                }}
              >
                <Text style={{ fontWeight: '600', marginBottom: 4 }}>답변</Text>
                <Text style={{ color: '#555555', lineHeight: 20 }}>
                  {inquiry.response}
                </Text>
              </View>
            ) : null}
          </View>
        ))}
      </ScrollView>
    </View>
  );
}
