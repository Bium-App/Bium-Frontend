import React, { useState } from 'react';
import { StatusBar } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Header from '../../../components/Header';
import DatePicker from 'react-native-date-picker';
import CalendarIcon from '../../../assets/icons/ic_calendar.svg';
import {
  Container,
  HeaderBackButton,
  ContentBody,
  TitleInputUnderline,
  DateDisplayRow,
  DateDisplayText,
  MemoCardContainer,
  MemoCardHeader,
  MemoCardTitle,
  MemoCardInput,
  BottomButtonArea,
  CompleteButton,
  CompleteButtonText,
  DeleteButton,
  DeleteButtonText
} from './EditSchedule.styles';

export default function EditSchedule({ navigation }) {
  const [scheduleTitle, setScheduleTitle] = useState('일정1');
  const [scheduleMemo, setScheduleMemo] = useState('일정1에 대한 메모 내용');
  const [isMemoFocused, setIsMemoFocused] = useState(false);
  const [date, setDate] = useState(new Date(2026, 3, 24));
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [selectedDateStr, setSelectedDateStr] = useState('2026년 4월 24일 (수)');
  const formatDateStr = (d) => {
    const days = ['일', '월', '화', '수', '목', '금', '토'];
    return `${d.getFullYear()}년 ${d.getMonth() + 1}월 ${d.getDate()}일 (${days[d.getDay()]})`;
  };
  const backButton = (
    <HeaderBackButton onPress={() => navigation.goBack()} activeOpacity={0.8}>
      <Icon name="chevron-back" size={26} color="#FF8933" />
    </HeaderBackButton>
  );
  return (
    <Container>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <Header left={backButton} title="일정 수정" />
      <ContentBody showsVerticalScrollIndicator={false}>
        <TitleInputUnderline
          value={scheduleTitle}
          onChangeText={setScheduleTitle}
        />
        <DateDisplayRow onPress={() => setIsDatePickerOpen(true)} activeOpacity={0.7}>
          <CalendarIcon width={18} height={18} color="#FF8933" />
          <DateDisplayText>{selectedDateStr}</DateDisplayText>
        </DateDisplayRow>
        <MemoCardContainer>
          <MemoCardHeader>
            <MemoCardTitle>메모</MemoCardTitle>
          </MemoCardHeader>
          <MemoCardInput
            multiline={true}
            placeholder="메모를 입력하세요..."
            placeholderTextColor="#999999"
            value={isMemoFocused && scheduleMemo === '일정1에 대한 메모 내용' ? '' : scheduleMemo}
            onChangeText={setScheduleMemo}
            isFocused={isMemoFocused}
            onFocus={() => setIsMemoFocused(true)}
            onBlur={() => setIsMemoFocused(false)}
            initialValueColor={!isMemoFocused}
          />
        </MemoCardContainer>
      </ContentBody>
      <BottomButtonArea>
        <CompleteButton activeOpacity={0.8} onPress={() => navigation.goBack()}>
          <CompleteButtonText>완료</CompleteButtonText>
        </CompleteButton>
        <DeleteButton activeOpacity={0.8} onPress={() => navigation.goBack()}>
          <Icon name="trash-outline" size={18} color="#FF0000" />
          <DeleteButtonText>삭제</DeleteButtonText>
        </DeleteButton>
      </BottomButtonArea>
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
          setSelectedDateStr(formatDateStr(selectedDate));
        }}
        onCancel={() => {
          setIsDatePickerOpen(false);
        }}
      />

    </Container>
  );
}