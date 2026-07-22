import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Image,
  Platform,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Header from '../../../components/Header';
import { useCurrentUser } from '../../../hooks/useCurrentUser';
import { useFileSelection } from '../../../hooks/useFileSelection';
import { uploadSelectedFileApi } from '../../../api/files';
import { FILE_PREFIXES } from '../../../utils/filePicker';

import {
  Container,
  KeyboardContainer,
  ScrollContainer,
  ProfileContainer,
  ProfileImageArea,
  ProfileImageWrapper,
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

export default function EditProfile({ navigation }) {
  const { user, isLoading, updateProfile } = useCurrentUser();
  const [nickname, setNickname] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    selectedFile: profileImage,
    isPicking,
    selectFile: selectProfileImage,
    clearFile: removeProfileImage,
  } = useFileSelection({ kind: 'image' });

  useEffect(() => {
    setNickname(user?.nickname ?? '');
  }, [user]);

  const handleSubmit = async () => {
    if (!nickname.trim()) {
      Alert.alert('알림', '닉네임을 입력해주세요.');
      return;
    }

    setIsSubmitting(true);
    try {
      const profileImageUrl = profileImage
        ? await uploadSelectedFileApi({
            prefix: FILE_PREFIXES.PROFILES,
            file: profileImage,
          })
        : user?.profileImageUrl;
      await updateProfile({
        nickname: nickname.trim(),
        profileImageUrl,
      });
      Alert.alert('완료', '내 정보가 수정되었습니다.', [
        { text: '확인', onPress: () => navigation.goBack() },
      ]);
    } catch (error) {
      Alert.alert(
        '오류',
        error.response?.data?.message ?? '내 정보 수정에 실패했습니다.',
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const isBusy = isLoading || isSubmitting || isPicking;
  const previewImageUrl = profileImage?.uri ?? user?.profileImageUrl;

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
          <ProfileContainer>
            <ProfileImageArea>
              <ProfileImageWrapper>
                {previewImageUrl ? (
                  <Image
                    source={{ uri: previewImageUrl }}
                    style={{ width: '100%', height: '100%' }}
                  />
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
              <Label>이름</Label>
              <Input value={user?.name ?? ''} editable={false} />
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
              <Label>전화번호</Label>
              <Input
                value={user?.phoneNumber ?? ''}
                editable={false}
                keyboardType="phone-pad"
              />
            </InputGroup>

            <SubmitButton
              activeOpacity={0.8}
              disabled={isBusy}
              onPress={handleSubmit}
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
