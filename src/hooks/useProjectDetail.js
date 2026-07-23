import { useCallback, useState } from 'react';
import { Alert } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import dayjs from 'dayjs';
import {
  createTeamNoticeApi,
  createTeamTodoApi,
  deleteTeamNoticeApi,
  deleteTeamTodoApi,
  getTeamNoticeApi,
  getTeamNoticesApi,
  getTeamTodosApi,
  toggleTeamTodoApi,
  updateTeamNoticeApi,
  updateTeamTodoApi,
} from '../api/teamSpaces';
import { getTeamSchedulesApi } from '../api/schedules';
import { getApiErrorMessage } from '../utils/apiError';

const getMonthParams = () => ({
  year: dayjs().year(),
  month: dayjs().month() + 1,
});

export const useProjectDetail = projectId => {
  const [notices, setNotices] = useState([]);
  const [todos, setTodos] = useState([]);
  const [schedules, setSchedules] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const [isNoticeModalVisible, setNoticeModalVisible] = useState(false);
  const [editingNoticeId, setEditingNoticeId] = useState(null);
  const [noticeTitle, setNoticeTitle] = useState('');
  const [noticeContent, setNoticeContent] = useState('');
  const [isPinned, setIsPinned] = useState(false);
  const [isNoticeTitleFocused, setIsNoticeTitleFocused] = useState(false);
  const [isNoticeContentFocused, setIsNoticeContentFocused] = useState(false);

  const [isTodoModalVisible, setTodoModalVisible] = useState(false);
  const [editingTodoId, setEditingTodoId] = useState(null);
  const [todoTitle, setTodoTitle] = useState('');
  const [todoContent, setTodoContent] = useState('');
  const [isTodoTitleFocused, setIsTodoTitleFocused] = useState(false);
  const [isTodoContentFocused, setIsTodoContentFocused] = useState(false);
  const [isTodoNotiEnabled, setIsTodoNotiEnabled] = useState(false);
  const [todoIsChecked, setTodoIsChecked] = useState(false);
  const [date, setDate] = useState(new Date());
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [selectedDateStr, setSelectedDateStr] = useState('');

  const fetchDashboardData = useCallback(async () => {
    if (!projectId) return;
    setIsLoading(true);
    setErrorMessage('');
    try {
      const { year, month } = getMonthParams();
      const [noticeData, todoData, scheduleData] = await Promise.all([
        getTeamNoticesApi(projectId),
        getTeamTodosApi(projectId),
        getTeamSchedulesApi(projectId, year, month),
      ]);
      setNotices(
        noticeData.map(notice => ({
          id: String(notice.noticeId),
          title: notice.title,
          content: notice.content ?? '',
          isPinned: notice.isPinned,
          timeAgo: notice.updatedAt
            ? dayjs(notice.updatedAt).format('M월 D일')
            : '',
        })),
      );
      setTodos(
        todoData.map(todo => ({
          id: String(todo.todoId),
          title: todo.title,
          content: todo.content,
          dueDate: todo.dueDate,
          sendPush: todo.sendPush,
          isDone: todo.isChecked,
        })),
      );
      setSchedules(
        scheduleData.map(schedule => ({
          id: String(schedule.scheduleId),
          title: schedule.title,
          startAt: schedule.startAt,
          endAt: schedule.endAt,
        })),
      );
    } catch (error) {
      setErrorMessage(
        getApiErrorMessage(error, '대시보드 데이터를 불러오지 못했습니다.'),
      );
    } finally {
      setIsLoading(false);
    }
  }, [projectId]);

  useFocusEffect(
    useCallback(() => {
      fetchDashboardData();
    }, [fetchDashboardData]),
  );

  const closeNoticeModal = () => {
    setNoticeModalVisible(false);
    setEditingNoticeId(null);
    setNoticeTitle('');
    setNoticeContent('');
    setIsPinned(false);
    setIsNoticeTitleFocused(false);
    setIsNoticeContentFocused(false);
  };

  const openNoticeModal = async notice => {
    if (!notice) {
      setNoticeModalVisible(true);
      return;
    }

    setIsLoading(true);
    try {
      const detailResponse = await getTeamNoticeApi(notice.id);
      const detail = Array.isArray(detailResponse)
        ? detailResponse[0] ?? {}
        : detailResponse;
      setEditingNoticeId(notice.id);
      setNoticeTitle(detail.title ?? notice.title);
      setNoticeContent(detail.content ?? '');
      setIsPinned(detail.isPinned ?? notice.isPinned);
      setNoticeModalVisible(true);
    } catch (error) {
      Alert.alert(
        '오류',
        error.response?.data?.message ??
          '공지 상세 내용을 불러오지 못했습니다.',
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveNotice = async () => {
    if (!noticeTitle.trim() || !noticeContent.trim() || !projectId) return;
    if (isLoading) return;
    setIsLoading(true);
    try {
      if (editingNoticeId) {
        await updateTeamNoticeApi(editingNoticeId, {
          title: noticeTitle.trim(),
          content: noticeContent.trim(),
          isPinned,
        });
      } else {
        await createTeamNoticeApi(projectId, {
          title: noticeTitle.trim(),
          content: noticeContent.trim(),
          isPinned,
        });
      }
      closeNoticeModal();
      await fetchDashboardData();
    } catch (error) {
      Alert.alert(
        '오류',
        error.response?.data?.message ?? '공지사항 저장에 실패했습니다.',
      );
    } finally {
      setIsLoading(false);
    }
  };

  const deleteNotice = async () => {
    if (!editingNoticeId) return;
    if (isLoading) return;
    setIsLoading(true);
    try {
      await deleteTeamNoticeApi(editingNoticeId);
      closeNoticeModal();
      await fetchDashboardData();
    } catch (error) {
      Alert.alert(
        '오류',
        error.response?.data?.message ?? '공지사항 삭제에 실패했습니다.',
      );
    } finally {
      setIsLoading(false);
    }
  };

  const closeTodoModal = () => {
    setTodoModalVisible(false);
    setEditingTodoId(null);
    setTodoTitle('');
    setTodoContent('');
    setSelectedDateStr('');
    setIsTodoNotiEnabled(false);
    setTodoIsChecked(false);
    setIsTodoTitleFocused(false);
    setIsTodoContentFocused(false);
  };

  const openTodoModal = todo => {
    if (todo) {
      setEditingTodoId(todo.id);
      setTodoTitle(todo.title);
      setTodoContent(todo.content);
      setIsTodoNotiEnabled(todo.sendPush);
      setTodoIsChecked(todo.isDone);
      if (todo.dueDate) {
        const dueDate = dayjs(todo.dueDate);
        setDate(dueDate.toDate());
        setSelectedDateStr(dueDate.format('YYYY년 M월 D일'));
      }
    }
    setTodoModalVisible(true);
  };

  const handleSaveTodo = async () => {
    if (!todoTitle.trim() || !projectId) return;
    if (!editingTodoId && !todoContent.trim()) return;
    if (isLoading) return;
    setIsLoading(true);
    try {
      const todo = {
        title: todoTitle.trim(),
        content: todoContent.trim(),
        dueDate: selectedDateStr ? dayjs(date).format('YYYY-MM-DD') : null,
        sendPush: isTodoNotiEnabled,
      };
      if (editingTodoId) {
        await updateTeamTodoApi(editingTodoId, {
          title: todo.title,
          isChecked: todoIsChecked,
        });
      } else {
        await createTeamTodoApi(projectId, todo);
      }
      closeTodoModal();
      await fetchDashboardData();
    } catch (error) {
      Alert.alert(
        '오류',
        error.response?.data?.message ?? '할 일 저장에 실패했습니다.',
      );
    } finally {
      setIsLoading(false);
    }
  };

  const deleteTodo = async () => {
    if (!editingTodoId) return;
    if (isLoading) return;
    setIsLoading(true);
    try {
      await deleteTeamTodoApi(editingTodoId);
      closeTodoModal();
      await fetchDashboardData();
    } catch (error) {
      Alert.alert(
        '오류',
        error.response?.data?.message ?? '할 일 삭제에 실패했습니다.',
      );
    } finally {
      setIsLoading(false);
    }
  };

  const toggleTodo = async todoId => {
    try {
      const todo = todos.find(item => item.id === String(todoId));
      await toggleTeamTodoApi(todoId, todo?.title, !todo?.isDone);
      fetchDashboardData();
    } catch (error) {
      Alert.alert(
        '오류',
        error.response?.data?.message ?? '상태 변경에 실패했습니다.',
      );
    }
  };

  return {
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
  };
};
