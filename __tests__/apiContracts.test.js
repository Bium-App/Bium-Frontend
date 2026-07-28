jest.mock('../src/api/client', () => ({
  __esModule: true,
  default: {
    get: jest.fn(),
    post: jest.fn(),
    patch: jest.fn(),
    delete: jest.fn(),
  },
}));

import apiClient from '../src/api/client';
import {
  findAccountApi,
  getDevicesApi,
  logoutApi,
  logoutDeviceApi,
  signUpApi,
  twoFactorApi,
  verifyPasswordApi,
} from '../src/api/auth';
import {
  deleteUserApi,
  getUserApi,
  getUserSettingsApi,
  updateUserApi,
  updateUserSettingsApi,
} from '../src/api/users';
import {
  createMemoApi,
  deleteTrashMemosApi,
  getTeamMemosApi,
  getTrashMemosApi,
  getUserMemosApi,
  restoreMemoApi,
  updateMemoPinApi,
  updateMemoStatusApi,
} from '../src/api/memos';
import {
  acceptFriendRequestApi,
  getRecommendedFriendsApi,
  getSentFriendRequestsApi,
  searchFriendsApi,
  sendFriendRequestApi,
} from '../src/api/friends';
import {
  addTeamMemberApi,
  createTeamTodoApi,
  getTeamNoticesApi,
  getTeamTodoApi,
  getTeamTodosApi,
  toggleTeamTodoApi,
} from '../src/api/teamSpaces';
import {
  createScheduleApi,
  getScheduleApi,
  getSchedulesApi,
  updateScheduleApi,
} from '../src/api/schedules';
import {
  createInquiryApi,
  getInquiriesApi,
  getNotificationsApi,
  getServiceNoticesApi,
  readNotificationApi,
} from '../src/api/common';
import {
  addMemoImageApi,
  createTeamFileApi,
  getPresignedUrlApi,
  getTeamFilesApi,
} from '../src/api/files';

beforeEach(() => {
  jest.clearAllMocks();
  Object.values(apiClient).forEach(method =>
    method.mockResolvedValue({ data: {} }),
  );
});

test('7/28 인증·기기 계약을 사용한다', async () => {
  await signUpApi({
    loginId: 'blaze',
    password: 'pw',
    name: '홍길동',
    nickname: '불꽃',
    email: 'blaze@example.com',
    phoneNumber: '01012345678',
  });
  expect(apiClient.post).toHaveBeenCalledWith('/api/auth/signup', {
    loginId: 'blaze',
    password: 'pw',
    name: '홍길동',
    nickname: '불꽃',
    email: 'blaze@example.com',
    phoneNumber: '01012345678',
    provider: 'LOCAL',
  });

  await findAccountApi({ type: 'PW', email: 'user@example.com' });
  await verifyPasswordApi('pw');
  await twoFactorApi({ action: 'VERIFY', phoneNumber: '010', code: '123456' });
  await logoutApi('ALL');
  await getDevicesApi();
  await logoutDeviceApi(3);

  expect(apiClient.post).toHaveBeenCalledWith('/api/auth/find', {
    type: 'PW',
    email: 'user@example.com',
  });
  expect(apiClient.post).toHaveBeenCalledWith('/api/auth/verify-password', {
    password: 'pw',
  });
  expect(apiClient.post).toHaveBeenCalledWith('/api/auth/2fa', {
    action: 'VERIFY',
    phoneNumber: '010',
    code: '123456',
  });
  expect(apiClient.post).toHaveBeenCalledWith('/api/auth/logout', null, {
    params: { type: 'ALL' },
  });
  expect(apiClient.get).toHaveBeenCalledWith('/api/auth/devices');
  expect(apiClient.delete).toHaveBeenCalledWith('/api/auth/devices/3');
});

