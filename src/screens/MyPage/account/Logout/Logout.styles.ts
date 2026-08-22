import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1; 
  background-color: #FFFFFF; 
`;

export const Content = styled.View`
  flex: 1;
  justify-content: flex-start;
  align-items: center;
  padding-horizontal: 32px;
  padding-top: 40px;
`;

export const IconBackground = styled.View`
  width: 160px;     
  height: 160px;   
  border-radius: 80px;       
  background-color: #FEF7F3; 
  justify-content: center;   
  align-items: center;       
  margin-bottom: 20px;
  position: relative;   
`;

export const Title = styled.Text`
  font-size: 18px;    
  font-weight: 500;   
  color: #000000;     
  margin-bottom: 8px; 
`;

export const Description = styled.Text`
  font-size: 13px;
  color: #6E6E6E;     
  text-align: center; 
  line-height: 20px; 
`;

export const ButtonContainer = styled.View`
  padding-horizontal: 24px; 
  padding-bottom: 20px;     
`;

export const PrimaryButton = styled.TouchableOpacity`
  width: 100%;             
  height: 52px;            
  background-color: #FF8933; 
  border-radius: 8px;      
  justify-content: center; 
  align-items: center;     
  margin-bottom: 8px;      
`;

export const PrimaryButtonText = styled.Text`
  font-size: 18px;  
  font-weight: 400; 
  color: #FFFFFF;   
`;

export const SecondaryButton = styled.TouchableOpacity`
  width: 100%;
  height: 52px;
  background-color: #FFFFFF; 
  border-width: 1px;        
  border-color: #FF8933;     
  border-radius: 8px;        
  justify-content: center;
  align-items: center;
`;

export const SecondaryButtonText = styled.Text`
  font-size: 18px;  
  font-weight: 400; 
  color: #FF8933;            
`;
