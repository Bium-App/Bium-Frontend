import React from 'react';
import { Alert, StatusBar, ScrollView, Text } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Header from '../../../components/Header';
import { useProjectTodo } from '../../../hooks/useProjectTodo';

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
  TouchableListItem,
  ListIconWrapper,
  ListItemText,
  AddTodoButton,
  AddTodoText,
  HeaderBackButton,
} from './ProjectTodo.styles';

export default function ProjectTodo({ route, navigation }) {
  // 라우터 파라미터에서 프로젝트 식별자 추출
  const { projectId } = route.params || {};

  // 뷰모델 연결
  const {
    todos,
    searchQuery,
    setSearchQuery,
    handleToggleTodo,
    handleDeleteTodo,
  } = useProjectTodo(projectId);

  const openTodoMenu = todo => {
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

      <Header title="팀 할 일" left={backButton} />

      <ScrollView showsVerticalScrollIndicator={false}>
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
            onPress={() => navigation.replace('ProjectDetail', { projectId })}
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

        <SectionContainer>
          <SectionHeader>
            <SectionTitle>할일 체크리스트</SectionTitle>
            <Icon name="ellipsis-horizontal" size={20} color="#FF8933" />
          </SectionHeader>

          <ListCard>
            {todos.length === 0 ? (
              <Text
                style={{
                  textAlign: 'center',
                  paddingVertical: 20,
                  color: '#AAAAAA',
                }}
              >
                검색된 할 일이 없습니다.
              </Text>
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
