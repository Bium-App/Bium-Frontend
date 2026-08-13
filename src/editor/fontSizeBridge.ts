import {Extension} from '@tiptap/core';
import {BridgeExtension} from '@10play/tentap-editor';

export interface FontSizeEditorCommands {
  setFontSize: (fontSize: number) => void;
}

enum FontSizeActionType {
  SetFontSize = 'bium-set-font-size',
}

type FontSizeMessage = {
  type: FontSizeActionType.SetFontSize;
  payload: number;
};

const FontSizeExtension = Extension.create({
  name: 'biumFontSize',
  addGlobalAttributes() {
    return [
      {
        types: ['textStyle'],
        attributes: {
          fontSize: {
            default: null,
            parseHTML: element =>
              (element as unknown as {style?: {fontSize?: string}}).style
                ?.fontSize ?? null,
            renderHTML: attributes =>
              attributes.fontSize
                ? {style: `font-size: ${attributes.fontSize}`}
                : {},
          },
        },
      },
    ];
  },
});

export const FontSizeBridge = new BridgeExtension<
  {activeFontSize?: string},
  FontSizeEditorCommands,
  FontSizeMessage
>({
  tiptapExtension: FontSizeExtension,
  onBridgeMessage: (editor, message) => {
    if (message.type === FontSizeActionType.SetFontSize) {
      editor
        .chain()
        .focus()
        .setMark('textStyle', {fontSize: `${message.payload}px`})
        .run();
    }
    return false;
  },
  extendEditorInstance: sendBridgeMessage => ({
    setFontSize: fontSize =>
      sendBridgeMessage({
        type: FontSizeActionType.SetFontSize,
        payload: fontSize,
      }),
  }),
  extendEditorState: editor => ({
    activeFontSize: editor.getAttributes('textStyle').fontSize,
  }),
});
