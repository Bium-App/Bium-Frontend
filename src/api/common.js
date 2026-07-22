import apiClient from './client';

export const searchApi = async keyword => {
  const response = await apiClient.get('/api/search', { params: { keyword } });
  return response.data;
};

export const createInquiryApi = async (userId, inquiry) => {
  const response = await apiClient.post(`/api/inquiries/user/${userId}`, inquiry);
  return response.data;
};

export const getInquiriesApi = async userId => {
  const response = await apiClient.get(`/api/inquiries/user/${userId}`);
  return response.data;
};

export const getNotificationsApi = async userId => {
  const response = await apiClient.get(`/api/notifications/user/${userId}`);
  return response.data;
};

export const readNotificationApi = async notificationId => {
  const response = await apiClient.patch(`/api/notifications/${notificationId}/read`);
  return response.data;
};

export const deleteNotificationApi = async notificationId => {
  const response = await apiClient.delete(`/api/notifications/${notificationId}`);
  return response.data;
};
