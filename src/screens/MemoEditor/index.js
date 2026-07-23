import React, { useState } from 'react';
import { StatusBar, Platform, ActivityIndicator } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';
import Header from '../../components/Header';
import FilePickerField from '../../components/FilePickerField';
import { useMemoEditor } from '../../hooks/useMemoEditor'; // 뷰모델 훅 임포트

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
  ContentInput,
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
  TimerBox,
  TimerHeaderRow,
  TimerDesc,
  TimerButtonRow,
  TimerButtonWrapper,
  AnimatedTimerBox,
  TimerButtonSub,
  TimerButtonText,
} from './MemoEditor.styles';

const TimerButton = ({ active, onPress, title, subTitle, disabled }) => (
  <TimerButtonWrapper>
    <TouchableOpacity onPress={onPress} activeOpacity={0.8} disabled={disabled}>
      <AnimatedTimerBox
        style={{ backgroundColor: active ? '#FF8933' : '#FFFFFF' }}
      >
        <TimerButtonText active={active}>{title}</TimerButtonText>
      </AnimatedTimerBox>
    </TouchableOpacity>
    <TimerButtonSub>{subTitle}</TimerButtonSub>
  </TimerButtonWrapper>
);

// route 프로퍼티를 추가하여, 리스트에서 클릭해 들어왔을 때 데이터를 받을 수 있도록 처리
export default function MemoEditor({ navigation, route }) {
  // 이전 화면(홈/타임라인)에서 메모를 눌러 들어왔다면 route.params에 데이터가 들어있음
  const initialData = route?.params?.memoData;
  const memoId = initialData?.id;

  // 서버 통신 및 폼 데이터를 뷰모델 훅에서 관리
  const {
    title,
    setTitle,
    content,
    setContent,
    timer,
    setTimer,
    imageFile,
    isPickingImage,
    selectImage,
    removeImage,
    isLoading,
    handleSave,
  } = useMemoEditor(initialData);

  // 화면 내부 동작 전용 상태 (툴바 UI 및 모달) - 기존 로직 완벽 유지
  const [fontSize, setFontSize] = useState(14);
  const [align, setAlign] = useState('left');
  const [format, setFormat] = useState({
    bold: false,
    italic: false,
    underline: false,
  });

  return (
    <Container>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <Header
        left={
          <HeaderTextButton onPress={() => navigation.goBack()}>
            <HeaderLeftText>취소</HeaderLeftText>
          </HeaderTextButton>
        }
        title={memoId ? '메모 수정' : '새 메모'}
        right={
          // 로딩 중일 때는 터치를 막고, handleSave에 네비게이션 콜백 전달
          <HeaderTextButton
            onPress={() =>
              !isLoading && handleSave(memoId, () => navigation.goBack())
            }
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
            <ContentInput
              placeholder="내용 입력..."
              placeholderTextColor="#AAAAAA"
              maxLength={2000}
              multiline={true}
              scrollEnabled={true}
              textAlignVertical="top"
              value={content}
              onChangeText={setContent}
              editable={!isLoading} // 저장 중 입력 방지
              customFontSize={fontSize}
              bold={format.bold}
              italic={format.italic}
              underline={format.underline}
              align={align}
            />
            <ContentLengthText>{content.length}/2000</ContentLengthText>
          </EditorBox>

          <FilePickerField
            label="메모 이미지"
            helperText="이미지 1개, 최대 10MB까지 첨부할 수 있습니다."
            file={imageFile}
            kind="image"
            isPicking={isPickingImage}
            disabled={isLoading}
            onSelect={selectImage}
            onRemove={removeImage}
          />

          <ToolbarBox>
            <ToolbarRow>
              <ToolGroup>
                <ToolText color="#FF8933" pl={4}>
                  Tt
                </ToolText>
              </ToolGroup>
              <ToolGroup>
                <FontSizeBox>
                  <TouchableOpacity
                    onPress={() => setFontSize(Math.max(10, fontSize - 1))}
                  >
                    <Icon name="remove-outline" size={16} color="#000000" />
                  </TouchableOpacity>
                  <FontSizeText>{fontSize}px</FontSizeText>
                  <TouchableOpacity
                    onPress={() => setFontSize(Math.min(30, fontSize + 1))}
                  >
                    <Icon name="add-outline" size={16} color="#000000" />
                  </TouchableOpacity>
                </FontSizeBox>
                <ToolButton
                  active={align === 'left'}
                  onPress={() => setAlign('left')}
                >
                  <Icon
                    name="menu-outline"
                    size={20}
                    color={align === 'left' ? '#FF8933' : '#000000'}
                  />
                </ToolButton>
                <ToolButton
                  active={align === 'justify'}
                  onPress={() => setAlign('justify')}
                >
                  <Icon
                    name="list-outline"
                    size={20}
                    color={align === 'justify' ? '#FF8933' : '#000000'}
                  />
                </ToolButton>
              </ToolGroup>
            </ToolbarRow>
            <ToolbarRowDivider />
            <ToolbarRow justifyContent="flex-start">
              <FormatGroup>
                <ToolButton
                  active={format.bold}
                  onPress={() => setFormat({ ...format, bold: !format.bold })}
                >
                  <ToolText color="#000000" bold>
                    B
                  </ToolText>
                </ToolButton>
                <ToolButton
                  active={format.italic}
                  onPress={() =>
                    setFormat({ ...format, italic: !format.italic })
                  }
                >
                  <ToolText color="#000000" italic>
                    I
                  </ToolText>
                </ToolButton>
                <ToolButton
                  active={format.underline}
                  onPress={() =>
                    setFormat({ ...format, underline: !format.underline })
                  }
                >
                  <ToolText color="#000000" underline>
                    U
                  </ToolText>
                </ToolButton>
              </FormatGroup>
              <ColorPickerWrapper>
                <ColorCircle />
              </ColorPickerWrapper>
            </ToolbarRow>
          </ToolbarBox>

          {!memoId ? (
            <TimerBox>
              <TimerHeaderRow>
                <Icon
                  name="information-circle-outline"
                  size={18}
                  color="#FF8933"
                />
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
    </Container>
  );
}
