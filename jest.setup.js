/* global jest */
jest.mock('react-native-keychain');
jest.mock('react-native-image-picker');
jest.mock('@react-native-documents/picker');
jest.mock('react-native-webview');
jest.mock('@10play/tentap-editor');
jest.mock('@react-native-google-signin/google-signin', () => ({
  GoogleSignin: {
    configure: jest.fn(),
    hasPlayServices: jest.fn(),
    signIn: jest.fn(),
  },
}));
