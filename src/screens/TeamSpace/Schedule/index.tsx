import React, { useMemo, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  StatusBar,
  ScrollView,
  RefreshControl,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useTranslation} from 'react-i18next';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import dayjs from 'dayjs';
import Header from '../../../components/Header';
import AsyncState from '../../../components/AsyncState';
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

// 팀 스페이스 일정 목록 화면. 날짜별로 묶어 보여주고 검색, 일정 추가/상세 이동을 지원한다.
export default function Schedule({route, navigation}: ScheduleScreenProps) {
  const {t, i18n} = useTranslation();
  const {projectId, projectName} = route.params;
  const {schedules, isLoading, errorMessage, fetchSchedules, getScheduleDetail} =
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
        t('common.error'),
        getApiResponseMessage(error) ?? t('team.schedule_detail_failed'),
      );
    }
  };

  const backButton = (
    <HeaderBackButton onPress={() => navigation.goBack()} activeOpacity={0.8}>
      <Icon name="chevron-back" size={24} color="#FF8933" />
    </HeaderBackButton>
  );

  return (
    <Container>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <Header title={projectName ?? t('team.team_schedule')} left={backButton} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={isLoading}
            onRefresh={fetchSchedules}
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
          <TabItem
            isActive={false}
            onPress={() =>
              navigation.replace('ProjectTodo', {projectId, projectName})
            }
            activeOpacity={0.7}
          >
            <TabText isActive={false}>{t('team.todo')}</TabText>
          </TabItem>
          <TabSeparator />
          <TabItem isActive={true} activeOpacity={1}>
            <TabText isActive={true}>{t('team.schedule')}</TabText>
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
            <SectionTitle>{t('team.this_month')}</SectionTitle>
            <SmallAddButton
              activeOpacity={0.7}
              onPress={() => navigation.navigate('AddSchedule', { projectId })}
            >
              <PlusIcon width={16} height={16} color="#FF8933" />
            </SmallAddButton>
          </SectionHeader>

          {isLoading && schedules.length > 0 ? (
            <ActivityIndicator color="#FF8933" />
          ) : null}
          {!groupedSchedules.length && (isLoading || errorMessage) ? (
            <AsyncState
              isLoading={isLoading}
              errorMessage={errorMessage}
              onRetry={fetchSchedules}
            />
          ) : !groupedSchedules.length ? (
            <EmptyScheduleText>
              {searchQuery.trim() && schedules.length > 0
                ? t('team.no_filtered_schedules')
                : t('team.no_schedules')}
            </EmptyScheduleText>
          ) : null}

          {groupedSchedules.map(([dateKey, items]) => (
            <React.Fragment key={dateKey}>
              <DateHeader>{dayjs(dateKey).format(i18n.language.startsWith('en') ? 'MMM D' : 'M월 D일')}</DateHeader>
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
