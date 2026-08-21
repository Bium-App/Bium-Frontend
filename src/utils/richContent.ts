import type {MemoRichContent, MemoRichDocument} from '../types/memo';

const normalizeRemovedFormatting = (
  nodes: MemoRichDocument['content'],
): MemoRichDocument['content'] =>
  nodes?.flatMap(node => {
    const normalizedContent = normalizeRemovedFormatting(node.content);

    if (node.type === 'bulletList' || node.type === 'listItem') {
      return normalizedContent ?? [];
    }

    const normalizedMarks = node.marks
      ?.map(mark => {
        if (mark.type !== 'textStyle' || !mark.attrs?.fontSize) return mark;
        const remainingAttrs = {...mark.attrs};
        delete remainingAttrs.fontSize;
        return Object.keys(remainingAttrs).length
          ? {...mark, attrs: remainingAttrs}
          : null;
      })
      .filter(mark => mark !== null);

    return [
      {
        ...node,
        content: normalizedContent,
        marks: normalizedMarks,
      },
    ];
  });

export const getRichEditorContent = (
  richContent: MemoRichContent | null | undefined,
  content: string,
): object | string => {
  if (!richContent) return content;
  try {
    const document = JSON.parse(richContent) as MemoRichDocument;
    if (!document || document.type !== 'doc') return content;
    return {
      type: document.type,
      attrs: document.attrs,
      content: normalizeRemovedFormatting(document.content),
      marks: document.marks,
      text: document.text,
    };
  } catch {
    return content;
  }
};
