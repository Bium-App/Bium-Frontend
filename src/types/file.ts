import type { ApiMutationResponse, EntityId } from './api';

export type FileDomain = 'PROFILE' | 'MEMO' | 'TEAM' | 'INQUIRY';
export type SelectedFileKind = 'image' | 'document';

export interface SelectedFile {
  uri: string;
  name: string;
  type: string;
  size: number | null;
  width?: number | null;
  height?: number | null;
  kind: SelectedFileKind;
}

export interface PresignedUrlRequest {
  domain: FileDomain;
  fileName: string;
  fileType: string;
}

export interface PresignedUrlResponse {
  presignedUrl: string;
  fileUrl: string;
}

export type UploadBlob = Blob & { close?: () => void };

export interface UploadFileRequest {
  domain: FileDomain;
  fileName: string;
  fileBody: UploadBlob;
  contentType?: string;
}

export interface UploadSelectedFileRequest {
  domain: FileDomain;
  file: SelectedFile;
}

export interface CreateTeamFileRequest {
  fileName: string;
  fileUrl: string;
  fileSize: string;
}

export interface TeamFile extends CreateTeamFileRequest {
  fileId: EntityId;
  teamSpaceId?: EntityId;
  uploadedAt?: string;
}

export type FileMutationResponse = ApiMutationResponse & Partial<TeamFile>;

export interface MemoImageMutationResponse extends ApiMutationResponse {
  imageId: EntityId;
}
