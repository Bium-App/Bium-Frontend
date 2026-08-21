import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {Alert, StatusBar, StyleSheet} from 'react-native';
import type {ImageLoadEvent} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useTranslation} from 'react-i18next';
import {RichText, useBridgeState, useEditorBridge} from '@10play/tentap-editor';
import Header from '../../components/Header';
import BurningTimer from '../../components/BurningTimer';
import AsyncState from '../../components/AsyncState';
import {useMemoDetail} from '../../hooks/useMemoDetail';
import {editorHtml} from '../../editor/generated/editorHtml';
import {MEMO_EDITOR_EXTENSIONS} from '../../editor/memoEditorExtensions';
import {getRichEditorContent} from '../../utils/richContent';
import type {RootScreenProps} from '../../types/navigation';

import FireIcon from '../../assets/icons/ic_fire.svg';
import IceIcon from '../../assets/icons/ic_ice.svg';
import PinIcon from '../../assets/icons/ic_pin.svg';
import PinnedPinIcon from '../../assets/icons/ic_icepin.svg';

import {
  Container,
  HeaderIconRow,
  IconButton,
  ContentContainer,
  TitleRow,
  TitleText,
  MetaRow,
  MetaText,
  TimerRow,
  Divider,
  RichEditorFrame,
  ImageSection,
  MemoImage,
  FooterMeta,
  FooterMetaText,
} from './MemoDetail.styles';

const styles = StyleSheet.create({
  richEditor: {
    minHeight: 60,
    backgroundColor: '#FFFFFF',
  },
});

const MEMO_EDITOR_THEME = {
  webview: {backgroundColor: '#FFFFFF'},
  webviewContainer: {backgroundColor: '#FFFFFF'},
};

const formatDateTime = (value?: string | null): string | null => {
  if (!value) return null;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return null;
  return date.toLocaleString();
};

