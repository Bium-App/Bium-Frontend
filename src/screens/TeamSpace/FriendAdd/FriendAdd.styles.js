import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1; 
  background-color: #FFFFFF; 
`;

export const HeaderBackButton = styled.TouchableOpacity`
  padding: 0 4px; 
`;

export const SearchContainer = styled.View`
  flex-direction: row;       
  align-items: center;   
  background-color: #E8E8E8;
  border-radius: 50px;
  padding: 10px 12px;        
  margin: 16px 20px 24px;    
`;

export const SearchInput = styled.TextInput`
  flex: 1;           
  margin-left: 8px;  
  font-size: 15px;   
  color: #000000;    
  padding: 0;        
`;

export const ListCard = styled.View`
  margin: 0 20px;           
  border-width: 1px;        
  border-color: #D1D5DB;
  border-radius: 8px;
  background-color: #FFFFFF; 
  overflow: hidden;         
`;

export const ListItem = styled.View`
  flex-direction: row; 
  align-items: center; 
  padding: ${({ isCompact }) => (isCompact ? '10px 16px' : '14px 16px')}; 
  border-bottom-width: ${({ isLast }) => (isLast ? 0 : 1)}px; 
  border-bottom-color: #DADADA;
`;

export const AvatarCircle = styled.View`
  width: 40px;               
  height: 40px;              
  border-radius: 20px;       
  background-color: #FFE8D6;
  align-items: center;       
  justify-content: center;   
`;

export const AvatarText = styled.Text`
  font-size: 16px;  
  color: #FF8933;   
  font-weight: 400;
`;

export const ProfileTextColumn = styled.View`
  flex: 1;                   
  margin-left: 12px;         
  justify-content: center;  
`;

export const ProfileName = styled.Text`
  font-size: 17px; 
  font-weight: 400;
  color: #000000;  
`;

export const ProfileDesc = styled.Text`
  font-size: 12px;  
  color: #BBBBBB;
  margin-top: 4px;  
`;


export const AddFriendBtn = styled.TouchableOpacity`
  background-color: #FF8933; 
  border-radius: 6px;        
  padding: 6px 8px;       
  flex-direction: row;     
  align-items: center;       
  justify-content: center;   
`;

export const AddFriendBtnText = styled.Text`
  color: #FFFFFF;   
  font-size: 13px;   
  font-weight: 500;
  margin-left: 4px;  
`;

export const SectionTitle = styled.Text`
  font-size: 18px; 
  font-weight: 500;
  color: #000000; 
  margin: 32px 20px 12px; 
`;

export const TipContainer = styled.View`
  margin: 24px 20px 24px 37px; 
`;

export const TipRow = styled.View`
  flex-direction: row;      
  align-items: flex-start;   
  margin-bottom: 16px;       
`;

export const TipIconCircle = styled.View`
  width: 38px;               
  height: 38px;            
  border-radius: 19px;       
  background-color: #FFE8D6;
  align-items: center;       
  justify-content: center;   
  margin-right: 12px;       
`;

export const TipText = styled.Text`
  flex: 1;           
  font-size: 12px;
  color: #000000;    
  line-height: 18px; 
  margin-top: 2px;   
`;

export const HeaderRightButton = styled.TouchableOpacity`
  padding: 0 4px;        
  position: relative;
  align-items: center;
  justify-content: center;
`;

export const BadgeContainer = styled.View`
  position: absolute;
  top: -4px;             
  right: -6px;           
  background-color: #FF8933; 
  width: 17px;           
  height: 17px;          
  border-radius: 4px;
  align-items: center;   
  justify-content: center; 
`;

export const BadgeText = styled.Text`
  color: #FFFFFF;        
  font-size: 10px;       
  font-weight: 700;      
`;