import { useCallback, useState } from 'react';
import dayjs from 'dayjs';
import { getUserTeamSpacesApi } from '../api/teamSpaces';
import { getUserId } from '../utils/authStorage';
import { getApiErrorMessage } from '../utils/apiError';

export const useTeamSpaceHome = () => {
  const [teams, setTeams] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const fetchTeams = useCallback(async () => {
    setIsLoading(true);
    setErrorMessage('');
    try {
      const userId = await getUserId();
      if (!userId) return;

      const teamSpaces = await getUserTeamSpacesApi(userId);
      const mappedTeams = teamSpaces.map(teamSpace => ({
        id: String(teamSpace.teamSpaceId),
        title: teamSpace.name,
        desc: teamSpace.createdAt
          ? `${dayjs(teamSpace.createdAt).format('YYYY.MM.DD')} 생성`
          : '',
        members: teamSpace.memberCount ?? 0,
      }));
      setTeams(mappedTeams);
    } catch (error) {
      setErrorMessage(
        getApiErrorMessage(
          error,
          '팀스페이스 목록을 불러오지 못했습니다.',
        ),
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { teams, isLoading, errorMessage, fetchTeams };
};
