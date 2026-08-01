import apiClient from './client';
import type {ApiMutationResponse, EntityId} from '../types/api';
import type {
  CreateMemoRequest,
  MemoDetail,
  MemoMutationResponse,
  MemoStatus,
  MemoSummary,
  TrashMemo,
  UpdateMemoRequest,
} from '../types/memo';

export const createMemoApi = async (
  memo: CreateMemoRequest,
): Promise<MemoMutationResponse> => {
  const response = await apiClient.post<MemoMutationResponse>(
    '/api/memos',
    memo,
  );
  return response.data;
};

export const getUserMemosApi = async (): Promise<MemoSummary[]> => {
  const response = await apiClient.get<MemoSummary[]>('/api/memos');
  return response.data;
};

export const getMemoApi = async (memoId: EntityId): Promise<MemoDetail> => {
  const response = await apiClient.get<MemoDetail>(`/api/memos/${memoId}`);
  return response.data;
};

export const getTeamMemosApi = async (
  teamSpaceId: EntityId,
): Promise<MemoSummary[]> => {
  const response = await apiClient.get<MemoSummary[]>('/api/memos', {
    params: {teamSpaceId},
  });
  return response.data;
};

export const updateMemoApi = async (
  memoId: EntityId,
  {title, content}: UpdateMemoRequest,
): Promise<MemoMutationResponse> => {
  const response = await apiClient.patch<MemoMutationResponse>(
    `/api/memos/${memoId}`,
    {title, content},
  );
  return response.data;
};

export const updateMemoStatusApi = async (
  memoId: EntityId,
  status: MemoStatus,
): Promise<ApiMutationResponse> => {
  const response = await apiClient.patch<ApiMutationResponse>(
    `/api/memos/${memoId}/status`,
    null,
    {params: {action: 'STATUS', value: status}},
  );
  return response.data;
};

export const updateMemoPinApi = async (
  memoId: EntityId,
  isPinned: boolean,
): Promise<ApiMutationResponse> => {
  const response = await apiClient.patch<ApiMutationResponse>(
    `/api/memos/${memoId}/status`,
    null,
    {params: {action: 'PIN', value: String(isPinned)}},
  );
  return response.data;
};

export const moveMemoToTrashApi = async (
  memoId: EntityId,
): Promise<ApiMutationResponse> => {
  const response = await apiClient.delete<ApiMutationResponse>(
    `/api/memos/${memoId}`,
  );
  return response.data;
};

export const getTrashMemosApi = async (): Promise<TrashMemo[]> => {
  const response = await apiClient.get<TrashMemo[]>('/api/trash');
  return response.data;
};

export const restoreMemoApi = async (
  memoId: EntityId,
): Promise<ApiMutationResponse> => {
  const response = await apiClient.patch<ApiMutationResponse>(
    `/api/trash/${memoId}/restore`,
  );
  return response.data;
};

export const deleteTrashMemosApi = async (
  memoIds: EntityId[],
): Promise<ApiMutationResponse> => {
  const response = await apiClient.delete<ApiMutationResponse>('/api/trash', {
    data: {memoIds},
  });
  return response.data;
};
