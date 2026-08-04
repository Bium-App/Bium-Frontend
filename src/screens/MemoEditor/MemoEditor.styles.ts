import styled from 'styled-components/native';
import { Animated } from 'react-native';

export const Container = styled.View`
  flex: 1;
  background-color: #ffffff;
`;

export const KeyboardContainer = styled.KeyboardAvoidingView`
  flex: 1;
`;

export const HeaderTextButton = styled.TouchableOpacity`
  padding: 8px;
`;

export const HeaderLeftText = styled.Text`
  font-size: 16px;
  color: #bbbbbb;
`;

export const HeaderRightText = styled.Text`
  font-size: 16px;
  font-weight: 700;
  color: #ff8933;
`;

export const ContentContainer = styled.ScrollView.attrs({
  contentContainerStyle: {
    padding: 12,
    paddingHorizontal: 16,
    paddingBottom: 110,
  },
})`
  flex: 1;
  background-color: #ffffff;
`;

export const EditorBox = styled.View`
  border-width: 1px;
  border-color: #bbbbbb;
  border-radius: 8px;
  padding: 12px;
  margin-bottom: 12px;
  background-color: #ffffff;
`;

export const TitleRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 4px;
`;

export const TitleInput = styled.TextInput`
  flex: 1;
  font-size: 18px;
  font-weight: 700;
  color: #000000;
  padding: 0;
`;

export const LengthText = styled.Text`
  font-size: 12px;
  color: #d0d0d0;
`;

export const Divider = styled.View`
  height: 1px;
  background-color: #dbdbdb;
  margin-vertical: 8px;
`;

export const ContentInput = styled.TextInput<{
  customFontSize?: number;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  align?: 'left' | 'center' | 'right' | 'justify';
}>`
  height: 100px;
  font-size: ${({ customFontSize }) => customFontSize || 14}px;
  font-weight: ${({ bold }) => (bold ? 'bold' : 'normal')};
  font-style: ${({ italic }) => (italic ? 'italic' : 'normal')};
  text-decoration-line: ${({ underline }) =>
    underline ? 'underline' : 'none'};
  text-align: ${({ align }) => align || 'left'};
  color: #000000;
  padding: 0;
`;

export const ContentLengthText = styled.Text`
  font-size: 12px;
  color: #d0d0d0;
  text-align: right;
  margin-top: 4px;
`;

export const ToolbarBox = styled.View`
  border-width: 1px;
  border-color: #bbbbbb;
  border-radius: 8px;
  padding: 8px 12px;
  margin-bottom: 16px;
  background-color: #ffffff;
`;

export const ToolbarRow = styled.View<{$alignStart?: boolean}>`
  flex-direction: row;
  align-items: center;
  justify-content: ${({$alignStart}) =>
    $alignStart ? 'flex-start' : 'space-between'};
`;

export const ToolbarRowDivider = styled.View`
  height: 1px;
  background-color: #dbdbdb;
  margin-vertical: 8px;
`;

export const ToolGroup = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 12px;
`;

export const FormatGroup = styled.View`
  flex-direction: row;
  align-items: center;
  border-width: 1px;
  border-color: #dbdbdb;
  border-radius: 20px;
  padding: 2px 8px;
  gap: 4px;
`;

export const ToolText = styled.Text<{
  color?: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
}>`
  font-size: 16px;
  color: ${({ color }) => color || '#000000'};
  font-weight: ${({ bold }) => (bold ? 'bold' : 'normal')};
  font-style: ${({ italic }) => (italic ? 'italic' : 'normal')};
  text-decoration-line: ${({ underline }) =>
    underline ? 'underline' : 'none'};
`;

export const ToolButton = styled.TouchableOpacity<{active: boolean}>`
  padding: 4px 6px;
  background-color: ${({ active }) => (active ? '#FFE8D6' : 'transparent')};
  border-radius: 4px;
  justify-content: center;
  align-items: center;
`;

export const FontSizeBox = styled.View`
  flex-direction: row;
  align-items: center;
  border-width: 1px;
  border-color: #bbbbbb;
  border-radius: 16px;
  padding-horizontal: 10px;
  padding-vertical: 2px;
  gap: 12px;
  background-color: #ffffff;
`;

export const FontSizeText = styled.Text`
  font-size: 14px;
  color: #000000;
`;

