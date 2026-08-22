import {useCallback, useState} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import dayjs from 'dayjs';
import {
  createTeamFileApi,
  deleteTeamFileApi,
  getTeamFilesApi,
  renameTeamFileApi,
  uploadSelectedFileApi,
} from '../api/files';
import {getApiErrorMessage} from '../utils/apiError';
import {FILE_DOMAINS, formatFileSize} from '../utils/filePicker';
import type {EntityId} from '../types/api';
import type {SelectedFile} from '../types/file';

type TeamFileType = 'folder' | 'file' | 'image';

export interface TeamFileListItem {
  id: string;
  title: string;
  fileUrl: string;
  type: TeamFileType;
  info: string;
}

// 확장자로 이미지 여부를 구분해 목록에서 썸네일과 파일 아이콘을 다르게 표시한다.
const getFileType = (fileName?: string): TeamFileType => {
  const extension = fileName?.split('.').pop()?.toLowerCase();
  return ['jpg', 'jpeg', 'png', 'gif', 'webp', 'heic'].includes(
    extension ?? '',
  )
    ? 'image'
    : 'file';
};

export const useTeamFiles = (teamSpaceId?: EntityId) => {
  const [files, setFiles] = useState<TeamFileListItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const fetchFiles = useCallback(async (): Promise<void> => {
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

  const renameFile = async (
    fileId: EntityId,
    newFileName: string,
  ): Promise<void> => {
    await renameTeamFileApi(fileId, newFileName);
    await fetchFiles();
  };

  const deleteFile = async (fileId: EntityId): Promise<void> => {
    await deleteTeamFileApi(fileId);
    await fetchFiles();
  };

  const uploadTeamFile = async (file: SelectedFile): Promise<void> => {
    if (!teamSpaceId) throw new Error('팀스페이스 정보를 찾을 수 없습니다.');
    setIsUploading(true);
    try {
      const fileUrl = await uploadSelectedFileApi({
        domain: FILE_DOMAINS.TEAM,
        file,
      });
      await createTeamFileApi(teamSpaceId, {
        fileName: file.name,
        fileUrl,
        fileSize: formatFileSize(file.size),
      });
      await fetchFiles();
    } finally {
      setIsUploading(false);
    }
  };

  return {
    files,
    isLoading,
    isUploading,
    errorMessage,
    fetchFiles,
    renameFile,
    deleteFile,
    uploadTeamFile,
  };
};
