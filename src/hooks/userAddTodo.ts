import {useState} from 'react';
import {Alert} from 'react-native';
import dayjs from 'dayjs';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {createTeamTodoApi, updateTeamTodoApi} from '../api/teamSpaces';
import {getApiResponseMessage} from '../utils/apiError';
import type {EntityId} from '../types/api';
import type {RootStackParamList, TeamTodoRouteData} from '../types/navigation';

type Navigation = NativeStackNavigationProp<RootStackParamList, 'AddTodo'>;

export const useAddTodo = (
  projectId: EntityId | undefined,
  navigation: Navigation,
  initialData?: TeamTodoRouteData,
) => {
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

  const handleSaveTodo = async (): Promise<void> => {
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
      const todoId = initialData?.id ?? initialData?.todoId;
      if (todoId) {
        await updateTeamTodoApi(todoId, {
          ...todo,
          isChecked: initialData?.isDone ?? initialData?.isChecked ?? false,
        });
      } else {
        if (!projectId) throw new Error('팀 정보를 찾을 수 없습니다.');
        await createTeamTodoApi(projectId, todo);
      }
      navigation.goBack();
    } catch (error) {
      Alert.alert(
        '오류',
        getApiResponseMessage(error) ?? '할 일을 저장하지 못했습니다.',
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
