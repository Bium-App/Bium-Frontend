import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1; 
  background-color: #FFFFFF; 
`;

export const ScrollContainer = styled.ScrollView.attrs({
  contentContainerStyle: {
    paddingHorizontal: 20, 
    paddingTop: 32,        
    paddingBottom: 40,     
  }
})`
  flex: 1;
`;

export const TopSection = styled.View`
  flex-direction: row;            
  justify-content: space-between; 
  align-items: center;           
  margin-bottom: 32px;            
  padding-horizontal: 8px;        
`;

export const TopTextContainer = styled.View`
  flex: 1; 
`;

export const TopText = styled.Text`
  font-size: 13px;
  color: #999999;     
  line-height: 22px;  
`;

export const Card = styled.TouchableOpacity`
  flex-direction: row; 
  align-items: center; 
  background-color: #FFFFFF; 
  border-radius: 12px;      
  padding: 12px 20px; 
  margin-bottom: 16px; 
  elevation: 1;              
  shadow-color: #6B6EA1;     
  shadow-offset: 0px 1px;    
  shadow-opacity: 0.25;      
  shadow-radius: 3px;        
`;

export const IconCircle = styled.View`
  width: 52px;
  height: 52px;
  border-radius: 26px; 
  background-color: #E1E1E1;
  justify-content: center; 
  align-items: center;     
  margin-right: 28px; 
`;

export const TextContainer = styled.View`
  flex: 1; 
`;

export const CardTitle = styled.Text`
  font-size: 15px;
  font-weight: 500;
  color: #000000;   
  margin-bottom: 4px; 
`;

export const CardDesc = styled.Text`
  font-size: 13px;
  color: #999999;   
  line-height: 18px; 
`;