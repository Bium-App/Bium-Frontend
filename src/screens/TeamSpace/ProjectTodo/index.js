import React, { useState } from 'react';
import { StatusBar, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Header from '../../../components/Header'; 

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
  HeaderBackButton
} from './ProjectTodo.styles';

export default function ProjectTodo({ navigation }) {
  const [todos, setTodos] = useState([
    { id: 1, title: '할 일 제목 1', isDone: false },
    { id: 2, title: '할 일 제목 2', isDone: false },
    { id: 3, title: '할 일 제목 3', isDone: false },
  ]);

  const toggleTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isDone: !todo.isDone } : todo
      )
    );
  };

  const backButton = (
    <HeaderBackButton onPress={() => navigation.goBack()} activeOpacity={0.8}>
      <Icon 
        name="chevron-back" 
        size={26} 
        color="#FF8933" 
      />
    </HeaderBackButton>
  );

  return (
    <Container>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      
      <Header 
        title="프로젝트1" 
        left={backButton} 
      />

      <ScrollView showsVerticalScrollIndicator={false}>
        
        <SearchContainer>
          <Icon 
            name="search-outline" 
            size={20} 
            color="#000000" 
          />
          <SearchInput 
            placeholder="검색" 
            placeholderTextColor="#000000" 
          />
        </SearchContainer>

        <TabContainer>
          <TabItem 
            isActive={false} 
            onPress={() => navigation.replace('ProjectDetail')} 
            activeOpacity={0.7}
          >
            <TabText isActive={false}>홈</TabText>
          </TabItem>
          <TabSeparator />
          
          <TabItem 
            isActive={true} 
            activeOpacity={1} 
          >
            <TabText isActive={true}>할일</TabText>
          </TabItem>
          <TabSeparator />

          <TabItem 
            isActive={false} 
            onPress={() => navigation.replace('Schedule')} 
            activeOpacity={0.7}
          >
            <TabText isActive={false}>일정</TabText>
          </TabItem>
          <TabSeparator />

          <TabItem 
            isActive={false} 
            onPress={() => navigation.replace('Files')} 
            activeOpacity={0.7}
          >
            <TabText isActive={false}>파일</TabText>
          </TabItem>
        </TabContainer>

        <SectionContainer>
          <SectionHeader>
            <SectionTitle>할일 체크리스트</SectionTitle>
            <Icon 
              name="ellipsis-horizontal" 
              size={20} 
              color="#FF8933" 
            />
          </SectionHeader>
          
          <ListCard>
            {todos.map((todo, index) => (
              <TouchableListItem 
                key={todo.id} 
                isLast={index === todos.length - 1} 
                activeOpacity={0.7}
                onPress={() => toggleTodo(todo.id)} 
              >
                <ListIconWrapper>
                  <Icon 
                    name={todo.isDone ? "checkbox-outline" : "square-outline"} 
                    size={22} 
                    color={todo.isDone ? "#FF8933" : "#A6A6A6"} 
                  />
                </ListIconWrapper>
                <ListItemText isDone={todo.isDone}>{todo.title}</ListItemText>
              </TouchableListItem>
            ))}
          </ListCard>
          
          
          <AddTodoButton activeOpacity={0.8} onPress={() => navigation.navigate('AddTodo')}>
            <Icon 
              name="add" 
              size={20} 
              color="#FFFFFF" 
            />
            <AddTodoText>새로운 할 일 추가</AddTodoText>
          </AddTodoButton>
        </SectionContainer>
      </ScrollView>
    </Container>
  );
}