test('사용자 API는 토큰 기반 me 경로를 사용한다', async () => {
  await getUserApi();
  await getUserSettingsApi();
  await updateUserApi({ nickname: '불꽃', profileImageUrl: 'https://image' });
  await updateUserSettingsApi({
    timezone: 'Asia/Seoul',
    dateFormat: 'YYYY-MM-DD',
    language: 'ko-KR',
    use2fa: true,
    allowPush: true,
    allowEvent: false,
  });
  await deleteUserApi();

  expect(apiClient.get).toHaveBeenCalledWith('/api/users/me');
  expect(apiClient.get).toHaveBeenCalledWith('/api/users/me/settings');
  expect(apiClient.patch).toHaveBeenCalledWith('/api/users/me', {
    nickname: '불꽃',
    profileImageUrl: 'https://image',
  });
  expect(apiClient.patch).toHaveBeenCalledWith('/api/users/me/settings', {
    timezone: 'Asia/Seoul',
    dateFormat: 'YYYY-MM-DD',
    language: 'ko-KR',
    use2fa: true,
    allowPush: true,
    allowEvent: false,
  });
  expect(apiClient.delete).toHaveBeenCalledWith('/api/users/me');
});

test('메모와 휴지통 API는 7/28 통합 경로와 문자열 PIN을 사용한다', async () => {
  await createMemoApi({
    teamSpaceId: null,
    title: '제목',
    content: '내용',
    expiredAt: '2026-07-24T10:00:00',
    status: 'FIRE',
  });
  await getUserMemosApi();
  await getTeamMemosApi(9);
  await updateMemoStatusApi(1, 'ICE');
  await updateMemoPinApi(1, true);
  await getTrashMemosApi();
  await restoreMemoApi(1);
  await deleteTrashMemosApi([1, 2]);

  expect(apiClient.post).toHaveBeenCalledWith('/api/memos', {
    teamSpaceId: null,
    title: '제목',
    content: '내용',
    expiredAt: '2026-07-24T10:00:00',
    status: 'FIRE',
  });
  expect(apiClient.get).toHaveBeenCalledWith('/api/memos');
  expect(apiClient.get).toHaveBeenCalledWith('/api/memos', {
    params: { teamSpaceId: 9 },
  });
  expect(apiClient.patch).toHaveBeenCalledWith('/api/memos/1/status', null, {
    params: { action: 'STATUS', value: 'ICE' },
  });
  expect(apiClient.patch).toHaveBeenCalledWith('/api/memos/1/status', null, {
    params: { action: 'PIN', value: 'true' },
  });
  expect(apiClient.get).toHaveBeenCalledWith('/api/trash');
  expect(apiClient.patch).toHaveBeenCalledWith('/api/trash/1/restore');
  expect(apiClient.delete).toHaveBeenCalledWith('/api/trash', {
    data: { memoIds: [1, 2] },
  });
});

test('친구 API는 type과 action 쿼리를 사용한다', async () => {
  await searchFriendsApi('친구');
  await getRecommendedFriendsApi();
  await getSentFriendRequestsApi();
  await sendFriendRequestApi(7);
  await acceptFriendRequestApi(4);

  expect(apiClient.get).toHaveBeenCalledWith('/api/friends', {
    params: { type: 'SEARCH', keyword: '친구' },
  });
  expect(apiClient.get).toHaveBeenCalledWith('/api/friends', {
    params: { type: 'RECOMMEND' },
  });
  expect(apiClient.get).toHaveBeenCalledWith('/api/friends/requests', {
    params: { type: 'SENT' },
  });
  expect(apiClient.post).toHaveBeenCalledWith('/api/friends/requests', {
    receiverId: 7,
  });
  expect(apiClient.patch).toHaveBeenCalledWith(
    '/api/friends/requests/4',
    null,
    {
      params: { action: 'ACCEPT' },
    },
  );
});

test('팀 공지와 할 일은 7/28 목록·상세·전체 수정 계약을 사용한다', async () => {
  await addTeamMemberApi(2, 8);
  await getTeamNoticesApi(2);
  await createTeamTodoApi(2, { title: '할 일' });
  await getTeamTodosApi(2);
  await getTeamTodoApi(5);
  await toggleTeamTodoApi(5, {
    title: '할 일',
    content: '내용',
    dueDate: '2026-07-25',
    isChecked: true,
    sendPush: false,
  });

  expect(apiClient.post).toHaveBeenCalledWith('/api/team-spaces/2/members', {
    userId: 8,
    role: 'MEMBER',
  });
  expect(apiClient.get).toHaveBeenCalledWith('/api/notices', {
    params: { teamSpaceId: 2 },
  });
  expect(apiClient.post).toHaveBeenCalledWith('/api/team-spaces/2/todos', {
    title: '할 일',
  });
  expect(apiClient.get).toHaveBeenCalledWith('/api/todos', {
    params: { teamSpaceId: 2 },
  });
  expect(apiClient.get).toHaveBeenCalledWith('/api/todos/5');
  expect(apiClient.patch).toHaveBeenCalledWith('/api/todos/5', {
    title: '할 일',
    content: '내용',
    dueDate: '2026-07-25',
    isChecked: true,
    sendPush: false,
  });
});

