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
  font-weight: ${({ isActive }) => (isActive ? '700' : '400')}; 
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
  font-size: 16px; 
  font-weight: 500; 
  color: #000000; 
`;

export const SmallAddButton = styled.TouchableOpacity`
  padding: 4px;
`;

export const DateHeader = styled.Text`
  font-size: 16px;
  font-weight: 600;
  color: #000000;
  margin-bottom: 8px;
`;

export const ListCard = styled.View`
  background-color: #FFFFFF; 
  border-radius: 8px; 
  border-width: 1px; 
  border-color: #E8E8E8; 
  padding: 0 16px; 
  margin-bottom: 24px; 
`;

export const TouchableListItem = styled.TouchableOpacity<{isLast: boolean}>`
  flex-direction: row; 
  align-items: center; 
  justify-content: space-between; 
  padding: 16px 0; 
  border-bottom-width: ${({ isLast }) => (isLast ? 0 : 1)}px;
  border-bottom-color: #E8E8E8; 
`;

export const ListItemLeft = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const IconCircle = styled.View`
  width: 42px;  
  height: 42px; 
  border-radius: 20px; 
  background-color: #FFE8D6; 
  align-items: center;
  justify-content: center;
  margin-right: 12px;
`;

export const TextColumn = styled.View`
  flex-direction: column;
`;

export const ListItemTitle = styled.Text`
  font-size: 13px; 
  color: #000000;
  font-weight: 400;
  margin-bottom: 4px;
`;

export const ListItemTime = styled.Text`
  font-size: 10px;
  color: #BBBBBB;
`;

export const HeaderBackButton = styled.TouchableOpacity`
  padding: 0 4px; 
`;
