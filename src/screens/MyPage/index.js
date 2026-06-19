import React from 'react';
import { ScrollView } from 'react-native';
import {
  SafeArea,
  ProfileSection,
  ProfileImageWrapper,
  ProfileImage,
  UserName,
  EditProfileButton,
  EditProfileText,
  Card,
  CardTitle,
  MenuRow,
  MenuText,
  ArrowIcon,
  BottomPadding
} from './MyPage.styles';

export default function MyPage() {
  return (
    <SafeArea>
      <ScrollView showsVerticalScrollIndicator={false}>
        <ProfileSection>
          <ProfileImageWrapper>
            <ProfileImage source={require('../../assets/icons/mypage.png')} />
          </ProfileImageWrapper>
          <UserName>사용자</UserName>
          <EditProfileButton>
            <EditProfileText>내 정보 수정</EditProfileText>
          </EditProfileButton>
        </ProfileSection>

        <Card>
          <CardTitle>설정</CardTitle>
          <MenuRow>
            <MenuText>언어 및 지역</MenuText>
            <ArrowIcon>{'>'}</ArrowIcon>
          </MenuRow>
          <MenuRow>
            <MenuText>알림</MenuText>
            <ArrowIcon>{'>'}</ArrowIcon>
          </MenuRow>
          <MenuRow>
            <MenuText>개인정보 및 보안</MenuText>
            <ArrowIcon>{'>'}</ArrowIcon>
          </MenuRow>
          <MenuRow>
            <MenuText>탈퇴하기</MenuText>
            <ArrowIcon>{'>'}</ArrowIcon>
          </MenuRow>
          <MenuRow>
            <MenuText>휴지통</MenuText>
            <ArrowIcon>{'>'}</ArrowIcon>
          </MenuRow>
        </Card>

        <Card>
          <CardTitle>서비스</CardTitle>
          <MenuRow>
            <MenuText>공지사항</MenuText>
            <ArrowIcon>{'>'}</ArrowIcon>
          </MenuRow>
          <MenuRow>
            <MenuText>고객센터</MenuText>
            <ArrowIcon>{'>'}</ArrowIcon>
          </MenuRow>
          <MenuRow>
            <MenuText>1:1 문의</MenuText>
            <ArrowIcon>{'>'}</ArrowIcon>
          </MenuRow>
        </Card>
        
        <BottomPadding />
      </ScrollView>
    </SafeArea>
  );
}