import {useState} from 'react';
import {Alert} from 'react-native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {createInquiryApi} from '../api/common';
import {getApiResponseMessage} from '../utils/apiError';
import type {RootStackParamList} from '../types/navigation';

type Navigation = NativeStackNavigationProp<
  RootStackParamList,
  'ServiceSuggestion'
>;

export const useServiceSuggestion = (navigation: Navigation) => {
  const [suggestion, setSuggestion] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (): Promise<void> => {
    if (!suggestion.trim()) {
      Alert.alert('안내', '내용을 입력해주세요.');
      return;
    }
    if (isLoading) return;
    setIsLoading(true);

    try {
      await createInquiryApi({
        type: 'SUGGESTION',
        title: '서비스 개선 제안',
        content: suggestion.trim(),
        attachmentUrl: null,
      });
      Alert.alert('감사합니다', '소중한 의견이 제출되었습니다.', [
        {text: '확인', onPress: () => navigation.goBack()},
      ]);
    } catch (error) {
      Alert.alert(
        '오류',
        getApiResponseMessage(error) ?? '제안 제출에 실패했습니다.',
      );
    } finally {
      setIsLoading(false);
    }
  };

  return {
    suggestion,
    setSuggestion,
    isFocused,
    setIsFocused,
    isLoading,
    handleSubmit,
  };
};
