import {useState, type ComponentType} from 'react';
import {Alert} from 'react-native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {createInquiryApi} from '../api/common';
import {uploadSelectedFileApi} from '../api/files';
import {FILE_DOMAINS} from '../utils/filePicker';
import {getApiResponseMessage} from '../utils/apiError';
import {useFileSelection} from './useFileSelection';
import type {RootStackParamList} from '../types/navigation';

type Navigation = NativeStackNavigationProp<RootStackParamList>;

interface InquiryIconProps {
  width?: number;
  height?: number;
  color?: string;
}

export interface InquiryTypeOption {
  id: string;
  title: string;
  desc: string;
  Icon: ComponentType<InquiryIconProps>;
}

export const useInquiryForm = (navigation: Navigation) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedType, setSelectedType] =
    useState<InquiryTypeOption | null>(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const {
    selectedFile: attachmentFile,
    isPicking: isPickingAttachment,
    selectFile: selectAttachment,
    clearFile: removeAttachment,
  } = useFileSelection({kind: 'image'});

  const isSubmitEnabled =
    Boolean(selectedType) &&
    title.trim().length > 0 &&
    content.trim().length > 0;

  const handleSelectType = (type: InquiryTypeOption): void => {
    setSelectedType(type);
    setIsDropdownOpen(false);
  };

  const handleSubmit = async (): Promise<void> => {
    if (!isSubmitEnabled || isLoading || !selectedType) return;
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
        {text: '확인', onPress: () => navigation.goBack()},
      ]);
    } catch (error) {
      Alert.alert(
        '오류',
        getApiResponseMessage(error) ?? '문의 접수에 실패했습니다.',
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
