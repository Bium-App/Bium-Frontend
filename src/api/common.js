import apiClient from './client';

export const searchApi = async keyword => {
  const response = await apiClient.get('/api/search', { params: { keyword } });
  return response.data;
};

export const getServiceNoticesApi = async () => {
  const response = await apiClient.get('/api/service-notices');
  return response.data;
};

export const createInquiryApi = async inquiry => {
  const response = await apiClient.post('/api/inquiries', inquiry);
  return response.data;
};

export const getInquiriesApi = async () => {
  const response = await apiClient.get('/api/inquiries/me');
  return response.data;
};

export const getNotificationsApi = async () => {
  const response = await apiClient.get('/api/notifications');
  return response.data;
};

export const readNotificationApi = async notificationId => {
  const response = await apiClient.patch(
    `/api/notifications/${notificationId}/read`,
  );
  return response.data;
};

export const deleteNotificationApi = async notificationId => {
  const response = await apiClient.delete(
    `/api/notifications/${notificationId}`,
  );
  return response.data;
};
