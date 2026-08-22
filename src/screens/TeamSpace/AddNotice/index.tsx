import React from 'react';
import { ActivityIndicator, Platform, Switch } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import Header from '../../../components/Header';
import { useAddNotice } from '../../../hooks/useAddNotice';
import type {RootStackParamList} from '../../../types/navigation';
import {
  Container,
  Content,
  ContentContainer,
  ContentInput,
  HeaderButton,
  Label,
  SaveText,
  TitleInput,
  ToggleDescription,
  ToggleRow,
  ToggleTextContainer,
  ToggleTitle,
} from './AddNotice.styles';

type AddNoticeScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'AddNotice'
>;

// 팀 스페이스 공지를 작성하는 화면. 제목/내용과 상단 고정 여부를 입력받아 저장한다.
export default function AddNotice({route, navigation}: AddNoticeScreenProps) {
  const {projectId} = route.params;
  const {
    title,
    setTitle,
    content,
    setContent,
    isPinned,
    setIsPinned,
    isLoading,
    saveNotice,
  } = useAddNotice(projectId, navigation);

  return (
    <Container>
      <Header
        title="공지 추가"
        left={
          <HeaderButton activeOpacity={0.7} onPress={() => navigation.goBack()}>
            <Icon name="chevron-back" size={24} color="#FF8933" />
          </HeaderButton>
        }
        right={
          <HeaderButton
            activeOpacity={0.7}
            disabled={isLoading}
            onPress={saveNotice}
          >
            {isLoading ? (
              <ActivityIndicator size="small" color="#FF8933" />
            ) : (
              <SaveText>저장</SaveText>
            )}
          </HeaderButton>
        }
      />

      <ContentContainer
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <Content>
          <Label>제목</Label>
          <TitleInput
            value={title}
            onChangeText={setTitle}
            placeholder="공지 제목"
            placeholderTextColor="#999999"
            maxLength={100}
          />

          <Label>내용</Label>
          <ContentInput
            value={content}
            onChangeText={setContent}
            placeholder="공지 내용을 입력하세요."
            placeholderTextColor="#999999"
            multiline
            textAlignVertical="top"
          />

          <ToggleRow>
            <ToggleTextContainer>
              <ToggleTitle>상단 고정</ToggleTitle>
              <ToggleDescription>
                중요한 공지를 목록 위에 표시합니다.
              </ToggleDescription>
            </ToggleTextContainer>
            <Switch
              value={isPinned}
              onValueChange={setIsPinned}
              trackColor={{ false: '#E8E8E8', true: '#FF8933' }}
              thumbColor="#FFFFFF"
            />
          </ToggleRow>
        </Content>
      </ContentContainer>
    </Container>
  );
}
