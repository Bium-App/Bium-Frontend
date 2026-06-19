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
  background-color: ${({ isActive }) => (isActive ? '#FFE8D6' : 'transparent')}; 
  border-width: 1.5px; 
  border-color: ${({ isActive }) => (isActive ? '#FF8933' : 'transparent')}; 
  border-radius: 8px; 
`;

export const TabSeparator = styled.View`
  width: 1px; 
  height: 14px; 
  background-color: #DEDEDE; 
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
  justify-content: flex-end; 
  align-items: center; 
  margin-bottom: 12px;       
`;

export const SmallAddButton = styled.TouchableOpacity`
  padding: 4px; 
`;

export const ListCard = styled.View`
  background-color: #FFFFFF; 
  border-radius: 8px; 
  border-width: 1px; 
  border-color: #DEDEDE; 
  padding: 0 16px; 
  margin-bottom: 24px; 
`;

export const TouchableListItem = styled.TouchableOpacity`
  flex-direction: row; 
  align-items: center; 
  justify-content: space-between; 
  padding: 16px 0;               
  border-bottom-width: ${({ isLast }) => (isLast ? 0 : 1)}px; 
  border-bottom-color: #E7E7E7; 
`;

export const ListItemLeft = styled.View`
  flex-direction: row;
  align-items: center;
  flex: 1; 
`;

export const IconWrapper = styled.View`
  align-items: center;
  justify-content: center;
  margin-right: 16px;  
  width: 24px;        
`;

export const TextColumn = styled.View`
  flex-direction: column;
  flex: 1; 
`;

export const ListItemTitle = styled.Text`
  font-size: 14px;   
  color: #000000;
  font-weight: 500;
`;

export const ListItemSubtitle = styled.Text`
  font-size: 12px;
  color: #000000;    
  margin-top: 4px;
`;

export const ListItemRight = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const ActionIconBtn = styled.TouchableOpacity`
  padding: 6px; 
  margin-left: 3px; 
`;

export const HeaderBackButton = styled.TouchableOpacity`
  padding: 0 4px; 
`;

export const PopupOverlay = styled.TouchableOpacity`
  flex: 1; 
  background-color: rgba(0, 0, 0, 0.1); 
  align-items: center;                  
  justify-content: center;              
`;

export const PopupContent = styled.View`
  width: 150px;                   
  background-color: #FFFFFF; 
  border-radius: 12px;             
  padding: 4px 0;             
  margin-left: 150px;             
  shadow-color: #6B6EA1;
  shadow-offset: 0px 1px;
  shadow-opacity: 0.25;
  shadow-radius: 3px;
  elevation: 5; 
`;

export const PopupOptionBtn = styled.TouchableOpacity`
  flex-direction: row; 
  align-items: center; 
  padding: 10px 16px; 
  border-bottom-width: ${({ isLast }) => (isLast ? 0 : 1)}px; 
  border-bottom-color: #E7E7E7; 
`;

export const PopupOptionText = styled.Text`
  font-size: 14px; 
  font-weight: 400; 
  margin-left: 10px; 
  color: ${({ isDanger }) => (isDanger ? '#FF0000' : '#000000')}; 
`;

export const ActionModalOverlay = styled.TouchableOpacity`
  flex: 1;
  background-color: rgba(0, 0, 0, 0.4); 
  align-items: center;
  justify-content: center;
`;

export const ActionModalContainer = styled.View`
  width: 320px;            
  border-radius: 16px;     
  elevation: 5;
  shadow-color: #6B6EA1;
  shadow-offset: 0px 1px;
  shadow-opacity: 0.25;
  shadow-radius: 3px;
`;

export const ActionModalHeader = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between; 
  background-color: #FFE8D6;      
  padding: 16px 20px;
  border-top-left-radius: 16px;   
  border-top-right-radius: 16px;
`;

export const ActionModalCancelBtn = styled.TouchableOpacity`
  padding: 4px;
`;

export const ActionModalCancelText = styled.Text`
  font-size: 15px;
  color: #B0B0B0; 
`;

export const ActionModalTitle = styled.Text`
  font-size: 16px;
  font-weight: 700;
  color: #000000;
`;

export const ActionModalSaveBtn = styled.TouchableOpacity`
  padding: 4px;
`;

export const ActionModalSaveText = styled.Text`
  font-size: 15px;
  font-weight: 700;
  color: ${({ isDanger }) => (isDanger ? '#FF0000' : '#FF8933')}; 
`;

