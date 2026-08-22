import AsyncStorage from '@react-native-async-storage/async-storage';
import type { SelectedFile } from '../types/file';

const RECENT_FILES_KEY = '@bium/recent-files';
const MAX_RECENT_FILES = 5;

const isSelectedFile = (value: unknown): value is SelectedFile => {
  if (!value || typeof value !== 'object') return false;
  const file = value as Partial<SelectedFile>;
  return (
    typeof file.uri === 'string' &&
    typeof file.name === 'string' &&
    typeof file.type === 'string' &&
    ['image', 'document'].includes(file.kind ?? '')
  );
};

// 저장된 값이 손상되었거나 형식이 맞지 않으면 빈 목록으로 처리한다.
export const getRecentFiles = async (): Promise<SelectedFile[]> => {
  try {
    const stored = await AsyncStorage.getItem(RECENT_FILES_KEY);
    if (!stored) return [];
    const parsed: unknown = JSON.parse(stored);
    return Array.isArray(parsed)
      ? parsed.filter(isSelectedFile).slice(0, MAX_RECENT_FILES)
      : [];
  } catch {
    return [];
  }
};

// 같은 파일을 다시 선택하면 맨 앞으로 옮기고, 최근 목록은 최대 개수까지만 유지한다.
export const saveRecentFile = async (file: SelectedFile): Promise<void> => {
  const current = await getRecentFiles();
  const next = [
    file,
    ...current.filter(item => item.uri !== file.uri && item.name !== file.name),
  ].slice(0, MAX_RECENT_FILES);
  await AsyncStorage.setItem(RECENT_FILES_KEY, JSON.stringify(next));
};