export default function MemoDetail({
  navigation,
  route,
}: RootScreenProps<'MemoDetail'>) {
  const {t} = useTranslation();
  const {memoId} = route.params;
  const {memo, isLoading, errorMessage, fetchMemo, changeStatus, togglePin, moveToTrash} =
    useMemoDetail(memoId);

  useFocusEffect(
    useCallback(() => {
      fetchMemo();
    }, [fetchMemo]),
  );

  const initialEditorContent = useMemo(
    () => getRichEditorContent(memo?.richContent, memo?.content ?? ''),
    [memo?.content, memo?.richContent],
  );

  const editor = useEditorBridge({
    bridgeExtensions: MEMO_EDITOR_EXTENSIONS,
    customSource: editorHtml,
    initialContent: initialEditorContent,
    editable: false,
    dynamicHeight: true,
    theme: MEMO_EDITOR_THEME,
  });
  const editorState = useBridgeState(editor);
  const appliedContentRef = useRef<object | string | null>(null);
  const [imageAspectRatios, setImageAspectRatios] = useState<
    Record<string, number>
  >({});

  const rememberImageAspectRatio = useCallback(
    (uri: string, event: ImageLoadEvent) => {
      const {width, height} = event.nativeEvent.source;
      if (!width || !height) return;
      const aspectRatio = width / height;
      setImageAspectRatios(current =>
        current[uri] === aspectRatio
          ? current
          : {...current, [uri]: aspectRatio},
      );
    },
    [],
  );

  useEffect(() => {
    if (!editorState.isReady) return;
    if (appliedContentRef.current === initialEditorContent) return;
    appliedContentRef.current = initialEditorContent;
    editor.setContent(initialEditorContent);
  }, [editor, editorState.isReady, initialEditorContent]);

  const injectEditorStyles = useCallback(() => {
    editor.injectCSS(`
      html, body { margin: 0; padding: 0; background: #ffffff; }
      .ProseMirror {
        min-height: 60px;
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

  const openEditor = () => {
    if (!memo) return;
    navigation.navigate('MainTabs', {
      screen: 'MemoEditor',
      params: {
        memoData: {
          id: String(memo.memoId),
          title: memo.title,
          content: memo.content,
          richContent: memo.richContent,
          status: memo.status,
          expiredAt: memo.expiredAt,
          createdAt: memo.createdAt,
          images: memo.images,
        },
      },
    });
  };

  const confirmTrash = () => {
    if (!memo) return;
    Alert.alert(
      t('home.move_to_trash'),
      t('home.move_to_trash_confirm', {title: memo.title}),
      [
        {text: t('home.cancel'), style: 'cancel'},
        {
          text: t('home.move'),
          style: 'destructive',
          onPress: async () => {
            if (await moveToTrash()) navigation.goBack();
          },
        },
      ],
    );
  };

  const openMemoMenu = () => {
    if (!memo) return;
    Alert.alert(t('home.manage_memo'), memo.title, [
      {
        text:
          memo.status === 'ICE'
            ? t('home.change_to_fire')
            : t('home.store_as_ice'),
        onPress: () => changeStatus(memo.status === 'ICE' ? 'FIRE' : 'ICE'),
      },
      {
        text: t('home.move_to_trash_action'),
        style: 'destructive',
        onPress: confirmTrash,
      },
      {text: t('home.cancel'), style: 'cancel'},
    ]);
  };

  if (!memo) {
    return (
      <Container>
        <Header
          left={
            <IconButton onPress={() => navigation.goBack()} activeOpacity={0.7}>
              <Icon name="chevron-back-outline" size={24} color="#FF8933" />
            </IconButton>
          }
        />
        <AsyncState
          isLoading={isLoading}
          errorMessage={errorMessage}
          onRetry={fetchMemo}
        />
      </Container>
    );
  }

  const createdAtText = formatDateTime(memo.createdAt);
  const updatedAtText = formatDateTime(memo.updatedAt);

  return (
    <Container>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <Header
        left={
          <IconButton onPress={() => navigation.goBack()} activeOpacity={0.7}>
            <Icon name="chevron-back-outline" size={24} color="#FF8933" />
          </IconButton>
        }
        right={
          <HeaderIconRow>
            {memo.status === 'ICE' ? (
              <IconButton
                accessibilityRole="button"
                accessibilityLabel={
                  memo.isPinned ? t('timeline.unpin') : t('timeline.pin')
                }
                onPress={togglePin}
                activeOpacity={0.7}
              >
                {memo.isPinned ? (
                  <PinnedPinIcon width={20} height={20} />
                ) : (
                  <PinIcon width={20} height={20} color="#7CC4FF" />
                )}
              </IconButton>
            ) : null}
            <IconButton onPress={openEditor} activeOpacity={0.7}>
              <Icon name="pencil-outline" size={22} color="#000000" />
            </IconButton>
            <IconButton onPress={openMemoMenu} activeOpacity={0.7}>
              <Icon name="ellipsis-vertical" size={22} color="#000000" />
            </IconButton>
          </HeaderIconRow>
        }
      />

      <ContentContainer showsVerticalScrollIndicator={false}>
        <TitleRow>
          {memo.status === 'ICE' ? (
            <IceIcon width={26} height={26} color="#7CC4FF" />
          ) : (
            <FireIcon width={26} height={26} color="#FF8933" />
          )}
          <TitleText>{memo.title}</TitleText>
        </TitleRow>

        <MetaRow>
          <Icon name="calendar-outline" size={13} color="#AAAAAA" />
          <MetaText>{createdAtText}</MetaText>
        </MetaRow>

        {memo.status === 'FIRE' && memo.expiredAt ? (
          <TimerRow>
            <BurningTimer
              createdAt={memo.createdAt}
              expiredAt={memo.expiredAt}
              label={t('timeline.remaining')}
            />
          </TimerRow>
        ) : null}

        <Divider />

        <RichEditorFrame>
          <RichText
            editor={editor}
            onLoad={injectEditorStyles}
            scrollEnabled={false}
            style={styles.richEditor}
          />
        </RichEditorFrame>

        {memo.images?.length ? (
          <ImageSection>
            {memo.images.map(image => (
              <MemoImage
                key={image.imageId}
                source={{uri: image.imageUrl}}
                resizeMode="cover"
                $aspectRatio={imageAspectRatios[image.imageUrl]}
                onLoad={event =>
                  rememberImageAspectRatio(image.imageUrl, event)
                }
              />
            ))}
          </ImageSection>
        ) : null}

        <FooterMeta>
          {createdAtText ? (
            <FooterMetaText>{createdAtText}</FooterMetaText>
          ) : null}
          {updatedAtText && updatedAtText !== createdAtText ? (
            <FooterMetaText>{updatedAtText}</FooterMetaText>
          ) : null}
        </FooterMeta>
      </ContentContainer>
    </Container>
  );
}
