import apiClient from './client';
import type {ApiMutationResponse, EntityId} from '../types/api';
import type {
  CreateInquiryRequest,
  Inquiry,
  InquiryMutationResponse,
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
  const response = await apiClient.get<ServiceNotice[]>('/api/service-notices');
  return response.data;
};

export const createInquiryApi = async (
  inquiry: CreateInquiryRequest,
): Promise<InquiryMutationResponse> => {
  const response = await apiClient.post<InquiryMutationResponse>(
    '/api/inquiries',
    inquiry,
  );
  return response.data;
};

export const getInquiriesApi = async (): Promise<Inquiry[]> => {
  const response = await apiClient.get<Inquiry[]>('/api/inquiries/me');
  return response.data;
};

export const getNotificationsApi = async (): Promise<Notification[]> => {
  const response = await apiClient.get<Notification[]>('/api/notifications');
  return response.data;
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
