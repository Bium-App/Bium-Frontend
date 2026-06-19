import React, { useState } from 'react';
import { StatusBar, ScrollView, Modal } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Header from '../../../components/Header'; 
import DatePicker from 'react-native-date-picker';

import MegaphoneIcon from '../../../assets/icons/ic_megaphone.svg';
import CalendarIcon from '../../../assets/icons/ic_calendar.svg';
import PlusIcon from '../../../assets/icons/ic_plus.svg';

import {
  Container,
  SearchContainer,
  SearchInput,
  TabContainer,
  TabItem,
  TabSeparator,
  TabText,
  SectionContainer,
  SectionHeader,
  SectionTitle,
  NoticeCard,
  NoticeIconWrapper,
  NoticeContent,
  NoticeTitle,
  NoticeDesc,
  NoticeTime,
  ListCard,
  ListItem,
  TouchableListItem,
  ListIconWrapper,
  ListItemText,
  TodoItemText,
  AddTodoButton,
  AddTodoText,
  ModalOverlay,
  ModalContainer,
  ModalHeader,
  ModalHeaderButton,
  ModalCancelText,
  ModalTitleText,
  ModalSaveText,
  ModalBody,
  InputLabel,
  TitleInput,
  ContentInput,
  ContentInputMultiline,
  HelperText,
  Divider,
  ToggleRow,
  ToggleLabel,
  HeaderBackButton,
  NoticeAddButton,
  SmallSwitch,
  DateActionRow,
  DateActionLabel,
  DateActionBox,
  DateActionBoxLeft,
  DateActionText
} from './ProjectDetail.styles';