test('일정·문의·공지·알림은 7/28 통합 계약을 사용한다', async () => {
  const schedule = {
    teamSpaceId: 2,
    title: '회의',
    content: '주간 회의',
    startAt: '2026-07-23T10:00:00',
    endAt: '2026-07-23T11:00:00',
  };
  await createScheduleApi(schedule);
  await getSchedulesApi({ year: 2026, month: 7, teamSpaceId: 2 });
  await getScheduleApi(3);
  await updateScheduleApi(3, {
    title: schedule.title,
    content: schedule.content,
    startAt: schedule.startAt,
    endAt: schedule.endAt,
  });
  await createInquiryApi({
    type: 'ONE_ON_ONE',
    title: '문의',
    content: '내용',
    attachmentUrl: null,
  });
  await getInquiriesApi();
  await getServiceNoticesApi();
  await getNotificationsApi();
  await readNotificationApi(4);

  expect(apiClient.post).toHaveBeenCalledWith('/api/schedules', schedule);
  expect(apiClient.get).toHaveBeenCalledWith('/api/schedules', {
    params: { year: 2026, month: 7, teamSpaceId: 2 },
  });
  expect(apiClient.get).toHaveBeenCalledWith('/api/schedules/3');
  expect(apiClient.patch).toHaveBeenCalledWith('/api/schedules/3', {
    title: schedule.title,
    content: schedule.content,
    startAt: schedule.startAt,
    endAt: schedule.endAt,
  });
  expect(apiClient.post).toHaveBeenCalledWith('/api/inquiries', {
    type: 'ONE_ON_ONE',
    title: '문의',
    content: '내용',
    attachmentUrl: null,
  });
  expect(apiClient.get).toHaveBeenCalledWith('/api/inquiries/me');
  expect(apiClient.get).toHaveBeenCalledWith('/api/service-notices');
  expect(apiClient.get).toHaveBeenCalledWith('/api/notifications');
  expect(apiClient.patch).toHaveBeenCalledWith('/api/notifications/4/read');
});

test('Presigned URL과 메타데이터 API는 domain·fileType 계약을 사용한다', async () => {
  await getPresignedUrlApi({
    domain: 'MEMO',
    fileName: 'photo.jpg',
    fileType: 'image/jpeg',
  });
  await getPresignedUrlApi({
    domain: 'INQUIRY',
    fileName: 'inquiry.jpg',
    fileType: 'image/jpeg',
  });
  await addMemoImageApi(1, 'https://image');
  await createTeamFileApi(2, {
    fileName: 'file.pdf',
    fileUrl: 'https://file',
    fileSize: '1.0 MB',
  });
  await getTeamFilesApi(2);

  expect(apiClient.get).toHaveBeenCalledWith('/api/files/presigned-url', {
    params: {
      fileName: 'photo.jpg',
      fileType: 'image/jpeg',
      domain: 'MEMO',
    },
  });
  expect(apiClient.get).toHaveBeenCalledWith('/api/files/presigned-url', {
    params: {
      fileName: 'inquiry.jpg',
      fileType: 'image/jpeg',
      domain: 'INQUIRY',
    },
  });
  expect(apiClient.post).toHaveBeenCalledWith('/api/memos/1/images', {
    imageUrl: 'https://image',
  });
  expect(apiClient.post).toHaveBeenCalledWith('/api/team-spaces/2/files', {
    fileName: 'file.pdf',
    fileUrl: 'https://file',
    fileSize: '1.0 MB',
  });
  expect(apiClient.get).toHaveBeenCalledWith('/api/team-spaces/2/files');
});
