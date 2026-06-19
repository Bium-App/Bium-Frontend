import React, { useState } from 'react';
import { StatusBar } from 'react-native';
import Header from '../../../components/Header';
import DatePicker from 'react-native-date-picker';
import Icon from 'react-native-vector-icons/Ionicons';
import CalendarIcon from '../../../assets/icons/ic_calendar.svg'; 
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
} from './AddSchedule.styles';

export default function AddSchedule({ navigation }) {
  const [scheduleTitle, setScheduleTitle] = useState('');
  const [scheduleMemo, setScheduleMemo] = useState('');
  const [isTitleFocused, setIsTitleFocused] = useState(false);
  const [isMemoFocused, setIsMemoFocused] = useState(false);
  const [date, setDate] = useState(new Date());
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [selectedDateStr, setSelectedDateStr] = useState('');
  const headerLeft = (
    <HeaderCancelButton onPress={() => navigation.goBack()} activeOpacity={0.7}>
      <HeaderCancelText>취소</HeaderCancelText>
    </HeaderCancelButton>
  );
  const headerRight = (
    <HeaderSaveButton onPress={() => navigation.goBack()} activeOpacity={0.7}>
      <HeaderSaveText>저장</HeaderSaveText>
    </HeaderSaveButton>
  );
  return (
    <Container>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <Header left={headerLeft} title="새로운 일정 추가" right={headerRight} />
      <ContentBody showsVerticalScrollIndicator={false}>
        <InputLabel isFirst={true}>일정 제목</InputLabel>
        <TitleInput
          placeholder="일정 내용"
          placeholderTextColor="#999999"
          value={scheduleTitle}
          onChangeText={setScheduleTitle}
          isFocused={isTitleFocused}
          onFocus={() => setIsTitleFocused(true)}
          onBlur={() => setIsTitleFocused(false)}
        />
        <InputLabel isFirst={false}>메모</InputLabel>
        <ContentInputMultiline
          multiline={true}
          placeholder="메모를 입력하시오..."
          placeholderTextColor="#999999"
          value={scheduleMemo}
          onChangeText={setScheduleMemo}
          isFocused={isMemoFocused}
          onFocus={() => setIsMemoFocused(true)}
          onBlur={() => setIsMemoFocused(false)}
        />
        <DateActionRow>
          <DateActionLabel>날짜</DateActionLabel>
          <DateActionBox activeOpacity={0.7} onPress={() => setIsDatePickerOpen(true)}>
            <DateActionBoxLeft>
              <CalendarIcon width={18} height={18} color="#FF8933" />
              <DateActionText>
                {selectedDateStr || '날짜 선택'}
              </DateActionText>
            </DateActionBoxLeft>
            <Icon name="chevron-forward" size={18} color="#FF8933" />
          </DateActionBox>
        </DateActionRow>
      </ContentBody>
      <DatePicker
        modal
        mode="date"
        open={isDatePickerOpen}
        date={date}
        title="날짜 선택"
        confirmText="확인"
        cancelText="닫기"
        onConfirm={(selectedDate) => {
          setIsDatePickerOpen(false);
          setDate(selectedDate);
          setSelectedDateStr(`${selectedDate.getFullYear()}년 ${selectedDate.getMonth() + 1}월 ${selectedDate.getDate()}일`);
        }}
        onCancel={() => {
          setIsDatePickerOpen(false);
        }}
      />
    </Container>
  );
}