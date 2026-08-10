import React from 'react';
import type {RootScreenProps} from '../../../types/navigation';
import {
  ActivityIndicator,
  Platform,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
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

export default function EditProfile({navigation}: RootScreenProps<'EditProfile'>) {
  const {
    user,
    nickname,
    setNickname,
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
        left={
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            activeOpacity={0.7}
          >
            <Icon name="chevron-back-outline" size={24} color="#FF8933" />
          </TouchableOpacity>
        }
        title="내 정보 수정"
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
                accessibilityLabel="프로필 이미지 선택"
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
            <ProfileHint>이미지 최대 10MB</ProfileHint>
            <ProfileActionRow>
              <ProfileActionButton
                disabled={isBusy}
                onPress={selectProfileImage}
              >
                <ProfileActionText>사진 변경</ProfileActionText>
              </ProfileActionButton>
              {profileImage ? (
                <ProfileActionButton
                  disabled={isBusy}
                  onPress={removeProfileImage}
                >
                  <ProfileActionText muted={true}>선택 취소</ProfileActionText>
                </ProfileActionButton>
              ) : null}
            </ProfileActionRow>
          </ProfileContainer>

          <FormContainer>
            <InputGroup>
              <Label>이름</Label>
              <Input value={user?.name ?? ''} editable={false} />
            </InputGroup>

            <InputGroup>
              <Label>닉네임</Label>
              <Input
                placeholder="사용자"
                placeholderTextColor="#AAAAAA"
                value={nickname}
                onChangeText={setNickname}
              />
            </InputGroup>

            <InputGroup>
              <Label>사용자 번호</Label>
              <Input
                value={user?.userId ? String(user.userId) : ''}
                editable={false}
              />
            </InputGroup>

            <InputGroup>
              <Label>이메일</Label>
              <Input
                value={user?.email ?? ''}
                editable={false}
                keyboardType="email-address"
              />
            </InputGroup>

            <InputGroup>
              <Label>휴대폰 번호</Label>
              <Input
                value={user?.phoneNumber ?? ''}
                editable={false}
                keyboardType="phone-pad"
              />
            </InputGroup>

            <SubmitButton
              activeOpacity={0.8}
              disabled={isBusy}
              onPress={() => handleSubmit(() => navigation.goBack())}
            >
              {isSubmitting ? (
                <ActivityIndicator color="#FFFFFF" size="small" />
              ) : (
                <SubmitText>확인</SubmitText>
              )}
            </SubmitButton>
          </FormContainer>
        </ScrollContainer>
      </KeyboardContainer>
    </Container>
  );
}
