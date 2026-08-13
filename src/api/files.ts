import apiClient from './client';
import {readSelectedFile} from '../utils/filePicker';
import {parseRootArray} from '../utils/apiResponse';
import {
  logFetchError,
  logFetchRequest,
  logFetchResponse,
} from '../utils/apiLogger';
import type {ApiMutationResponse, EntityId} from '../types/api';
import type {
  CreateTeamFileRequest,
  FileMutationResponse,
  MemoImageMutationResponse,
  PresignedUrlRequest,
  PresignedUrlResponse,
  TeamFile,
  UploadBlob,
  UploadFileRequest,
  UploadSelectedFileRequest,
} from '../types/file';

export const getPresignedUrlApi = async ({
  domain,
  fileName,
  fileType,
}: PresignedUrlRequest): Promise<PresignedUrlResponse> => {
  const response = await apiClient.get<PresignedUrlResponse>(
    '/api/files/presigned-url',
    {params: {fileName, fileType, domain}},
  );
  return response.data;
};

export const uploadToPresignedUrl = async (
  presignedUrl: string,
  fileBody: Blob,
  contentType = 'application/octet-stream',
): Promise<void> => {
  const startedAt = logFetchRequest('PUT', presignedUrl, fileBody);
  let response: Response;
  try {
    response = await fetch(presignedUrl, {
      method: 'PUT',
      headers: {'Content-Type': contentType},
      body: fileBody,
    });
  } catch (error) {
    logFetchError('PUT', presignedUrl, error, startedAt);
    throw error;
  }
  logFetchResponse('PUT', presignedUrl, response.status, startedAt);
  if (!response.ok) {
    throw new Error(`S3 업로드에 실패했습니다. (${response.status})`);
  }
};

export const uploadFileApi = async ({
  domain,
  fileName,
  fileBody,
  contentType,
}: UploadFileRequest): Promise<string> => {
  const resolvedContentType = contentType ?? 'application/octet-stream';
  const {presignedUrl, fileUrl} = await getPresignedUrlApi({
    domain,
    fileName,
    fileType: resolvedContentType,
  });
  await uploadToPresignedUrl(presignedUrl, fileBody, resolvedContentType);
  return fileUrl;
};

export const uploadSelectedFileApi = async ({
  domain,
  file,
}: UploadSelectedFileRequest): Promise<string> => {
  const fileBody = (await readSelectedFile(file)) as UploadBlob;
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

export const createTeamFileApi = async (
  teamSpaceId: EntityId,
  file: CreateTeamFileRequest,
): Promise<FileMutationResponse> => {
  const response = await apiClient.post<FileMutationResponse>(
    `/api/team-spaces/${teamSpaceId}/files`,
    file,
  );
  return response.data;
};

export const getTeamFilesApi = async (
  teamSpaceId: EntityId,
): Promise<TeamFile[]> => {
  const response = await apiClient.get<unknown>(
    `/api/team-spaces/${teamSpaceId}/files`,
  );
  return parseRootArray<TeamFile>(response.data, '팀 파일 목록');
};

export const renameTeamFileApi = async (
  fileId: EntityId,
  newFileName: string,
): Promise<FileMutationResponse> => {
  const response = await apiClient.patch<FileMutationResponse>(
    `/api/team-files/${fileId}`,
    {newFileName},
  );
  return response.data;
};

export const deleteTeamFileApi = async (
  fileId: EntityId,
): Promise<ApiMutationResponse> => {
  const response = await apiClient.delete<ApiMutationResponse>(
    `/api/team-files/${fileId}`,
  );
  return response.data;
};

export const addMemoImageApi = async (
  memoId: EntityId,
  imageUrl: string,
): Promise<MemoImageMutationResponse> => {
  const response = await apiClient.post<MemoImageMutationResponse>(
    `/api/memos/${memoId}/images`,
    {imageUrl},
  );
  return response.data;
};
