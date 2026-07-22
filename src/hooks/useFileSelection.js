import { useCallback, useState } from 'react';
import { Alert } from 'react-native';
import { pickDocumentFile, pickImageFile } from '../utils/filePicker';

export const useFileSelection = ({ kind = 'document' } = {}) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isPicking, setIsPicking] = useState(false);

  const selectFile = useCallback(async () => {
    if (isPicking) return null;
    setIsPicking(true);
    try {
      const file =
        kind === 'image' ? await pickImageFile() : await pickDocumentFile();
      if (file) setSelectedFile(file);
      return file;
    } catch (error) {
      Alert.alert(
        '파일 선택 실패',
        error.message ?? '파일을 선택하지 못했습니다.',
      );
      return null;
    } finally {
      setIsPicking(false);
    }
  }, [isPicking, kind]);

  const clearFile = useCallback(() => setSelectedFile(null), []);

  return {
    selectedFile,
    setSelectedFile,
    isPicking,
    selectFile,
    clearFile,
  };
};
