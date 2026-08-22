import React from 'react';
import type {MyPageTabScreenProps} from '../../../types/navigation';
import {ActivityIndicator, ScrollView} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useTranslation} from 'react-i18next';
import { useCurrentUser } from '../../../hooks/useCurrentUser';
import AsyncState from '../../../components/AsyncState';
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
  BottomPadding,
} from './MyPageMain.styles';

// 마이페이지 메인 화면. 프로필 요약과 설정/서비스/계정 메뉴로 각 하위 화면 진입을 제공한다.
export default function MyPageMain({navigation}: MyPageTabScreenProps) {
  const {t} = useTranslation();
  const {user, isLoading, errorMessage, fetchUser} = useCurrentUser();

  return (
    <SafeArea>
      <ScrollView showsVerticalScrollIndicator={false}>
        <ProfileSection>
          <ProfileImageWrapper>
            {user?.profileImageUrl ? (
              <ProfileImage source={{uri: user.profileImageUrl}} />
            ) : (
              <Icon name="person" size={57} color="#AEAEB2" />
            )}
          </ProfileImageWrapper>
          {isLoading && !user ? (
            <ActivityIndicator color="#FF8933" />
          ) : errorMessage && !user ? (
            <AsyncState
              errorMessage={errorMessage}
              onRetry={fetchUser}
            />
          ) : (
            <UserName>{user?.nickname || t('common.user')}</UserName>
          )}
          <EditProfileButton
            activeOpacity={0.7}
            onPress={() => navigation.navigate('EditProfile')}
          >
            <EditProfileText>{t('my_page.edit_profile')}</EditProfileText>
          </EditProfileButton>
        </ProfileSection>

        <Card>
          <CardTitle>{t('my_page.settings')}</CardTitle>
          <MenuRow
            activeOpacity={0.7}
            onPress={() => navigation.navigate('Language')}
          >
            <MenuText>{t('language_region')}</MenuText>
            <Icon name="chevron-forward" size={16} color="#FF8933" />
          </MenuRow>

          <MenuRow
            activeOpacity={0.7}
            onPress={() => navigation.navigate('SettingNotification')}
          >
            <MenuText>{t('common.notification')}</MenuText>
            <Icon name="chevron-forward" size={16} color="#FF8933" />
          </MenuRow>

          <MenuRow
            activeOpacity={0.7}
            onPress={() => navigation.navigate('Privacy')}
          >
            <MenuText>{t('my_page.privacy_security')}</MenuText>
            <Icon name="chevron-forward" size={16} color="#FF8933" />
          </MenuRow>

          <MenuRow
            activeOpacity={0.7}
            onPress={() => navigation.navigate('Trash')}
          >
            <MenuText>{t('my_page.trash')}</MenuText>
            <Icon name="chevron-forward" size={16} color="#FF8933" />
          </MenuRow>
        </Card>

        <Card>
          <CardTitle>{t('my_page.service')}</CardTitle>
          <MenuRow
            activeOpacity={0.7}
            onPress={() => navigation.navigate('Notice')}
          >
            <MenuText>{t('my_page.notices')}</MenuText>
            <Icon name="chevron-forward" size={16} color="#FF8933" />
          </MenuRow>

          <MenuRow
            activeOpacity={0.7}
            onPress={() => navigation.navigate('CustomerCenter')}
          >
            <MenuText>{t('my_page.customer_center')}</MenuText>
            <Icon name="chevron-forward" size={16} color="#FF8933" />
          </MenuRow>
        </Card>

        <Card>
          <CardTitle>{t('my_page.account')}</CardTitle>
          <MenuRow
            activeOpacity={0.7}
            onPress={() => navigation.navigate('Logout')}
          >
            <MenuText>{t('my_page.logout')}</MenuText>
            <Icon name="chevron-forward" size={16} color="#FF8933" />
          </MenuRow>

          <MenuRow
            activeOpacity={0.7}
            onPress={() => navigation.navigate('Withdrawal')}
          >
            <MenuText>{t('my_page.withdrawal')}</MenuText>
            <Icon name="chevron-forward" size={16} color="#FF8933" />
          </MenuRow>
        </Card>

        <BottomPadding />
      </ScrollView>
    </SafeArea>
  );
}
