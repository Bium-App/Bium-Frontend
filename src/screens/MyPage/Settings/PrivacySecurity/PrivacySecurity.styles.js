import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background-color: #FFFFFF;
`;

export const ScrollContainer = styled.ScrollView.attrs({
  contentContainerStyle: {
    paddingHorizontal: 24, 
    paddingTop: 24,       
    paddingBottom: 40,     
  }
})`
  flex: 1;
`;

export const MenuCard = styled.TouchableOpacity`
  flex-direction: row;              
  justify-content: space-between;   
  align-items: center;               
  background-color: #FFFFFF;         
  padding: 20px 24px;               
  border-radius: 10px;
  margin-bottom: 16px;               
  shadow-color: #6B6EA1;
  shadow-offset: 0px 1px;
  shadow-opacity: 0.25;
  shadow-radius: 3px;


  elevation: 4;                      
`;

export const MenuText = styled.Text`
  font-size: 15px;
  font-weight: 200;
  color: #000000;   
`;