import {
  BoldBridge,
  ColorBridge,
  CoreBridge,
  ItalicBridge,
  PlaceholderBridge,
  UnderlineBridge,
} from '@10play/tentap-editor';

// 메모 화면에서 실제로 사용하는 기능만 포함한다. StarterKit 전체를 넣으면
// 사용하지 않는 TaskList 상태 계산까지 실행돼 편집 중 예외가 발생할 수 있다.
export const MEMO_EDITOR_EXTENSIONS = [
  CoreBridge,
  BoldBridge,
  ItalicBridge,
  UnderlineBridge,
  ColorBridge,
  PlaceholderBridge,
];
