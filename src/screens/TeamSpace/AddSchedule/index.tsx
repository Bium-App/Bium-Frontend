import React from 'react';
import {StatusBar} from 'react-native';
import dayjs from 'dayjs';
import DatePicker from 'react-native-date-picker';
import Icon from 'react-native-vector-icons/Ionicons';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import Header from '../../../components/Header';
import CalendarIcon from '../../../assets/icons/ic_calendar.svg';
import {useAddSchedule} from '../../../hooks/useAddSchedule';
import type {RootStackParamList} from '../../../types/navigation';
import {
  Container,
  HeaderCancelButton,
  HeaderCancelText,
  HeaderSaveButton,
  HeaderSaveText,
  ContentBody,
  InputLabel,
  TitleInput,
  ContentInputMultiline,
  DateActionRow,
  DateActionLabel,
  DateActionBox,
  DateActionBoxLeft,
  DateActionText,
  DeleteButton,
  DeleteText,
} from './AddSchedule.styles';

type AddScheduleScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'AddSchedule'
>;

const formatDisplayDateTime = (date: Date): string =>
  dayjs(date).format('YYYY년 M월 D일 HH:mm');

export default function AddSchedule({
  route,
  navigation,
}: AddScheduleScreenProps) {
  const {projectId, scheduleData} = route.params;
  const {
    scheduleId,
    scheduleTitle,
    setScheduleTitle,
    scheduleContent,
    setScheduleContent,
    isTitleFocused,
    setIsTitleFocused,
    isContentFocused,
    setIsContentFocused,
    startAt,
    endAt,
    selectedField,
    setSelectedField,
    hasStartAt,
    hasEndAt,
    isLoading,
    handleSave,
    handleDelete,
    selectDate,
  } = useAddSchedule({
    projectId,
    initialData: scheduleData,
    onSuccess: () => navigation.goBack(),
  });

  return (
    <Container>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <Header
        left={
          <HeaderCancelButton
            onPress={() => navigation.goBack()}
            activeOpacity={0.7}
          >
            <HeaderCancelText>취소</HeaderCancelText>
          </HeaderCancelButton>
        }
        title={scheduleId ? '일정 수정' : '새로운 일정 추가'}
        right={
          <HeaderSaveButton
            disabled={isLoading}
            onPress={handleSave}
            activeOpacity={0.7}
          >
            <HeaderSaveText>저장</HeaderSaveText>
          </HeaderSaveButton>
        }
      />
      <ContentBody showsVerticalScrollIndicator={false}>
        <InputLabel isFirst={true}>일정 제목</InputLabel>
        <TitleInput
          placeholder="일정 제목"
          placeholderTextColor="#999999"
          value={scheduleTitle}
          onChangeText={setScheduleTitle}
          isFocused={isTitleFocused}
          onFocus={() => setIsTitleFocused(true)}
          onBlur={() => setIsTitleFocused(false)}
        />
        <InputLabel isFirst={false}>일정 내용</InputLabel>
        <ContentInputMultiline
          multiline
          placeholder="일정 내용을 입력해주세요."
          placeholderTextColor="#999999"
          value={scheduleContent}
          onChangeText={setScheduleContent}
          isFocused={isContentFocused}
          onFocus={() => setIsContentFocused(true)}
          onBlur={() => setIsContentFocused(false)}
          editable={!isLoading}
        />
        <DateActionRow>
          <DateActionLabel>시작</DateActionLabel>
          <DateActionBox
            activeOpacity={0.7}
            onPress={() => setSelectedField('start')}
          >
            <DateActionBoxLeft>
              <CalendarIcon width={18} height={18} color="#FF8933" />
              <DateActionText>
                {hasStartAt ? formatDisplayDateTime(startAt) : '시작 시간 선택'}
              </DateActionText>
            </DateActionBoxLeft>
            <Icon name="chevron-forward" size={18} color="#FF8933" />
          </DateActionBox>
        </DateActionRow>
        <DateActionRow>
          <DateActionLabel>종료</DateActionLabel>
          <DateActionBox
            activeOpacity={0.7}
            onPress={() => setSelectedField('end')}
          >
            <DateActionBoxLeft>
              <CalendarIcon width={18} height={18} color="#FF8933" />
              <DateActionText>
                {hasEndAt ? formatDisplayDateTime(endAt) : '종료 시간 선택'}
              </DateActionText>
            </DateActionBoxLeft>
            <Icon name="chevron-forward" size={18} color="#FF8933" />
          </DateActionBox>
        </DateActionRow>
        {scheduleId ? (
          <DeleteButton
            activeOpacity={0.7}
            disabled={isLoading}
            onPress={handleDelete}
          >
            <DeleteText>일정 삭제</DeleteText>
          </DeleteButton>
        ) : null}
      </ContentBody>
      <DatePicker
        modal
        mode="datetime"
        open={Boolean(selectedField)}
        date={selectedField === 'end' ? endAt : startAt}
        title={selectedField === 'end' ? '종료 시간 선택' : '시작 시간 선택'}
        confirmText="확인"
        cancelText="닫기"
        onConfirm={selectDate}
        onCancel={() => setSelectedField(null)}
      />
    </Container>
  );
}
