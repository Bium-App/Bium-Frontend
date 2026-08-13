import type {ApiMutationResponse, EntityId} from './api';
import type {JSONContent} from '@tiptap/core';

export type MemoStatus = 'FIRE' | 'ICE';

export type MemoRichContent = JSONContent & {version: 1};

export interface MemoSummary {
  memoId: EntityId;
  title: string;
  content?: string | null;
  status: MemoStatus;
  isPinned: boolean;
  expiredAt?: string | null;
  createdAt?: string;
  teamSpaceId?: EntityId | null;
}

export interface MemoDetail extends MemoSummary {
  content: string;
  richContent?: MemoRichContent | null;
  imageUrls?: string[];
  updatedAt?: string;
}

export interface CreateMemoRequest {
  teamSpaceId: EntityId | null;
  title: string;
  content: string;
  richContent?: MemoRichContent | null;
  expiredAt: string | null;
  status: MemoStatus;
}

export interface UpdateMemoRequest {
  title: string;
  content: string;
  richContent?: MemoRichContent | null;
}

export interface CreateMemoResponse {
  memoId: EntityId;
}

export interface TrashMemo extends MemoSummary {
  deletedAt: string;
}

export type MemoMutationResponse = ApiMutationResponse &
  Partial<Pick<MemoDetail, 'memoId' | 'title' | 'content' | 'richContent'>> & {
    id?: EntityId;
  };
