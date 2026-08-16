import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background-color: #FFFFFF;
`;

export const SelectAllBar = styled.View`
  flex-direction: row;       
  align-items: center;        
  padding-horizontal: 20px;  
  padding-top: 16px;          
  padding-bottom: 8px; 
`;

export const SelectAllButton = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
`;

export const SelectText = styled.Text`
  font-size: 18px; /* 14 -> 18 */
  color: #000000;
  margin-left: 8px; 
`;

export const HeaderEditText = styled.Text`
  font-size: 15px;
  color: #ff8933;
  font-weight: 500;
`;

export const SelectedCountText = styled(SelectText)`
  font-weight: 400;
  margin-left: 16px;
`;

export const ScrollContainer = styled.ScrollView.attrs({
  contentContainerStyle: {
    paddingHorizontal: 20, 
    paddingTop: 16,        
    paddingBottom: 100,    
  }
})`
  flex: 1;
`;

export const Card = styled.TouchableOpacity`
  margin-bottom: 16px;       
  border-radius: 12px;      
  background-color: #FFFFFF; 
  elevation: 1;
  shadow-color: #6B6EA1;
  shadow-offset: 0px 1px;
  shadow-opacity: 0.25;
  shadow-radius: 3px;
`;

export const CardInner = styled.View`
  border-radius: 12px;
  overflow: hidden; 
`;

export const CardTop = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 16px 20px;        
  background-color: #FFFFFF; 
`;

export const CardBottom = styled.View`
  width: 100%;               
  background-color: #EBEBEB; /* EFEFEF -> EBEBEB*/
  padding-vertical: 6px;     
  justify-content: center;
  align-items: center;      
`;

export const IconCircle = styled.View<{isSelected: boolean}>`
  width: 53px;
  height: 53px;
  border-radius: 26px; 
  background-color: ${props => (props.isSelected ? '#FFE8D6' : '#E8E8E8')};
  justify-content: center;
  align-items: center;
  margin-right: 20px;  
`;

export const TextContainer = styled.View`
  flex: 1; 
`;

export const CardTitle = styled.Text`
  font-size: 17px;
  font-weight: 500;
  color: #000000;
  margin-bottom: 4px; 
`;

export const CardDesc = styled.Text`
  font-size: 15px;
  font-weight: 400px;
  color: #000000;
`;

export const CardDate = styled.Text`
  font-size: 17px;
  font-weight: 400;
  color: #000000;
`;

export const CheckZone = styled.View`
  justify-content: center;
  align-items: center;
  margin-left: 12px;
`;

export const BottomBar = styled.View`
  position: absolute; 
  bottom: 0;
  left: 0;
  right: 0;
  flex-direction: row;
  justify-content: space-between;
  background-color: #FFFFFF;
  padding-horizontal: 20px;
  padding-top: 16px;
  padding-bottom: 40px;
  border-top-width: 2px;
  border-top-color: #D9D9D9; /* F0F0F0 - > D9D9D9 */
`;

export const RestoreButton = styled.TouchableOpacity<{$disabled: boolean}>`
  flex: 1;
  height: 57px;
  border-width: 1px;
  border-color: #6E6E6E; /* 1A1A1A -> 6E6E6E */
  border-radius: 8px;
  justify-content: center;
  align-items: center;
  margin-right: 12px; 
  opacity: ${({$disabled}) => ($disabled ? 0.3 : 1)};
`;

export const RestoreText = styled.Text`
  font-size: 18px;
  font-weight: 500;
  color: #000000;
`;

export const DeleteButton = styled.TouchableOpacity<{$disabled: boolean}>`
  flex: 1; 
  height: 57px;
  background-color: #FF8933; 
  border-radius: 8px;
  justify-content: center;
  align-items: center;
  opacity: ${({$disabled}) => ($disabled ? 0.3 : 1)};
`;

export const DeleteText = styled.Text`
  font-size: 18px; /* 15 -> 18 */ 
  font-weight: 500;
  color: #FFFFFF;
`;
