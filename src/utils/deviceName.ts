import {Platform} from 'react-native';

export const getDeviceName = (): string =>
  `${Platform.OS}-${String(Platform.Version)}`;
