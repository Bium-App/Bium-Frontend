import { useState } from 'react';
import { Alert } from 'react-native';
import { createInquiryApi } from '../api/common';
import { getUserId } from '../utils/authStorage';
import { useFileSelection } from './useFileSelection';

export const useInquiryForm = navigation => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedType, setSelectedType] = useState(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const {
    selectedFile: attachmentFile,
    isPicking: isPickingAttachment,
    selectFile: selectAttachment,
    clearFile: removeAttachment,
  } = useFileSelection({ kind: 'document' });

  const isSubmitEnabled =
    Boolean(selectedType) &&
    title.trim().length > 0 &&
    content.trim().length > 0;

  const handleSelectType = type => {
    setSelectedType(type);
    setIsDropdownOpen(false);
  };

  const handleSubmit = async () => {
    if (!isSubmitEnabled || isLoading) return;
    if (attachmentFile) {
      Alert.alert(
        '첨부 업로드 계약 확인 필요',
        '최신 API 명세에는 문의 첨부파일의 Presigned URL prefix가 없습니다. 파일 선택 UI는 준비됐으며, 백엔드가 저장 prefix를 확정하면 업로드를 연결할 수 있습니다.',
      );
      return;
    }
    setIsLoading(true);

    try {
      const userId = await getUserId();
      if (!userId) throw new Error('사용자 정보를 찾을 수 없습니다.');
      await createInquiryApi(userId, {
        type: 'ONE_ON_ONE',
        title: title.trim(),
        content: `문의 분류: ${selectedType.title}\n\n${content.trim()}`,
        attachmentUrl: null,
      });
      Alert.alert('문의 접수', '문의가 성공적으로 접수되었습니다.', [
        { text: '확인', onPress: () => navigation.goBack() },
      ]);
    } catch (error) {
      Alert.alert(
        '오류',
        error.response?.data?.message ?? '문의 접수에 실패했습니다.',
      );
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isDropdownOpen,
    setIsDropdownOpen,
    selectedType,
    title,
    setTitle,
    content,
    setContent,
    isLoading,
    attachmentFile,
    isPickingAttachment,
    selectAttachment,
    removeAttachment,
    isSubmitEnabled,
    handleSelectType,
    handleSubmit,
  };
};
