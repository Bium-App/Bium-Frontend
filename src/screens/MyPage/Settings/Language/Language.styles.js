import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background-color: #FFFFFF;
`;

export const ScrollContainer = styled.ScrollView.attrs({
  contentContainerStyle: {
    padding: 24,
    paddingBottom: 40, 
  }
})`
  flex: 1;
`;

export const Section = styled.View`
  margin-bottom: 32px;
`;

export const SectionTitle = styled.Text`
  font-size: 15px;  
  font-weight: 500; 
  color: #000000;
  margin-bottom: 12px;
`;

export const Card = styled.View`
  background-color: #FFFFFF;
  border-width: 1px;
  border-color: #E8E8E8; 
  border-radius: 8px;
  padding: 8px 16px;
`;

export const RowItem = styled.TouchableOpacity`
  flex-direction: row;       
  justify-content: space-between; 
  align-items: center;       
  padding-vertical: 14px;    
`;

export const RowText = styled.Text`
  font-size: 15px;
  color: #000000;
`;

export const RightContainer = styled.View`
  flex-direction: row;       
  align-items: center;     
`;

export const SubText = styled.Text`
  font-size: 13px;    
  color: #B5B5B5;  
  margin-right: 8px;         
`;

export const HelperText = styled.Text`
  font-size: 13px;
  color: #9C9C9C; 
  margin-top: 8px;
  margin-left: 4px;
`;

export const BottomContainer = styled.View`
  padding: 24px;
  background-color: #FFFFFF;
  padding-bottom: 40px;      
`;

export const SaveButton = styled.TouchableOpacity`
  width: 100%;
  height: 52px;
  background-color: #FF8933; 
  border-radius: 8px;
  justify-content: center;   
  align-items: center;      
`;

export const SaveText = styled.Text`
  font-size: 18px; 
  font-weight: 400; 
  color: #FFFFFF;
`;

export const ModalOverlay = styled.TouchableOpacity`
  flex: 1;
  background-color: rgba(0, 0, 0, 0.5); 
  justify-content: center; 
  align-items: center;     
`;

export const ModalContent = styled.View`
  width: 85%;             
  background-color: #FFFFFF;
  border-radius: 12px;     
  padding: 24px;
`;

export const ModalTitle = styled.Text`
  font-size: 18px;
  font-weight: 700;
  color: #000000;
  margin-bottom: 16px;
  text-align: center;      
`;

export const ModalOption = styled.TouchableOpacity`
  padding-vertical: 16px;
  border-bottom-width: 1px;
  border-bottom-color: #F0F0F0;
  flex-direction: row;       
  justify-content: space-between; 
  align-items: center;       
`;

export const ModalOptionText = styled.Text`
  font-size: 16px;
  color: ${props => (props.isSelected ? '#FF8933' : '#000000')}; 
  font-weight: ${props => (props.isSelected ? '700' : '400')};   
`;