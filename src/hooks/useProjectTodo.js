import { useCallback, useState } from 'react';
import { Alert } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import {
  deleteTeamTodoApi,
  getTeamTodosApi,
  toggleTeamTodoApi,
} from '../api/teamSpaces';

export const useProjectTodo = projectId => {
  const [todos, setTodos] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const fetchTodos = useCallback(async () => {
    if (!projectId) return;
    setIsLoading(true);
    try {
      const data = await getTeamTodosApi(projectId);
      const keyword = searchQuery.trim().toLowerCase();
      setTodos(
        data
          .map(todo => ({
            id: String(todo.todoId),
            title: todo.title,
            content: todo.content,
            dueDate: todo.dueDate,
            sendPush: todo.sendPush,
            isDone: todo.isChecked,
          }))
          .filter(
            todo =>
              !keyword ||
              todo.title.toLowerCase().includes(keyword) ||
              todo.content.toLowerCase().includes(keyword),
          ),
      );
    } catch (error) {
      Alert.alert(
        '오류',
        error.response?.data?.message ?? '할 일을 불러오지 못했습니다.',
      );
    } finally {
      setIsLoading(false);
    }
  }, [projectId, searchQuery]);

  useFocusEffect(
    useCallback(() => {
      fetchTodos();
    }, [fetchTodos]),
  );

  const handleToggleTodo = async todoId => {
    setTodos(current =>
      current.map(todo =>
        todo.id === todoId ? { ...todo, isDone: !todo.isDone } : todo,
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
        error.response?.data?.message ?? '상태 변경에 실패했습니다.',
      );
      fetchTodos();
    }
  };

  const handleDeleteTodo = async todoId => {
    try {
      await deleteTeamTodoApi(todoId);
      await fetchTodos();
    } catch (error) {
      Alert.alert(
        '오류',
        error.response?.data?.message ?? '할 일을 삭제하지 못했습니다.',
      );
    }
  };

  return {
    todos,
    searchQuery,
    setSearchQuery,
    isLoading,
    handleToggleTodo,
    handleDeleteTodo,
    fetchTodos,
  };
};
