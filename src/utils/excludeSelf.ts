import {getUserId} from './authStorage';
import type {EntityId} from '../types/api';

// 유저 검색/친구 검색 결과에 로그인 계정 본인이 섞여 나오는 걸 막는다.
export const excludeSelf = async <T extends {userId: EntityId}>(
  users: T[],
): Promise<T[]> => {
  const currentUserId = await getUserId();
  if (!currentUserId) return users;
  return users.filter(user => String(user.userId) !== currentUserId);
};
