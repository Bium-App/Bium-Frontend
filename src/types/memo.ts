import type {ApiMutationResponse, EntityId} from './api';

export type MemoStatus = 'FIRE' | 'ICE';

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
  imageUrls?: string[];
  updatedAt?: string;
}

export interface CreateMemoRequest {
  teamSpaceId: EntityId | null;
  title: string;
  content: string;
  expiredAt: string | null;
  status: MemoStatus;
}

export interface UpdateMemoRequest {
  title: string;
  content: string;
}

export interface TrashMemo extends MemoSummary {
  deletedAt: string;
}

export type MemoMutationResponse = ApiMutationResponse &
  Partial<Pick<MemoDetail, 'memoId' | 'title' | 'content'>> & {
    id?: EntityId;
  };
