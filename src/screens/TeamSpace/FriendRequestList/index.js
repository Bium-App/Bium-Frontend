import React, { useState } from 'react';
import { StatusBar, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Header from '../../../components/Header'; // 🚀 공통 헤더 임포트

import UserOutlineIcon from '../../../assets/icons/ic_user_outline.svg';

import {
  Container,
  HeaderBackButton,
  SearchContainer,
  SearchInput,
  SectionTitle,
  RequestCard,
  ProfileTopRow,
  AvatarCircle,
  ProfileTextColumn,
  ProfileId,
  ProfileName,
  ProfileDescRow,
  ProfileDescIconWrapper,
  ProfileDesc,
  ActionBottomRow,
  ActionBtn,
  ActionBtnText
} from './FriendRequestList.styles'; 

export default function FriendRequestList({ navigation }) {
  const [searchQuery, setSearchQuery] = useState('');
  const backButton = (
    <HeaderBackButton onPress={() => navigation.goBack()} activeOpacity={0.8}>
      <Icon name="chevron-back" size={26} color="#FF8933" />
    </HeaderBackButton>
  );

  return (
    <Container>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <Header title="요청함" left={backButton} />
      <ScrollView showsVerticalScrollIndicator={false}>

        <SearchContainer>
          <Icon name="search-outline" size={16} color="#000000" />
          <SearchInput
            placeholder="검색"
            placeholderTextColor="#000000"
            value={searchQuery}
            onChangeText={setSearchQuery} 
          />
        </SearchContainer>

        <SectionTitle isFirst={true}>받은 요청</SectionTitle>
        <RequestCard>
          <ProfileTopRow>
            <AvatarCircle>
              <UserOutlineIcon width={17} height={17} color="#FF8933" />
            </AvatarCircle>
            <ProfileTextColumn>
              <ProfileId>@fahskdhaskjd</ProfileId>
              <ProfileName>홍길동</ProfileName>
              <ProfileDescRow>
                <ProfileDesc>메모 스타일 : 얼음</ProfileDesc>
              </ProfileDescRow>
            </ProfileTextColumn>
          </ProfileTopRow>

          <ActionBottomRow>
            <ActionBtn activeOpacity={0.7} isOutline={true} colorType="orange">
              <ActionBtnText isOutline={true} colorType="orange">수락</ActionBtnText>
            </ActionBtn>            
            <ActionBtn activeOpacity={0.7} isOutline={false} colorType="orange">
              <ActionBtnText isOutline={false} colorType="orange">거절</ActionBtnText>
            </ActionBtn>
          </ActionBottomRow>
        </RequestCard>


        <SectionTitle isFirst={false}>보낸 요청</SectionTitle>
        
        <RequestCard>
          <ProfileTopRow>
            <AvatarCircle>
              <UserOutlineIcon width={17} height={17} color="#FF8933" />
            </AvatarCircle>
            <ProfileTextColumn>
              <ProfileId>@fahskdhaskjd</ProfileId>
              <ProfileName>홍길동</ProfileName>
              <ProfileDescRow>
                <ProfileDescIconWrapper>
                  <Icon name="paper-plane-outline" size={10} color="#BBBBBB" />
                </ProfileDescIconWrapper>
                <ProfileDesc>요청 보냄</ProfileDesc>
              </ProfileDescRow>
            </ProfileTextColumn>
          </ProfileTopRow>

          <ActionBottomRow>
            <ActionBtn activeOpacity={0.7} isOutline={true} colorType="gray">
              <ActionBtnText isOutline={true} color="#D1D5DB">취소</ActionBtnText>
            </ActionBtn>
          </ActionBottomRow>
        </RequestCard>

      </ScrollView>
    </Container>
  );
}