export const ActionModalBody = styled.View`
  background-color: #FFFFFF;
  padding: 24px 20px;
  border-bottom-left-radius: 18px; 
  border-bottom-right-radius: 18px;
`;

export const ActionModalLabel = styled.Text`
  font-size: 14px;
  font-weight: 600;
  color: #000000;
  margin-bottom: 8px; 
  margin-top: ${({ isFirst }) => (isFirst ? 0 : 20)}px; 
`;

export const ActionModalInput = styled.TextInput`
  background-color: #FFE8D6; 
  border-width: 1px;
  border-color: #FF8933;     
  border-radius: 8px;
  padding: 12px 14px;
  font-size: 14px;
  color: #000000;
`;

export const ActionModalInputDisabled = styled.View`
  background-color: #E8E8E8; 
  border-radius: 8px;
  padding: 12px 14px;
`;

export const ActionModalInputDisabledText = styled.Text`
  font-size: 14px;
  color: #999999; 
`;

export const ActionModalRow = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top: 24px;
  padding-bottom: 12px;
  border-bottom-width: 1px;
  border-bottom-color: #FFFFFF;
`;

export const ActionModalRowText = styled.Text`
  font-size: 15px;
  font-weight: 600;
  color: #000000;
`;

export const ActionModalDesc = styled.Text`
  font-size: 14px;
  color: #999999;
  line-height: 22px;
  margin-top: 8px;
  text-align: center; 
`;

export const AddFileModalOverlay = styled.TouchableOpacity`
  flex: 1;
  background-color: rgba(0, 0, 0, 0.4); 
  align-items: center;
  justify-content: center;
`;

export const AddFileModalContainer = styled.View`
  width: 320px;           
  background-color: #FFFFFF; 
  border-radius: 16px;
  elevation: 5;
  shadow-color: #6B6EA1;
  shadow-offset: 0px 1px;
  shadow-opacity: 0.25;
  shadow-radius: 3px;
  overflow: hidden; 
`;

export const AddFileModalHeader = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center; 
  background-color: #FFE8D6; 
  padding: 16px 20px;
`;

export const AddFileModalTitle = styled.Text`
  font-size: 16px;
  font-weight: 700;
  color: #000000; 
`;

export const AddFileModalCloseBtn = styled.TouchableOpacity`
  position: absolute; 
  right: 16px;
  padding: 4px;
`;

export const AddFileModalBody = styled.View`
  padding: 20px 20px 24px;
`;

export const AddFileSectionLabel = styled.Text`
  font-size: 14px;
  font-weight: 700;
  color: #000000; 
  margin-bottom: ${({ noMarginBottom }) => (noMarginBottom ? 0 : 10)}px;
  margin-top: ${({ isFirst }) => (isFirst ? 0 : 20)}px; 
`;

export const AddFileSearchContainer = styled.View`
  flex-direction: row;
  align-items: center;
  background-color: #E8E8E8;
  border-radius: 8px;
  padding: 8px 12px;
`;

export const AddFileSearchInput = styled.TextInput`
  flex: 1;
  margin-left: 8px;
  font-size: 14px;
  color: #000000; 
  padding: 0;
`;

export const AddFileMethodRow = styled.View`
  flex-direction: row;
  justify-content: space-between; 
`;

export const AddFileMethodBox = styled.TouchableOpacity`
  width: 22%;
  aspect-ratio: 1;
  border-width: 1px;
  border-color: #D1D5DB;
  border-radius: 10px;
  align-items: center;
  justify-content: center;
  background-color: transparent; 
`;

export const AddFileMethodText = styled.Text`
  font-size: 12px;
  color: #000000; 
  margin-top: 6px;
  text-align: center;
`;

export const AddFileRecentHeaderRow = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 20px;
  margin-bottom: 10px;
`;

export const AddFileRecentListCard = styled.View`
  border-width: 1px;
  border-color: #D1D5DB;
  border-radius: 12px;
  background-color: #FFFFFF; 
  overflow: hidden; 
`;

export const AddFileRecentListItem = styled.TouchableOpacity`
  flex-direction: row; 
  align-items: center; 
  justify-content: space-between; 
  padding: 6px 0; 
  border-bottom-width: ${({ isLast }) => (isLast ? 0 : 1)}px; 
  border-bottom-color: #DADADA;
`;

export const AddFileRecentSubtitle = styled.Text`
  font-size: 11px;
  color: #000000;
  margin-top: 2px; 
`;

export const AddFileRecentScroll = styled.ScrollView`
  height: 90px; 
`;

export const AddFileRecentContent = styled.View`
  padding: 0 16px;
`;