import { useCallback, useState } from 'react';
import { Alert } from 'react-native';
import { pickDocumentFile, pickImageFile } from '../utils/filePicker';
import { getErrorMessage } from '../utils/apiError';
import type { SelectedFile, SelectedFileKind } from '../types/file';
import { saveRecentFile } from '../utils/recentFiles';

interface UseFileSelectionOptions {
  kind?: SelectedFileKind;
}

// 문서/이미지 파일 선택과 최근 사용 파일 기록 저장을 담당하는 훅.
export const useFileSelection = ({
  kind = 'document',
}: UseFileSelectionOptions = {}) => {
  const [selectedFile, setSelectedFile] = useState<SelectedFile | null>(null);
  const [isPicking, setIsPicking] = useState(false);

  const selectFileByKind = useCallback(
    async (selectedKind: SelectedFileKind): Promise<SelectedFile | null> => {
      if (isPicking) return null;
      setIsPicking(true);
      try {
        const file =
          selectedKind === 'image'
            ? await pickImageFile()
            : await pickDocumentFile();
        if (file) {
          setSelectedFile(file);
          await saveRecentFile(file).catch(() => undefined);
        }
        return file;
      } catch (error) {
        Alert.alert(
          '파일 선택 실패',
          getErrorMessage(error) ?? '파일을 선택하지 못했습니다.',
        );
        return null;
      } finally {
        setIsPicking(false);
      }
    },
    [isPicking],
  );

  const selectFile = useCallback(
    (): Promise<SelectedFile | null> => selectFileByKind(kind),
    [kind, selectFileByKind],
  );
  const selectImageFile = useCallback(
    (): Promise<SelectedFile | null> => selectFileByKind('image'),
    [selectFileByKind],
  );
  const selectDocumentFile = useCallback(
    (): Promise<SelectedFile | null> => selectFileByKind('document'),
    [selectFileByKind],
  );

  const clearFile = useCallback(() => setSelectedFile(null), []);

  return {
    selectedFile,
    setSelectedFile,
    isPicking,
    selectFile,
    selectImageFile,
    selectDocumentFile,
    clearFile,
  };
};
