import apiClient from './client';
import { readSelectedFile } from '../utils/filePicker';

export const getPresignedUrlApi = async ({ domain, fileName, fileType }) => {
  const response = await apiClient.get('/api/files/presigned-url', {
    params: { fileName, fileType, domain },
  });
  return response.data;
};

export const uploadToPresignedUrl = async (
  presignedUrl,
  fileBody,
  contentType = 'application/octet-stream',
) => {
  const response = await fetch(presignedUrl, {
    method: 'PUT',
    headers: { 'Content-Type': contentType },
    body: fileBody,
  });
  if (!response.ok) {
    throw new Error(`S3 업로드에 실패했습니다. (${response.status})`);
  }
};

export const uploadFileApi = async ({
  domain,
  fileName,
  fileBody,
  contentType,
}) => {
  const { presignedUrl, fileUrl } = await getPresignedUrlApi({
    domain,
    fileName,
    fileType: contentType ?? 'application/octet-stream',
  });
  await uploadToPresignedUrl(
    presignedUrl,
    fileBody,
    contentType ?? 'application/octet-stream',
  );
  return fileUrl;
};

export const uploadSelectedFileApi = async ({ domain, file }) => {
  const fileBody = await readSelectedFile(file);
  try {
    return await uploadFileApi({
      domain,
      fileName: file.name,
      fileBody,
      contentType: file.type,
    });
  } finally {
    fileBody.close?.();
  }
};

export const createTeamFileApi = async (teamSpaceId, file) => {
  const response = await apiClient.post(
    `/api/team-spaces/${teamSpaceId}/files`,
    file,
  );
  return response.data;
};

export const getTeamFilesApi = async teamSpaceId => {
  const response = await apiClient.get(`/api/team-spaces/${teamSpaceId}/files`);
  return response.data;
};

export const renameTeamFileApi = async (fileId, newFileName) => {
  const response = await apiClient.patch(`/api/team-files/${fileId}`, {
    newFileName,
  });
  return response.data;
};

export const deleteTeamFileApi = async fileId => {
  const response = await apiClient.delete(`/api/team-files/${fileId}`);
  return response.data;
};

export const addMemoImageApi = async (memoId, imageUrl) => {
  const response = await apiClient.post(`/api/memos/${memoId}/images`, {
    imageUrl,
  });
  return response.data;
};
