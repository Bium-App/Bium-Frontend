import {useState} from 'react';
import {Alert} from 'react-native';
import dayjs from 'dayjs';
import {
  createScheduleApi,
  deleteScheduleApi,
  updateScheduleApi,
} from '../api/schedules';
import {formatApiDateTime} from '../utils/dateTime';
import {getApiResponseMessage, getErrorMessage} from '../utils/apiError';
import type {EntityId} from '../types/api';
import type {ScheduleRouteData} from '../types/navigation';

export type SelectedScheduleDateField = 'start' | 'end' | null;

interface UseAddScheduleOptions {
  projectId: EntityId;
  initialData?: ScheduleRouteData;
  onSuccess: () => void;
}

export const useAddSchedule = ({
  projectId,
  initialData,
  onSuccess,
}: UseAddScheduleOptions) => {
  // 라우트로 전달되는 일정 데이터의 id 필드명이 화면마다 달라 두 경우를 모두 확인한다.
  const scheduleId = initialData?.scheduleId ?? initialData?.id;
  const [scheduleTitle, setScheduleTitle] = useState(initialData?.title ?? '');
  const [scheduleContent, setScheduleContent] = useState(
    initialData?.content ?? '',
  );
  const [isTitleFocused, setIsTitleFocused] = useState(false);
  const [isContentFocused, setIsContentFocused] = useState(false);
  const [startAt, setStartAt] = useState(
    initialData?.startAt ? new Date(initialData.startAt) : new Date(),
  );
  const [endAt, setEndAt] = useState(
    initialData?.endAt
      ? new Date(initialData.endAt)
      : dayjs().add(1, 'hour').toDate(),
  );
  const [selectedField, setSelectedField] =
    useState<SelectedScheduleDateField>(null);
  const [hasStartAt, setHasStartAt] = useState(Boolean(initialData?.startAt));
  const [hasEndAt, setHasEndAt] = useState(Boolean(initialData?.endAt));
  const [isLoading, setIsLoading] = useState(false);

  const handleSave = async (): Promise<void> => {
    if (!scheduleTitle.trim() || !hasStartAt || !hasEndAt) {
      Alert.alert('알림', '일정 제목과 시작·종료 시간을 입력해주세요.');
      return;
    }
    if (!dayjs(endAt).isAfter(startAt)) {
      Alert.alert('알림', '종료 시간은 시작 시간보다 늦어야 합니다.');
      return;
    }
    if (isLoading) return;

    setIsLoading(true);
    try {
      const schedule = {
        title: scheduleTitle.trim(),
        content: scheduleContent.trim(),
        startAt: formatApiDateTime(startAt),
        endAt: formatApiDateTime(endAt),
      };
      if (scheduleId) {
        await updateScheduleApi(scheduleId, schedule);
      } else {
        await createScheduleApi({teamSpaceId: projectId, ...schedule});
      }
      onSuccess();
    } catch (error) {
      Alert.alert(
        '오류',
        getApiResponseMessage(error) ??
          getErrorMessage(error) ??
          '일정을 저장하지 못했습니다.',
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = (): void => {
    if (!scheduleId || isLoading) return;
    Alert.alert('일정 삭제', '이 일정을 삭제하시겠습니까?', [
      {text: '취소', style: 'cancel'},
      {
        text: '삭제',
        style: 'destructive',
        onPress: async () => {
          setIsLoading(true);
          try {
            await deleteScheduleApi(scheduleId);
            onSuccess();
          } catch (error) {
            Alert.alert(
              '오류',
              getApiResponseMessage(error) ?? '일정을 삭제하지 못했습니다.',
            );
          } finally {
            setIsLoading(false);
          }
        },
      },
    ]);
  };

  const selectDate = (selectedDate: Date): void => {
    if (selectedField === 'start') {
      setStartAt(selectedDate);
      setHasStartAt(true);
      if (!dayjs(endAt).isAfter(selectedDate)) {
        // 시작 시간을 종료 시간 이후로 옮기면 종료 시간을 시작 시간 1시간 뒤로 자동 조정한다.
        setEndAt(dayjs(selectedDate).add(1, 'hour').toDate());
      }
    } else if (selectedField === 'end') {
      setEndAt(selectedDate);
      setHasEndAt(true);
    }
    setSelectedField(null);
  };

  return {
    scheduleId,
    scheduleTitle,
    setScheduleTitle,
    scheduleContent,
    setScheduleContent,
    isTitleFocused,
    setIsTitleFocused,
    isContentFocused,
    setIsContentFocused,
    startAt,
    endAt,
    selectedField,
    setSelectedField,
    hasStartAt,
    hasEndAt,
    isLoading,
    handleSave,
    handleDelete,
    selectDate,
  };
};
