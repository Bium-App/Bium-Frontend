import React from 'react';
import { StatusBar, ScrollView, RefreshControl } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import Header from '../../../components/Header';
import AsyncState from '../../../components/AsyncState';
import { useFriendAdd } from '../../../hooks/userFriendAdd';
import type {RootStackParamList} from '../../../types/navigation';

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
  BadgeText,
  WarningText,
} from './FriendAdd.styles';

type FriendAddScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'FriendAdd'
>;

export default function FriendAdd({navigation}: FriendAddScreenProps) {
  const {
    searchQuery,
    handleSearch,
    searchResults,
    recommendedFriends,
    requestCount,
    isLoading,
    isSearching,
    isSubmitting,
    recommendationErrorMessage,
    searchErrorMessage,
    fetchInitialData,
    searchFriends,
    handleAddFriend,
  } = useFriendAdd();
  const normalizedSearchQuery = searchQuery.trim();

  const backButton = (
    <HeaderBackButton onPress={() => navigation.goBack()} activeOpacity={0.8}>
      <Icon name="chevron-back" size={24} color="#FF8933" />
    </HeaderBackButton>
  );

  const rightButton = (
    <HeaderRightButton
      onPress={() => navigation.navigate('FriendRequestList')}
      activeOpacity={0.8}
    >
      <FriendRequestIcon width={22} height={22} color="#000000" />
      {requestCount > 0 && (
        <BadgeContainer>
          <BadgeText>{requestCount}</BadgeText>
        </BadgeContainer>
      )}
    </HeaderRightButton>
  );

  return (
    <Container>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <Header title="친구 추가" left={backButton} right={rightButton} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={isLoading}
            onRefresh={fetchInitialData}
            tintColor="#FF8933"
          />
        }
      >
        <SearchContainer>
          <Icon name="search-outline" size={20} color="#000000" />
          <SearchInput
            placeholder="검색"
            placeholderTextColor="#000000"
            value={searchQuery}
            onChangeText={handleSearch}
          />
        </SearchContainer>

        {normalizedSearchQuery.length > 0 && (
          <ListCard>
            {isSearching || searchErrorMessage || searchResults.length === 0 ? (
              <AsyncState
                isLoading={isSearching}
                errorMessage={searchErrorMessage}
                emptyMessage="검색 결과가 없습니다."
                onRetry={() => searchFriends(normalizedSearchQuery)}
              />
            ) : (
              searchResults.map((user, index) => (
                <React.Fragment key={user.id}>
                  <ListItem isLast={false} isCompact={true}>
                    <AvatarCircle>
                      <UserOutlineIcon width={17} height={17} color="#FF8933" />
                    </AvatarCircle>
                    <ProfileTextColumn>
                      <ProfileName>@{user.handle}</ProfileName>
                    </ProfileTextColumn>
                  </ListItem>
                  <ListItem
                    isLast={index === searchResults.length - 1}
                    isCompact={false}
                  >
                    <AvatarCircle>
                      <AvatarText>{user.name?.charAt(0) || '?'}</AvatarText>
                    </AvatarCircle>
                    <ProfileTextColumn>
                      <ProfileName>{user.name}</ProfileName>
                      {user.desc && <ProfileDesc>{user.desc}</ProfileDesc>}
                    </ProfileTextColumn>
                    <AddFriendBtn
                      activeOpacity={0.8}
                      onPress={() => handleAddFriend(user.id)}
                      disabled={isSubmitting}
                    >
                      <PlusIcon width={14} height={14} color="#FFFFFF" />
                      <AddFriendBtnText>친구추가</AddFriendBtnText>
                    </AddFriendBtn>
                  </ListItem>
                </React.Fragment>
              ))
            )}
          </ListCard>
        )}

        <SectionTitle>추천 친구</SectionTitle>
        {recommendationErrorMessage && recommendedFriends.length > 0 ? (
          <WarningText>{recommendationErrorMessage}</WarningText>
        ) : null}
        <ListCard>
          {recommendedFriends.length === 0 ? (
            <AsyncState
              isLoading={isLoading}
              errorMessage={recommendationErrorMessage}
              emptyMessage="추천 친구가 없습니다."
              onRetry={fetchInitialData}
            />
          ) : (
            recommendedFriends.map((user, index) => (
              <React.Fragment key={user.id}>
                <ListItem isLast={false} isCompact={true}>
                  <AvatarCircle>
                    <UserOutlineIcon width={17} height={17} color="#FF8933" />
                  </AvatarCircle>
                  <ProfileTextColumn>
                    <ProfileName>@{user.handle}</ProfileName>
                  </ProfileTextColumn>
                </ListItem>
                <ListItem
                  isLast={index === recommendedFriends.length - 1}
                  isCompact={false}
                >
                  <AvatarCircle>
                    <AvatarText>{user.name?.charAt(0) || '?'}</AvatarText>
                  </AvatarCircle>
                  <ProfileTextColumn>
                    <ProfileName>{user.name}</ProfileName>
                    {user.desc && <ProfileDesc>{user.desc}</ProfileDesc>}
                  </ProfileTextColumn>
                  <AddFriendBtn
                    activeOpacity={0.8}
                    onPress={() => handleAddFriend(user.id)}
                    disabled={isSubmitting}
                  >
                    <PlusIcon width={14} height={14} color="#FFFFFF" />
                    <AddFriendBtnText>친구추가</AddFriendBtnText>
                  </AddFriendBtn>
                </ListItem>
              </React.Fragment>
            ))
          )}
        </ListCard>

        <TipContainer>
          <TipRow>
            <TipIconCircle>
              <BulbIcon width={20} height={20} color="#FF8933" />
            </TipIconCircle>
            <TipText>
              친구를 추가하면 함께 프로젝트를{'\n'}더 쉽게 관리할 수 있어요.
            </TipText>
          </TipRow>
          <TipRow>
            <TipIconCircle>
              <NoticeIcon width={20} height={20} color="#FF8933" />
            </TipIconCircle>
            <TipText>
              추천 친구는 같은 프로젝트 멤버를 기준으로{'\n'}제안돼요.
            </TipText>
          </TipRow>
        </TipContainer>
      </ScrollView>
    </Container>
  );
}
