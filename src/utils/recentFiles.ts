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

export const saveRecentFile = async (file: SelectedFile): Promise<void> => {
  const current = await getRecentFiles();
  const next = [
    file,
    ...current.filter(item => item.uri !== file.uri && item.name !== file.name),
  ].slice(0, MAX_RECENT_FILES);
  await AsyncStorage.setItem(RECENT_FILES_KEY, JSON.stringify(next));
};
