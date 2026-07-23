import { useState } from 'react';
import { Alert } from 'react-native';
import { createInquiryApi } from '../api/common';
import { uploadSelectedFileApi } from '../api/files';
import { FILE_DOMAINS } from '../utils/filePicker';
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
  } = useFileSelection({ kind: 'image' });

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
    setIsLoading(true);

    try {
      const attachmentUrl = attachmentFile
        ? await uploadSelectedFileApi({
            domain: FILE_DOMAINS.INQUIRY,
            file: attachmentFile,
          })
        : null;

      await createInquiryApi({
        type: 'ONE_ON_ONE',
        title: title.trim(),
        content: `문의 분류: ${selectedType.title}\n\n${content.trim()}`,
        attachmentUrl,
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
    attachmentFile,
    isPickingAttachment,
    isLoading,
    isSubmitEnabled,
    handleSelectType,
    selectAttachment,
    removeAttachment,
    handleSubmit,
  };
};
