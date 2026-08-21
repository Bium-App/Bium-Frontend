jest.mock('../src/api/files', () => ({
  uploadSelectedFileApi: jest.fn(),
  addMemoImageApi: jest.fn(),
  deleteMemoImageApi: jest.fn(),
}));

import {
  addMemoImageApi,
  deleteMemoImageApi,
  uploadSelectedFileApi,
} from '../src/api/files';
import {saveMemoImageChanges} from '../src/utils/memoImageSync';
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

beforeEach(() => {
  jest.clearAllMocks();
  uploadMock.mockResolvedValue('https://cdn.example.com/photo.jpg');
  addMock.mockResolvedValue({imageId: 30});
  deleteMock.mockResolvedValue(undefined);
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
  ).rejects.toThrow('upload failed');

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
  ).rejects.toThrow('attach failed');

  expect(deleteMock).not.toHaveBeenCalled();
});

test('기존 이미지 삭제가 실패하면 새 이미지 연결을 되돌린다', async () => {
  deleteMock
    .mockRejectedValueOnce(new Error('delete old image failed'))
    .mockResolvedValueOnce(undefined);

  await expect(
    saveMemoImageChanges({
      memoId: 10,
      newFiles: [selectedImage],
      removedImageIds: [20],
    }),
  ).rejects.toThrow('delete old image failed');

  expect(deleteMock).toHaveBeenNthCalledWith(1, 20);
  expect(deleteMock).toHaveBeenNthCalledWith(2, 30);
});
