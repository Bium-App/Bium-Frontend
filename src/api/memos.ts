import apiClient from './client';
import {parseRootArray} from '../utils/apiResponse';
import type {ApiMutationResponse, EntityId} from '../types/api';
import type {
  CreateMemoRequest,
  CreateMemoResponse,
  MemoDetail,
  MemoMutationResponse,
  MemoStatus,
  MemoSummary,
  TrashMemo,
  UpdateMemoRequest,
} from '../types/memo';

export const createMemoApi = async (
  memo: CreateMemoRequest,
): Promise<CreateMemoResponse> => {
  const response = await apiClient.post<CreateMemoResponse>(
    '/api/memos',
    memo,
  );
  return response.data;
};

export const getUserMemosApi = async (): Promise<MemoSummary[]> => {
  const response = await apiClient.get<unknown>('/api/memos');
  return parseRootArray<MemoSummary>(response.data, '메모 목록');
};

export const getMemoApi = async (memoId: EntityId): Promise<MemoDetail> => {
  const response = await apiClient.get<MemoDetail>(`/api/memos/${memoId}`);
  return response.data;
};

export const getTeamMemosApi = async (
  teamSpaceId: EntityId,
): Promise<MemoSummary[]> => {
  const response = await apiClient.get<unknown>('/api/memos', {
    params: {teamSpaceId},
  });
  return parseRootArray<MemoSummary>(response.data, '팀 메모 목록');
};

export const updateMemoApi = async (
  memoId: EntityId,
  {title, content, richContent}: UpdateMemoRequest,
): Promise<MemoMutationResponse> => {
  const payload =
    richContent === undefined
      ? {title, content}
      : {title, content, richContent};
  const response = await apiClient.patch<MemoMutationResponse>(
    `/api/memos/${memoId}`,
    payload,
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
  const response = await apiClient.get<unknown>('/api/trash');
  return parseRootArray<TrashMemo>(response.data, '휴지통 목록');
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
