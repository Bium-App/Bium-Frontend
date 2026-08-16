import {useCallback, useEffect, useState} from 'react';
import {Alert} from 'react-native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {getRecommendedFriendsApi, searchFriendsApi} from '../api/friends';
import {addTeamMemberApi, createTeamSpaceApi} from '../api/teamSpaces';
import {getApiResponseMessage} from '../utils/apiError';
import type {FriendUser} from '../types/friend';
import type {RootStackParamList} from '../types/navigation';

type Navigation = NativeStackNavigationProp<RootStackParamList, 'TeamCreate'>;

export interface TeamMemberOption {
  id: string;
  nickname: string;
  profileImageUrl: string | null;
  description: string;
}

const mapMember = (member: FriendUser): TeamMemberOption => ({
  id: String(member.userId),
  nickname: member.nickname,
  profileImageUrl: member.profileImageUrl ?? null,
  description:
    member.commonProjects === undefined
      ? ''
      : `함께 참여한 프로젝트 ${member.commonProjects}개`,
});

export const useTeamCreate = (navigation: Navigation) => {
  const [teamName, setTeamName] = useState('');
  const [searchMember, setSearchMember] = useState('');
  const [recommendedMembers, setRecommendedMembers] = useState<
    TeamMemberOption[]
  >([]);
  const [searchResults, setSearchResults] = useState<TeamMemberOption[]>([]);
  const [selectedMembers, setSelectedMembers] = useState<TeamMemberOption[]>(
    [],
  );
  const [isLoading, setIsLoading] = useState(false);

  const fetchRecommended = useCallback(async (): Promise<void> => {
    try {
      const result = await getRecommendedFriendsApi();
      setRecommendedMembers(result.map(mapMember));
    } catch (error) {
      Alert.alert(
        '오류',
        getApiResponseMessage(error) ?? '추천 친구를 불러오지 못했습니다.',
      );
    }
  }, []);

  useEffect(() => {
    fetchRecommended();
  }, [fetchRecommended]);

  useEffect(() => {
    const keyword = searchMember.trim();
    if (!keyword) {
      setSearchResults([]);
      return undefined;
    }
    const timerId = setTimeout(async () => {
      try {
        const result = await searchFriendsApi(keyword);
        setSearchResults(result.map(mapMember));
      } catch {
        setSearchResults([]);
      }
    }, 300);
    return () => clearTimeout(timerId);
  }, [searchMember]);

  const toggleMember = (member: TeamMemberOption): void => {
    setSelectedMembers(current =>
      current.some(item => item.id === member.id)
        ? current.filter(item => item.id !== member.id)
        : [...current, member],
    );
  };

  const handleCreateTeam = async (): Promise<void> => {
    if (!teamName.trim()) {
      Alert.alert('알림', '팀 이름을 입력해주세요.');
      return;
    }

    setIsLoading(true);
    try {
      const team = await createTeamSpaceApi(teamName.trim());
      if (team.teamSpaceId === undefined || team.teamSpaceId === null) {
        throw new Error('생성된 팀 ID를 서버 응답에서 확인할 수 없습니다.');
      }
      const results = await Promise.allSettled(
        selectedMembers.map(member =>
          addTeamMemberApi(team.teamSpaceId, member.id, 'MEMBER'),
        ),
      );
      const failedCount = results.filter(
        result => result.status === 'rejected',
      ).length;
      Alert.alert(
        '팀 생성 완료',
        failedCount
          ? `팀은 생성됐지만 멤버 ${failedCount}명 추가에 실패했습니다.`
          : '선택한 멤버와 함께 팀이 생성되었습니다.',
        [{text: '확인', onPress: () => navigation.goBack()}],
      );
    } catch (error) {
      Alert.alert(
        '오류',
        getApiResponseMessage(error) ?? '팀 생성에 실패했습니다.',
      );
    } finally {
      setIsLoading(false);
    }
  };

  return {
    teamName,
    setTeamName,
    searchMember,
    setSearchMember,
    recommendedMembers,
    searchResults,
    selectedMembers,
    toggleMember,
    isLoading,
    handleCreateTeam,
  };
};