export default function ProjectDetail({ navigation }) {
  const [todos, setTodos] = useState([
    { id: 1, title: '할 일 제목 1', isDone: false },
    { id: 2, title: '할 일 제목 2', isDone: false },
    { id: 3, title: '할 일 제목 3', isDone: false },
  ]);

  const toggleTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isDone: !todo.isDone } : todo
      )
    );
  };

  const [isNoticeModalVisible, setNoticeModalVisible] = useState(false);
  const [noticeTitle, setNoticeTitle] = useState('');
  const [noticeContent, setNoticeContent] = useState('');
  const [isPinned, setIsPinned] = useState(false); 
  const [isNotiEnabled, setIsNotiEnabled] = useState(false); 
  
  const [isNoticeTitleFocused, setIsNoticeTitleFocused] = useState(false);
  const [isNoticeContentFocused, setIsNoticeContentFocused] = useState(false);

  const [isTodoModalVisible, setTodoModalVisible] = useState(false);
  const [todoTitle, setTodoTitle] = useState('');
  const [todoContent, setTodoContent] = useState('');
  
  const [isTodoTitleFocused, setIsTodoTitleFocused] = useState(false);
  const [isTodoContentFocused, setIsTodoContentFocused] = useState(false);

  const [date, setDate] = useState(new Date());
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [selectedDateStr, setSelectedDateStr] = useState(''); 

  const openNoticeModal = () => setNoticeModalVisible(true);
  const closeNoticeModal = () => {
    setNoticeModalVisible(false);
    setNoticeTitle('');
    setNoticeContent('');
    setIsPinned(false);
    setIsNotiEnabled(false);
    setIsNoticeTitleFocused(false);
    setIsNoticeContentFocused(false);
  };

  const openTodoModal = () => setTodoModalVisible(true);
  const closeTodoModal = () => {
    setTodoModalVisible(false);
    setTodoTitle('');
    setTodoContent('');
    setIsTodoTitleFocused(false);
    setIsTodoContentFocused(false);
    setSelectedDateStr('');
  };

  const dummySchedules = [
    { id: 1, title: '일정1' },
    { id: 2, title: '일정2' },
    { id: 3, title: '일정3' },
  ];

  const backButton = (
    <HeaderBackButton onPress={() => navigation.goBack()} activeOpacity={0.8}>
      <Icon name="chevron-back" size={26} color="#FF8933" />
    </HeaderBackButton>
  );

  return (
    <Container>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      
      <Header title="프로젝트1" left={backButton} />

      <ScrollView showsVerticalScrollIndicator={false}>
        
        <SearchContainer>
          <Icon name="search-outline" size={20} color="#000000" />
          <SearchInput placeholder="검색" placeholderTextColor="#000000" />
        </SearchContainer>

        <TabContainer>
          <TabItem isActive={true} activeOpacity={1}>
            <TabText isActive={true}>홈</TabText>
          </TabItem>
          <TabSeparator />
          
          <TabItem isActive={false} onPress={() => navigation.replace('ProjectTodo')} activeOpacity={0.7}>
            <TabText isActive={false}>할일</TabText>
          </TabItem>
          <TabSeparator />

          <TabItem isActive={false} onPress={() => navigation.replace('Schedule')} activeOpacity={0.7}>
            <TabText isActive={false}>일정</TabText>
          </TabItem>
          <TabSeparator />

          <TabItem isActive={false} onPress={() => navigation.replace('Files')} activeOpacity={0.7}>
            <TabText isActive={false}>파일</TabText>
          </TabItem>
        </TabContainer>

        <SectionContainer>
          <SectionHeader>
            <SectionTitle>공지사항</SectionTitle>
            <NoticeAddButton onPress={openNoticeModal} activeOpacity={0.7}>
              <PlusIcon width={16} height={16} color="#FF8933" />
            </NoticeAddButton>
          </SectionHeader>
          <NoticeCard activeOpacity={0.8}>
            <NoticeIconWrapper>
              <MegaphoneIcon width={24} height={24} color="#FF8933" />
            </NoticeIconWrapper>
            <NoticeContent>
              <NoticeTitle>공지 제목</NoticeTitle>
              <NoticeDesc>공지 내용</NoticeDesc>
            </NoticeContent>
            <NoticeTime>2시간전</NoticeTime>
          </NoticeCard>
        </SectionContainer>

        <SectionContainer>
          <SectionHeader>
            <SectionTitle>할일 체크리스트</SectionTitle>
            <Icon name="ellipsis-horizontal" size={20} color="#FF8933" />
          </SectionHeader>
          <ListCard>
            {todos.map((todo, index) => (
              <TouchableListItem 
                key={todo.id} 
                isLast={index === todos.length - 1} 
                activeOpacity={0.7}
                onPress={() => toggleTodo(todo.id)} 
              >
                <ListIconWrapper>
                  <Icon 
                    name={todo.isDone ? "checkbox-outline" : "square-outline"} 
                    size={22} 
                    color={todo.isDone ? "#FF8933" : "#A6A6A6"} 
                  />
                </ListIconWrapper>
                <TodoItemText isDone={todo.isDone}>{todo.title}</TodoItemText>
              </TouchableListItem>
            ))}
          </ListCard>
          
          <AddTodoButton activeOpacity={0.8} onPress={openTodoModal}>
            <Icon name="add" size={20} color="#FFFFFF" />
            <AddTodoText>새로운 할 일 추가</AddTodoText>
          </AddTodoButton>
        </SectionContainer>

        <SectionContainer>
          <SectionHeader>
            <SectionTitle>일정</SectionTitle>
            <Icon name="ellipsis-horizontal" size={20} color="#FF8933" />
          </SectionHeader>
          <ListCard>
            {dummySchedules.map((schedule, index) => (
              <ListItem key={schedule.id} isLast={index === dummySchedules.length - 1}>
                <ListIconWrapper>
                  <CalendarIcon width={20} height={20} color="#FF8933" />
                </ListIconWrapper>
                <ListItemText>{schedule.title}</ListItemText>
              </ListItem>
            ))}
          </ListCard>
        </SectionContainer>
        
      </ScrollView>

      <Modal
        visible={isNoticeModalVisible} 
        transparent={true} 
        animationType="fade" 
        onRequestClose={closeNoticeModal}
      >
        <ModalOverlay>
          <ModalContainer>
            <ModalHeader>
              <ModalHeaderButton onPress={closeNoticeModal}>
                <ModalCancelText>취소</ModalCancelText>
              </ModalHeaderButton>
              <ModalTitleText>공지 추가</ModalTitleText>
              <ModalHeaderButton onPress={closeNoticeModal}>
                <ModalSaveText>저장</ModalSaveText>
              </ModalHeaderButton>
            </ModalHeader>

            <ModalBody>
              <InputLabel isFirst={true}>제목</InputLabel>
              <TitleInput
                placeholder="제목을 입력하세요."
                placeholderTextColor="#AAAAAA" 
                value={noticeTitle}
                onChangeText={setNoticeTitle}
                isFocused={isNoticeTitleFocused} 
                onFocus={() => setIsNoticeTitleFocused(true)} 
                onBlur={() => setIsNoticeTitleFocused(false)} 
              />

              <InputLabel isFirst={false}>내용</InputLabel>
              <ContentInput
                placeholder="내용을 입력하세요."
                placeholderTextColor="#AAAAAA"
                value={noticeContent}
                onChangeText={setNoticeContent}
                isFocused={isNoticeContentFocused}
                onFocus={() => setIsNoticeContentFocused(true)}
                onBlur={() => setIsNoticeContentFocused(false)}
              />
              <HelperText>모두에게 표시됩니다.</HelperText>

              <Divider isSpaced={true} />

              <ToggleRow>
                <ToggleLabel>고정</ToggleLabel>
                <SmallSwitch
                  trackColor={{ false: '#E5E5E5', true: '#FF8933' }} 
                  thumbColor="#FFFFFF" 
                  ios_backgroundColor="#E5E5E5" 
                  onValueChange={setIsPinned}
                  value={isPinned}
                />
              </ToggleRow>

              <Divider isSpaced={false} />

              <ToggleRow>
                <ToggleLabel>알림 발송</ToggleLabel>
                <SmallSwitch
                  trackColor={{ false: '#E5E5E5', true: '#FF8933' }}
                  thumbColor="#FFFFFF"
                  ios_backgroundColor="#E5E5E5"
                  onValueChange={setIsNotiEnabled}
                  value={isNotiEnabled}
                />
              </ToggleRow>
            </ModalBody>
          </ModalContainer>
        </ModalOverlay>
      </Modal>

      <Modal
        visible={isTodoModalVisible}
        transparent={true}
        animationType="slide" 
        onRequestClose={closeTodoModal}
      >
        <ModalOverlay>
          <ModalContainer>
            <ModalHeader>
              <ModalHeaderButton onPress={closeTodoModal}>
                <ModalCancelText>취소</ModalCancelText>
              </ModalHeaderButton>
              <ModalTitleText>할일 추가</ModalTitleText>
              <ModalHeaderButton onPress={closeTodoModal}>
                <ModalSaveText>저장</ModalSaveText>
              </ModalHeaderButton>
            </ModalHeader>

            <ModalBody>
              <InputLabel isFirst={true}>제목</InputLabel>
              <TitleInput
                placeholder="일정 제목"
                placeholderTextColor="#999999"
                value={todoTitle}
                onChangeText={setTodoTitle}
                isFocused={isTodoTitleFocused}
                onFocus={() => setIsTodoTitleFocused(true)}
                onBlur={() => setIsTodoTitleFocused(false)}
              />

              <InputLabel isFirst={false}>내용</InputLabel>
              <ContentInputMultiline 
                multiline={true} 
                placeholder="내용을 입력하시오..."
                placeholderTextColor="#AAAAAA"
                value={todoContent}
                onChangeText={setTodoContent}
                isFocused={isTodoContentFocused}
                onFocus={() => setIsTodoContentFocused(true)}
                onBlur={() => setIsTodoContentFocused(false)}
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
            </ModalBody>
          </ModalContainer>
        </ModalOverlay>
      </Modal>

      <DatePicker
        modal 
        mode="date" 
        open={isDatePickerOpen}
        date={date} 
        title="날짜 선택"
        confirmText="확인" 
        cancelText="취소" 
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