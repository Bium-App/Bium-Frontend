import React, { useState, useRef, useEffect } from 'react';
import { Modal, StatusBar, Platform, Animated } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';
import Header from '../../components/Header';

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
  SectionHeader,
  SectionTitle,
  SectionSubTitle,
  ImageUploadBox,
  UploadTitle,
  UploadSub,
  TimerBox,
  TimerHeaderRow,
  TimerDesc,
  TimerButtonRow,
  TimerButtonWrapper,
  AnimatedTimerBox,
  TimerButtonSub,
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
  CheckboxLabel
} from './MemoEditor.styles';

const AnimatedTimerButton = ({ active, onPress, title, subTitle }) => {
  const anim = useRef(new Animated.Value(active ? 1 : 0)).current;

  useEffect(() => {
    Animated.timing(anim, {
      toValue: active ? 1 : 0,
      duration: 250,
      useNativeDriver: false,
    }).start();
  }, [active, anim]);

  const bgColor = anim.interpolate({
    inputRange: [0, 1],
    outputRange: ['#FFFFFF', '#FF8933']
  });

  const textColor = anim.interpolate({
    inputRange: [0, 1],
    outputRange: ['#FF8933', '#FFFFFF']
  });

  const boxStyle = { backgroundColor: bgColor };
  const textStyle = { fontSize: 15, fontWeight: '300', color: textColor };

  return (
    <TimerButtonWrapper>
      <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
        <AnimatedTimerBox style={boxStyle}>
          <Animated.Text style={textStyle}>
            {title}
          </Animated.Text>
        </AnimatedTimerBox>
      </TouchableOpacity>
      <TimerButtonSub>{subTitle}</TimerButtonSub>
    </TimerButtonWrapper>
  );
};

