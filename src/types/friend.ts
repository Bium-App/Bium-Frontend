import type {ApiMutationResponse, EntityId} from './api';

export interface FriendUser {
  userId: EntityId;
  nickname: string;
  loginId?: string;
  profileImageUrl?: string | null;
  commonProjects?: number;
}

export interface FriendRequest {
  requestId: EntityId;
  requesterId?: EntityId;
  receiverId?: EntityId;
  nickname?: string;
  profileImageUrl?: string | null;
  status?: string;
  createdAt?: string;
}

export type FriendMutationResponse = ApiMutationResponse &
  Partial<FriendRequest>;

export interface SendFriendRequestResponse extends ApiMutationResponse {
  requestId: EntityId;
}
