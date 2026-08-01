import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background-color: #FFFFFF;
`;

export const ScrollContainer = styled.ScrollView.attrs({
  contentContainerStyle: {
    paddingHorizontal: 24, 
    paddingTop: 24,        
    paddingBottom: 120,    
  }
})`
  flex: 1;
`;

export const TopText = styled.Text`
  font-size: 13px;  /*14 -> 13 */
  font-weight: 400;
  color: #000000;
  margin-bottom: 24px;
`;

export const SectionTitle = styled.Text`
  font-size: 18px;
  font-weight: 500;
  color: #000000;
  margin-bottom: 12px;
`;

export const DropdownWrapper = styled.View`
  position: relative;
  z-index: 10;
  elevation: 10; 
  margin-bottom: 24px;
`;

export const DropdownHeader = styled.TouchableOpacity<{isOpen: boolean}>`
  flex-direction: row;
  justify-content: space-between; 
  align-items: center;
  height: 48px;
  border-width: 1px;
  border-color: ${props => (props.isOpen ? '#FF8933' : '#E8E8E8')}; 
  border-radius: 8px;
  padding-horizontal: 16px;
  background-color: #FFFFFF;
`;

export const DropdownHeaderLeft = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const DropdownSelectedIconWrapper = styled.View`
  margin-right: 8px; 
  justify-content: center;
  align-items: center;
`;

export const DropdownText = styled.Text<{hasValue: boolean}>`
  font-size: 13px;
  font-weight: 400;
  color: ${props => (props.hasValue ? '#000000' : '#999999')};
`;

export const DropdownList = styled.View`
  position: absolute;
  top: 56px; 
  left: 0;
  right: 0;
  background-color: #FFFFFF;
  border-radius: 8px;
  padding: 8px;
  shadow-color: #6B6EA1;
  shadow-offset: 0px 1px;
  shadow-opacity: 0.25;
  shadow-radius: 3px;
  elevation: 5;
`;

export const DropdownItem = styled.TouchableOpacity<{isSelected: boolean}>`
  flex-direction: row;
  align-items: center;
  padding: 12px;
  border-radius: 8px;
  background-color: ${props => (props.isSelected ? '#FFE8D6' : '#FFFFFF')}; 
`;

export const DropdownItemIconWrapper = styled.View`
  width: 24px;
  height: 24px;
  justify-content: center;
  align-items: center;
  margin-right: 12px;
`;

export const DropdownItemTextContainer = styled.View`
  flex: 1;
`;

export const DropdownItemTitle = styled.Text<{isSelected?: boolean}>`
  font-size: 13px;
  font-weight: 400;
  color: #000000;
  margin-bottom: 2px;
`;

export const DropdownItemDesc = styled.Text`
  font-size: 12px;
  font-weight: 400;
  color: #999999;
`;

export const InputWrapper = styled.View`
  margin-bottom: 24px;
`;

export const TitleInput = styled.TextInput`
  height: 48px;
  border-width: 1px;
  border-color: #E8E8E8;
  border-radius: 8px;
  padding-horizontal: 16px;
  font-size: 13px;
  font-weight: 400;
  color: #000000;
`;

export const ContentInputWrapper = styled.View`
  border-width: 1px;
  border-color: #E8E8E8;
  border-radius: 8px;
  height: 160px;
  padding: 16px;
`;

export const ContentInput = styled.TextInput`
  flex: 1;
  font-size: 13px;
  font-weight: 400;
  color: #000000;
  text-align-vertical: top; 
`;

export const CharCount = styled.Text`
  font-size: 13px;
  font-weight: 400;
  color: #999999;
  text-align: right;
  margin-top: 8px;
`;

export const AttachLabel = styled.Text`
  font-size: 13px;
  font-weight: 400;
  color: #000000;
  margin-bottom: 12px;
`;

export const AttachButton = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 52px;
  background-color: #D9D9D9; 
  border-radius: 8px;
`;

export const AttachText = styled.Text`
  font-size: 18px;
  font-weight:400;
  color: #000000;
  margin-left: 8px;
`;

export const SubmitButtonContainer = styled.View`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #FFFFFF;
  padding-horizontal: 24px;
  padding-top: 12px;
  padding-bottom: 34px; 
  border-top-width: 1px;
  border-top-color: #F2F2F2; 
`;

export const SubmitButton = styled.TouchableOpacity`
  height: 52px;
  background-color: #FF8933;
  border-radius: 8px;
  justify-content: center;
  align-items: center;
`;

export const SubmitText = styled.Text`
  font-size: 18px;
  font-weight: 400;
  color: #FFFFFF;
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

export const AddFileSectionLabel = styled.Text<{
  noMarginBottom?: boolean;
  isFirst: boolean;
}>`
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

export const AddFileRecentListItem = styled.TouchableOpacity<{isLast: boolean}>`
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

export const ListItemRight = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const ActionIconBtn = styled.TouchableOpacity`
  padding: 6px; 
  margin-left: 3px; 
`;
