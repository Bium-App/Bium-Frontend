import type {ApiMutationResponse, EntityId} from './api';
import type {MemoImage} from './file';
import type {JSONContent} from '@tiptap/core';

// FIRE는 만료 시각(expiredAt)이 지나면 TRASH로 이동하는 상태, ICE는 만료 없이 장기 보관하는 상태다.
export type MemoStatus = 'FIRE' | 'ICE';

export type MemoRichDocument = JSONContent & {version: 1};
export type MemoRichContent = string;

export interface MemoSummary {
  memoId: EntityId;
  title: string;
  content?: string | null;
  status: MemoStatus;
  // 상단 고정은 ICE 메모에만 허용된다.
  isPinned: boolean;
  // FIRE 메모가 TRASH로 이동하는 기준 시각이다.
  expiredAt?: string | null;
  createdAt?: string;
  // null이면 개인 메모, 값이 있으면 해당 팀스페이스에 속한 메모다.
  teamSpaceId?: EntityId | null;
}

export interface MemoDetail extends MemoSummary {
  content: string;
  richContent?: MemoRichContent | null;
  images?: MemoImage[];
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
  // 사용자가 삭제했거나 FIRE 메모가 만료되어 TRASH로 이동한 시각이다.
  deletedAt: string;
}

export type MemoMutationResponse = ApiMutationResponse &
  Partial<Pick<MemoDetail, 'memoId' | 'title' | 'content' | 'richContent'>> & {
    id?: EntityId;
  };