export const ColorPickerWrapper = styled.TouchableOpacity`
  border-width: 1px;
  border-color: #dbdbdb;
  border-radius: 8px;
  padding: 6px;
  margin-left: 12px;
  justify-content: center;
  align-items: center;
`;

export const ColorCircle = styled.View`
  width: 20px;
  height: 20px;
  border-radius: 10px;
  background-color: #ff8800;
`;

export const SectionHeader = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 6px;
  gap: 6px;
`;

export const SectionTitle = styled.Text`
  font-size: 14px;
  font-weight: 700;
  color: #000000;
`;

export const SectionSubTitle = styled.Text`
  font-size: 12px;
  color: #919191;
`;

export const ImageUploadBox = styled.TouchableOpacity`
  border-width: 1px;
  border-style: dashed;
  border-color: #ff8933;
  border-radius: 8px;
  padding: 16px 36px;
  align-self: flex-start;
  align-items: center;
  justify-content: center;
  margin-bottom: 16px;
  background-color: #ffffff;
`;

export const UploadTitle = styled.Text`
  font-size: 14px;
  color: #8a8a8a;
  margin-top: 8px;
  margin-bottom: 2px;
`;

export const UploadSub = styled.Text`
  font-size: 11px;
  color: #8a8a8a;
`;

export const TimerBox = styled.View`
  border-width: 1px;
  border-color: #bbbbbb;
  border-radius: 8px;
  padding: 12px 16px;
  margin-bottom: 12px;
  background-color: #ffffff;
`;

export const TimerHeaderRow = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 6px;
  margin-bottom: 4px;
`;

export const TimerDesc = styled.Text`
  font-size: 12px;
  color: #9b9a9a;
  margin-bottom: 16px;
`;

export const TimerButtonRow = styled.View`
  flex-direction: row;
  justify-content: center;
  gap: 32px;
`;

export const TimerButtonWrapper = styled.View`
  width: 80px;
  align-items: center;
`;

export const AnimatedTimerBox = styled(Animated.View)<{$active: boolean}>`
  width: 85px;
  height: 33px;
  border-width: 1px;
  border-color: #ff8933;
  border-radius: 4px;
  justify-content: center;
  align-items: center;
  background-color: ${({$active}) => ($active ? '#ff8933' : '#ffffff')};
`;

export const TimerButtonSub = styled.Text`
  font-size: 10px;
  color: #9b9a9a;
  text-align: center;
  margin-top: 8px;
`;

export const TimerButtonText = styled.Text<{active: boolean}>`
  font-size: 15px;
  font-weight: 500;
  color: ${({ active }) => (active ? '#FFFFFF' : '#FF8933')};
`;

export const ModalOverlay = styled.View`
  flex: 1;
  background-color: rgba(0, 0, 0, 0.4);
  justify-content: center;
  align-items: center;
  padding: 24px;
`;

export const ModalContainer = styled.View`
  width: 100%;
  background-color: #ffffff;
  border-radius: 12px;
  border-width: 1px;
  border-color: #ff8933;
  padding: 20px;
`;

export const ModalHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 12px;
`;

export const ModalFireIcon = styled.View`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  background-color: #ffe8d6;
  justify-content: center;
  align-items: center;
  margin-right: 12px;
`;

export const ModalTitleWrapper = styled.View`
  flex: 1;
`;

export const ModalText = styled.Text`
  font-size: 15px;
  color: #000000;
  line-height: 22px;
`;

export const ModalHighlight = styled.Text`
  color: #ff8933;
  font-weight: 700;
`;

export const ModalSubText = styled.Text`
  font-size: 14px;
  color: #000000;
  margin-top: 12px;
  line-height: 20px;
`;

export const ModalBlueHighlight = styled.Text`
  color: #7cc4ff;
  font-weight: 700;
`;

export const ModalFooter = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 20px;
  gap: 8px;
`;

export const Checkbox = styled.TouchableOpacity<{checked: boolean}>`
  width: 16px;
  height: 16px;
  border-width: 1px;
  border-color: #bbbbbb;
  border-radius: 2px;
  justify-content: center;
  align-items: center;
  background-color: ${({ checked }) => (checked ? '#FF8933' : '#FFFFFF')};
`;

export const CheckboxLabel = styled.Text`
  font-size: 12px;
  color: #aaaaaa;
`;
