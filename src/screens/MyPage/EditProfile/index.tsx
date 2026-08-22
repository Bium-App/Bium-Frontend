import React from 'react';
import type {RootScreenProps} from '../../../types/navigation';
import {
  ActivityIndicator,
  Platform,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useTranslation} from 'react-i18next';
import Header from '../../../components/Header';
import AsyncState from '../../../components/AsyncState';
import {useEditProfile} from '../../../hooks/useEditProfile';

import {
  Container,
  KeyboardContainer,
  ScrollContainer,
  ProfileContainer,
  ProfileImageArea,
  ProfileImageWrapper,
  ProfileImage,
  BadgeWrapper,
  ProfileActionButton,
  ProfileActionRow,
  ProfileActionText,
  ProfileHint,
  FormContainer,
  InputGroup,
  Label,
  Input,
  SubmitButton,
  SubmitText,
} from './EditProfile.styles';

// 프로필 수정 화면. 신규 가입 온보딩과 마이페이지 진입 양쪽에서 재사용되며,
// 온보딩 경로일 때는 뒤로가기 버튼을 숨기고 완료 시 메인 탭으로 이동한다.
export default function EditProfile({
  navigation,
  route,
}: RootScreenProps<'EditProfile'>) {
  const {t} = useTranslation();
  const isOnboarding = route.params?.onboarding === true;
  const {
    user,
    name,
    setName,
    nickname,
    setNickname,
    email,
    setEmail,
    phoneNumber,
    setPhoneNumber,
    profileImage,
    selectProfileImage,
    removeProfileImage,
    isPicking,
    isSubmitting,
    isBusy,
    errorMessage,
    fetchUser,
    previewImageUrl,
    handleSubmit,
  } = useEditProfile();

  return (
    <Container>
      <Header
        left={isOnboarding ? undefined : (
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            activeOpacity={0.7}
          >
            <Icon name="chevron-back-outline" size={24} color="#FF8933" />
          </TouchableOpacity>
        )}
        title={t('my_page.edit_profile')}
      />

      <KeyboardContainer
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollContainer showsVerticalScrollIndicator={false}>
          {errorMessage && !user ? (
            <AsyncState errorMessage={errorMessage} onRetry={fetchUser} />
          ) : null}
          <ProfileContainer>
            <ProfileImageArea>
              <ProfileImageWrapper>
                {previewImageUrl ? (
                  <ProfileImage source={{uri: previewImageUrl}} />
                ) : (
                  <Icon name="person" size={88} color="#AEAEB2" />
                )}
              </ProfileImageWrapper>
              <BadgeWrapper
                accessibilityLabel={t('profile.select_image')}
                disabled={isBusy}
                onPress={selectProfileImage}
              >
                {isPicking ? (
                  <ActivityIndicator color="#FFFFFF" size="small" />
                ) : (
                  <Icon name="camera" size={15} color="#FFFFFF" />
                )}
              </BadgeWrapper>
            </ProfileImageArea>
            <ProfileHint>{t('profile.image_limit')}</ProfileHint>
            <ProfileActionRow>
              <ProfileActionButton
                disabled={isBusy}
                onPress={selectProfileImage}
              >
                <ProfileActionText>{t('profile.change_photo')}</ProfileActionText>
              </ProfileActionButton>
              {profileImage ? (
                <ProfileActionButton
                  disabled={isBusy}
                  onPress={removeProfileImage}
                >
                  <ProfileActionText muted={true}>{t('profile.cancel_selection')}</ProfileActionText>
                </ProfileActionButton>
              ) : null}
            </ProfileActionRow>
          </ProfileContainer>

          <FormContainer>
            <InputGroup>
              <Label>{t('auth.name')}</Label>
              <Input
                value={name}
                onChangeText={setName}
                editable={!isBusy}
                autoCapitalize="words"
              />
            </InputGroup>

            <InputGroup>
              <Label>{t('auth.nickname')}</Label>
              <Input
                placeholder={t('common.user')}
                placeholderTextColor="#AAAAAA"
                value={nickname}
                onChangeText={setNickname}
                editable={!isBusy}
              />
            </InputGroup>

            <InputGroup>
              <Label>{t('profile.user_number')}</Label>
              <Input
                value={user?.userId ? String(user.userId) : ''}
                editable={false}
              />
            </InputGroup>

            <InputGroup>
              <Label>{t('common.email')}</Label>
              <Input
                value={email}
                onChangeText={setEmail}
                editable={!isBusy}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
              />
            </InputGroup>

            <InputGroup>
              <Label>{t('auth.phone_number')}</Label>
              <Input
                value={phoneNumber}
                onChangeText={setPhoneNumber}
                editable={!isBusy}
                keyboardType="phone-pad"
              />
            </InputGroup>

            <SubmitButton
              activeOpacity={0.8}
              disabled={isBusy}
              onPress={() =>
                handleSubmit(() => {
                  if (isOnboarding) {
                    navigation.reset({
                      index: 0,
                      routes: [{name: 'MainTabs'}],
                    });
                  } else {
                    navigation.goBack();
                  }
                })
              }
            >
              {isSubmitting ? (
                <ActivityIndicator color="#FFFFFF" size="small" />
              ) : (
                <SubmitText>{t('common.confirm')}</SubmitText>
              )}
            </SubmitButton>
          </FormContainer>
        </ScrollContainer>
      </KeyboardContainer>
    </Container>
  );
}
