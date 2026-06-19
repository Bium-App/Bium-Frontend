import React, { useState } from 'react';
import { StatusBar, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Header from '../../../components/Header'; 
import UserOutlineIcon from '../../../assets/icons/ic_user_outline.svg';
import BulbIcon from '../../../assets/icons/ic_bulb.svg';
import NoticeIcon from '../../../assets/icons/ic_notice.svg';
import PlusIcon from '../../../assets/icons/ic_plus.svg';
import FriendRequestIcon from '../../../assets/icons/ic_friend_request.svg';

import {
  Container,
  HeaderBackButton,
  SearchContainer,
  SearchInput,
  ListCard,
  ListItem,
  AvatarCircle,
  AvatarText,
  ProfileTextColumn,
  ProfileName,
  ProfileDesc,
  AddFriendBtn,
  AddFriendBtnText,
  SectionTitle,
  TipContainer,
  TipRow,
  TipIconCircle,
  TipText,
  HeaderRightButton,
  BadgeContainer,
  BadgeText
} from './FriendAdd.styles'; 

export default function FriendAdd({ navigation }) {
  const [searchQuery, setSearchQuery] = useState('');

  const backButton = (
    <HeaderBackButton onPress={() => navigation.goBack()} activeOpacity={0.8}>
      <Icon name="chevron-back" size={26} color="#FF8933" />
    </HeaderBackButton>
  );

  const rightButton = (
    <HeaderRightButton onPress={() => navigation.navigate('FriendRequestList')} activeOpacity={0.8}>
      <FriendRequestIcon width={22} height={22} color="#000000" />
            <BadgeContainer>
        <BadgeText>1</BadgeText>
      </BadgeContainer>
    </HeaderRightButton>
  );

  return (
    <Container>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <Header title="친구 추가" left={backButton} right={rightButton} />      
      <ScrollView showsVerticalScrollIndicator={false}>
        <SearchContainer>
          <Icon name="search-outline" size={20} color="#000000" />
          <SearchInput
            placeholder="검색"
            placeholderTextColor="#000000"
            value={searchQuery}
            onChangeText={setSearchQuery} 
          />
        </SearchContainer>

        <ListCard>
          <ListItem isLast={false} isCompact={true}>
            <AvatarCircle>
              <UserOutlineIcon width={17} height={17} color="#FF8933" />
            </AvatarCircle>
            <ProfileTextColumn>
              <ProfileName>@fahskdhaskjd</ProfileName>
            </ProfileTextColumn>
          </ListItem>

          <ListItem isLast={true} isCompact={false}>
            <AvatarCircle>
              <AvatarText>홍</AvatarText>
            </AvatarCircle>
            <ProfileTextColumn>
              <ProfileName>홍길동</ProfileName>
            </ProfileTextColumn>
            <AddFriendBtn activeOpacity={0.8}>
              <PlusIcon width={14} height={14} color="#FFFFFF" />
              <AddFriendBtnText>친구추가</AddFriendBtnText>
            </AddFriendBtn>
          </ListItem>
        </ListCard>
        
        <SectionTitle>추천 친구</SectionTitle>
        <ListCard>
          <ListItem isLast={false} isCompact={true}>
            <AvatarCircle>
              <UserOutlineIcon width={17} height={17} color="#FF8933" />
            </AvatarCircle>
            <ProfileTextColumn>
              <ProfileName>@fahskdhaskjd</ProfileName>
            </ProfileTextColumn>
          </ListItem>
          <ListItem isLast={true} isCompact={false}>
            <AvatarCircle>
              <AvatarText>홍</AvatarText>
            </AvatarCircle>
            <ProfileTextColumn>
              <ProfileName>홍길동</ProfileName>
              <ProfileDesc>불 메모 많이 사용</ProfileDesc>
            </ProfileTextColumn>
            <AddFriendBtn activeOpacity={0.8}>
              <PlusIcon width={14} height={14} color="#FFFFFF" />
              <AddFriendBtnText>친구추가</AddFriendBtnText>
            </AddFriendBtn>
          </ListItem>
        </ListCard>
        
        <TipContainer>
          <TipRow>
            <TipIconCircle>
              <BulbIcon width={20} height={20} color="#FF8933" />
            </TipIconCircle>
            <TipText>친구를 추가하면 함께 프로젝트를{'\n'}더 쉽게 관리할 수 있어요.</TipText>
          </TipRow>
          <TipRow>
            <TipIconCircle>
              <NoticeIcon width={20} height={20} color="#FF8933" />
            </TipIconCircle>
            <TipText>추천 친구는 같은 프로젝트 멤버를 기준으로{'\n'}제안돼요.</TipText>
          </TipRow>
        </TipContainer>
      </ScrollView>
    </Container>
  );
}