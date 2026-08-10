import React from 'react';
import {
  Alert,
  StatusBar,
  ScrollView,
  RefreshControl,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import Header from '../../../components/Header';
import AsyncState from '../../../components/AsyncState';
import { useProjectTodo } from '../../../hooks/useProjectTodo';
import type {ProjectTodoItem} from '../../../hooks/useProjectTodo';
import type {RootStackParamList} from '../../../types/navigation';

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
  ListCard,
  EmptyTodoText,
  TouchableListItem,
  ListIconWrapper,
  ListItemText,
  AddTodoButton,
  AddTodoText,
  HeaderBackButton,
} from './ProjectTodo.styles';

type ProjectTodoScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'ProjectTodo'
>;

export default function ProjectTodo({
  route,
  navigation,
}: ProjectTodoScreenProps) {
  // 라우터 파라미터에서 프로젝트 식별자 추출
  const {projectId, projectName} = route.params;

  // 뷰모델 연결
  const {
    todos,
    searchQuery,
    setSearchQuery,
    handleToggleTodo,
    handleDeleteTodo,
    isLoading,
    errorMessage,
    hasTodos,
    fetchTodos,
  } = useProjectTodo(projectId);

  const openTodoMenu = (todo: ProjectTodoItem) => {
    Alert.alert('할일 관리', todo.title, [
      {
        text: '수정',
        onPress: () =>
          navigation.navigate('AddTodo', { projectId, todoData: todo }),
      },
      {
        text: '삭제',
        style: 'destructive',
        onPress: () => handleDeleteTodo(todo.id),
      },
      { text: '취소', style: 'cancel' },
    ]);
  };

  const backButton = (
    <HeaderBackButton onPress={() => navigation.goBack()} activeOpacity={0.8}>
      <Icon name="chevron-back" size={26} color="#FF8933" />
    </HeaderBackButton>
  );

  return (
    <Container>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      <Header title={projectName ?? '팀 할 일'} left={backButton} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={isLoading}
            onRefresh={fetchTodos}
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
          <TabItem
            isActive={false}
            onPress={() =>
              navigation.replace('ProjectDetail', {projectId, projectName})
            }
            activeOpacity={0.7}
          >
            <TabText isActive={false}>홈</TabText>
          </TabItem>
          <TabSeparator />

          <TabItem isActive={true} activeOpacity={1}>
            <TabText isActive={true}>할일</TabText>
          </TabItem>
          <TabSeparator />

          <TabItem
            isActive={false}
            onPress={() =>
              navigation.replace('Schedule', {projectId, projectName})
            }
            activeOpacity={0.7}
          >
            <TabText isActive={false}>일정</TabText>
          </TabItem>
          <TabSeparator />

          <TabItem
            isActive={false}
            onPress={() =>
              navigation.replace('Files', {projectId, projectName})
            }
            activeOpacity={0.7}
          >
            <TabText isActive={false}>파일</TabText>
          </TabItem>
        </TabContainer>

        <SectionContainer>
          <SectionHeader>
            <SectionTitle>할일 체크리스트</SectionTitle>
          </SectionHeader>

          <ListCard>
            {todos.length === 0 && (isLoading || errorMessage) ? (
              <AsyncState
                isLoading={isLoading}
                errorMessage={errorMessage}
                onRetry={fetchTodos}
              />
            ) : todos.length === 0 ? (
              <EmptyTodoText>
                {searchQuery.trim() && hasTodos
                  ? '검색된 할 일이 없습니다.'
                  : '등록된 할 일이 없습니다.'}
              </EmptyTodoText>
            ) : (
              todos.map((todo, index) => (
                <TouchableListItem
                  key={todo.id}
                  isLast={index === todos.length - 1}
                  activeOpacity={0.7}
                  onPress={() => handleToggleTodo(todo.id)}
                  onLongPress={() => openTodoMenu(todo)}
                >
                  <ListIconWrapper>
                    <Icon
                      name={todo.isDone ? 'checkbox-outline' : 'square-outline'}
                      size={22}
                      color={todo.isDone ? '#FF8933' : '#A6A6A6'}
                    />
                  </ListIconWrapper>
                  <ListItemText isDone={todo.isDone}>{todo.title}</ListItemText>
                </TouchableListItem>
              ))
            )}
          </ListCard>

          <AddTodoButton
            activeOpacity={0.8}
            onPress={() => navigation.navigate('AddTodo', { projectId })}
          >
            <Icon name="add" size={20} color="#FFFFFF" />
            <AddTodoText>새로운 할 일 추가</AddTodoText>
          </AddTodoButton>
        </SectionContainer>
      </ScrollView>
    </Container>
  );
}
