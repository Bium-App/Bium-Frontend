import {useEffect, useState} from 'react';
import {Alert} from 'react-native';
import {uploadSelectedFileApi} from '../api/files';
import {getApiResponseMessage} from '../utils/apiError';
import {FILE_DOMAINS} from '../utils/filePicker';
import {useCurrentUser} from './useCurrentUser';
import {useFileSelection} from './useFileSelection';

// 내 정보 수정 화면의 입력 상태를 관리한다. 사용자 조회/수정은
// useCurrentUser에, 프로필 이미지 선택은 useFileSelection에 위임하고
// 이 훅에서는 화면에 필요한 입력값 검증과 제출 흐름만 처리한다.
export const useEditProfile = () => {
  const {user, isLoading, errorMessage, fetchUser, updateProfile} =
    useCurrentUser();
  const [name, setName] = useState('');
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    selectedFile: profileImage,
    isPicking,
    selectFile: selectProfileImage,
    clearFile: removeProfileImage,
  } = useFileSelection({kind: 'image'});

  useEffect(() => {
    setName(user?.name ?? '');
    setNickname(user?.nickname ?? '');
    setEmail(user?.email ?? '');
    setPhoneNumber(user?.phoneNumber ?? '');
  }, [user]);

  const handleSubmit = async (onSuccess: () => void): Promise<void> => {
    if (!name.trim()) {
      Alert.alert('알림', '이름을 입력해주세요.');
      return;
    }
    if (!nickname.trim()) {
      Alert.alert('알림', '닉네임을 입력해주세요.');
      return;
    }
    const normalizedEmail = email.trim().toLowerCase();
    if (!/^\S+@\S+\.\S+$/.test(normalizedEmail)) {
      Alert.alert('알림', '이메일 형식을 확인해주세요.');
      return;
    }
    const normalizedPhoneNumber = phoneNumber.trim();
    if (!/^01[016789]-?\d{3,4}-?\d{4}$/.test(normalizedPhoneNumber)) {
      Alert.alert('알림', '휴대폰 번호 형식을 확인해주세요.');
      return;
    }
    if (isSubmitting) return;

    setIsSubmitting(true);
    try {
      // 새로 선택한 이미지가 있으면 업로드해 URL을 받고, 없으면 기존 프로필
      // 이미지 URL을 그대로 유지한다(기존 이미지가 없던 사용자는 null).
      const profileImageUrl = profileImage
        ? await uploadSelectedFileApi({
            domain: FILE_DOMAINS.PROFILE,
            file: profileImage,
          })
        : user?.profileImageUrl ?? null;
      await updateProfile({
        name: name.trim(),
        nickname: nickname.trim(),
        email: normalizedEmail,
        phoneNumber: normalizedPhoneNumber,
        profileImageUrl,
      });
      Alert.alert('완료', '내 정보가 수정되었습니다.', [
        {text: '확인', onPress: onSuccess},
      ]);
    } catch (error) {
      Alert.alert(
        '오류',
        getApiResponseMessage(error) ?? '내 정보 수정에 실패했습니다.',
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    user,
    name,
    setName,
    nickname,
    setNickname,
    email,
    setEmail,
    phoneNumber,
    setPhoneNumber,
    profileImage,
    selectProfileImage,
    removeProfileImage,
    isPicking,
    isSubmitting,
    isBusy: isLoading || isSubmitting || isPicking,
    errorMessage,
    fetchUser,
    previewImageUrl: profileImage?.uri ?? user?.profileImageUrl,
    handleSubmit,
  };
};
