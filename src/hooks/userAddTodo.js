import { useState } from 'react';
import { Alert } from 'react-native';
import dayjs from 'dayjs';
import { createTeamTodoApi, updateTeamTodoApi } from '../api/teamSpaces';
import { getUserId } from '../utils/authStorage';

export const useAddTodo = (projectId, navigation, initialData) => {
  const initialDueDate = initialData?.dueDate
    ? dayjs(initialData.dueDate)
    : null;
  const [todoTitle, setTodoTitle] = useState(initialData?.title ?? '');
  const [todoContent, setTodoContent] = useState(initialData?.content ?? '');
  const [date, setDate] = useState(initialDueDate?.toDate() ?? new Date());
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [selectedDateStr, setSelectedDateStr] = useState(
    initialDueDate?.format('YYYY년 M월 D일') ?? '',
  );
  const [isTodoNotiEnabled, setIsTodoNotiEnabled] = useState(
    initialData?.sendPush ?? false,
  );
  const [isLoading, setIsLoading] = useState(false);

  // 할 일 저장 요청
  const handleSaveTodo = async () => {
    if (!todoTitle.trim()) {
      Alert.alert('알림', '제목을 입력하세요.');
      return;
    }

    if (!todoContent.trim()) {
      Alert.alert('알림', '내용을 입력하세요.');
      return;
    }

    if (isLoading) return;
    setIsLoading(true);

    try {
      const todo = {
        title: todoTitle.trim(),
        content: todoContent.trim(),
        dueDate: selectedDateStr ? dayjs(date).format('YYYY-MM-DD') : null,
        sendPush: isTodoNotiEnabled,
      };
      if (initialData?.id) {
        await updateTeamTodoApi(initialData.id, todo);
      } else {
        const userId = await getUserId();
        if (!userId || !projectId) {
          Alert.alert('오류', '팀 또는 사용자 정보를 찾을 수 없습니다.');
          return;
        }
        await createTeamTodoApi(projectId, Number(userId), todo);
      }
      // 저장 성공 시 이전 화면으로 복귀
      navigation.goBack();
    } catch (error) {
      Alert.alert(
        '오류',
        error.response?.data?.message ?? '할 일을 저장하지 못했습니다.',
      );
    } finally {
      setIsLoading(false);
    }
  };

  return {
    todoTitle,
    setTodoTitle,
    todoContent,
    setTodoContent,
    date,
    setDate,
    isDatePickerOpen,
    setIsDatePickerOpen,
    selectedDateStr,
    setSelectedDateStr,
    isTodoNotiEnabled,
    setIsTodoNotiEnabled,
    isLoading,
    handleSaveTodo,
  };
};
