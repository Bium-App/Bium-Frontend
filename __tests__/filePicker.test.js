import {
  errorCodes,
  keepLocalCopy,
  pick,
} from '@react-native-documents/picker';
import { launchImageLibrary } from 'react-native-image-picker';
import {
  FILE_LIMITS,
  formatFileSize,
  pickDocumentFile,
  pickImageFile,
  validateSelectedFile,
} from '../src/utils/filePicker';

describe('filePicker', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    keepLocalCopy.mockImplementation(({ files }) =>
      Promise.resolve([
        {
          status: 'success',
          sourceUri: files[0].uri,
          localUri: `file://cache/${files[0].fileName}`,
        },
      ]),
    );
  });

  it('파일 크기를 사용자용 단위로 표시한다', () => {
    expect(formatFileSize(800)).toBe('800 B');
    expect(formatFileSize(2048)).toBe('2 KB');
    expect(formatFileSize(1.5 * 1024 * 1024)).toBe('1.5 MB');
  });

  it('이미지 용량 제한을 검사한다', () => {
    expect(() =>
      validateSelectedFile(
        {
          uri: 'file://large.jpg',
          type: 'image/jpeg',
          size: FILE_LIMITS.imageBytes + 1,
          kind: 'image',
        },
        'image',
      ),
    ).toThrow('최대 10.0 MB');
  });

  it('동영상 문서 첨부를 거부한다', () => {
    expect(() =>
      validateSelectedFile({
        uri: 'file://video.mp4',
        type: 'video/mp4',
        size: 100,
        kind: 'document',
      }),
    ).toThrow('동영상 파일은 첨부할 수 없습니다.');
  });

  it('사진 라이브러리 결과를 공통 파일 모델로 변환한다', async () => {
    launchImageLibrary.mockResolvedValue({
      assets: [
        {
          uri: 'file://profile.jpg',
          fileName: 'profile.jpg',
          type: 'image/jpeg',
          fileSize: 1200,
          width: 100,
          height: 100,
        },
      ],
    });

    await expect(pickImageFile()).resolves.toEqual({
      uri: 'file://profile.jpg',
      name: 'profile.jpg',
      type: 'image/jpeg',
      size: 1200,
      width: 100,
      height: 100,
      kind: 'image',
    });
  });

  it('문서 선택 취소는 오류 대신 null을 반환한다', async () => {
    pick.mockRejectedValue(
      Object.assign(new Error('cancelled'), {
        code: errorCodes.OPERATION_CANCELED,
      }),
    );

    await expect(pickDocumentFile()).resolves.toBeNull();
  });

  it('문서 선택 결과의 이미지 MIME은 이미지 제한을 적용한다', async () => {
    pick.mockResolvedValue([
      {
        uri: 'content://selected/image',
        name: 'selected.png',
        type: 'image/png',
        size: 500,
        error: null,
        hasRequestedType: true,
      },
    ]);

    await expect(pickDocumentFile()).resolves.toEqual(
      expect.objectContaining({
        uri: 'file://cache/selected.png',
        name: 'selected.png',
        kind: 'image',
      }),
    );
  });
});
