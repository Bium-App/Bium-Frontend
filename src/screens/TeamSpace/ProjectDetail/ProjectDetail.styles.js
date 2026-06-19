import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background-color: #FFFFFF;
`;

export const SearchContainer = styled.View`
  flex-direction: row;
  align-items: center;
  background-color: #E8E8E8;
  border-radius: 50px;
  padding: 8px 12px;
  margin: 16px 20px;
`;

export const SearchInput = styled.TextInput`
  flex: 1;
  margin-left: 8px;
  font-size: 15px;
  color: #000000;
  padding: 0;
`;

export const TabContainer = styled.View`
  flex-direction: row;
  align-items: center;
  background-color: #FFE8D6;
  border-radius: 8px;
  margin: 0 20px 24px;
`;

export const TabItem = styled.TouchableOpacity`
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
  background-color: #D1D5DB; 
`;

export const TabText = styled.Text`
  font-size: 14px; 
  font-weight: ${({ isActive }) => (isActive ? '700' : '500')}; 
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
  background-color: #FFFFFF; 
  border-radius: 8px; 
  border-width: 1px; 
  border-color: #FF8933; 
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
  color: #000000; 
`;

export const NoticeTime = styled.Text`
  font-size: 13px; 
  color: #FF8933; 
  align-self: flex-end; 
  margin-top: 16px; 
`;

export const ListCard = styled.View`
  background-color: #FFFFFF; 
  border-radius: 8px; 
  border-width: 1px; 
  border-color: #D1D5DB; 
  padding: 0 16px; 
`;

export const ListItem = styled.View`
  flex-direction: row; 
  align-items: center; 
  padding: 16px 0; 
  border-bottom-width: ${({ isLast }) => (isLast ? 0 : 1)}px; 
  border-bottom-color: #D1D5DB; 
`;

export const TouchableListItem = styled.TouchableOpacity`
  flex-direction: row; 
  align-items: center; 
  padding: 16px 0; 
  border-bottom-width: ${({ isLast }) => (isLast ? 0 : 1)}px; 
  border-bottom-color: #D1D5DB; 
`;

export const ListIconWrapper = styled.View`
  margin-right: 12px; 
`;


export const ListItemText = styled.Text`
  font-size: 13px; 
  color: #000000; 
`;


export const TodoItemText = styled.Text`
  font-size: 13px; 
  text-decoration-line: ${({ isDone }) => (isDone ? 'line-through' : 'none')}; 
  color: ${({ isDone }) => (isDone ? '#AAAAAA' : '#000000')}; 
`;

export const AddTodoButton = styled.TouchableOpacity`
  flex-direction: row; 
  align-items: center; 
  justify-content: center; 
  background-color: #FF8833; 
  border-radius: 8px; 
  padding: 14px 0; 
  margin-top: 12px; 
`;

export const AddTodoText = styled.Text`
  font-size: 16px; 
  font-weight: 400; 
  color: #FFFFFF; 
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
  background-color: #FFFFFF; 
  border-radius: 16px; 
  overflow: hidden; 
`;

export const ModalHeader = styled.View`
  flex-direction: row; 
  align-items: center; 
  justify-content: space-between; 
  background-color: #FFFFFF; 
  padding: 16px 20px; 
  border-bottom-width: 1px; 
  border-bottom-color: #F0F0F0; 
`;

export const ModalHeaderButton = styled.TouchableOpacity`
  padding: 4px; 
`;

export const ModalCancelText = styled.Text`
  font-size: 15px; 
  color: #AAAAAA; 
`;

export const ModalTitleText = styled.Text`
  font-size: 15px; 
  font-weight: 500; 
  color: #000000; 
`;

export const ModalSaveText = styled.Text`
  font-size: 15px; 
  font-weight: 600; 
  color: #FF8933; 
`;

export const ModalBody = styled.View`
  padding: 24px 20px; 
`;

export const InputLabel = styled.Text`
  font-size: 15px; 
  font-weight: 600; 
  color: #000000; 
  margin-bottom: 8px; 
  margin-top: ${({ isFirst }) => (isFirst ? 0 : 20)}px; 
`;

export const TitleInput = styled.TextInput`
  background-color: ${({ isFocused }) => (isFocused ? '#FFE8D6' : '#FFFFFF')}; 
  border-width: 1px; 
  border-color: ${({ isFocused }) => (isFocused ? '#FF8933' : '#E0E0E0')}; 
  border-radius: 8px; 
  padding: 12px 14px; 
  font-size: 14px; 
  color: #000000; 
`;

export const ContentInputMultiline = styled.TextInput`
  background-color: ${({ isFocused }) => (isFocused ? '#FFE8D6' : '#FFFFFF')}; 
  border-width: 1px; 
  border-color: ${({ isFocused }) => (isFocused ? '#FF8933' : '#E0E0E0')}; 
  border-radius: 8px; 
  padding: 12px 14px; 
  font-size: 14px; 
  color: #000000; 
  height: 140px; 
  text-align-vertical: top; 
`;

export const ContentInput = styled.TextInput`
  background-color: ${({ isFocused }) => (isFocused ? '#FFF3EB' : '#F5F5F5')}; 
  border-width: 1px; 
  border-color: ${({ isFocused }) => (isFocused ? '#FF8933' : 'transparent')}; 
  border-radius: 8px; 
  padding: 12px; 
  font-size: 14px; 
  color: #000000; 
`;

export const HelperText = styled.Text`
  font-size: 10px; 
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

export const Divider = styled.View`
  height: 1px; 
  background-color: #E8E8E8; 
  margin-top: ${({ isSpaced }) => (isSpaced ? 24 : 0)}px; 
`;

export const SmallSwitch = styled.Switch`
  transform: scale(0.8); 
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

export const DateRightWrapper = styled.TouchableOpacity`
  flex-direction: row; 
  align-items: center; 
`;

export const DateSelectText = styled.Text`
  font-size: 14px; 
  color: ${({ hasValue }) => (hasValue ? '#FF8933' : '#9C9C9C')}; 
  margin-left: 6px; 
  margin-right: 4px; 
`;

export const DateActionRow = styled.View`
  flex-direction: row; 
  align-items: center; 
  margin-top: 20px; 
`;

export const DateActionLabel = styled.Text`
  font-size: 15px; 
  font-weight: 600; 
  color: #000000; 
  margin-right: 16px; 
`;

export const DateActionBox = styled.TouchableOpacity`
  flex: 1; 
  flex-direction: row; 
  align-items: center; 
  justify-content: space-between; 
  border-width: 1px; 
  border-color: #FF8933; 
  border-radius: 8px; 
  padding: 12px 14px; 
  background-color: #FFF3EB; 
`;

export const DateActionBoxLeft = styled.View`
  flex-direction: row; 
  align-items: center;
`;

export const DateActionText = styled.Text`
  font-size: 15px; 
  color: #FF8933; 
  margin-left: 6px; 
`;