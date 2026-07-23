import { useCallback, useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { getRecommendedFriendsApi, searchFriendsApi } from '../api/friends';
import { addTeamMemberApi, createTeamSpaceApi } from '../api/teamSpaces';

const mapMember = member => ({
  id: String(member.userId),
  nickname: member.nickname,
  profileImageUrl: member.profileImageUrl ?? null,
  description:
    member.commonProjects === undefined
      ? ''
      : `함께 참여한 프로젝트 ${member.commonProjects}개`,
});

export const useTeamCreate = navigation => {
  const [teamName, setTeamName] = useState('');
  const [searchMember, setSearchMember] = useState('');
  const [recommendedMembers, setRecommendedMembers] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchRecommended = useCallback(async () => {
    try {
      const result = await getRecommendedFriendsApi();
      setRecommendedMembers(result.map(mapMember));
    } catch (error) {
      Alert.alert(
        '오류',
        error.response?.data?.message ?? '추천 친구를 불러오지 못했습니다.',
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

  const toggleMember = member => {
    setSelectedMembers(current =>
      current.some(item => item.id === member.id)
        ? current.filter(item => item.id !== member.id)
        : [...current, member],
    );
  };

  const handleCreateTeam = async () => {
    if (!teamName.trim()) {
      Alert.alert('알림', '팀 이름을 입력해주세요.');
      return;
    }

    setIsLoading(true);
    try {
      const team = await createTeamSpaceApi(teamName.trim());
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
        [{ text: '확인', onPress: () => navigation.goBack() }],
      );
    } catch (error) {
      Alert.alert(
        '오류',
        error.response?.data?.message ?? '팀 생성에 실패했습니다.',
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
