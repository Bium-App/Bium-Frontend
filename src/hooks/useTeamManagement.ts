import {useCallback, useMemo, useState} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import {
  deleteTeamSpaceApi,
  getTeamMembersApi,
  getTeamSpaceApi,
  removeTeamMemberApi,
  updateTeamMemberRoleApi,
} from '../api/teamSpaces';
import {getUserId} from '../utils/authStorage';
import {getApiErrorMessage} from '../utils/apiError';
import type {EntityId} from '../types/api';
import type {TeamMember, TeamSpace} from '../types/teamSpace';

export const useTeamManagement = (teamSpaceId?: EntityId) => {
  const [team, setTeam] = useState<TeamSpace | null>(null);
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const fetchTeamManagement = useCallback(async (): Promise<void> => {
    if (teamSpaceId === undefined || teamSpaceId === null) return;
    setIsLoading(true);
    setErrorMessage('');

    const [teamResult, membersResult, userIdResult] = await Promise.allSettled([
      getTeamSpaceApi(teamSpaceId),
      getTeamMembersApi(teamSpaceId),
      getUserId(),
    ]);

    if (teamResult.status === 'fulfilled') setTeam(teamResult.value);
    if (membersResult.status === 'fulfilled') setMembers(membersResult.value);
    if (userIdResult.status === 'fulfilled') {
      setCurrentUserId(userIdResult.value);
    }

    const failedResult = [teamResult, membersResult].find(
      result => result.status === 'rejected',
    );
    if (failedResult?.status === 'rejected') {
      setErrorMessage(
        getApiErrorMessage(
          failedResult.reason,
          '팀 정보를 불러오지 못했습니다.',
        ),
      );
    }
    setIsLoading(false);
  }, [teamSpaceId]);

  useFocusEffect(
    useCallback(() => {
      fetchTeamManagement();
    }, [fetchTeamManagement]),
  );

  const currentMember = useMemo(
    () =>
      members.find(member => String(member.userId) === String(currentUserId)),
    [currentUserId, members],
  );
  const canManage = currentMember?.role === 'LEADER';

  const requireMemberId = (member: TeamMember): EntityId => {
    if (member.teamMemberId === undefined || member.teamMemberId === null) {
      throw new Error(
        '서버의 팀원 목록 응답에 teamMemberId가 없어 이 작업을 진행할 수 없습니다.',
      );
    }
    return member.teamMemberId;
  };

  const updateMemberRole = async (
    member: TeamMember,
    role: 'LEADER' | 'MEMBER',
  ): Promise<void> => {
    await updateTeamMemberRoleApi(requireMemberId(member), role);
    await fetchTeamManagement();
  };

  const removeMember = async (member: TeamMember): Promise<void> => {
    await removeTeamMemberApi(requireMemberId(member));
    await fetchTeamManagement();
  };

  const deleteTeam = async (): Promise<void> => {
    if (teamSpaceId === undefined || teamSpaceId === null) {
      throw new Error('삭제할 팀 정보를 찾을 수 없습니다.');
    }
    await deleteTeamSpaceApi(teamSpaceId);
  };

  return {
    team,
    members,
    currentUserId,
    canManage,
    isLoading,
    errorMessage,
    fetchTeamManagement,
    updateMemberRole,
    removeMember,
    deleteTeam,
  };
};
