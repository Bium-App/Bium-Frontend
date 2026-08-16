import React from 'react';
import { EditorContent } from '@tiptap/react';
import { useTenTap } from '@10play/tentap-editor';
import { MEMO_EDITOR_EXTENSIONS } from '../src/editor/memoEditorExtensions';

export function MemoWebEditor() {
  const editor = useTenTap({ bridges: MEMO_EDITOR_EXTENSIONS });

  return (
    <EditorContent
      editor={editor}
      className={window.dynamicHeight ? 'dynamic-height' : undefined}
    />
  );
}
