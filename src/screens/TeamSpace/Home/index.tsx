import React, { useCallback, useMemo, useState } from 'react';
import { StatusBar, RefreshControl } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import type {CompositeScreenProps} from '@react-navigation/native';
import type {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/Ionicons';
import Header from '../../../components/Header'; 
import AsyncState from '../../../components/AsyncState';
import { useTeamSpaceHome } from '../../../hooks/useTeamSpaceHome'; // 추가된 뷰모델
import type {
  MainTabParamList,
  RootStackParamList,
} from '../../../types/navigation';
import type {EntityId} from '../../../types/api';

import FolderIcon from '../../../assets/icons/ic_folder_outline.svg';
import PeopleAddIcon from '../../../assets/icons/ic_people1.svg';
import PeopleGroupIcon from '../../../assets/icons/ic_people2.svg';
import PlusIcon from '../../../assets/icons/ic_plus.svg';

import {
  Container,
  SearchContainer,
  SearchInput,
  ActionRow,
  FilterTab,
  FilterTabText,
  ActionButtonGroup,
  ActionButton,
  ActionButtonText,
  ListContainer,
  ProjectCard,
  FolderCircle,
  ProjectInfo,
  TitleRow,
  ProjectTitle,
  ProjectDesc,
  MemberRow,
  MemberText
} from './TeamSpaceHome.styles';

type TeamSpaceHomeScreenProps = CompositeScreenProps<
  BottomTabScreenProps<MainTabParamList, 'TeamSpace'>,
  NativeStackScreenProps<RootStackParamList>
>;

export default function TeamSpaceHome({
  navigation,
}: TeamSpaceHomeScreenProps) {
  const { teams, isLoading, errorMessage, fetchTeams } = useTeamSpaceHome();
  const [searchQuery, setSearchQuery] = useState('');

  useFocusEffect(
    useCallback(() => {
      fetchTeams();
    }, [fetchTeams]),
  );

  const filteredTeams = useMemo(() => {
    const keyword = searchQuery.trim().toLowerCase();
    if (!keyword) return teams;
    return teams.filter(team =>
      [team.title, team.desc].some(value =>
        value?.toLowerCase().includes(keyword),
      ),
    );
  }, [searchQuery, teams]);

  const handleGoToProjectDetail = (
    projectId: EntityId,
    projectName: string,
  ) => {
    // 팀방에 들어갈 때, 어떤 프로젝트인지 식별하기 위해 projectId를 함께 넘겨줌
    navigation.navigate('ProjectDetail', {projectId, projectName});
  };

  const handleTeamCreate = () => navigation.navigate('TeamCreate');
  const handleFriendAdd = () => navigation.navigate('FriendAdd');

  return (
    <Container>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      
      <Header title="팀스페이스" />

      <SearchContainer>
        <Icon name="search-outline" size={20} color="#000000" />
        <SearchInput
          placeholder="검색"
          placeholderTextColor="#000000"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </SearchContainer>

      <ActionRow>
        <FilterTab activeOpacity={0.8}>
          {/* 전체 개수를 서버에서 받아온 팀 배열의 길이(teams.length)로 동적 반영 */}
          <FilterTabText>전체 ({teams.length})</FilterTabText>
        </FilterTab>

        <ActionButtonGroup>
          <ActionButton activeOpacity={0.7} onPress={handleTeamCreate}>
            <PlusIcon width={15} height={15} color="#FF8933"/>
            <ActionButtonText>팀 생성</ActionButtonText>
          </ActionButton>
          <ActionButton activeOpacity={0.7} onPress={handleFriendAdd}>
            <PeopleAddIcon width={21} height={21} />
            <ActionButtonText>친구추가</ActionButtonText>
          </ActionButton>
        </ActionButtonGroup>
      </ActionRow>

      <ListContainer 
        showsVerticalScrollIndicator={false}
        // 사용자가 화면을 위로 잡아당겼을 때(Pull-to-Refresh) 서버에서 데이터를 최신화하는 기능
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={fetchTeams} tintColor="#FF8933" />
        }
      >
        {filteredTeams.length === 0 ? (
          <AsyncState
            isLoading={isLoading}
            errorMessage={errorMessage}
            emptyMessage={
              searchQuery.trim()
                ? '검색 결과가 없습니다.'
                : '참여 중인 팀이 없습니다.'
            }
            onRetry={fetchTeams}
          />
        ) : null}
        {filteredTeams.map((project) => (
          <ProjectCard 
            key={project.id} 
            activeOpacity={0.8}
            onPress={() => handleGoToProjectDetail(project.id, project.title)}
          >
            <FolderCircle>
              <FolderIcon width={24} height={24} />
            </FolderCircle>
            <ProjectInfo>
              <TitleRow>
                <ProjectTitle>{project.title}</ProjectTitle>
                <Icon name="chevron-forward" size={17} color="#AAAAAA" />
              </TitleRow>
              <ProjectDesc>{project.desc}</ProjectDesc>
              <MemberRow>
                <Icon name="person-outline" size={12} color="#AAAAAA" />
                <MemberText>멤버 {project.members}명</MemberText>
              </MemberRow>
            </ProjectInfo>
            <PeopleGroupIcon width={48} height={48} />
          </ProjectCard>
        ))}
      </ListContainer>
    </Container>
  );
}
