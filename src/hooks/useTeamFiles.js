import { useCallback, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import dayjs from 'dayjs';
import {
  deleteTeamFileApi,
  getTeamFilesApi,
  renameTeamFileApi,
} from '../api/files';
import { getApiErrorMessage } from '../utils/apiError';

const getFileType = fileName => {
  const extension = fileName?.split('.').pop()?.toLowerCase();
  if (['jpg', 'jpeg', 'png', 'gif', 'webp', 'heic'].includes(extension)) {
    return 'image';
  }
  return 'file';
};

export const useTeamFiles = teamSpaceId => {
  const [files, setFiles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const fetchFiles = useCallback(async () => {
    if (!teamSpaceId) return;
    setIsLoading(true);
    setErrorMessage('');
    try {
      const data = await getTeamFilesApi(teamSpaceId);
      setFiles(
        data.map(file => ({
          id: String(file.fileId),
          title: file.fileName,
          fileUrl: file.fileUrl,
          type: getFileType(file.fileName),
          info: [
            file.fileSize,
            file.uploadedAt
              ? dayjs(file.uploadedAt).format('YYYY.MM.DD HH:mm')
              : null,
          ]
            .filter(Boolean)
            .join(' · '),
        })),
      );
    } catch (error) {
      setErrorMessage(
        getApiErrorMessage(error, '팀 파일을 불러오지 못했습니다.'),
      );
    } finally {
      setIsLoading(false);
    }
  }, [teamSpaceId]);

  useFocusEffect(
    useCallback(() => {
      fetchFiles();
    }, [fetchFiles]),
  );

  const renameFile = async (fileId, newFileName) => {
    await renameTeamFileApi(fileId, newFileName);
    await fetchFiles();
  };

  const deleteFile = async fileId => {
    await deleteTeamFileApi(fileId);
    await fetchFiles();
  };

  return {
    files,
    isLoading,
    errorMessage,
    fetchFiles,
    renameFile,
    deleteFile,
  };
};
