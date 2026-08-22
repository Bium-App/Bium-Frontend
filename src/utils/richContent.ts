import type {MemoRichContent, MemoRichDocument} from '../types/memo';

// 더 이상 지원하지 않는 리스트(불릿) 구조를 풀어 일반 문단으로 펴고,
// 텍스트별 글자 크기(fontSize) 마크를 제거해 에디터가 다시 읽을 수 있게 정규화한다.
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

// 저장된 richContent(JSON 문서)를 정규화해 반환하고, 없거나 파싱에 실패하면
// 일반 텍스트 content를 그대로 돌려준다.
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
