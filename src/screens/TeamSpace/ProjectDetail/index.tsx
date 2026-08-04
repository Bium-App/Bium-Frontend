import React, { useMemo, useState } from 'react';
import {
  Alert,
  StatusBar,
  ScrollView,
  Modal,
  RefreshControl,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import Header from '../../../components/Header';
import AsyncState from '../../../components/AsyncState';
import DatePicker from 'react-native-date-picker';
import { useProjectDetail } from '../../../hooks/useProjectDetail';
import type {RootStackParamList} from '../../../types/navigation';

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
  EmptySectionText,
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
  ModalDeleteButton,
  ModalDeleteText,
  ModalBody,
  InputLabel,
  TitleInput,
  ContentInput,
  HelperText,
  Divider,
  ToggleRow,
  ToggleLabel,
  HeaderBackButton,
  NoticeAddButton,
  CustomToggle,
  ToggleCircle,
  DateRightWrapper,
  DateActionText,
} from './ProjectDetail.styles';

type ProjectDetailScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'ProjectDetail'
>;

export default function ProjectDetail({
  route,
  navigation,
}: ProjectDetailScreenProps) {
  // 이전 화면에서 전달받은 팀 고유 ID 추출
  const {projectId} = route.params;

  // 뷰모델 연결
  const {
    notices,
    todos,
    schedules,
    isLoading,
    errorMessage,
    fetchDashboardData,
    isNoticeModalVisible,
    editingNoticeId,
    noticeTitle,
    setNoticeTitle,
    noticeContent,
    setNoticeContent,
    isPinned,
    setIsPinned,
    isNoticeTitleFocused,
    setIsNoticeTitleFocused,
    isNoticeContentFocused,
    setIsNoticeContentFocused,
    openNoticeModal,
    closeNoticeModal,
    handleSaveNotice,
    deleteNotice,
    isTodoModalVisible,
    editingTodoId,
    todoTitle,
    setTodoTitle,
    todoContent,
    setTodoContent,
    isTodoTitleFocused,
    setIsTodoTitleFocused,
    isTodoContentFocused,
    setIsTodoContentFocused,
    isTodoNotiEnabled,
    setIsTodoNotiEnabled,
    date,
    setDate,
    isDatePickerOpen,
    setIsDatePickerOpen,
    selectedDateStr,
    setSelectedDateStr,
    openTodoModal,
    closeTodoModal,
    handleSaveTodo,
    deleteTodo,
    toggleTodo,
  } = useProjectDetail(projectId);
  const [searchQuery, setSearchQuery] = useState('');
  const hasDashboardData =
    notices.length > 0 || todos.length > 0 || schedules.length > 0;

  const normalizedSearchQuery = searchQuery.trim().toLowerCase();
  const filteredNotices = useMemo(
    () =>
      notices.filter(notice =>
        [notice.title, notice.content].some(value =>
          value?.toLowerCase().includes(normalizedSearchQuery),
        ),
      ),
    [normalizedSearchQuery, notices],
  );
  const filteredTodos = useMemo(
    () =>
      todos.filter(todo =>
        [todo.title, todo.content].some(value =>
          value?.toLowerCase().includes(normalizedSearchQuery),
        ),
      ),
    [normalizedSearchQuery, todos],
  );
  const filteredSchedules = useMemo(
    () =>
      schedules.filter(schedule =>
        schedule.title?.toLowerCase().includes(normalizedSearchQuery),
      ),
    [normalizedSearchQuery, schedules],
  );
  const hasFilteredDashboardData =
    filteredNotices.length > 0 ||
    filteredTodos.length > 0 ||
    filteredSchedules.length > 0;
  const showDashboardState =
    !hasDashboardData && (isLoading || Boolean(errorMessage));
  const showSearchEmpty =
    hasDashboardData &&
    normalizedSearchQuery.length > 0 &&
    !hasFilteredDashboardData;

  const confirmDeleteNotice = () => {
    Alert.alert('공지 삭제', '이 공지를 삭제하시겠습니까?', [
      { text: '취소', style: 'cancel' },
      { text: '삭제', style: 'destructive', onPress: deleteNotice },
    ]);
  };

  const confirmDeleteTodo = () => {
    Alert.alert('할일 삭제', '이 할일을 삭제하시겠습니까?', [
      { text: '취소', style: 'cancel' },
      { text: '삭제', style: 'destructive', onPress: deleteTodo },
    ]);
  };

  const backButton = (
    <HeaderBackButton onPress={() => navigation.goBack()} activeOpacity={0.8}>
      <Icon name="chevron-back" size={24} color="#FF8933" />
    </HeaderBackButton>
  );

  return (
    <Container>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      <Header title="프로젝트 상세" left={backButton} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={isLoading}
            onRefresh={fetchDashboardData}
            tintColor="#FF8933"
          />
        }
      >
        <SearchContainer>
          <Icon name="search-outline" size={20} color="#000000" />
          <SearchInput
            placeholder="검색"
            placeholderTextColor="#000000"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </SearchContainer>

        <TabContainer>
          <TabItem isActive={true} activeOpacity={1}>
            <TabText isActive={true}>홈</TabText>
          </TabItem>
          <TabSeparator />
          <TabItem
            isActive={false}
            onPress={() => navigation.replace('ProjectTodo', { projectId })}
            activeOpacity={0.7}
          >
            <TabText isActive={false}>할일</TabText>
          </TabItem>
          <TabSeparator />
          <TabItem
            isActive={false}
            onPress={() => navigation.replace('Schedule', { projectId })}
            activeOpacity={0.7}
          >
            <TabText isActive={false}>일정</TabText>
          </TabItem>
          <TabSeparator />
          <TabItem
            isActive={false}
            onPress={() => navigation.replace('Files', { projectId })}
            activeOpacity={0.7}
          >
            <TabText isActive={false}>파일</TabText>
          </TabItem>
        </TabContainer>

        {showDashboardState ? (
          <AsyncState
            isLoading={isLoading}
            errorMessage={errorMessage}
            emptyMessage="프로젝트에 등록된 내용이 없습니다."
            onRetry={fetchDashboardData}
          />
        ) : showSearchEmpty ? (
          <AsyncState emptyMessage="검색 결과가 없습니다." />
        ) : null}

        {!showDashboardState && !showSearchEmpty ? (
          <>
            <SectionContainer>
              <SectionHeader>
                <SectionTitle>공지사항</SectionTitle>
                <NoticeAddButton
                  onPress={() =>
                    navigation.navigate('AddNotice', { projectId })
                  }
                  activeOpacity={0.7}
                >
                  <PlusIcon width={16} height={16} color="#FF8933" />
                </NoticeAddButton>
              </SectionHeader>
              {filteredNotices.length === 0 ? (
                <EmptySectionText compact={true}>
                  등록된 공지가 없습니다.
                </EmptySectionText>
              ) : (
                filteredNotices.map(notice => (
                  <NoticeCard
                    key={notice.id}
                    activeOpacity={0.8}
                    onPress={() => openNoticeModal(notice)}
                  >
                    <NoticeIconWrapper>
                      <MegaphoneIcon width={27} height={23} color="#FF8933" />
                    </NoticeIconWrapper>
                    <NoticeContent>
                      <NoticeTitle>{notice.title}</NoticeTitle>
                      <NoticeDesc>{notice.content}</NoticeDesc>
                    </NoticeContent>
                    <NoticeTime>{notice.timeAgo}</NoticeTime>
                  </NoticeCard>
                ))
              )}
            </SectionContainer>

            <SectionContainer>
              <SectionHeader>
                <SectionTitle>할일 체크리스트</SectionTitle>
                <Icon name="ellipsis-horizontal" size={24} color="#FF8933" />
              </SectionHeader>
              <ListCard>
                {filteredTodos.length === 0 ? (
                  <EmptySectionText>
                    할 일이 없습니다.
                  </EmptySectionText>
                ) : (
                  filteredTodos.map((todo, index) => (
                    <TouchableListItem
                      key={todo.id}
                      isLast={index === filteredTodos.length - 1}
                      activeOpacity={0.7}
                      onPress={() => toggleTodo(todo.id)}
                      onLongPress={() => openTodoModal(todo)}
                    >
                      <ListIconWrapper>
                        <Icon
                          name={
                            todo.isDone ? 'checkbox-outline' : 'square-outline'
                          }
                          size={22}
                          color={todo.isDone ? '#FF8933' : '#A6A6A6'}
                        />
                      </ListIconWrapper>
                      <TodoItemText isDone={todo.isDone}>
                        {todo.title}
                      </TodoItemText>
                    </TouchableListItem>
                  ))
                )}
              </ListCard>

              <AddTodoButton
                activeOpacity={0.8}
                onPress={() => openTodoModal()}
              >
                <Icon name="add" size={15} color="#FFFFFF" />
                <AddTodoText>새로운 할 일 추가</AddTodoText>
              </AddTodoButton>
            </SectionContainer>

            <SectionContainer>
              <SectionHeader>
                <SectionTitle>일정</SectionTitle>
                <Icon name="ellipsis-horizontal" size={24} color="#FF8933" />
              </SectionHeader>
              <ListCard>
                {filteredSchedules.length === 0 ? (
                  <EmptySectionText>
                    등록된 일정이 없습니다.
                  </EmptySectionText>
                ) : (
                  filteredSchedules.map((schedule, index) => (
                    <ListItem
                      key={schedule.id}
                      isLast={index === filteredSchedules.length - 1}
                    >
                      <ListIconWrapper>
                        <CalendarIcon width={24} height={24} color="#FF8933" />
                      </ListIconWrapper>
                      <ListItemText>{schedule.title}</ListItemText>
                    </ListItem>
                  ))
                )}
              </ListCard>
            </SectionContainer>
          </>
        ) : null}
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
              <ModalTitleText>
                {editingNoticeId ? '공지 수정' : '공지 추가'}
              </ModalTitleText>
              <ModalHeaderButton
                disabled={isLoading}
                onPress={handleSaveNotice}
              >
                <ModalSaveText>저장</ModalSaveText>
              </ModalHeaderButton>
            </ModalHeader>

            <ModalBody>
              <InputLabel isFirst={true}>제목</InputLabel>
              <TitleInput
                placeholder="제목을 입력하세요."
                placeholderTextColor="#999999"
                value={noticeTitle}
                onChangeText={setNoticeTitle}
                isFocused={isNoticeTitleFocused}
                onFocus={() => setIsNoticeTitleFocused(true)}
                onBlur={() => setIsNoticeTitleFocused(false)}
              />

              <InputLabel isFirst={false}>내용</InputLabel>
              <ContentInput
                placeholder="내용을 입력하세요."
                placeholderTextColor="#999999"
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
                <CustomToggle
                  activeOpacity={0.8}
                  isOn={isPinned}
                  onPress={() => setIsPinned(!isPinned)}
                >
                  <ToggleCircle isOn={isPinned} />
                </CustomToggle>
              </ToggleRow>

              {editingNoticeId ? (
                <ModalDeleteButton
                  disabled={isLoading}
                  onPress={confirmDeleteNotice}
                  activeOpacity={0.7}
                >
                  <ModalDeleteText>공지 삭제</ModalDeleteText>
                </ModalDeleteButton>
              ) : null}
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
              <ModalTitleText>
                {editingTodoId ? '할일 수정' : '할일 추가'}
              </ModalTitleText>
              <ModalHeaderButton disabled={isLoading} onPress={handleSaveTodo}>
                <ModalSaveText>저장</ModalSaveText>
              </ModalHeaderButton>
            </ModalHeader>

            <ModalBody>
              <InputLabel isFirst={true}>제목</InputLabel>
              <TitleInput
                placeholder="제목을 입력하세요."
                placeholderTextColor="#999999"
                value={todoTitle}
                onChangeText={setTodoTitle}
                isFocused={isTodoTitleFocused}
                onFocus={() => setIsTodoTitleFocused(true)}
                onBlur={() => setIsTodoTitleFocused(false)}
              />

              <InputLabel isFirst={false}>내용</InputLabel>
              <ContentInput
                placeholder="내용을 입력하세요."
                placeholderTextColor="#999999"
                value={todoContent}
                onChangeText={setTodoContent}
                isFocused={isTodoContentFocused}
                onFocus={() => setIsTodoContentFocused(true)}
                onBlur={() => setIsTodoContentFocused(false)}
                editable={!isLoading}
              />

              <Divider isSpaced={true} />

              <ToggleRow>
                <ToggleLabel>날짜</ToggleLabel>
                <DateRightWrapper
                  activeOpacity={0.7}
                  disabled={isLoading}
                  onPress={() => setIsDatePickerOpen(true)}
                >
                  <CalendarIcon width={17} height={17} color="#FF8933" />
                  <DateActionText>
                    {selectedDateStr || '날짜 선택'}
                  </DateActionText>
                  <Icon name="chevron-forward" size={17} color="#999999" />
                </DateRightWrapper>
              </ToggleRow>

              <Divider isSpaced={false} />

              <ToggleRow>
                <ToggleLabel>알림 발송</ToggleLabel>
                <CustomToggle
                  activeOpacity={0.8}
                  disabled={isLoading}
                  isOn={isTodoNotiEnabled}
                  onPress={() => setIsTodoNotiEnabled(!isTodoNotiEnabled)}
                >
                  <ToggleCircle isOn={isTodoNotiEnabled} />
                </CustomToggle>
              </ToggleRow>

              {editingTodoId ? (
                <ModalDeleteButton
                  disabled={isLoading}
                  onPress={confirmDeleteTodo}
                  activeOpacity={0.7}
                >
                  <ModalDeleteText>할일 삭제</ModalDeleteText>
                </ModalDeleteButton>
              ) : null}
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
        onConfirm={selectedDate => {
          setIsDatePickerOpen(false);
          setDate(selectedDate);
          setSelectedDateStr(
            `${selectedDate.getFullYear()}년 ${
              selectedDate.getMonth() + 1
            }월 ${selectedDate.getDate()}일`,
          );
        }}
        onCancel={() => {
          setIsDatePickerOpen(false);
        }}
      />
    </Container>
  );
}
