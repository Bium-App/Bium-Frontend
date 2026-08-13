import apiClient from './client';
import {parseRootArray} from '../utils/apiResponse';
import type {ApiMutationResponse, EntityId} from '../types/api';
import type {
  CreateInquiryRequest,
  CreateInquiryResponse,
  Inquiry,
  Notification,
  SearchResponse,
  ServiceNotice,
} from '../types/common';

export const searchApi = async (keyword: string): Promise<SearchResponse> => {
  const response = await apiClient.get<SearchResponse>('/api/search', {
    params: {keyword},
  });
  return response.data;
};

export const getServiceNoticesApi = async (): Promise<ServiceNotice[]> => {
  const response = await apiClient.get<unknown>('/api/service-notices');
  return parseRootArray<ServiceNotice>(response.data, '서비스 공지 목록');
};

export const createInquiryApi = async (
  inquiry: CreateInquiryRequest,
): Promise<CreateInquiryResponse> => {
  const response = await apiClient.post<CreateInquiryResponse>(
    '/api/inquiries',
    inquiry,
  );
  return response.data;
};

export const getInquiriesApi = async (): Promise<Inquiry[]> => {
  const response = await apiClient.get<unknown>('/api/inquiries/me');
  return parseRootArray<Inquiry>(response.data, '문의 목록');
};

export const getNotificationsApi = async (): Promise<Notification[]> => {
  const response = await apiClient.get<unknown>('/api/notifications');
  return parseRootArray<Notification>(response.data, '알림 목록');
};

export const readNotificationApi = async (
  notificationId: EntityId,
): Promise<ApiMutationResponse> => {
  const response = await apiClient.patch<ApiMutationResponse>(
    `/api/notifications/${notificationId}/read`,
  );
  return response.data;
};

export const deleteNotificationApi = async (
  notificationId: EntityId,
): Promise<ApiMutationResponse> => {
  const response = await apiClient.delete<ApiMutationResponse>(
    `/api/notifications/${notificationId}`,
  );
  return response.data;
};
