import React from 'react';
import { StatusBar, ScrollView, Text, RefreshControl } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Header from '../../../components/Header';
import AsyncState from '../../../components/AsyncState';
import { useFriendRequestList } from '../../../hooks/useFriendRequestList';

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
  ActionBtnText,
} from './FriendRequestList.styles';

export default function FriendRequestList({ navigation }) {
  // 뷰모델 상태 및 함수 연결
  const {
    searchQuery,
    setSearchQuery,
    filteredReceived,
    filteredSent,
    isLoading,
    isProcessing,
    errorMessage,
    fetchRequests,
    hasRequests,
    handleAccept,
    handleReject,
    handleCancel,
  } = useFriendRequestList();
  const hasFilteredRequests =
    filteredReceived.length > 0 || filteredSent.length > 0;
  const hasSearchQuery = searchQuery.trim().length > 0;

  const backButton = (
    <HeaderBackButton onPress={() => navigation.goBack()} activeOpacity={0.8}>
      <Icon name="chevron-back" size={26} color="#FF8933" />
    </HeaderBackButton>
  );

  return (
    <Container>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <Header title="요청함" left={backButton} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={isLoading}
            onRefresh={fetchRequests}
            tintColor="#FF8933"
          />
        }
      >
        <SearchContainer>
          <Icon name="search-outline" size={16} color="#000000" />
          <SearchInput
            placeholder="검색"
            placeholderTextColor="#000000"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </SearchContainer>

        {!hasRequests ? (
          <AsyncState
            isLoading={isLoading}
            errorMessage={errorMessage}
            emptyMessage="친구 요청이 없습니다."
            onRetry={fetchRequests}
          />
        ) : hasSearchQuery && !hasFilteredRequests ? (
          <AsyncState emptyMessage="검색 결과가 없습니다." />
        ) : (
          <>
            <SectionTitle isFirst={true}>받은 요청</SectionTitle>
            {filteredReceived.length === 0 ? (
              <Text
                style={{ textAlign: 'center', padding: 20, color: '#AAAAAA' }}
              >
                받은 요청이 없습니다.
              </Text>
            ) : (
              filteredReceived.map(req => (
                <RequestCard key={`received-${req.id}`}>
                  <ProfileTopRow>
                    <AvatarCircle>
                      <UserOutlineIcon width={17} height={17} color="#FF8933" />
                    </AvatarCircle>
                    <ProfileTextColumn>
                      <ProfileId>@{req.handle}</ProfileId>
                      <ProfileName>{req.name}</ProfileName>
                      <ProfileDescRow>
                        <ProfileDesc>{req.desc}</ProfileDesc>
                      </ProfileDescRow>
                    </ProfileTextColumn>
                  </ProfileTopRow>

                  <ActionBottomRow>
                    <ActionBtn
                      activeOpacity={0.7}
                      isOutline={true}
                      colorType="orange"
                      onPress={() => handleAccept(req.id)}
                      disabled={isProcessing}
                    >
                      <ActionBtnText isOutline={true} colorType="orange">
                        수락
                      </ActionBtnText>
                    </ActionBtn>
                    <ActionBtn
                      activeOpacity={0.7}
                      isOutline={false}
                      colorType="orange"
                      onPress={() => handleReject(req.id)}
                      disabled={isProcessing}
                    >
                      <ActionBtnText isOutline={false} colorType="orange">
                        거절
                      </ActionBtnText>
                    </ActionBtn>
                  </ActionBottomRow>
                </RequestCard>
              ))
            )}

            <SectionTitle isFirst={false}>보낸 요청</SectionTitle>
            {filteredSent.length === 0 ? (
              <Text
                style={{ textAlign: 'center', padding: 20, color: '#AAAAAA' }}
              >
                보낸 요청이 없습니다.
              </Text>
            ) : (
              filteredSent.map(req => (
                <RequestCard key={`sent-${req.id}`}>
                  <ProfileTopRow>
                    <AvatarCircle>
                      <UserOutlineIcon width={17} height={17} color="#FF8933" />
                    </AvatarCircle>
                    <ProfileTextColumn>
                      <ProfileId>@{req.handle}</ProfileId>
                      <ProfileName>{req.name}</ProfileName>
                      <ProfileDescRow>
                        <ProfileDescIconWrapper>
                          <Icon
                            name="paper-plane-outline"
                            size={10}
                            color="#BBBBBB"
                          />
                        </ProfileDescIconWrapper>
                        <ProfileDesc>요청 보냄</ProfileDesc>
                      </ProfileDescRow>
                    </ProfileTextColumn>
                  </ProfileTopRow>

                  <ActionBottomRow>
                    <ActionBtn
                      activeOpacity={0.7}
                      isOutline={true}
                      colorType="gray"
                      onPress={() => handleCancel(req.id)}
                      disabled={isProcessing}
                    >
                      <ActionBtnText isOutline={true} color="#D1D5DB">
                        취소
                      </ActionBtnText>
                    </ActionBtn>
                  </ActionBottomRow>
                </RequestCard>
              ))
            )}
          </>
        )}
      </ScrollView>
    </Container>
  );
}
