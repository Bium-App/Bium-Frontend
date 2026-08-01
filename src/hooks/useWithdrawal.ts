import {useState} from 'react';
import {Alert} from 'react-native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {deleteUserApi} from '../api/users';
import {clearSession, getUserId} from '../utils/authStorage';
import {getApiResponseMessage} from '../utils/apiError';
import type {RootStackParamList} from '../types/navigation';

type Navigation = NativeStackNavigationProp<RootStackParamList>;

export const useWithdrawal = (navigation: Navigation) => {
  const [isAgreed, setIsAgreed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const withdraw = async (): Promise<void> => {
    setIsLoading(true);
    try {
      const userId = await getUserId();
      if (!userId) throw new Error('사용자 정보를 찾을 수 없습니다.');
      await deleteUserApi();
      await clearSession();
      navigation.reset({index: 0, routes: [{name: 'Login'}]});
    } catch (error) {
      Alert.alert(
        '오류',
        getApiResponseMessage(error) ?? '회원 탈퇴에 실패했습니다.',
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleWithdrawal = (): void => {
    if (!isAgreed) {
      Alert.alert('안내', '탈퇴 안내 내용을 확인하시고 동의해 주세요.');
      return;
    }

    Alert.alert(
      '회원 탈퇴',
      '정말 탈퇴하시겠습니까?\n모든 데이터는 복구할 수 없습니다.',
      [
        {text: '취소', style: 'cancel'},
        {text: '탈퇴', style: 'destructive', onPress: withdraw},
      ],
    );
  };

  return {isAgreed, setIsAgreed, isLoading, handleWithdrawal};
};
