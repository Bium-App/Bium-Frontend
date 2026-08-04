import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background-color: #ffffff;
`;

export const SearchContainer = styled.View`
  flex-direction: row;
  align-items: center;
  background-color: #e8e8e8;
  border-radius: 50px;
  padding: 8px 12px;
  margin: 16px 20px;
`;

export const SearchInput = styled.TextInput`
  flex: 1;
  margin-left: 8px;
  font-size: 14px;
  font-weight: 200;
  color: #000000;
  padding: 0;
`;

export const TabContainer = styled.View`
  flex-direction: row;
  align-items: center;
  background-color: #ffe8d6;
  border-radius: 8px;
  margin: 0 20px 24px;
`;

export const TabItem = styled.TouchableOpacity<{isActive: boolean}>`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 10px 0;
  background-color: transparent;
  border-width: 1.5px;
  border-color: ${({ isActive }) => (isActive ? '#FF8933' : 'transparent')};
  border-radius: 8px;
`;

export const TabSeparator = styled.View`
  width: 1px;
  height: 14px;
  background-color: #d1d5db;
`;

export const TabText = styled.Text<{isActive: boolean}>`
  font-size: 14px;
  font-weight: 400;
  color: ${({ isActive }) => (isActive ? '#FF8933' : '#000000')};
`;

export const SectionContainer = styled.View`
  margin: 0 20px 24px;
`;

export const SectionHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
`;

export const SectionTitle = styled.Text`
  font-size: 18px;
  font-weight: 500;
  color: #000000;
`;

export const NoticeCard = styled.TouchableOpacity`
  flex-direction: row;
  background-color: #ffffff;
  border-radius: 5px; /* 8-> 5 */
  border-width: 1px;
  border-color: #ff8933;
  padding: 16px;
  align-items: center;
`;

export const NoticeIconWrapper = styled.View`
  margin-right: 12px;
`;

export const NoticeContent = styled.View`
  flex: 1;
`;

export const NoticeTitle = styled.Text`
  font-size: 14px;
  font-weight: 500;
  color: #000000;
  margin-bottom: 4px;
`;

export const NoticeDesc = styled.Text`
  font-size: 12px;
  font-weight: 400;
  color: #000000;
`;

export const NoticeTime = styled.Text`
  font-size: 13px;
  color: #ff8933;
  align-self: flex-end;
  margin-top: 16px;
`;

export const ListCard = styled.View`
  background-color: #ffffff;
  border-radius: 8px;
  border-width: 1px;
  border-color: #d1d5db;
  padding: 0 16px;
`;

export const EmptySectionText = styled.Text<{compact?: boolean}>`
  text-align: center;
  color: #aaaaaa;
  margin-top: ${({compact}) => (compact ? 20 : 0)}px;
  padding-vertical: ${({compact}) => (compact ? 0 : 20)}px;
`;

export const ListItem = styled.View<{isLast: boolean}>`
  flex-direction: row;
  align-items: center;
  padding: 16px 0;
  border-bottom-width: ${({ isLast }) => (isLast ? 0 : 1)}px;
  border-bottom-color: #d1d5db;
`;

export const TouchableListItem = styled.TouchableOpacity<{isLast: boolean}>`
  flex-direction: row;
  align-items: center;
  padding: 16px 0;
  border-bottom-width: ${({ isLast }) => (isLast ? 0 : 1)}px;
  border-bottom-color: #d1d5db;
`;

export const ListIconWrapper = styled.View`
  margin-right: 12px;
`;

export const ListItemText = styled.Text`
  font-size: 13px;
  font-weight: 400;
  color: #000000;
`;

export const TodoItemText = styled.Text<{isDone: boolean}>`
  font-size: 13px;
  text-decoration-line: ${({ isDone }) => (isDone ? 'line-through' : 'none')};
  color: ${({ isDone }) => (isDone ? '#AAAAAA' : '#000000')};
`;

export const AddTodoButton = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: #ff8833;
  border-radius: 8px;
  padding: 14px 0;
  margin-top: 12px;
`;

export const AddTodoText = styled.Text`
  font-size: 16px;
  font-weight: 500;
  color: #ffffff;
  margin-left: 6px;
