jest.mock('../src/api/files', () => ({
  uploadSelectedFileApi: jest.fn(),
  addMemoImageApi: jest.fn(),
  deleteMemoImageApi: jest.fn(),
  getMemoImagesApi: jest.fn(),
}));

import {
  addMemoImageApi,
  deleteMemoImageApi,
  getMemoImagesApi,
  uploadSelectedFileApi,
} from '../src/api/files';
import {
  MemoImageSyncError,
  saveMemoImageChanges,
} from '../src/utils/memoImageSync';
import type {SelectedFile} from '../src/types/file';

const selectedImage: SelectedFile = {
  uri: 'file:///photo.jpg',
  name: 'photo.jpg',
  type: 'image/jpeg',
  size: 1024,
  kind: 'image',
};

const uploadMock = jest.mocked(uploadSelectedFileApi);
const addMock = jest.mocked(addMemoImageApi);
const deleteMock = jest.mocked(deleteMemoImageApi);
const getImagesMock = jest.mocked(getMemoImagesApi);

const oldImage = {imageId: 20, imageUrl: 'https://cdn.example.com/old.jpg'};
const newImage = {imageId: 30, imageUrl: 'https://cdn.example.com/photo.jpg'};

beforeEach(() => {
  jest.clearAllMocks();
  uploadMock.mockResolvedValue('https://cdn.example.com/photo.jpg');
  addMock.mockResolvedValue({imageId: 30});
  deleteMock.mockResolvedValue(undefined);
  getImagesMock.mockResolvedValue([]);
});

test('새 이미지 연결이 끝난 뒤 기존 이미지를 삭제한다', async () => {
  await saveMemoImageChanges({
    memoId: 10,
    newFiles: [selectedImage],
    removedImageIds: [20],
  });

  expect(uploadMock).toHaveBeenCalledTimes(1);
  expect(addMock).toHaveBeenCalledWith(
    10,
    'https://cdn.example.com/photo.jpg',
  );
  expect(deleteMock).toHaveBeenCalledWith(20);
  expect(addMock.mock.invocationCallOrder[0]).toBeLessThan(
    deleteMock.mock.invocationCallOrder[0],
  );
});

test('새 이미지 업로드가 실패하면 기존 이미지를 삭제하지 않는다', async () => {
  uploadMock.mockRejectedValueOnce(new Error('upload failed'));

  await expect(
    saveMemoImageChanges({
      memoId: 10,
      newFiles: [selectedImage],
      removedImageIds: [20],
    }),
  ).rejects.toMatchObject<Partial<MemoImageSyncError>>({
    code: 'UPLOAD_FAILED',
  });

  expect(addMock).not.toHaveBeenCalled();
  expect(deleteMock).not.toHaveBeenCalled();
});

test('새 이미지 메타데이터 연결이 실패해도 기존 이미지를 삭제하지 않는다', async () => {
  addMock.mockRejectedValueOnce(new Error('attach failed'));

  await expect(
    saveMemoImageChanges({
      memoId: 10,
      newFiles: [selectedImage],
      removedImageIds: [20],
    }),
  ).rejects.toMatchObject<Partial<MemoImageSyncError>>({
    code: 'ATTACH_FAILED',
  });

  expect(deleteMock).not.toHaveBeenCalled();
});

test('기존 이미지 삭제가 실패하면 새 이미지 연결을 되돌린다', async () => {
  deleteMock
    .mockRejectedValueOnce(new Error('delete old image failed'))
    .mockResolvedValueOnce(undefined);
  getImagesMock.mockResolvedValueOnce([oldImage]);

  await expect(
    saveMemoImageChanges({
      memoId: 10,
      newFiles: [selectedImage],
      removedImageIds: [20],
    }),
  ).rejects.toMatchObject<Partial<MemoImageSyncError>>({
    code: 'EXISTING_DELETE_FAILED',
    serverImages: [oldImage],
  });

  expect(deleteMock).toHaveBeenNthCalledWith(1, 20);
  expect(deleteMock).toHaveBeenNthCalledWith(2, 30);
});

test('새 이미지 롤백이 계속 실패하면 기존 이미지 삭제를 재시도해 교체를 완결한다', async () => {
  deleteMock
    .mockRejectedValueOnce(new Error('delete old image failed'))
    .mockRejectedValueOnce(new Error('rollback failed 1'))
    .mockRejectedValueOnce(new Error('rollback failed 2'))
    .mockRejectedValueOnce(new Error('rollback failed 3'))
    .mockResolvedValueOnce(undefined);
  getImagesMock
    .mockResolvedValueOnce([oldImage, newImage])
    .mockResolvedValueOnce([newImage]);

  await expect(
    saveMemoImageChanges({
      memoId: 10,
      newFiles: [selectedImage],
      removedImageIds: [20],
    }),
  ).resolves.toBeUndefined();

  expect(deleteMock).toHaveBeenCalledTimes(5);
  expect(deleteMock).toHaveBeenNthCalledWith(1, 20);
  expect(deleteMock).toHaveBeenNthCalledWith(2, 30);
  expect(deleteMock).toHaveBeenNthCalledWith(5, 20);
  expect(getImagesMock).toHaveBeenCalledTimes(2);
});

test('기존 이미지 삭제와 새 이미지 롤백이 모두 실패하면 서버 상태를 포함한 복구 오류를 반환한다', async () => {
  deleteMock.mockRejectedValue(new Error('all deletes failed'));
  getImagesMock.mockResolvedValue([oldImage, newImage]);

  await expect(
    saveMemoImageChanges({
      memoId: 10,
      newFiles: [selectedImage],
      removedImageIds: [20],
    }),
  ).rejects.toMatchObject<Partial<MemoImageSyncError>>({
    code: 'RECOVERY_FAILED',
    serverImages: [oldImage, newImage],
  });

  expect(deleteMock).toHaveBeenCalledTimes(10);
  expect(getImagesMock).toHaveBeenCalledTimes(3);
});
