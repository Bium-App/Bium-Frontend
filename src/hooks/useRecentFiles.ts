import { useCallback, useEffect, useState } from 'react';
import { getRecentFiles } from '../utils/recentFiles';
import type { SelectedFile } from '../types/file';

// 최근에 사용한 첨부 파일 목록을 불러오고 새로고침하는 훅.
export const useRecentFiles = (enabled = true) => {
  const [recentFiles, setRecentFiles] = useState<SelectedFile[]>([]);

  const refreshRecentFiles = useCallback(async (): Promise<void> => {
    setRecentFiles(await getRecentFiles());
  }, []);

  useEffect(() => {
    if (enabled) refreshRecentFiles();
  }, [enabled, refreshRecentFiles]);

  return { recentFiles, refreshRecentFiles };
};
