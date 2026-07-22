import React, { useEffect, useState } from 'react';
import { Alert, Image, Platform, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Header from '../../../components/Header';
import { useCurrentUser } from '../../../hooks/useCurrentUser';

import {
  Container,
  KeyboardContainer,
  ScrollContainer,
  ProfileContainer,
  ProfileImageWrapper,
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

  useEffect(() => {
    setNickname(user?.nickname ?? '');
  }, [user]);

  const handleSubmit = async () => {
    if (!nickname.trim()) {
      Alert.alert('알림', '닉네임을 입력해주세요.');
      return;
    }

    try {
      await updateProfile({
        nickname: nickname.trim(),
        profileImageUrl: user?.profileImageUrl,
      });
      Alert.alert('완료', '내 정보가 수정되었습니다.', [
        { text: '확인', onPress: () => navigation.goBack() },
      ]);
    } catch (error) {
      Alert.alert(
        '오류',
        error.response?.data?.message ?? '내 정보 수정에 실패했습니다.',
      );
    }
  };

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
            <ProfileImageWrapper>
              {user?.profileImageUrl ? (
                <Image
                  source={{ uri: user.profileImageUrl }}
                  style={{ width: '100%', height: '100%' }}
                />
              ) : (
                <Icon name="person" size={88} color="#AEAEB2" />
              )}
            </ProfileImageWrapper>
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
              disabled={isLoading}
              onPress={handleSubmit}
            >
              <SubmitText>확인</SubmitText>
            </SubmitButton>
          </FormContainer>
        </ScrollContainer>
      </KeyboardContainer>
    </Container>
  );
}
