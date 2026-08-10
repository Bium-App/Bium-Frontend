import {useCallback, useMemo, useState} from 'react';
import {Alert} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import {
  deleteTeamTodoApi,
  getTeamTodosApi,
  toggleTeamTodoApi,
} from '../api/teamSpaces';
import {getApiErrorMessage, getApiResponseMessage} from '../utils/apiError';
import type {EntityId} from '../types/api';

export interface ProjectTodoItem {
  id: string;
  title: string;
  content: string;
  dueDate: string | null;
  sendPush: boolean;
  isDone: boolean;
}

export const useProjectTodo = (projectId?: EntityId) => {
  const [allTodos, setAllTodos] = useState<ProjectTodoItem[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const fetchTodos = useCallback(async (): Promise<void> => {
    if (!projectId) return;
    setIsLoading(true);
    setErrorMessage('');
    try {
      const data = await getTeamTodosApi(projectId);
      setAllTodos(
        data.map(todo => ({
          id: String(todo.todoId),
          title: todo.title,
          content: todo.content,
          dueDate: todo.dueDate,
          sendPush: todo.sendPush,
          isDone: todo.isChecked,
        })),
      );
    } catch (error) {
      setErrorMessage(
        getApiErrorMessage(error, '할 일을 불러오지 못했습니다.'),
      );
    } finally {
      setIsLoading(false);
    }
  }, [projectId]);

  useFocusEffect(
    useCallback(() => {
      fetchTodos();
    }, [fetchTodos]),
  );

  const todos = useMemo(() => {
    const keyword = searchQuery.trim().toLowerCase();
    if (!keyword) return allTodos;
    return allTodos.filter(
      todo =>
        todo.title.toLowerCase().includes(keyword) ||
        todo.content.toLowerCase().includes(keyword),
    );
  }, [allTodos, searchQuery]);

  const handleToggleTodo = async (todoId: EntityId): Promise<void> => {
    setAllTodos(current =>
      current.map(todo =>
        todo.id === String(todoId) ? {...todo, isDone: !todo.isDone} : todo,
      ),
    );
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
    } catch (error) {
      Alert.alert(
        '오류',
        getApiResponseMessage(error) ?? '상태 변경에 실패했습니다.',
      );
      fetchTodos();
    }
  };

  const handleDeleteTodo = async (todoId: EntityId): Promise<void> => {
    try {
      await deleteTeamTodoApi(todoId);
      await fetchTodos();
    } catch (error) {
      Alert.alert(
        '오류',
        getApiResponseMessage(error) ?? '할 일을 삭제하지 못했습니다.',
      );
    }
  };

  return {
    todos,
    searchQuery,
    setSearchQuery,
    isLoading,
    errorMessage,
    hasTodos: allTodos.length > 0,
    handleToggleTodo,
    handleDeleteTodo,
    fetchTodos,
  };
};
