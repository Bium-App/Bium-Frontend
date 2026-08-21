import React from 'react';
import { StatusBar } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useTranslation} from 'react-i18next';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import Header from '../../../components/Header';
import { useTeamCreate } from '../../../hooks/useTeamCreate';
import type {TeamMemberOption} from '../../../hooks/useTeamCreate';
import type {RootStackParamList} from '../../../types/navigation';

import {
  Container,
  HeaderBackButton,
  ScrollContent,
  ContentInner,
  SectionLabel,
  InputBox,
  StyledTextInput,
  SubTextRow,
  SubText,
  CharCountText,
  MemberCard,
  MemberAvatar,
  MemberAvatarText,
  MemberInfo,
  MemberName,
  MemberDescription,
  BottomFixedArea,
  SubmitBtn,
  SubmitBtnText,
} from './TeamCreate.styles';

type TeamCreateScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'TeamCreate'
>;

export default function TeamCreate({navigation}: TeamCreateScreenProps) {
  const {t} = useTranslation();
  // 뷰모델 연결 및 상태, 함수 추출
  const {
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
  } = useTeamCreate(navigation);

  const renderMember = (member: TeamMemberOption) => {
    const selected = selectedMembers.some(item => item.id === member.id);
    return (
      <MemberCard
        key={member.id}
        selected={selected}
        activeOpacity={0.7}
        onPress={() => toggleMember(member)}
      >
        <MemberAvatar>
          <MemberAvatarText>
            {member.nickname?.charAt(0) || '?'}
          </MemberAvatarText>
        </MemberAvatar>
        <MemberInfo>
          <MemberName>{member.nickname}</MemberName>
          {member.description ? (
            <MemberDescription>{member.description}</MemberDescription>
          ) : null}
        </MemberInfo>
        <Icon
          name={selected ? 'checkmark-circle' : 'add-circle-outline'}
          size={22}
          color="#FF8933"
        />
      </MemberCard>
    );
  };

  const backButton = (
    <HeaderBackButton onPress={() => navigation.goBack()} activeOpacity={0.8}>
      <Icon name="chevron-back" size={24} color="#FF8933" />
    </HeaderBackButton>
  );

  return (
    <Container>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <Header title={t('team.create_team')} left={backButton} />
      <ScrollContent showsVerticalScrollIndicator={false}>
        <ContentInner>
          <SectionLabel isFirst={true}>{t('team.team_name')}</SectionLabel>
          <InputBox>
            <StyledTextInput
              placeholder={t('team.team_name_placeholder')}
              placeholderTextColor="#AAAAAA"
              value={teamName}
              onChangeText={setTeamName}
              maxLength={20}
            />
          </InputBox>
          <SubTextRow>
            <SubText>{t('team.team_name_helper')}</SubText>
            <CharCountText>{teamName.length}/20</CharCountText>
          </SubTextRow>
          <SectionLabel isFirst={false}>{t('team.add_members')}</SectionLabel>
          <InputBox>
            <StyledTextInput
              placeholder={t('team.search_nickname')}
              placeholderTextColor="#AAAAAA"
              value={searchMember}
              onChangeText={setSearchMember}
            />
          </InputBox>
          {searchMember.trim() ? searchResults.map(renderMember) : null}
          <SectionLabel isFirst={false}>{t('team.recommended_friends')}</SectionLabel>
          {recommendedMembers.map(renderMember)}
          <SectionLabel isFirst={false}>
            {t('team.added_members', {count: selectedMembers.length})}
          </SectionLabel>
          {selectedMembers.map(renderMember)}
        </ContentInner>
      </ScrollContent>
      <BottomFixedArea>
        {/* API 통신 중일 경우 중복 클릭 방지 처리 */}
        <SubmitBtn
          activeOpacity={0.8}
          onPress={handleCreateTeam}
          disabled={isLoading}
        >
          <SubmitBtnText>{t('team.create_team_action')}</SubmitBtnText>
        </SubmitBtn>
      </BottomFixedArea>
    </Container>
  );
}
