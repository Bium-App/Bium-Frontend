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
  font-size: 14px; 
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

export const TabItem = styled.TouchableOpacity<{isActive: boolean}>`
  flex: 1; 
  align-items: center; 
  justify-content: center; 
  padding: 10px 0; 
  background-color: ${({ isActive }) => (isActive ? '#FFE8D6' : 'transparent')}; 
  border-width: 1.5px; 
  border-color: ${({ isActive }) => (isActive ? '#FF8933' : 'transparent')}; 
  border-radius: 8px; 
`;

export const TabSeparator = styled.View`
  width: 1px; 
  height: 14px; 
  background-color: #D1D5DB; 
`;

export const TabText = styled.Text<{isActive: boolean}>`
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

export const ListCard = styled.View`
  background-color: #FFFFFF; 
  border-radius: 8px; 
  border-width: 1px; 
  border-color: #D1D5DB; 
  padding: 0 16px; 
`;

export const EmptyTodoText = styled.Text`
  text-align: center;
  padding-vertical: 20px;
  color: #aaaaaa;
`;

export const TouchableListItem = styled.TouchableOpacity<{isLast: boolean}>`
  flex-direction: row; 
  align-items: center; 
  padding: 16px 0; 
  border-bottom-width: ${({ isLast }) => (isLast ? 0 : 1)}px; 
  border-bottom-color: #D1D5DB; 
`;

export const ListIconWrapper = styled.View`
  margin-right: 12px; 
`;

export const ListItemText = styled.Text<{isDone: boolean}>`
  font-size: 14px; 
  color: #000000; 
  text-decoration-line: ${({ isDone }) => (isDone ? 'line-through' : 'none')}; 
  color: ${({ isDone }) => (isDone ? '#A6A6A6' : '#000000')}; 
`;

export const AddTodoButton = styled.TouchableOpacity`
  flex-direction: row; 
  align-items: center; 
  justify-content: center; 
  background-color: #FF8933; 
  border-radius: 8px; 
  padding: 14px 0; 
  margin-top: 12px; 
`;

export const AddTodoText = styled.Text`
  font-size: 16px; 
  font-weight: 500; 
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
  color: #999999; 
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

export const InputLabel = styled.Text<{isFirst: boolean}>`
  font-size: 15px; 
  font-weight: 600; 
  color: #000000; 
  margin-bottom: 8px; 
  margin-top: ${({ isFirst }) => (isFirst ? 0 : 20)}px; 
`;

export const TitleInput = styled.TextInput<{isFocused: boolean}>`
  background-color: ${({ isFocused }) => (isFocused ? '#FFE8D6' : '#F5F5F5')}; 
  border-width: 1px; 
  border-color: ${({ isFocused }) => (isFocused ? '#FF8933' : 'transparent')}; 
  border-radius: 8px; 
  padding: 12px 14px; 
  font-size: 14px; 
  color: #000000; 
`;

export const ContentInputMultiline = styled.TextInput<{isFocused: boolean}>`
  background-color: ${({ isFocused }) => (isFocused ? '#FFE8D6' : '#FFFFFF')}; 
  border-width: 1px; 
  border-color: ${({ isFocused }) => (isFocused ? '#FF8933' : '#E5E5E5')}; 
  border-radius: 8px; 
  padding: 12px 14px; 
  font-size: 14px; 
  color: #000000; 
  height: 140px; 
  text-align-vertical: top; 
`;

export const DateActionRow = styled.View`
  flex-direction: row; 
  align-items: center; 
  margin-top: 24px; 
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
  background-color: #FFE8D6; 
`;

export const DateActionBoxLeft = styled.View`
  flex-direction: row; 
  align-items: center; 
`;

export const DateActionText = styled.Text`
  font-size: 15px; 
  color: #FF8933; 
  margin-left: 8px; 
`;

export const HeaderBackButton = styled.TouchableOpacity`
  padding: 0 4px; 
`;
