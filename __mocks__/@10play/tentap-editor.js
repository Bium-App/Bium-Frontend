const React = require('react');
const { View } = require('react-native');

class BridgeExtension {
  constructor(config) {
    Object.assign(this, config);
  }
}

const editor = {
  focus: jest.fn(),
  getJSON: jest.fn().mockResolvedValue({ type: 'doc', content: [] }),
  getText: jest.fn().mockResolvedValue(''),
  injectCSS: jest.fn(),
  setColor: jest.fn(),
  setContent: jest.fn(),
  setFontSize: jest.fn(),
  setPlaceholder: jest.fn(),
  toggleBold: jest.fn(),
  toggleBulletList: jest.fn(),
  toggleItalic: jest.fn(),
  toggleUnderline: jest.fn(),
  unsetColor: jest.fn(),
};

module.exports = {
  BridgeExtension,
  RichText: props => React.createElement(View, props),
  TenTapStartKit: [],
  useBridgeState: () => ({ isReady: true }),
  useEditorBridge: () => editor,
  useEditorContent: () => '',
};
