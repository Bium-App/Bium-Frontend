import { useState } from 'react';
import { Alert } from 'react-native';
import { sendAuthCodeApi, verifyAuthCodeApi, signUpApi } from '../api/auth';

export const useSignUp = () => {
  // 1. 회원가입 입력 창 필드 상태
  const [loginId, setLoginId] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [nickname, setNickname] = useState('');
  const [authCode, setAuthCode] = useState('');

  // 2. 이메일 인증 절차 제어 플래그 상태
  const [isEmailSent, setIsEmailSent] = useState(false);  // 발송 여부 (인증번호 입력창 노출 조건)
  const [isEmailVerified, setIsEmailVerified] = useState(false);  // 검증 성공 여부 (최종 가입 허가 조건)
  const [isLoading, setIsLoading] = useState(false);  // 전체 로딩 상태

  /**
   * [1단계] 인증번호 발송 액션
   */
  const handleSendCode = async () => {
    if (!email.trim()) {
      Alert.alert('알림', '이메일을 입력해주세요.');
      return;
    }

    setIsLoading(true);
    try {
      await sendAuthCodeApi({ email, phone: null });
      setIsEmailSent(true); // 성공 시 인증번호 입력창을 띄우기 위해 true로 변경
      Alert.alert('성공', '인증번호가 발송되었습니다.');
    } catch (error) {
      Alert.alert('오류', '인증번호 발송에 실패했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * [2단계] 인증번호 검증 액션
   */
  const handleVerifyCode = async () => {
    if (!authCode.trim()) {
      Alert.alert('알림', '인증번호를 입력해주세요.');
      return;
    }

    setIsLoading(true);
    try {
      const data = await verifyAuthCodeApi({ email, code: authCode });
      // 서버에서 isVerified를 내려주는 조건 처리
      if (data.isVerified) {
        setIsEmailVerified(true);
        Alert.alert('성공', '이메일 인증이 완료되었습니다.');
      } else {
        Alert.alert('실패', '인증번호가 일치하지 않습니다.');
      }
    } catch (error) {
      Alert.alert('오류', '인증번호 검증에 실패했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * [3단계] 최종 회원가입 제출 액션
   * @param {Function} onSuccess - 가입 완료 후 로그인 화면으로 넘어가는 콜백
   */
  const handleSignUpSubmit = async (onSuccess) => {
    // [유효성 검사 1] 필수 입력값 누락 체크
    if (!loginId || !password || !name || !nickname) {
      Alert.alert('알림', '모든 항목을 입력해주세요.');
      return;
    }
    // [유효성 검사 2] 비번 교차 검증
    if (password !== passwordConfirm) {
      Alert.alert('알림', '비밀번호가 일치하지 않습니다');
      return;
    }
    // [유효성 검사 3] 이메일 인증 통과 여부 검증 (보안 핵심)
    if (!isEmailVerified) {
      Alert.alert('알림', '이메일 인증을 완료해주세요.');
      return;
    }

    setIsLoading(true);
    try {
      // 앞서 통과함 모든 데이터를 모아서 API 호출
      await signUpApi({
        loginId,
        password,
        email,
        name,
        nickname,
        phoneNumber: null,
        provider: 'LOCAL',
      });
      Alert.alert('가입 완료', '회원가입이 성공적으로 완료되었습니다.');

      if (onSuccess) onSuccess();

    } catch (error) {
      Alert.alert('가입 실패', '회원가입 처리 중 문제가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  return {
    loginId, setLoginId,
    password, setPassword,
    passwordConfirm, setPasswordConfirm,
    email, setEmail,
    name, setName,
    nickname, setNickname,
    authCode, setAuthCode,
    isEmailSent, isEmailVerified, isLoading,
    handleSendCode, handleVerifyCode, handleSignUpSubmit,
  };
};
