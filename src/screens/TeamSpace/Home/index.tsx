import React, { useCallback, useMemo, useState } from 'react';
import { StatusBar, RefreshControl } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import type {CompositeScreenProps} from '@react-navigation/native';
import type {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/Ionicons';
import {useTranslation} from 'react-i18next';
import Header from '../../../components/Header'; 
import AsyncState from '../../../components/AsyncState';
import { useTeamSpaceHome } from '../../../hooks/useTeamSpaceHome';
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
  const {t} = useTranslation();
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
    navigation.navigate('ProjectDetail', {projectId, projectName});
  };

  const handleTeamCreate = () => navigation.navigate('TeamCreate');
  const handleFriendAdd = () => navigation.navigate('FriendAdd');

  return (
    <Container>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      
      <Header title={t('team.title')} />

      <SearchContainer>
        <Icon name="search-outline" size={20} color="#000000" />
        <SearchInput
          placeholder={t('common.search')}
          placeholderTextColor="#000000"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </SearchContainer>

      <ActionRow>
        <FilterTab activeOpacity={0.8}>
          <FilterTabText>{t('team.all_count', {count: teams.length})}</FilterTabText>
        </FilterTab>

        <ActionButtonGroup>
          <ActionButton activeOpacity={0.7} onPress={handleTeamCreate}>
            <PlusIcon width={15} height={15} color="#FF8933"/>
            <ActionButtonText>{t('team.create')}</ActionButtonText>
          </ActionButton>
          <ActionButton activeOpacity={0.7} onPress={handleFriendAdd}>
            <PeopleAddIcon width={21} height={21} />
            <ActionButtonText>{t('team.add_friend')}</ActionButtonText>
          </ActionButton>
        </ActionButtonGroup>
      </ActionRow>

      <ListContainer 
        showsVerticalScrollIndicator={false}
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
                ? t('team.no_search_results')
                : t('team.no_teams')
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
                <MemberText>{t('team.member_count', {count: project.members})}</MemberText>
              </MemberRow>
            </ProjectInfo>
            <PeopleGroupIcon width={48} height={48} />
          </ProjectCard>
        ))}
      </ListContainer>
    </Container>
  );
}
