import React, { useMemo, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  StatusBar,
  ScrollView,
  Text,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import dayjs from 'dayjs';
import Header from '../../../components/Header';
import CalendarIcon from '../../../assets/icons/ic_calendar.svg';
import PlusIcon from '../../../assets/icons/ic_plus.svg';
import { useTeamSchedules } from '../../../hooks/useTeamSchedules';

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
  SmallAddButton,
  DateHeader,
  ListCard,
  TouchableListItem,
  ListItemLeft,
  IconCircle,
  TextColumn,
  ListItemTitle,
  ListItemTime,
  HeaderBackButton,
} from './Schedule.styles';

export default function Schedule({ route, navigation }) {
  const { projectId } = route.params || {};
  const { schedules, isLoading } = useTeamSchedules(projectId);
  const [searchQuery, setSearchQuery] = useState('');

  const groupedSchedules = useMemo(() => {
    const keyword = searchQuery.trim().toLowerCase();
    const groups = schedules
      .filter(schedule => schedule.title?.toLowerCase().includes(keyword))
      .reduce((result, schedule) => {
        const dateKey = dayjs(schedule.scheduleDate).format('YYYY-MM-DD');
        result[dateKey] = [...(result[dateKey] ?? []), schedule];
        return result;
      }, {});
    return Object.entries(groups).sort(([a], [b]) => a.localeCompare(b));
  }, [schedules, searchQuery]);

  const backButton = (
    <HeaderBackButton onPress={() => navigation.goBack()} activeOpacity={0.8}>
      <Icon name="chevron-back" size={26} color="#FF8933" />
    </HeaderBackButton>
  );

  return (
    <Container>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <Header title={`프로젝트 #${projectId ?? '-'}`} left={backButton} />
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
          <TabItem
            isActive={false}
            onPress={() => navigation.replace('ProjectTodo', { projectId })}
            activeOpacity={0.7}
          >
            <TabText isActive={false}>할일</TabText>
          </TabItem>
          <TabSeparator />
          <TabItem isActive={true} activeOpacity={1}>
            <TabText isActive={true}>일정</TabText>
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
            <SectionTitle>이번 달 일정</SectionTitle>
            <SmallAddButton
              activeOpacity={0.7}
              onPress={() => navigation.navigate('AddSchedule', { projectId })}
            >
              <PlusIcon width={16} height={16} color="#FF8933" />
            </SmallAddButton>
          </SectionHeader>

          {isLoading ? <ActivityIndicator color="#FF8933" /> : null}
          {!isLoading && !groupedSchedules.length ? (
            <Text
              style={{ textAlign: 'center', color: '#AAAAAA', padding: 20 }}
            >
              등록된 일정이 없습니다.
            </Text>
          ) : null}

          {groupedSchedules.map(([dateKey, items]) => (
            <React.Fragment key={dateKey}>
              <DateHeader>{dayjs(dateKey).format('M월 D일')}</DateHeader>
              <ListCard>
                {items.map((item, index) => (
                  <TouchableListItem
                    key={String(item.scheduleId)}
                    isLast={index === items.length - 1}
                    activeOpacity={0.7}
                    onPress={() =>
                      Alert.alert(
                        '일정 수정 연동 대기',
                        '월별 목록 응답에 content가 없어 안전한 수정을 위해 일정 상세 조회 API가 필요합니다.',
                      )
                    }
                  >
                    <ListItemLeft>
                      <IconCircle>
                        <CalendarIcon width={18} height={18} color="#FF8933" />
                      </IconCircle>
                      <TextColumn>
                        <ListItemTitle>{item.title}</ListItemTitle>
                        <ListItemTime>
                          {dayjs(item.scheduleDate).format('HH:mm')}
                        </ListItemTime>
                      </TextColumn>
                    </ListItemLeft>
                    <Icon name="chevron-forward" size={18} color="#AAAAAA" />
                  </TouchableListItem>
                ))}
              </ListCard>
            </React.Fragment>
          ))}
        </SectionContainer>
      </ScrollView>
    </Container>
  );
}
