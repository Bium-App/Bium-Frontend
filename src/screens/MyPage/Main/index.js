import React from 'react';
import { ActivityIndicator, Image, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useCurrentUser } from '../../../hooks/useCurrentUser';
import {
  SafeArea,
  ProfileSection,
  ProfileImageWrapper,
  UserName,
  EditProfileButton,
  EditProfileText,
  Card,
  CardTitle,
  MenuRow,
  MenuText,
  BottomPadding,
} from './MyPageMain.styles';

export default function MyPageMain({ navigation }) {
  const { user, isLoading } = useCurrentUser();

  return (
    <SafeArea>
      <ScrollView showsVerticalScrollIndicator={false}>
        <ProfileSection>
          <ProfileImageWrapper>
            {user?.profileImageUrl ? (
              <Image
                source={{ uri: user.profileImageUrl }}
                style={{ width: '100%', height: '100%' }}
              />
            ) : (
              <Icon name="person" size={57} color="#AEAEB2" />
            )}
          </ProfileImageWrapper>
          {isLoading && !user ? (
            <ActivityIndicator color="#FF8933" />
          ) : (
            <UserName>{user?.nickname || user?.name || '사용자'}</UserName>
          )}
          <EditProfileButton
            activeOpacity={0.7}
            onPress={() => navigation.navigate('EditProfile')}
          >
            <EditProfileText>내 정보 수정</EditProfileText>
          </EditProfileButton>
        </ProfileSection>

        <Card>
          <CardTitle>설정</CardTitle>
          <MenuRow
            activeOpacity={0.7}
            onPress={() => navigation.navigate('Language')}
          >
            <MenuText>언어 및 지역</MenuText>
            <Icon name="chevron-forward" size={16} color="#FF8933" />
          </MenuRow>

          <MenuRow
            activeOpacity={0.7}
            onPress={() => navigation.navigate('SettingNotification')}
          >
            <MenuText>알림</MenuText>
            <Icon name="chevron-forward" size={16} color="#FF8933" />
          </MenuRow>

          <MenuRow
            activeOpacity={0.7}
            onPress={() => navigation.navigate('Privacy')}
          >
            <MenuText>개인정보 및 보안</MenuText>
            <Icon name="chevron-forward" size={16} color="#FF8933" />
          </MenuRow>

          <MenuRow
            activeOpacity={0.7}
            onPress={() => navigation.navigate('Trash')}
          >
            <MenuText>휴지통</MenuText>
            <Icon name="chevron-forward" size={16} color="#FF8933" />
          </MenuRow>
        </Card>

        <Card>
          <CardTitle>서비스</CardTitle>
          <MenuRow
            activeOpacity={0.7}
            onPress={() => navigation.navigate('Notice')}
          >
            <MenuText>공지사항</MenuText>
            <Icon name="chevron-forward" size={16} color="#FF8933" />
          </MenuRow>

          <MenuRow
            activeOpacity={0.7}
            onPress={() => navigation.navigate('CustomerCenter')}
          >
            <MenuText>고객센터</MenuText>
            <Icon name="chevron-forward" size={16} color="#FF8933" />
          </MenuRow>
        </Card>

        <Card>
          <CardTitle>계정</CardTitle>
          <MenuRow
            activeOpacity={0.7}
            onPress={() => navigation.navigate('Logout')}
          >
            <MenuText>로그아웃</MenuText>
            <Icon name="chevron-forward" size={16} color="#FF8933" />
          </MenuRow>

          <MenuRow
            activeOpacity={0.7}
            onPress={() => navigation.navigate('Withdrawal')}
          >
            <MenuText>탈퇴하기</MenuText>
            <Icon name="chevron-forward" size={16} color="#FF8933" />
          </MenuRow>
        </Card>

        <BottomPadding />
      </ScrollView>
    </SafeArea>
  );
}
