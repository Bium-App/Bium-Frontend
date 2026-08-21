import {useState} from 'react';
import {Alert} from 'react-native';
import {signUpApi} from '../api/auth';
import {getApiResponseMessage} from '../utils/apiError';

export const useSignUp = () => {
  const [loginId, setLoginId] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [name, setName] = useState('');
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSignUpSubmit = async (
    onSuccess?: () => void,
  ): Promise<void> => {
    if (
      !loginId.trim() ||
      !password ||
      !name.trim() ||
      !nickname.trim() ||
      !email.trim() ||
      !phoneNumber.trim()
    ) {
      Alert.alert('알림', '모든 항목을 입력해주세요.');
      return;
    }
    if (password !== passwordConfirm) {
      Alert.alert('알림', '비밀번호가 일치하지 않습니다');
      return;
    }

    setIsLoading(true);
    try {
      await signUpApi({
        loginId: loginId.trim(),
        password,
        name: name.trim(),
        nickname: nickname.trim(),
        email: email.trim(),
        phoneNumber: phoneNumber.trim(),
        provider: 'LOCAL',
      });
      Alert.alert('가입 완료', '회원가입이 성공적으로 완료되었습니다.');
      onSuccess?.();
    } catch (error) {
      Alert.alert(
        '가입 실패',
        getApiResponseMessage(error) ??
          '회원가입 처리 중 문제가 발생했습니다.',
      );
    } finally {
      setIsLoading(false);
    }
  };

  return {
    loginId,
    setLoginId,
    password,
    setPassword,
    passwordConfirm,
    setPasswordConfirm,
    name,
    setName,
    nickname,
    setNickname,
    email,
    setEmail,
    phoneNumber,
    setPhoneNumber,
    isLoading,
    handleSignUpSubmit,
  };
};
