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
import { getApiErrorMessage, getApiResponseMessage } from '../utils/apiError';
import type { EntityId } from '../types/api';
import type { ProjectTodoItem } from './useProjectTodo';

export interface DashboardNoticeItem {
  id: string;
  title: string;
  content: string;
  isPinned: boolean;
  timeAgo: string;
}

export interface DashboardScheduleItem {
  id: string;
  title: string;
  startAt: string;
  endAt: string;
}

const getMonthParams = (): { year: number; month: number } => ({
  year: dayjs().year(),
  month: dayjs().month() + 1,
});

export const useProjectDetail = (projectId?: EntityId) => {
  const [notices, setNotices] = useState<DashboardNoticeItem[]>([]);
  const [todos, setTodos] = useState<ProjectTodoItem[]>([]);
  const [schedules, setSchedules] = useState<DashboardScheduleItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const [isNoticeModalVisible, setNoticeModalVisible] = useState(false);
  const [editingNoticeId, setEditingNoticeId] = useState<string | null>(null);
  const [noticeTitle, setNoticeTitle] = useState('');
  const [noticeContent, setNoticeContent] = useState('');
  const [isPinned, setIsPinned] = useState(false);
  const [isNoticeNotiEnabled, setIsNoticeNotiEnabled] = useState(false);
  const [isNoticeTitleFocused, setIsNoticeTitleFocused] = useState(false);
  const [isNoticeContentFocused, setIsNoticeContentFocused] = useState(false);

  const [isTodoModalVisible, setTodoModalVisible] = useState(false);
  const [editingTodoId, setEditingTodoId] = useState<string | null>(null);
  const [todoTitle, setTodoTitle] = useState('');
  const [todoContent, setTodoContent] = useState('');
  const [isTodoTitleFocused, setIsTodoTitleFocused] = useState(false);
  const [isTodoContentFocused, setIsTodoContentFocused] = useState(false);
  const [isTodoNotiEnabled, setIsTodoNotiEnabled] = useState(false);
  const [todoIsChecked, setTodoIsChecked] = useState(false);
  const [date, setDate] = useState(new Date());
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [selectedDateStr, setSelectedDateStr] = useState('');

  const fetchDashboardData = useCallback(async (): Promise<void> => {
    if (!projectId) return;
    setIsLoading(true);
    setErrorMessage('');
    const { year, month } = getMonthParams();
    const [noticeResult, todoResult, scheduleResult] = await Promise.allSettled(
      [
        getTeamNoticesApi(projectId),
        getTeamTodosApi(projectId),
        getTeamSchedulesApi(projectId, year, month),
      ],
    );

    if (noticeResult.status === 'fulfilled') {
      setNotices(
        noticeResult.value.map(notice => ({
          id: String(notice.noticeId),
          title: notice.title,
          content: notice.content ?? '',
          isPinned: notice.isPinned,
          timeAgo: notice.updatedAt
            ? dayjs(notice.updatedAt).format('M월 D일')
            : '',
        })),
      );
    }
    if (todoResult.status === 'fulfilled') {
      setTodos(
        todoResult.value.map(todo => ({
          id: String(todo.todoId),
          title: todo.title,
          content: todo.content,
          dueDate: todo.dueDate,
          sendPush: todo.sendPush,
          isDone: todo.isChecked,
        })),
      );
    }
    if (scheduleResult.status === 'fulfilled') {
      setSchedules(
        scheduleResult.value.map(schedule => ({
          id: String(schedule.scheduleId),
          title: schedule.title,
          startAt: schedule.startAt,
          endAt: schedule.endAt,
        })),
      );
    }

    const failedResult = [noticeResult, todoResult, scheduleResult].find(
      result => result.status === 'rejected',
    );
    if (failedResult?.status === 'rejected') {
      setErrorMessage(
        getApiErrorMessage(
          failedResult.reason,
          '일부 대시보드 데이터를 불러오지 못했습니다.',
        ),
      );
    }
    setIsLoading(false);
  }, [projectId]);

  useFocusEffect(
    useCallback(() => {
      fetchDashboardData();
    }, [fetchDashboardData]),
  );

  const closeNoticeModal = (): void => {
    setNoticeModalVisible(false);
    setEditingNoticeId(null);
    setNoticeTitle('');
    setNoticeContent('');
    setIsPinned(false);
    setIsNoticeNotiEnabled(false);
    setIsNoticeTitleFocused(false);
    setIsNoticeContentFocused(false);
  };

  const openNoticeModal = async (
    notice?: DashboardNoticeItem,
  ): Promise<void> => {
    if (!notice) {
      setNoticeModalVisible(true);
      return;
    }

    setIsLoading(true);
    try {
      const detail = await getTeamNoticeApi(notice.id);
      setEditingNoticeId(notice.id);
      setNoticeTitle(detail?.title ?? notice.title);
      setNoticeContent(detail?.content ?? '');
      setIsPinned(detail?.isPinned ?? notice.isPinned);
      setIsNoticeNotiEnabled(false);
      setNoticeModalVisible(true);
    } catch (error) {
      Alert.alert(
        '오류',
        getApiResponseMessage(error) ?? '공지 상세 내용을 불러오지 못했습니다.',
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveNotice = async (): Promise<void> => {
    if (!noticeTitle.trim() || !noticeContent.trim() || !projectId) return;
    if (isLoading) return;
    setIsLoading(true);
    try {
      const notice = {
        title: noticeTitle.trim(),
        content: noticeContent.trim(),
        isPinned,
      };
      if (editingNoticeId) await updateTeamNoticeApi(editingNoticeId, notice);
      else await createTeamNoticeApi(projectId, notice);
      closeNoticeModal();
      await fetchDashboardData();
    } catch (error) {
      Alert.alert(
        '오류',
        getApiResponseMessage(error) ?? '공지사항 저장에 실패했습니다.',
      );
    } finally {
      setIsLoading(false);
    }
  };

  const deleteNotice = async (): Promise<void> => {
    if (!editingNoticeId || isLoading) return;
    setIsLoading(true);
    try {
      await deleteTeamNoticeApi(editingNoticeId);
      closeNoticeModal();
      await fetchDashboardData();
    } catch (error) {
      Alert.alert(
        '오류',
        getApiResponseMessage(error) ?? '공지사항 삭제에 실패했습니다.',
      );
    } finally {
      setIsLoading(false);
    }
  };

  const closeTodoModal = (): void => {
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

  const openTodoModal = (todo?: ProjectTodoItem): void => {
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

  const handleSaveTodo = async (): Promise<void> => {
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
          ...todo,
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
        getApiResponseMessage(error) ?? '할 일 저장에 실패했습니다.',
      );
    } finally {
      setIsLoading(false);
    }
  };

  const deleteTodo = async (): Promise<void> => {
    if (!editingTodoId || isLoading) return;
    setIsLoading(true);
    try {
      await deleteTeamTodoApi(editingTodoId);
      closeTodoModal();
      await fetchDashboardData();
    } catch (error) {
      Alert.alert(
        '오류',
        getApiResponseMessage(error) ?? '할 일 삭제에 실패했습니다.',
      );
    } finally {
      setIsLoading(false);
    }
  };

  const toggleTodo = async (todoId: EntityId): Promise<void> => {
    try {
      const todo = todos.find(item => item.id === String(todoId));
      if (!todo) throw new Error('할 일 정보를 찾을 수 없습니다.');
      await toggleTeamTodoApi(todoId, {
        title: todo.title,
        content: todo.content,
        dueDate: todo.dueDate,
        sendPush: todo.sendPush,
        isChecked: !todo.isDone,
      });
      fetchDashboardData();
    } catch (error) {
      Alert.alert(
        '오류',
        getApiResponseMessage(error) ?? '상태 변경에 실패했습니다.',
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
  };
};