`;

export const ModalOverlay = styled.View`
  flex: 1;
  background-color: rgba(0, 0, 0, 0.5);
  justify-content: center;
  align-items: center;
  padding: 0 20px;
`;

export const ModalContainer = styled.View`
  width: 100%;
  background-color: #ffffff;
  border-radius: 16px;
  overflow: hidden;
`;

export const ModalHeader = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background-color: #ffe8d6;
  padding: 16px 20px;
  border-bottom-width: 1px;
  border-bottom-color: #f0f0f0;
`;

export const ModalHeaderButton = styled.TouchableOpacity`
  padding: 4px;
`;

export const ModalCancelText = styled.Text`
  font-size: 15px;
  font-weight: 500;
  color: #b0b0b0;
`;

export const ModalTitleText = styled.Text`
  font-size: 15px;
  font-weight: 500;
  color: #000000;
`;

export const ModalSaveText = styled.Text`
  font-size: 15px;
  font-weight: 500;
  color: #ff8933;
`;

export const ModalDeleteButton = styled.TouchableOpacity`
  align-items: center;
  padding: 12px;
  margin-top: 16px;
`;

export const ModalDeleteText = styled.Text`
  font-size: 14px;
  font-weight: 500;
  color: #ff0000;
`;

export const ModalBody = styled.View`
  padding: 24px 20px;
`;

export const InputLabel = styled.Text<{isFirst: boolean}>`
  font-size: 15px;
  font-weight: 500;
  color: #000000;
  margin-bottom: 8px;
  margin-top: ${({ isFirst }) => (isFirst ? 0 : 20)}px;
`;

export const TitleInput = styled.TextInput<{isFocused: boolean}>`
  background-color: ${({ isFocused }) => (isFocused ? '#FFE8D6' : '#FFFFFF')};
  border-width: 1px;
  border-color: ${({ isFocused }) => (isFocused ? '#FF8933' : '#E8E8E8')};
  border-radius: 8px;
  padding: 12px 14px;
  font-size: 13px;
  font-weight: 400;
  color: #999999;
`;

export const ContentInput = styled.TextInput<{isFocused: boolean}>`
  background-color: ${({ isFocused }) => (isFocused ? '#FFE8D6' : '#E8E8E8')};
  border-width: 1px;
  border-color: ${({ isFocused }) => (isFocused ? '#FF8933' : 'transparent')};
  border-radius: 8px;
  padding: 12px 14px;
  font-size: 13px;
  font-weight: 400;
  color: #000000;
`;

export const HelperText = styled.Text`
  font-size: 10px;
  font-weight: 400;
  color: #999999;
  margin-top: 6px;
  margin-left: 4px;
`;

export const HeaderBackButton = styled.TouchableOpacity`
  padding: 0 4px;
`;

export const NoticeAddButton = styled.TouchableOpacity`
  padding: 4px;
`;

export const Divider = styled.View<{isSpaced: boolean}>`
  height: 1px;
  background-color: #e8e8e8;
  margin-top: ${({ isSpaced }) => (isSpaced ? 24 : 0)}px;
`;

export const ToggleRow = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 12px 0;
`;

export const ToggleLabel = styled.Text`
  font-size: 15px;
  font-weight: 500;
  color: #000000;
`;

export const CustomToggle = styled.TouchableOpacity<{isOn: boolean}>`
  width: 52px;
  height: 30px;
  border-radius: 15px;
  background-color: ${props => (props.isOn ? '#FF8933' : '#E8E8E8')};
  justify-content: center;
  padding: 2px;
`;

export const ToggleCircle = styled.View<{isOn: boolean}>`
  width: 26px;
  height: 26px;
  border-radius: 13px;
  background-color: #ffffff;
  align-self: ${props => (props.isOn ? 'flex-end' : 'flex-start')};
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.1;
  shadow-radius: 2px;
  elevation: 2;
`;

export const DateRightWrapper = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
`;

export const DateActionText = styled.Text<{hasValue?: boolean}>`
  font-size: 14px;
  color: ${({ hasValue }) => (hasValue ? '#FF8933' : '#9C9C9C')};
  margin-left: 6px;
  margin-right: 4px;
`;
