import apiClient from './client';

export const getPresignedUrlApi = async ({ prefix, fileName }) => {
  const response = await apiClient.get('/api/files/presigned-url', {
    params: { prefix, fileName },
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
  prefix,
  fileName,
  fileBody,
  contentType,
}) => {
  const { presignedUrl, fileUrl } = await getPresignedUrlApi({
    prefix,
    fileName,
  });
  await uploadToPresignedUrl(
    presignedUrl,
    fileBody,
    contentType ?? 'application/octet-stream',
  );
  return fileUrl;
};

export const createTeamFileApi = async file => {
  const response = await apiClient.post('/api/team-files', file);
  return response.data;
};

export const getTeamFilesApi = async teamSpaceId => {
  const response = await apiClient.get(`/api/team-files/team/${teamSpaceId}`);
  return response.data;
};

export const renameTeamFileApi = async (fileId, newFileName) => {
  const response = await apiClient.patch(`/api/team-files/${fileId}/name`, {
    newFileName,
  });
  return response.data;
};

export const deleteTeamFileApi = async fileId => {
  const response = await apiClient.delete(`/api/team-files/${fileId}`);
  return response.data;
};

export const addMemoImageApi = async (memoId, imageUrl) => {
  const response = await apiClient.post('/api/memo-images', {
    memoId: Number(memoId),
    imageUrl,
  });
  return response.data;
};
