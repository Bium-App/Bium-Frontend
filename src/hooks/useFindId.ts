import {useState} from 'react';
import {Alert} from 'react-native';
import {findLoginIdApi} from '../api/auth';
import {getApiResponseMessage} from '../utils/apiError';

export const useFindId = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const findLoginId = async (
    onFound?: (loginId: string) => void,
  ): Promise<void> => {
    if (!email.trim()) {
      Alert.alert('알림', '이메일을 입력해주세요.');
      return;
    }

    setIsLoading(true);
    try {
      const data = await findLoginIdApi(email.trim());
      onFound?.(data.loginId);
    } catch (error) {
      Alert.alert(
        '아이디 찾기 실패',
        getApiResponseMessage(error) ?? '입력한 회원 정보를 확인해주세요.',
      );
    } finally {
      setIsLoading(false);
    }
  };

  return {email, setEmail, isLoading, findLoginId};
};
