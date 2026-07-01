import React from 'react';
import { StatusBar } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Header from '../../../components/Header'; 

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

const DUMMY_PROJECTS = [
  { id: '1', title: '프로젝트1', desc: 'UI 디자인 진행 중', members: 3 },
  { id: '2', title: '프로젝트2', desc: '마케팅 캠페인 기획', members: 3 },
  { id: '3', title: '프로젝트3', desc: '앱 기능 개발', members: 3 },
  { id: '4', title: '프로젝트4', desc: '브랜드 리뉴얼', members: 3 },
  { id: '5', title: '프로젝트5', desc: '신규 서비스 아이디어', members: 3 },
  { id: '6', title: '프로젝트6', desc: 'UI 디자인 팀플', members: 3 },
];

export default function TeamSpaceHome({ navigation }) {
  
  const handleGoToProjectDetail = () => {
    navigation.navigate('ProjectDetail');
  };

  const handleTeamCreate = () => navigation.navigate('TeamCreate');
  const handleFriendAdd = () => navigation.navigate('FriendAdd');

  return (
    <Container>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      
      <Header title="팀스페이스" />

      <SearchContainer>
        <Icon name="search-outline" size={20} color="#000000" />
        <SearchInput placeholder="검색" placeholderTextColor="#000000" />
      </SearchContainer>

      <ActionRow>
        <FilterTab activeOpacity={0.8}>
          <FilterTabText>전체 (6)</FilterTabText>
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

      <ListContainer showsVerticalScrollIndicator={false}>
        {DUMMY_PROJECTS.map((project) => (
          <ProjectCard 
            key={project.id} 
            activeOpacity={0.8}
            onPress={handleGoToProjectDetail}
          >
            <FolderCircle>
              <FolderIcon width={24} height={24} />
            </FolderCircle>
            <ProjectInfo>
              <TitleRow>
                <ProjectTitle>{project.title}</ProjectTitle>
                <Icon name="chevron-down" size={17} color="#AAAAAA" />
              </TitleRow>
              <ProjectDesc>{project.desc}</ProjectDesc>
              <MemberRow>
                <Icon name="person-outline" size={12} color="#AAAAAAB" />
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