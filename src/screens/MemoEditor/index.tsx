import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  Modal,
  StatusBar,
  Platform,
  ActivityIndicator,
  Alert,
  StyleSheet,
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import type { CompositeScreenProps } from '@react-navigation/native';
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  RichText,
  TenTapStartKit,
  useBridgeState,
  useEditorBridge,
  useEditorContent,
} from '@10play/tentap-editor';
import Header from '../../components/Header';
import { useMemoEditor } from '../../hooks/useMemoEditor'; // 뷰모델 훅 임포트
import {
  FontSizeBridge,
  type FontSizeEditorCommands,
} from '../../editor/fontSizeBridge';
import { formatFileSize } from '../../utils/filePicker';
import type {
  MemoRichContent,
  MemoRichDocument,
} from '../../types/memo';
import type {
  MainTabParamList,
  RootStackParamList,
} from '../../types/navigation';

import {
  Container,
  KeyboardContainer,
  HeaderTextButton,
  HeaderLeftText,
  HeaderRightText,
  ContentContainer,
  EditorBox,
  TitleRow,
  TitleInput,
  LengthText,
  Divider,
  RichEditorFrame,
  ContentLengthText,
  ToolbarBox,
  ToolbarRow,
  ToolbarRowDivider,
  ToolGroup,
  FormatGroup,
  ToolButton,
  ToolText,
  FontSizeBox,
  FontSizeText,
  ColorPickerWrapper,
  ColorCircle,
  SectionTitle,
  SectionHeader,
  SectionSubTitle,
  ImageUploadBox,
  UploadTitle,
  UploadSub,
  MediaPreviewList,
  MediaPreviewItem,
  MediaThumbnail,
  MediaInfo,
  MediaName,
  MediaSize,
  MediaRemoveButton,
  TimerBox,
  TimerHeaderRow,
  TimerDesc,
  TimerButtonRow,
  TimerButtonWrapper,
  AnimatedTimerBox,
  TimerButtonSub,
  TimerButtonText,
  ModalOverlay,
  ModalContainer,
  ModalHeader,
  ModalFireIcon,
  ModalTitleWrapper,
  ModalText,
  ModalHighlight,
  ModalSubText,
  ModalBlueHighlight,
  ModalFooter,
  Checkbox,
  CheckboxLabel,
} from './MemoEditor.styles';

interface TimerButtonProps {
  active: boolean;
  onPress: () => void;
  title: string;
  subTitle: string;
  disabled?: boolean;
}

const TimerButton = ({
  active,
  onPress,
  title,
  subTitle,
  disabled,
}: TimerButtonProps) => (
  <TimerButtonWrapper>
    <TouchableOpacity onPress={onPress} activeOpacity={0.8} disabled={disabled}>
      <AnimatedTimerBox $active={active}>
        <TimerButtonText active={active}>{title}</TimerButtonText>
      </AnimatedTimerBox>
    </TouchableOpacity>
    <TimerButtonSub>{subTitle}</TimerButtonSub>
  </TimerButtonWrapper>
);

// route 프로퍼티를 추가하여, 리스트에서 클릭해 들어왔을 때 데이터를 받을 수 있도록 처리
type MemoEditorScreenProps = CompositeScreenProps<
  BottomTabScreenProps<MainTabParamList, 'MemoEditor'>,
  NativeStackScreenProps<RootStackParamList>
>;

const getInitialEditorContent = (
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
      content: document.content,
      marks: document.marks,
      text: document.text,
    };
  } catch {
    return content;
  }
};

const styles = StyleSheet.create({
  richEditor: {
    minHeight: 100,
    backgroundColor: '#FFFFFF',
  },
});

