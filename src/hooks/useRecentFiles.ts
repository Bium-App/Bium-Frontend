import { useCallback, useEffect, useState } from 'react';
import { getRecentFiles } from '../utils/recentFiles';
import type { SelectedFile } from '../types/file';

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
