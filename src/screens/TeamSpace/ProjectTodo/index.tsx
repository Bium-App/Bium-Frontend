import React from 'react';
import {
  Alert,
  StatusBar,
  ScrollView,
  RefreshControl,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useTranslation} from 'react-i18next';
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
  const {t} = useTranslation();
  const {projectId, projectName} = route.params;

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
    Alert.alert(t('team.manage_todo'), todo.title, [
      {
        text: t('team.edit'),
        onPress: () =>
          navigation.navigate('AddTodo', { projectId, todoData: todo }),
      },
      {
        text: t('team.delete'),
        style: 'destructive',
        onPress: () => handleDeleteTodo(todo.id),
      },
      { text: t('home.cancel'), style: 'cancel' },
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

      <Header title={projectName ?? t('team.team_todo')} left={backButton} />

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
            placeholder={t('common.search')}
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
            <TabText isActive={false}>{t('team.home')}</TabText>
          </TabItem>
          <TabSeparator />

          <TabItem isActive={true} activeOpacity={1}>
            <TabText isActive={true}>{t('team.todo')}</TabText>
          </TabItem>
          <TabSeparator />

          <TabItem
            isActive={false}
            onPress={() =>
              navigation.replace('Schedule', {projectId, projectName})
            }
            activeOpacity={0.7}
          >
            <TabText isActive={false}>{t('team.schedule')}</TabText>
          </TabItem>
          <TabSeparator />

          <TabItem
            isActive={false}
            onPress={() =>
              navigation.replace('Files', {projectId, projectName})
            }
            activeOpacity={0.7}
          >
            <TabText isActive={false}>{t('team.files')}</TabText>
          </TabItem>
        </TabContainer>

        <SectionContainer>
          <SectionHeader>
            <SectionTitle>{t('team.checklist')}</SectionTitle>
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
                  ? t('team.no_filtered_todos')
                  : t('team.no_todos')}
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
            <AddTodoText>{t('team.add_todo')}</AddTodoText>
          </AddTodoButton>
        </SectionContainer>
      </ScrollView>
    </Container>
  );
}
