import React, { useMemo, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  StatusBar,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import dayjs from 'dayjs';
import Header from '../../../components/Header';
import CalendarIcon from '../../../assets/icons/ic_calendar.svg';
import PlusIcon from '../../../assets/icons/ic_plus.svg';
import { useTeamSchedules } from '../../../hooks/useTeamSchedules';
import type {RootStackParamList} from '../../../types/navigation';
import type {EntityId} from '../../../types/api';
import type {ScheduleSummary as TeamSchedule} from '../../../types/schedule';
import {getApiResponseMessage} from '../../../utils/apiError';

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
  EmptyScheduleText,
  ListCard,
  TouchableListItem,
  ListItemLeft,
  IconCircle,
  TextColumn,
  ListItemTitle,
  ListItemTime,
  HeaderBackButton,
} from './Schedule.styles';

type ScheduleScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'Schedule'
>;

export default function Schedule({route, navigation}: ScheduleScreenProps) {
  const {projectId} = route.params;
  const { schedules, isLoading, getScheduleDetail } =
    useTeamSchedules(projectId);
  const [searchQuery, setSearchQuery] = useState('');

  const groupedSchedules = useMemo(() => {
    const keyword = searchQuery.trim().toLowerCase();
    const groups = schedules
      .filter(schedule => schedule.title?.toLowerCase().includes(keyword))
      .reduce<Record<string, TeamSchedule[]>>((result, schedule) => {
        const dateKey = dayjs(schedule.startAt).format('YYYY-MM-DD');
        result[dateKey] = [...(result[dateKey] ?? []), schedule];
        return result;
      }, {});
    return Object.entries(groups).sort(([a], [b]) => a.localeCompare(b));
  }, [schedules, searchQuery]);

  const openSchedule = async (scheduleId: EntityId) => {
    try {
      const schedule = await getScheduleDetail(scheduleId);
      navigation.navigate('AddSchedule', {
        projectId,
        scheduleData: {...schedule, content: schedule.content ?? ''},
      });
    } catch (error) {
      Alert.alert(
        '오류',
        getApiResponseMessage(error) ?? '일정 상세를 불러오지 못했습니다.',
      );
    }
  };

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
            <EmptyScheduleText>
              등록된 일정이 없습니다.
            </EmptyScheduleText>
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
                    onPress={() => openSchedule(item.scheduleId)}
                  >
                    <ListItemLeft>
                      <IconCircle>
                        <CalendarIcon width={18} height={18} color="#FF8933" />
                      </IconCircle>
                      <TextColumn>
                        <ListItemTitle>{item.title}</ListItemTitle>
                        <ListItemTime>
                          {dayjs(item.startAt).format('HH:mm')} ~{' '}
                          {dayjs(item.endAt).format('HH:mm')}
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
