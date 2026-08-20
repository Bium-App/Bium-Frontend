import React, { useMemo, useState } from 'react';
import {
  Alert,
  StatusBar,
  ScrollView,
  Modal,
  RefreshControl,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import Header from '../../../components/Header';
import AsyncState from '../../../components/AsyncState';
import DatePicker from 'react-native-date-picker';
import { useProjectDetail } from '../../../hooks/useProjectDetail';
import { useTeamManagement } from '../../../hooks/useTeamManagement';
import { getApiErrorMessage, getErrorMessage } from '../../../utils/apiError';
import type { RootStackParamList } from '../../../types/navigation';
import type { TeamMember } from '../../../types/teamSpace';

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
  HeaderActionButton,
  NoticeAddButton,
  SectionMoreButton,
  InlineWarningButton,
  InlineWarningText,
  CustomToggle,
  ToggleCircle,
  DateRightWrapper,
  DateActionText,
  ManagementBody,
  TeamSummary,
  TeamSummaryRow,
  RenameIconButton,
  TeamSummaryTitle,
  TeamSummaryText,
  MemberList,
  MemberItem,
  MemberAvatar,
  MemberAvatarText,
  MemberInfo,
  MemberName,
  MemberIdText,
  RoleBadge,
  RoleText,
  ManagementHelpText,
  DeleteTeamButton,
  DeleteTeamText,
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
  const { projectId, projectName } = route.params;

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
    isNoticeNotiEnabled,
    setIsNoticeNotiEnabled,
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
  const {
    team,
    members,
    currentUserId,
    canManage,
    isLoading: isTeamLoading,
    errorMessage: teamErrorMessage,
    fetchTeamManagement,
    updateMemberRole,
    removeMember,
    deleteTeam,
    renameTeam,
  } = useTeamManagement(projectId);
  const resolvedProjectName = team?.name ?? projectName;
  const [searchQuery, setSearchQuery] = useState('');
  const [isManagementVisible, setManagementVisible] = useState(false);
  const [isRenameModalVisible, setRenameModalVisible] = useState(false);
  const [renameInput, setRenameInput] = useState('');
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

  const refreshAll = async (): Promise<void> => {
    await Promise.all([fetchDashboardData(), fetchTeamManagement()]);
  };

  const getActionErrorMessage = (error: unknown, fallback: string): string =>
    getApiErrorMessage(error, getErrorMessage(error) ?? fallback);

  const openMemberActions = (member: TeamMember): void => {
    if (!canManage) return;
    if (String(member.userId) === String(currentUserId)) {
      Alert.alert('팀원 관리', '본인의 역할은 이 화면에서 변경할 수 없습니다.');
      return;
    }
    if (member.teamMemberId === undefined || member.teamMemberId === null) {
      Alert.alert(
        '팀원 관리 불가',
        '서버의 팀원 목록 응답에 teamMemberId가 없어 역할 변경과 내보내기를 진행할 수 없습니다.',
      );
      return;
    }

    const nextRole = member.role === 'LEADER' ? 'MEMBER' : 'LEADER';
    Alert.alert('팀원 관리', member.nickname || `사용자 #${member.userId}`, [
      {
        text: nextRole === 'LEADER' ? '리더로 변경' : '멤버로 변경',
        onPress: async () => {
          try {
            await updateMemberRole(member, nextRole);
          } catch (error) {
            Alert.alert(
              '역할 변경 실패',
              getActionErrorMessage(error, '팀원 역할을 변경하지 못했습니다.'),
            );
          }
        },
      },
      {
        text: '팀에서 내보내기',
        style: 'destructive',
        onPress: () =>
          Alert.alert('팀원 내보내기', '이 팀원을 내보내시겠습니까?', [
            { text: '취소', style: 'cancel' },
            {
              text: '내보내기',
              style: 'destructive',
              onPress: async () => {
                try {
                  await removeMember(member);
                } catch (error) {
                  Alert.alert(
                    '내보내기 실패',
                    getActionErrorMessage(error, '팀원을 내보내지 못했습니다.'),
                  );
                }
              },
            },
          ]),
      },
      { text: '취소', style: 'cancel' },
    ]);
  };

  // Modal 두 개를 동시에 띄워두면(특히 iOS) 나중에 연 Modal이 화면에
  // 반영되지 않는 경우가 있어, 팀 관리 모달을 닫고 이름 수정 모달을 연다.
  const openRenameModal = (): void => {
    setRenameInput(team?.name ?? '');
    setManagementVisible(false);
    setRenameModalVisible(true);
  };

  const closeRenameModal = (): void => {
    setRenameModalVisible(false);
    setManagementVisible(true);
  };

  const handleRenameTeam = async (): Promise<void> => {
    const nextName = renameInput.trim();
    if (!nextName) return;
    try {
      await renameTeam(nextName);
      closeRenameModal();
    } catch (error) {
      Alert.alert(
        '이름 변경 실패',
        getActionErrorMessage(error, '팀 이름을 변경하지 못했습니다.'),
      );
    }
  };

  const confirmDeleteTeam = (): void => {
    Alert.alert(
      '팀 삭제',
      '팀의 공지, 할 일, 일정, 파일이 함께 삭제될 수 있습니다. 정말 삭제하시겠습니까?',
      [
        { text: '취소', style: 'cancel' },
        {
          text: '팀 삭제',
          style: 'destructive',
          onPress: async () => {
            try {
              await deleteTeam();
              setManagementVisible(false);
              navigation.goBack();
            } catch (error) {
              Alert.alert(
                '팀 삭제 실패',
                getActionErrorMessage(error, '팀을 삭제하지 못했습니다.'),
              );
            }
          },
        },
      ],
    );
  };

  const backButton = (
    <HeaderBackButton onPress={() => navigation.goBack()} activeOpacity={0.8}>
      <Icon name="chevron-back" size={24} color="#FF8933" />
    </HeaderBackButton>
  );

  const managementButton = (
    <HeaderActionButton
      accessibilityLabel="팀 관리"
      onPress={() => setManagementVisible(true)}
      activeOpacity={0.8}
    >
      <Icon name="settings-outline" size={22} color="#FF8933" />
    </HeaderActionButton>
  );

  return (
    <Container>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      <Header
        title={resolvedProjectName ?? '프로젝트 상세'}
        left={backButton}
        right={managementButton}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={isLoading || isTeamLoading}
            onRefresh={refreshAll}
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
            onPress={() =>
              navigation.replace('ProjectTodo', {
                projectId,
                projectName: resolvedProjectName,
              })
            }
            activeOpacity={0.7}
          >
            <TabText isActive={false}>할일</TabText>
          </TabItem>
          <TabSeparator />
          <TabItem
            isActive={false}
            onPress={() =>
              navigation.replace('Schedule', {
                projectId,
                projectName: resolvedProjectName,
              })
            }
            activeOpacity={0.7}
          >
            <TabText isActive={false}>일정</TabText>
          </TabItem>
          <TabSeparator />
          <TabItem
            isActive={false}
            onPress={() =>
              navigation.replace('Files', {
                projectId,
                projectName: resolvedProjectName,
              })
            }
            activeOpacity={0.7}
          >
            <TabText isActive={false}>파일</TabText>
          </TabItem>
        </TabContainer>

        {errorMessage && hasDashboardData ? (
          <InlineWarningButton onPress={fetchDashboardData} activeOpacity={0.8}>
            <InlineWarningText>
              일부 정보를 불러오지 못했습니다. 눌러서 다시 시도해주세요.{`\n`}
              {errorMessage}
            </InlineWarningText>
          </InlineWarningButton>
        ) : null}

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
                <SectionMoreButton
                  onPress={() =>
                    navigation.navigate('ProjectTodo', {
                      projectId,
                      projectName: resolvedProjectName,
                    })
                  }
                  activeOpacity={0.7}
                >
                  <Icon name="ellipsis-horizontal" size={20} color="#FF8933" />
                </SectionMoreButton>
              </SectionHeader>
              <ListCard>
                {filteredTodos.length === 0 ? (
                  <EmptySectionText>할 일이 없습니다.</EmptySectionText>
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
                <SectionMoreButton
                  onPress={() =>
                    navigation.navigate('Schedule', {
                      projectId,
                      projectName: resolvedProjectName,
                    })
                  }
                  activeOpacity={0.7}
                >
                  <Icon name="ellipsis-horizontal" size={20} color="#FF8933" />
                </SectionMoreButton>
              </SectionHeader>
              <ListCard>
                {filteredSchedules.length === 0 ? (
                  <EmptySectionText>등록된 일정이 없습니다.</EmptySectionText>
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

              <Divider isSpaced={false} />

              <ToggleRow>
                <ToggleLabel>알림 발송</ToggleLabel>
                <CustomToggle
                  activeOpacity={0.8}
                  disabled={isLoading}
                  isOn={isNoticeNotiEnabled}
                  onPress={() => setIsNoticeNotiEnabled(!isNoticeNotiEnabled)}
                >
                  <ToggleCircle isOn={isNoticeNotiEnabled} />
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

      <Modal
        visible={isManagementVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setManagementVisible(false)}
      >
        <ModalOverlay>
          <ModalContainer>
            <ModalHeader>
              <ModalHeaderButton onPress={() => setManagementVisible(false)}>
                <ModalCancelText>닫기</ModalCancelText>
              </ModalHeaderButton>
              <ModalTitleText>팀 관리</ModalTitleText>
              <ModalHeaderButton onPress={fetchTeamManagement}>
                <ModalSaveText>새로고침</ModalSaveText>
              </ModalHeaderButton>
            </ModalHeader>
            <ManagementBody showsVerticalScrollIndicator={false}>
              <TeamSummary>
                <TeamSummaryRow>
                  <TeamSummaryTitle>
                    {team?.name ?? '팀스페이스'}
                  </TeamSummaryTitle>
                  {canManage ? (
                    <RenameIconButton
                      accessibilityLabel="팀 이름 수정"
                      hitSlop={{ top: 8, right: 8, bottom: 8, left: 8 }}
                      onPress={openRenameModal}
                    >
                      <Icon name="pencil-outline" size={16} color="#FF8933" />
                    </RenameIconButton>
                  ) : null}
                </TeamSummaryRow>
                <TeamSummaryText>멤버 {members.length}명</TeamSummaryText>
              </TeamSummary>

              {isTeamLoading && members.length === 0 ? (
                <AsyncState isLoading={true} />
              ) : teamErrorMessage && members.length === 0 ? (
                <AsyncState
                  errorMessage={teamErrorMessage}
                  onRetry={fetchTeamManagement}
                />
              ) : members.length === 0 ? (
                <AsyncState emptyMessage="등록된 팀원이 없습니다." />
              ) : (
                <MemberList>
                  {members.map((member, index) => {
                    const isLeader = member.role === 'LEADER';
                    const isCurrent =
                      String(member.userId) === String(currentUserId);
                    return (
                      <MemberItem
                        key={String(member.teamMemberId ?? member.userId)}
                        isLast={index === members.length - 1}
                        disabled={!canManage}
                        onPress={() => openMemberActions(member)}
                        activeOpacity={canManage ? 0.7 : 1}
                      >
                        <MemberAvatar>
                          <MemberAvatarText>
                            {member.nickname?.charAt(0) || '?'}
                          </MemberAvatarText>
                        </MemberAvatar>
                        <MemberInfo>
                          <MemberName>
                            {member.nickname || `사용자 #${member.userId}`}
                            {isCurrent ? ' (나)' : ''}
                          </MemberName>
                          <MemberIdText>사용자 ID {member.userId}</MemberIdText>
                        </MemberInfo>
                        <RoleBadge isLeader={isLeader}>
                          <RoleText isLeader={isLeader}>
                            {isLeader ? '리더' : '멤버'}
                          </RoleText>
                        </RoleBadge>
                      </MemberItem>
                    );
                  })}
                </MemberList>
              )}

              {teamErrorMessage && members.length > 0 ? (
                <ManagementHelpText>{teamErrorMessage}</ManagementHelpText>
              ) : null}
              <ManagementHelpText>
                {canManage
                  ? '팀원을 누르면 역할 변경 또는 내보내기를 할 수 있습니다.'
                  : '팀 리더만 멤버 역할 변경, 내보내기, 팀 삭제를 할 수 있습니다.'}
              </ManagementHelpText>

              {canManage ? (
                <DeleteTeamButton
                  disabled={isTeamLoading}
                  onPress={confirmDeleteTeam}
                  activeOpacity={0.7}
                >
                  <DeleteTeamText>팀 삭제</DeleteTeamText>
                </DeleteTeamButton>
              ) : null}
            </ManagementBody>
          </ModalContainer>
        </ModalOverlay>
      </Modal>

      <Modal
        visible={isRenameModalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={closeRenameModal}
      >
        <ModalOverlay>
          <ModalContainer>
            <ModalHeader>
              <ModalHeaderButton onPress={closeRenameModal}>
                <ModalCancelText>취소</ModalCancelText>
              </ModalHeaderButton>
              <ModalTitleText>팀 이름 수정</ModalTitleText>
              <ModalHeaderButton onPress={handleRenameTeam}>
                <ModalSaveText>저장</ModalSaveText>
              </ModalHeaderButton>
            </ModalHeader>
            <ModalBody>
              <InputLabel isFirst={true}>팀 이름</InputLabel>
              <TitleInput
                isFocused={false}
                value={renameInput}
                onChangeText={setRenameInput}
                placeholder="팀 이름을 입력하세요."
                placeholderTextColor="#AAAAAA"
              />
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
