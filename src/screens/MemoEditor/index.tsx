import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  Modal,
  StatusBar,
  Platform,
  ActivityIndicator,
  Alert,
  StyleSheet,
} from 'react-native';
import type { ImageLoadEvent } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import type { CompositeScreenProps } from '@react-navigation/native';
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/Ionicons';
import { useTranslation } from 'react-i18next';
import {
  RichText,
  useBridgeState,
  useEditorBridge,
  useEditorContent,
} from '@10play/tentap-editor';
import Header from '../../components/Header';
import { useMemoEditor } from '../../hooks/useMemoEditor'; // 뷰모델 훅 임포트
import { editorHtml } from '../../editor/generated/editorHtml';
import { MEMO_EDITOR_EXTENSIONS } from '../../editor/memoEditorExtensions';
import { formatFileSize } from '../../utils/filePicker';
import { getRichEditorContent } from '../../utils/richContent';
import type { MemoRichDocument } from '../../types/memo';
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
  FormatGroup,
  ToolButton,
  ToolText,
  ColorPickerWrapper,
  ColorCircle,
  SectionTitle,
  SectionHeader,
  SectionSubTitle,
  ImageUploadBox,
  UploadIconBadge,
  UploadTitle,
  UploadSub,
  MediaPreviewBox,
  MediaThumbnail,
  MediaCaption,
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

const styles = StyleSheet.create({
  richEditor: {
    minHeight: 240,
    backgroundColor: '#FFFFFF',
  },
});

const MEMO_EDITOR_THEME = {
  webview: { backgroundColor: '#FFFFFF' },
  webviewContainer: { backgroundColor: '#FFFFFF' },
};

