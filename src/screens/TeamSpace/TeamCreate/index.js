import React, { useState } from 'react';
import { StatusBar } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Header from '../../../components/Header'; 

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
  EmptyCard,
  BottomFixedArea,
  SubmitBtn,
  SubmitBtnText
} from './TeamCreate.styles'; 

export default function TeamCreate({ navigation }) {
  const [teamName, setTeamName] = useState('오늘 해야 팀'); 
  const [searchMember, setSearchMember] = useState('');
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
              placeholder="이름 또는 이메일로 검색"
              placeholderTextColor="#AAAAAA"
              value={searchMember}
              onChangeText={setSearchMember}
            />
          </InputBox>
          <SectionLabel isFirst={false}>추천 친구</SectionLabel>
          {[1, 2, 3, 4].map((item) => (
            <EmptyCard key={`recommend-${item}`} />
          ))}
          <SectionLabel isFirst={false}>추가된 멤버 (1)</SectionLabel>
          <EmptyCard />
        </ContentInner>
      </ScrollContent>
      <BottomFixedArea>
        <SubmitBtn activeOpacity={0.8}>
          <SubmitBtnText>팀 생성하기</SubmitBtnText>
        </SubmitBtn>
      </BottomFixedArea>
    </Container>
  );
}