export default function MemoEditor({
  navigation,
  route,
}: MemoEditorScreenProps) {
  // 이전 화면(홈/타임라인)에서 메모를 눌러 들어왔다면 route.params에 데이터가 들어있음
  const initialData = route?.params?.memoData;
  const memoId = initialData?.id;

  // 서버 통신 및 폼 데이터를 뷰모델 훅에서 관리
  const {
    title,
    setTitle,
    content,
    timer,
    setTimer,
    mediaFiles,
    isPickingMedia,
    selectMedia,
    removeMedia,
    resetForm,
    isLoading,
    handleSave,
  } = useMemoEditor(initialData);

  const editor = useEditorBridge({
    bridgeExtensions: [...TenTapStartKit, FontSizeBridge],
    initialContent: getInitialEditorContent(
      initialData?.richContent,
      initialData?.content ?? '',
    ),
    autofocus: false,
    avoidIosKeyboard: true,
    dynamicHeight: false,
    editable: !isLoading,
    theme: {
      webview: {backgroundColor: '#FFFFFF'},
      webviewContainer: {backgroundColor: '#FFFFFF'},
    },
  });
  const editorState = useBridgeState(editor);
  const editorText =
    useEditorContent(editor, {type: 'text', debounceInterval: 100}) ?? content;
  const richEditor = editor as typeof editor & FontSizeEditorCommands;
  const initializedMemoRef = useRef<string | null>(null);

  // 화면 내부 동작 전용 상태 (툴바 UI 및 모달) - 기존 로직 완벽 유지
  const [fontSize, setFontSize] = useState(14);
  const [isModalVisible, setModalVisible] = useState(false);
  const [doNotShowAgain, setDoNotShowAgain] = useState(false);

  const resetFormatting = useCallback(() => {
    setFontSize(14);
  }, []);

  useEffect(() => {
    resetFormatting();
  }, [memoId, resetFormatting]);

  useEffect(() => {
    if (!editorState.isReady) return;
    const editorKey = memoId ?? 'new';
    if (initializedMemoRef.current === editorKey) return;
    initializedMemoRef.current = editorKey;
    editor.setPlaceholder('내용 입력...');
    editor.setContent(
      getInitialEditorContent(
        initialData?.richContent,
        initialData?.content ?? '',
      ),
    );
  }, [
    editor,
    editorState.isReady,
    initialData?.content,
    initialData?.richContent,
    memoId,
  ]);

  const clearRichEditor = useCallback(() => {
    initializedMemoRef.current = null;
    if (editorState.isReady) editor.setContent('');
  }, [editor, editorState.isReady]);

  const closeEditor = useCallback(() => {
    resetForm();
    resetFormatting();
    clearRichEditor();
    navigation.setParams({ memoData: undefined });
    navigation.goBack();
  }, [clearRichEditor, navigation, resetForm, resetFormatting]);

  const handleSaveSuccess = useCallback(() => {
    resetFormatting();
    clearRichEditor();
    navigation.setParams({ memoData: undefined });
    navigation.goBack();
  }, [clearRichEditor, navigation, resetFormatting]);

  const saveMemo = useCallback(async () => {
    if (!editorState.isReady) return;
    try {
      const [plainText, document] = await Promise.all([
        editor.getText(),
        editor.getJSON(),
      ]);
      const richContent = JSON.stringify({
        ...document,
        version: 1,
      } satisfies MemoRichDocument);
      await handleSave(memoId, handleSaveSuccess, {
        content: plainText,
        richContent,
      });
    } catch {
      Alert.alert('오류', '편집기 내용을 불러오지 못했습니다.');
    }
  }, [editor, editorState.isReady, handleSave, handleSaveSuccess, memoId]);

  const setSelectedFontSize = useCallback(
    (nextSize: number) => {
      const boundedSize = Math.min(30, Math.max(10, nextSize));
      setFontSize(boundedSize);
      richEditor.setFontSize(boundedSize);
    },
    [richEditor],
  );

  const injectEditorStyles = useCallback(() => {
    editor.injectCSS(`
      html, body { margin: 0; padding: 0; background: #ffffff; }
      .ProseMirror {
        min-height: 100px;
        padding: 0;
        color: #000000;
        font-size: 14px;
        line-height: 1.45;
        outline: none;
      }
      .ProseMirror p { margin: 0 0 4px; }
      .ProseMirror ul, .ProseMirror ol { margin: 0; padding-left: 22px; }
    `);
  }, [editor]);

  return (
    <Container>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <Header
        left={
          <HeaderTextButton onPress={closeEditor}>
            <HeaderLeftText>취소</HeaderLeftText>
          </HeaderTextButton>
        }
        title={memoId ? '메모 수정' : '새 메모'}
        right={
          // 로딩 중일 때는 터치를 막고, handleSave에 네비게이션 콜백 전달
          <HeaderTextButton
            onPress={() => !isLoading && editorState.isReady && saveMemo()}
          >
            {isLoading ? (
              <ActivityIndicator color="#FF8933" size="small" />
            ) : (
              <HeaderRightText>저장</HeaderRightText>
            )}
          </HeaderTextButton>
        }
      />
      <KeyboardContainer
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ContentContainer showsVerticalScrollIndicator={false}>
          <EditorBox>
            <TitleRow>
              <TitleInput
                placeholder="제목 입력"
                placeholderTextColor="#000000"
                maxLength={50}
                value={title}
                onChangeText={setTitle}
                editable={!isLoading} // 저장 중 입력 방지
              />
              <LengthText>{title.length}/50</LengthText>
            </TitleRow>
            <Divider />
            <RichEditorFrame>
              <RichText
                editor={editor}
                onLoad={injectEditorStyles}
                scrollEnabled={false}
                style={styles.richEditor}
              />
            </RichEditorFrame>
            <ContentLengthText>{editorText.length}/2000</ContentLengthText>
          </EditorBox>

          <ToolbarBox>
            <ToolbarRow>
              <ToolGroup>
                <ToolText color="#FF8933">Tt</ToolText>
              </ToolGroup>
              <ToolGroup>
                <FontSizeBox>
                  <TouchableOpacity
                    onPress={() => setSelectedFontSize(fontSize - 1)}
                  >
                    <Icon name="remove-outline" size={16} color="#000000" />
                  </TouchableOpacity>
                  <FontSizeText>{fontSize}px</FontSizeText>
                  <TouchableOpacity
                    onPress={() => setSelectedFontSize(fontSize + 1)}
                  >
                    <Icon name="add-outline" size={16} color="#000000" />
                  </TouchableOpacity>
                </FontSizeBox>
                <ToolButton
                  active={!editorState.isBulletListActive}
                  onPress={() =>
                    editorState.isBulletListActive
                      ? editor.toggleBulletList()
                      : editor.focus()
                  }
                >
                  <Icon
                    name="menu-outline"
                    size={20}
                    color={!editorState.isBulletListActive ? '#FF8933' : '#000000'}
                  />
                </ToolButton>
                <ToolButton
                  active={Boolean(editorState.isBulletListActive)}
                  onPress={() => editor.toggleBulletList()}
                >
                  <Icon
                    name="list-outline"
                    size={20}
                    color={editorState.isBulletListActive ? '#FF8933' : '#000000'}
                  />
                </ToolButton>
              </ToolGroup>
            </ToolbarRow>
            <ToolbarRowDivider />
            <ToolbarRow $alignStart={true}>
              <FormatGroup>
                <ToolButton
                  active={Boolean(editorState.isBoldActive)}
                  onPress={() => editor.toggleBold()}
                >
                  <ToolText color="#000000" bold>
                    B
                  </ToolText>
                </ToolButton>
                <ToolButton
                  active={Boolean(editorState.isItalicActive)}
                  onPress={() => editor.toggleItalic()}
                >
                  <ToolText color="#000000" italic>
                    I
                  </ToolText>
                </ToolButton>
                <ToolButton
                  active={Boolean(editorState.isUnderlineActive)}
                  onPress={() => editor.toggleUnderline()}
                >
                  <ToolText color="#000000" underline>
                    U
                  </ToolText>
                </ToolButton>
              </FormatGroup>
              <ColorPickerWrapper
                onPress={() =>
                  editorState.activeColor === '#FF8933'
                    ? editor.unsetColor()
                    : editor.setColor('#FF8933')
                }
              >
                <ColorCircle />
              </ColorPickerWrapper>
            </ToolbarRow>
          </ToolbarBox>

          <SectionHeader>
            <Icon name="camera-outline" size={18} color="#FF8933" />
            <SectionTitle>이미지 추가</SectionTitle>
            <SectionSubTitle>(선택)</SectionSubTitle>
          </SectionHeader>

          {mediaFiles.length > 0 ? (
            <MediaPreviewList>
              {mediaFiles.map(file => (
                <MediaPreviewItem key={file.uri}>
                  <MediaThumbnail source={{ uri: file.uri }} />
                  <MediaInfo>
                    <MediaName numberOfLines={1}>{file.name}</MediaName>
                    <MediaSize>{formatFileSize(file.size)}</MediaSize>
                  </MediaInfo>
                  <MediaRemoveButton
                    accessibilityLabel={`${file.name} 첨부 제거`}
                    disabled={isLoading}
                    onPress={() => removeMedia(file.uri)}
                  >
                    <Icon name="close-circle" size={22} color="#AAAAAA" />
                  </MediaRemoveButton>
                </MediaPreviewItem>
              ))}
            </MediaPreviewList>
          ) : null}

          {mediaFiles.length < 1 ? (
            <ImageUploadBox
              activeOpacity={0.7}
              disabled={isLoading || isPickingMedia}
              onPress={selectMedia}
            >
              {isPickingMedia ? (
                <ActivityIndicator color="#FF8933" size="small" />
              ) : (
                <Icon name="add-outline" size={24} color="#FF8933" />
              )}
              <UploadTitle>
                {mediaFiles.length > 0 ? '이미지 다시 선택' : '이미지 선택'}
              </UploadTitle>
              <UploadSub>이미지 1개, 최대 10MB 이하</UploadSub>
            </ImageUploadBox>
          ) : null}

          {!memoId ? (
            <TimerBox>
              <TimerHeaderRow>
                <TouchableOpacity
                  accessibilityRole="button"
                  accessibilityLabel="소멸 시간 안내 보기"
                  hitSlop={{ top: 8, right: 8, bottom: 8, left: 8 }}
                  onPress={() => setModalVisible(true)}
                >
                  <Icon
                    name="information-circle-outline"
                    size={18}
                    color="#FF8933"
                  />
                </TouchableOpacity>
                <SectionTitle>소멸 시간 설정</SectionTitle>
              </TimerHeaderRow>
              <TimerDesc>
                설정한 시간이 지나면 FIRE 메모가 자동으로 소멸합니다.
              </TimerDesc>
              <TimerButtonRow>
                {[
                  ['6h', '6시간 후'],
                  ['12h', '12시간 후'],
                  ['24h', '24시간 후'],
                ].map(([value, label]) => (
                  <TimerButton
                    key={value}
                    active={timer === value}
                    disabled={isLoading}
                    onPress={() => setTimer(value)}
                    title={value}
                    subTitle={label}
                  />
                ))}
              </TimerButtonRow>
            </TimerBox>
          ) : initialData?.expiredAt ? (
            <TimerBox>
              <TimerHeaderRow>
                <Icon name="timer-outline" size={18} color="#FF8933" />
                <SectionTitle>소멸 시간이 설정된 메모입니다.</SectionTitle>
              </TimerHeaderRow>
              <TimerDesc>
                현재 명세에서는 메모 수정 시 소멸 시간을 변경할 수 없습니다.
              </TimerDesc>
            </TimerBox>
          ) : null}
        </ContentContainer>
      </KeyboardContainer>

      <Modal
        transparent
        visible={isModalVisible}
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <ModalOverlay>
          <ModalContainer>
            <ModalHeader>
              <ModalFireIcon>
                <Icon name="flame" size={24} color="#FF8933" />
              </ModalFireIcon>
              <ModalTitleWrapper>
                <ModalText>
                  <ModalHighlight>불 메모</ModalHighlight>는 설정한 시간이
                  지나면 {'\n'}
                  <ModalHighlight>자동으로</ModalHighlight> 사라져요.
                </ModalText>
                <ModalSubText>
                  중요한 내용은 {'\n'}
                  <ModalBlueHighlight>'얼음'</ModalBlueHighlight>으로
                  보관해보세요!
                </ModalSubText>
              </ModalTitleWrapper>
              <TouchableOpacity
                accessibilityRole="button"
                accessibilityLabel="안내 닫기"
                onPress={() => setModalVisible(false)}
              >
                <Icon name="close-circle-outline" size={24} color="#AAAAAA" />
              </TouchableOpacity>
            </ModalHeader>
            <ModalFooter>
              <Checkbox
                checked={doNotShowAgain}
                accessibilityRole="checkbox"
                accessibilityState={{ checked: doNotShowAgain }}
                onPress={() => setDoNotShowAgain(value => !value)}
              >
                {doNotShowAgain ? (
                  <Icon name="checkmark" size={14} color="#FFFFFF" />
                ) : null}
              </Checkbox>
              <TouchableOpacity
                onPress={() => setDoNotShowAgain(value => !value)}
              >
                <CheckboxLabel>다시 보지 않기</CheckboxLabel>
              </TouchableOpacity>
            </ModalFooter>
          </ModalContainer>
        </ModalOverlay>
      </Modal>
    </Container>
  );
}
