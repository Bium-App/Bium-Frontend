import React, { useState } from 'react';
import { Alert, StatusBar } from 'react-native';
import dayjs from 'dayjs';
import DatePicker from 'react-native-date-picker';
import Icon from 'react-native-vector-icons/Ionicons';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import Header from '../../../components/Header';
import CalendarIcon from '../../../assets/icons/ic_calendar.svg';
import {
  createScheduleApi,
  deleteScheduleApi,
  updateScheduleApi,
} from '../../../api/schedules';
import { formatApiDateTime } from '../../../utils/dateTime';
import {
  getApiResponseMessage,
  getErrorMessage,
} from '../../../utils/apiError';
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

type SelectedDateField = 'start' | 'end' | null;

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
  const scheduleId = scheduleData?.scheduleId ?? scheduleData?.id;
  const [scheduleTitle, setScheduleTitle] = useState(scheduleData?.title ?? '');
  const [scheduleContent, setScheduleContent] = useState(
    scheduleData?.content ?? '',
  );
  const [isTitleFocused, setIsTitleFocused] = useState(false);
  const [isContentFocused, setIsContentFocused] = useState(false);
  const [startAt, setStartAt] = useState(
    scheduleData?.startAt ? new Date(scheduleData.startAt) : new Date(),
  );
  const [endAt, setEndAt] = useState(
    scheduleData?.endAt
      ? new Date(scheduleData.endAt)
      : dayjs().add(1, 'hour').toDate(),
  );
  const [selectedField, setSelectedField] =
    useState<SelectedDateField>(null);
  const [hasStartAt, setHasStartAt] = useState(Boolean(scheduleData?.startAt));
  const [hasEndAt, setHasEndAt] = useState(Boolean(scheduleData?.endAt));
  const [isLoading, setIsLoading] = useState(false);

  const handleSave = async () => {
    if (!projectId && !scheduleId) {
      Alert.alert('오류', '팀 정보를 찾을 수 없습니다.');
      return;
    }
    if (!scheduleTitle.trim() || !hasStartAt || !hasEndAt) {
      Alert.alert('알림', '일정 제목과 시작·종료 시간을 입력해주세요.');
      return;
    }
    if (!dayjs(endAt).isAfter(startAt)) {
      Alert.alert('알림', '종료 시간은 시작 시간보다 늦어야 합니다.');
      return;
    }

    setIsLoading(true);
    try {
      const schedule = {
        title: scheduleTitle.trim(),
        content: scheduleContent.trim(),
        startAt: formatApiDateTime(startAt),
        endAt: formatApiDateTime(endAt),
      };
      if (scheduleId) {
        await updateScheduleApi(scheduleId, schedule);
      } else {
        await createScheduleApi({
          teamSpaceId: Number(projectId),
          ...schedule,
        });
      }
      navigation.goBack();
    } catch (error) {
      Alert.alert(
        '오류',
        getApiResponseMessage(error) ??
          getErrorMessage(error) ??
          '일정을 저장하지 못했습니다.',
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = () => {
    if (!scheduleId || isLoading) return;
    Alert.alert('일정 삭제', '이 일정을 삭제하시겠습니까?', [
      { text: '취소', style: 'cancel' },
      {
        text: '삭제',
        style: 'destructive',
        onPress: async () => {
          setIsLoading(true);
          try {
            await deleteScheduleApi(scheduleId);
            navigation.goBack();
          } catch (error) {
            Alert.alert(
              '오류',
              getApiResponseMessage(error) ?? '일정을 삭제하지 못했습니다.',
            );
          } finally {
            setIsLoading(false);
          }
        },
      },
    ]);
  };

  const selectDate = (selectedDate: Date) => {
    if (selectedField === 'start') {
      setStartAt(selectedDate);
      setHasStartAt(true);
      if (!dayjs(endAt).isAfter(selectedDate)) {
        setEndAt(dayjs(selectedDate).add(1, 'hour').toDate());
      }
    } else {
      setEndAt(selectedDate);
      setHasEndAt(true);
    }
    setSelectedField(null);
  };

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
