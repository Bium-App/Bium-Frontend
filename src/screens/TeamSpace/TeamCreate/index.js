import React from 'react';
import { StatusBar } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Header from '../../../components/Header';
import { useTeamCreate } from '../../../hooks/useTeamCreate';

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

export default function TeamCreate({ navigation }) {
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

  const renderMember = member => {
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
      <Icon name="chevron-back" size={26} color="#FF8933" />
    </HeaderBackButton>
  );

  return (
    <Container>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <Header title="팀 생성" left={backButton} />
      <ScrollContent showsVerticalScrollIndicator={false}>
        <ContentInner>
          <SectionLabel isFirst={true}>팀 이름</SectionLabel>
          <InputBox>
            <StyledTextInput
              placeholder="팀 이름을 입력하세요"
              placeholderTextColor="#AAAAAA"
              value={teamName}
              onChangeText={setTeamName}
              maxLength={20}
            />
          </InputBox>
          <SubTextRow>
            <SubText>팀 이름은 나중에 변경 할 수 있어요</SubText>
            <CharCountText>{teamName.length}/20</CharCountText>
          </SubTextRow>
          <SectionLabel isFirst={false}>팀 멤버 추가</SectionLabel>
          <InputBox>
            <StyledTextInput
              placeholder="닉네임으로 검색"
              placeholderTextColor="#AAAAAA"
              value={searchMember}
              onChangeText={setSearchMember}
            />
          </InputBox>
          {searchMember.trim() ? searchResults.map(renderMember) : null}
          <SectionLabel isFirst={false}>추천 친구</SectionLabel>
          {recommendedMembers.map(renderMember)}
          <SectionLabel isFirst={false}>
            추가된 멤버 ({selectedMembers.length})
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
          <SubmitBtnText>팀 생성하기</SubmitBtnText>
        </SubmitBtn>
      </BottomFixedArea>
    </Container>
  );
}
