import {
  errorCodes,
  isErrorWithCode,
  keepLocalCopy,
  pick,
  types,
} from '@react-native-documents/picker';
import {launchImageLibrary} from 'react-native-image-picker';
import type {
  FileDomain,
  SelectedFile,
  SelectedFileKind,
  UploadBlob,
} from '../types/file';

export const FILE_DOMAINS = Object.freeze({
  PROFILE: 'PROFILE',
  MEMO: 'MEMO',
  TEAM: 'TEAM',
  INQUIRY: 'INQUIRY',
} satisfies Record<string, FileDomain>);

export const FILE_LIMITS = Object.freeze({
  imageBytes: 10 * 1024 * 1024,
  documentBytes: 30 * 1024 * 1024,
});

interface NormalizableFile {
  uri?: string;
  name?: string | null;
  fileName?: string;
  type?: string | null;
  size?: number | null;
  fileSize?: number;
  width?: number;
  height?: number;
}

const fallbackFileName = (kind: SelectedFileKind): string =>
  `${kind === 'image' ? 'image' : 'file'}-${Date.now()}`;

const normalizeFile = (
  file: NormalizableFile,
  kind: SelectedFileKind,
): SelectedFile => ({
  uri: file.uri ?? '',
  name: file.name ?? file.fileName ?? fallbackFileName(kind),
  type:
    file.type ?? (kind === 'image' ? 'image/jpeg' : 'application/octet-stream'),
  size: file.size ?? file.fileSize ?? null,
  width: file.width ?? null,
  height: file.height ?? null,
  kind,
});

export const formatFileSize = (size: number | null | undefined): string => {
  if (!Number.isFinite(size) || size === null || size === undefined || size < 0) {
    return '크기 정보 없음';
  }
  if (size < 1024) return `${size} B`;
  if (size < 1024 * 1024) return `${Math.ceil(size / 1024)} KB`;
  return `${(size / (1024 * 1024)).toFixed(1)} MB`;
};

export const validateSelectedFile = <T extends Partial<SelectedFile>>(
  file: T | null | undefined,
  kind: SelectedFileKind = file?.kind ?? 'document',
): T => {
  if (!file?.uri) throw new Error('선택한 파일을 읽을 수 없습니다.');
  if (kind !== 'image' && file.type?.startsWith('video/')) {
    throw new Error('동영상 파일은 첨부할 수 없습니다.');
  }

  const maxBytes =
    kind === 'image' ? FILE_LIMITS.imageBytes : FILE_LIMITS.documentBytes;
  if (Number.isFinite(file.size) && (file.size ?? 0) > maxBytes) {
    const maxSize = formatFileSize(maxBytes);
    throw new Error(`파일 용량은 최대 ${maxSize}까지 선택할 수 있습니다.`);
  }

  return file;
};

export const pickImageFile = async (): Promise<SelectedFile | null> => {
  const response = await launchImageLibrary({
    mediaType: 'photo',
    selectionLimit: 1,
    quality: 0.9,
    assetRepresentationMode: 'compatible',
  });

  if (response.didCancel) return null;
  if (response.errorCode) {
    throw new Error(response.errorMessage ?? '이미지를 선택하지 못했습니다.');
  }

  const asset = response.assets?.[0];
  return asset ? validateSelectedFile(normalizeFile(asset, 'image')) : null;
};

export const pickDocumentFile = async (): Promise<SelectedFile | null> => {
  try {
    const [document] = await pick({
      type: [types.allFiles],
      allowMultiSelection: false,
      mode: 'import',
    });

    if (document.error) throw new Error(document.error);
    if (!document.hasRequestedType) {
      throw new Error('지원하지 않는 파일 형식입니다.');
    }

    const fileName = document.name ?? fallbackFileName('document');
    const [copyResult] = await keepLocalCopy({
      files: [{uri: document.uri, fileName}],
      destination: 'cachesDirectory',
    });
    if (copyResult.status !== 'success') {
      throw new Error(
        copyResult.copyError ?? '선택한 파일을 복사하지 못했습니다.',
      );
    }

    const kind: SelectedFileKind = document.type?.startsWith('image/')
      ? 'image'
      : 'document';
    return validateSelectedFile(
      normalizeFile(
        {...document, uri: copyResult.localUri, name: fileName},
        kind,
      ),
    );
  } catch (error) {
    if (
      isErrorWithCode(error) &&
      error.code === errorCodes.OPERATION_CANCELED
    ) {
      return null;
    }
    throw error;
  }
};

export const readSelectedFile = async (
  file: SelectedFile,
): Promise<UploadBlob> => {
  validateSelectedFile(file);
  const response = await fetch(file.uri);
  const blob = (await response.blob()) as UploadBlob;
  if (Number.isFinite(file.size) && (file.size ?? 0) > 0 && blob.size === 0) {
    throw new Error('선택한 파일을 읽지 못했습니다.');
  }
  return blob;
};