export default function MemoEditor({ navigation }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [fontSize, setFontSize] = useState(14);
  const [align, setAlign] = useState('left');
  const [format, setFormat] = useState({ bold: false, italic: false, underline: false });
  const [timer, setTimer] = useState('24h');
  const [isModalVisible, setModalVisible] = useState(false);
  const [doNotShowAgain, setDoNotShowAgain] = useState(false);

  return (
    <Container>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <Header
        left={
          <HeaderTextButton onPress={() => navigation.goBack()}>
            <HeaderLeftText>취소</HeaderLeftText>
          </HeaderTextButton>
        }
        title="새 메모"
        right={
          <HeaderTextButton onPress={() => console.log('저장')}>
            <HeaderRightText>저장</HeaderRightText>
          </HeaderTextButton>
        }
      />
      <KeyboardContainer behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ContentContainer showsVerticalScrollIndicator={false}>
          
          <EditorBox>
            <TitleRow>
              <TitleInput
                placeholder="제목 입력"
                placeholderTextColor="#000000"
                maxLength={50}
                value={title}
                onChangeText={setTitle}
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
              customFontSize={fontSize}
              bold={format.bold}
              italic={format.italic}
              underline={format.underline}
              align={align}
            />
            <ContentLengthText>{content.length}/2000</ContentLengthText>
          </EditorBox>

          <ToolbarBox>
            <ToolbarRow>
              <ToolGroup>
                <ToolText color="#FF8933" pl={4}>Tt</ToolText>
              </ToolGroup>
              <ToolGroup>
                <FontSizeBox>
                  <TouchableOpacity onPress={() => setFontSize(Math.max(10, fontSize - 1))}>
                    <Icon name="remove-outline" size={16} color="#000000" />
                  </TouchableOpacity>
                  <FontSizeText>{fontSize}px</FontSizeText>
                  <TouchableOpacity onPress={() => setFontSize(Math.min(30, fontSize + 1))}>
                    <Icon name="add-outline" size={16} color="#000000" />
                  </TouchableOpacity>
                </FontSizeBox>
                <ToolButton 
                  active={align === 'left'} 
                  onPress={() => setAlign('left')}
                >
                  <Icon name="menu-outline" size={20} color={align === 'left' ? "#FF8933" : "#000000"} />
                </ToolButton>
                <ToolButton 
                  active={align === 'justify'} 
                  onPress={() => setAlign('justify')}
                >
                  <Icon name="list-outline" size={20} color={align === 'justify' ? "#FF8933" : "#000000"} />
                </ToolButton>
              </ToolGroup>
            </ToolbarRow>
            <ToolbarRowDivider />
            <ToolbarRow justifyContent="flex-start">
              <FormatGroup>
                <ToolButton 
                  active={format.bold} 
                  onPress={() => setFormat({...format, bold: !format.bold})}
                >
                  <ToolText color="#000000" bold>B</ToolText>
                </ToolButton>
                <ToolButton 
                  active={format.italic} 
                  onPress={() => setFormat({...format, italic: !format.italic})}
                >
                  <ToolText color="#000000" italic>I</ToolText>
                </ToolButton>
                <ToolButton 
                  active={format.underline} 
                  onPress={() => setFormat({...format, underline: !format.underline})}
                >
                  <ToolText color="#000000" underline>U</ToolText>
                </ToolButton>
              </FormatGroup>
              <ColorPickerWrapper>
                <ColorCircle />
              </ColorPickerWrapper>
            </ToolbarRow>
          </ToolbarBox>

          <SectionHeader>
            <Icon name="camera-outline" size={18} color="#FF8933" />
            <SectionTitle>이미지 추가</SectionTitle>
            <SectionSubTitle>(선택)</SectionSubTitle>
          </SectionHeader>
          
          <ImageUploadBox activeOpacity={0.7}>
            <Icon name="add-outline" size={24} color="#FF8933" />
            <UploadTitle>사진 / 동영상 선택</UploadTitle>
            <UploadSub>최대 5장, 장당 10MB 이하</UploadSub>
          </ImageUploadBox>

          <TimerBox>
            <TimerHeaderRow>
              <TouchableOpacity onPress={() => setModalVisible(true)}>
                <Icon name="information-circle-outline" size={18} color="#FF8933" />
              </TouchableOpacity>
              <SectionTitle>소멸 시간 설정</SectionTitle>
            </TimerHeaderRow>
            <TimerDesc>설정한 시간이 지나면 메모가 자동으로 사라집니다.</TimerDesc>
            
            <TimerButtonRow>
              <AnimatedTimerButton 
                active={timer === '6h'} 
                onPress={() => setTimer('6h')} 
                title="6h" 
                subTitle="6시간후 소멸" 
              />
              <AnimatedTimerButton 
                active={timer === '12h'} 
                onPress={() => setTimer('12h')} 
                title="12h" 
                subTitle="12시간후 소멸" 
              />
              <AnimatedTimerButton 
                active={timer === '24h'} 
                onPress={() => setTimer('24h')} 
                title="24h" 
                subTitle="24시간후 소멸" 
              />
            </TimerButtonRow>
          </TimerBox>

        </ContentContainer>
      </KeyboardContainer>

      <Modal
        transparent={true}
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
                  <ModalHighlight>불 메모</ModalHighlight>는 설정한 시간이 지나면 {'\n'}<ModalHighlight>자동으로</ModalHighlight> 사라져요.
                </ModalText>
                <ModalSubText>
                  중요한 내용은 {'\n'}<ModalBlueHighlight>'얼음'</ModalBlueHighlight>으로 보관해보세요!
                </ModalSubText>
              </ModalTitleWrapper>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Icon name="close-circle-outline" size={24} color="#AAAAAA" />
              </TouchableOpacity>
            </ModalHeader>
            <ModalFooter>
              <Checkbox 
                checked={doNotShowAgain} 
                onPress={() => setDoNotShowAgain(!doNotShowAgain)}
              >
                {doNotShowAgain && <Icon name="checkmark" size={14} color="#FFFFFF" />}
              </Checkbox>
              <CheckboxLabel>다시 보지 않기</CheckboxLabel>
            </ModalFooter>
          </ModalContainer>
        </ModalOverlay>
      </Modal>

    </Container>
  );
}