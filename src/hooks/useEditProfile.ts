import {useEffect, useState} from 'react';
import {Alert} from 'react-native';
import {uploadSelectedFileApi} from '../api/files';
import {getApiResponseMessage} from '../utils/apiError';
import {FILE_DOMAINS} from '../utils/filePicker';
import {useCurrentUser} from './useCurrentUser';
import {useFileSelection} from './useFileSelection';

export const useEditProfile = () => {
  const {user, isLoading, errorMessage, fetchUser, updateProfile} =
    useCurrentUser();
  const [nickname, setNickname] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    selectedFile: profileImage,
    isPicking,
    selectFile: selectProfileImage,
    clearFile: removeProfileImage,
  } = useFileSelection({kind: 'image'});

  useEffect(() => {
    setNickname(user?.nickname ?? '');
  }, [user]);

  const handleSubmit = async (onSuccess: () => void): Promise<void> => {
    if (!nickname.trim()) {
      Alert.alert('알림', '닉네임을 입력해주세요.');
      return;
    }
    if (isSubmitting) return;

    setIsSubmitting(true);
    try {
      const profileImageUrl = profileImage
        ? await uploadSelectedFileApi({
            domain: FILE_DOMAINS.PROFILE,
            file: profileImage,
          })
        : user?.profileImageUrl ?? null;
      await updateProfile({
        nickname: nickname.trim(),
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
    nickname,
    setNickname,
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