export default function MemoEditor({
  navigation,
  route,
}: MemoEditorScreenProps) {
  const { t } = useTranslation();
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
    existingImages,
    removeExistingImage,
    resetForm,
    isLoading,
    handleSave,
  } = useMemoEditor(initialData);

  const initialEditorContent = useMemo(
    () =>
      getRichEditorContent(
        initialData?.richContent,
        initialData?.content ?? '',
      ),
    [initialData?.content, initialData?.richContent],
  );

  const editor = useEditorBridge({
    bridgeExtensions: MEMO_EDITOR_EXTENSIONS,
    customSource: editorHtml,
    initialContent: initialEditorContent,
    autofocus: false,
    avoidIosKeyboard: false,
    dynamicHeight: true,
    editable: !isLoading,
    theme: MEMO_EDITOR_THEME,
  });
  const editorState = useBridgeState(editor);
  const editorText =
    useEditorContent(editor, { type: 'text', debounceInterval: 100 }) ??
    content;
  const initializedMemoRef = useRef<string | null>(null);
  const isSavingRef = useRef(false);

  // 화면 내부 동작 전용 상태 (모달)
  const [isModalVisible, setModalVisible] = useState(false);
  const [doNotShowAgain, setDoNotShowAgain] = useState(false);
  const [imageAspectRatios, setImageAspectRatios] = useState<
    Record<string, number>
  >({});

  const rememberImageAspectRatio = useCallback(
    (uri: string, event: ImageLoadEvent) => {
      const { width, height } = event.nativeEvent.source;
      if (!width || !height) return;
      const aspectRatio = width / height;
      setImageAspectRatios(current =>
        current[uri] === aspectRatio
          ? current
          : { ...current, [uri]: aspectRatio },
      );
    },
    [],
  );

  useEffect(() => {
    if (!editorState.isReady) return;
    const editorKey = memoId ?? 'new';
    if (initializedMemoRef.current === editorKey) return;
    initializedMemoRef.current = editorKey;
    editor.setContent(initialEditorContent);
  }, [editor, editorState.isReady, initialEditorContent, memoId]);

  const clearRichEditor = useCallback(() => {
    initializedMemoRef.current = null;
    if (editorState.isReady) editor.setContent('');
  }, [editor, editorState.isReady]);

  const closeEditor = useCallback(() => {
    resetForm();
    clearRichEditor();
    navigation.setParams({ memoData: undefined });
    navigation.goBack();
  }, [clearRichEditor, navigation, resetForm]);

  const handleSaveSuccess = useCallback(() => {
    clearRichEditor();
    navigation.setParams({ memoData: undefined });
    navigation.goBack();
  }, [clearRichEditor, navigation]);

  const saveMemo = useCallback(async () => {
    // isLoading은 editor.getText()/getJSON() 왕복이 끝난 뒤에야 true가 되므로,
    // 그 사이 저장 버튼을 빠르게 두 번 누르면 메모가 중복 생성될 수 있다.
    // ref로 그 창을 즉시 막는다.
    if (!editorState.isReady || isSavingRef.current) return;
    isSavingRef.current = true;
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
      Alert.alert(t('common.error'), t('memo_editor.editor_failed'));
    } finally {
      isSavingRef.current = false;
    }
  }, [editor, editorState.isReady, handleSave, handleSaveSuccess, memoId, t]);

  const injectEditorStyles = useCallback(() => {
    editor.injectCSS(`
      html, body { margin: 0; padding: 0; background: #ffffff; }
      .ProseMirror {
        min-height: 240px;
        padding: 0;
        color: #000000;
        font-size: 14px;
        line-height: 1.45;
        outline: none;
      }
      .ProseMirror p { margin: 0 0 4px; }
      .ProseMirror ul, .ProseMirror ol { margin: 0; padding-left: 22px; }
      .ProseMirror .is-editor-empty:first-child::before {
        content: '${t('memo_editor.content_placeholder')}' !important;
      }
    `);
  }, [editor, t]);

  return (
    <Container>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <Header
        left={
          <HeaderTextButton onPress={closeEditor}>
            <HeaderLeftText>{t('memo_editor.cancel')}</HeaderLeftText>
          </HeaderTextButton>
        }
        title={
          memoId ? t('memo_editor.edit_title') : t('memo_editor.new_title')
        }
        right={
          // 로딩 중일 때는 터치를 막고, handleSave에 네비게이션 콜백 전달
          <HeaderTextButton
            onPress={() => !isLoading && editorState.isReady && saveMemo()}
          >
            {isLoading ? (
              <ActivityIndicator color="#FF8933" size="small" />
            ) : (
              <HeaderRightText>{t('save')}</HeaderRightText>
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
                placeholder={t('memo_editor.title_placeholder')}
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
            <SectionTitle>{t('memo_editor.add_image')}</SectionTitle>
            <SectionSubTitle>{t('memo_editor.optional')}</SectionSubTitle>
          </SectionHeader>

          {mediaFiles.length > 0 ? (
            mediaFiles.map(file => (
              <MediaPreviewBox
                key={file.uri}
                $aspectRatio={imageAspectRatios[file.uri]}
              >
                <MediaThumbnail
                  source={{uri: file.uri}}
                  resizeMode="cover"
                  onLoad={event => rememberImageAspectRatio(file.uri, event)}
                />
                <MediaCaption pointerEvents="none">
                  <Icon name="image-outline" size={13} color="#FFFFFF" />
                  <MediaName numberOfLines={1}>{file.name}</MediaName>
                  <MediaSize>{formatFileSize(file.size)}</MediaSize>
                </MediaCaption>
                <MediaRemoveButton
                  accessibilityLabel={t('memo_editor.remove_attachment', {
                    name: file.name,
                  })}
                  activeOpacity={0.8}
                  disabled={isLoading}
                  onPress={() => removeMedia(file.uri)}
                >
                  <Icon name="close" size={16} color="#FFFFFF" />
                </MediaRemoveButton>
              </MediaPreviewBox>
            ))
          ) : existingImages.length > 0 ? (
            existingImages.map(image => (
              <MediaPreviewBox
                key={image.imageId}
                $aspectRatio={imageAspectRatios[image.imageUrl]}
              >
                <MediaThumbnail
                  source={{uri: image.imageUrl}}
                  resizeMode="cover"
                  onLoad={event =>
                    rememberImageAspectRatio(image.imageUrl, event)
                  }
                />
                <MediaRemoveButton
                  accessibilityLabel={t('memo_editor.remove_attachment', {
                    name: t('memo_editor.add_image'),
                  })}
                  activeOpacity={0.8}
                  disabled={isLoading}
                  onPress={() => removeExistingImage(image.imageId)}
                >
                  <Icon name="close" size={16} color="#FFFFFF" />
                </MediaRemoveButton>
              </MediaPreviewBox>
            ))
          ) : (
            <ImageUploadBox
              activeOpacity={0.7}
              disabled={isLoading || isPickingMedia}
              onPress={selectMedia}
            >
              {isPickingMedia ? (
                <ActivityIndicator color="#FF8933" size="small" />
              ) : (
                <>
                  <UploadIconBadge>
                    <Icon name="camera-outline" size={22} color="#FF8933" />
                  </UploadIconBadge>
                  <UploadTitle>{t('memo_editor.select_image')}</UploadTitle>
                  <UploadSub>{t('memo_editor.image_limit')}</UploadSub>
                </>
              )}
            </ImageUploadBox>
          )}

          {!memoId ? (
            <TimerBox>
              <TimerHeaderRow>
                <TouchableOpacity
                  accessibilityRole="button"
                  accessibilityLabel={t('memo_editor.timer_info')}
                  hitSlop={{ top: 8, right: 8, bottom: 8, left: 8 }}
                  onPress={() => setModalVisible(true)}
                >
                  <Icon
                    name="information-circle-outline"
                    size={18}
                    color="#FF8933"
                  />
                </TouchableOpacity>
                <SectionTitle>{t('memo_editor.timer_title')}</SectionTitle>
              </TimerHeaderRow>
              <TimerDesc>{t('memo_editor.timer_description')}</TimerDesc>
              <TimerButtonRow>
                {[
                  ['6h', t('memo_editor.after_6h')],
                  ['12h', t('memo_editor.after_12h')],
                  ['24h', t('memo_editor.after_24h')],
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
                <SectionTitle>{t('memo_editor.timer_set')}</SectionTitle>
              </TimerHeaderRow>
              <TimerDesc>{t('memo_editor.timer_edit_unavailable')}</TimerDesc>
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
                  <ModalHighlight>{t('memo_editor.fire_memo')}</ModalHighlight>
                  {t('memo_editor.disappears_prefix')}
                  {'\n'}
                  <ModalHighlight>
                    {t('memo_editor.automatically')}
                  </ModalHighlight>
                  {t('memo_editor.disappears_suffix')}
                </ModalText>
                <ModalSubText>
                  {t('memo_editor.important_prefix')}
                  {'\n'}
                  <ModalBlueHighlight>
                    {t('memo_editor.ice')}
                  </ModalBlueHighlight>
                  {t('memo_editor.preserve_suffix')}
                </ModalSubText>
              </ModalTitleWrapper>
              <TouchableOpacity
                accessibilityRole="button"
                accessibilityLabel={t('memo_editor.close_info')}
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
                <CheckboxLabel>
                  {t('memo_editor.do_not_show_again')}
                </CheckboxLabel>
              </TouchableOpacity>
            </ModalFooter>
          </ModalContainer>
        </ModalOverlay>
      </Modal>
    </Container>
  );
}
