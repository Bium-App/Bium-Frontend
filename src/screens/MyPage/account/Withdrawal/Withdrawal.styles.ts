import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1; 
  background-color: #FFFFFF;
`;

export const ScrollContainer = styled.ScrollView.attrs({
  contentContainerStyle: {
    paddingHorizontal: 24,
    paddingTop: 40,        
    paddingBottom: 40,     
    alignItems: 'center',  
  }
})`
  flex: 1;
`;

export const IconBackground = styled.View`
  width: 113px;     /* 88 -> 113 */         
  height: 113px;   /* 88 -> 113 */ 
  border-radius: 56px;     /* 44 -> 56*/  
  background-color: #FF8933; 
  justify-content: center;
  align-items: center;
  margin-bottom: 16px;       
`;

export const Title = styled.Text`
  font-size: 15px;  /* 20 -> 15 */
  font-weight: 500; /* 700 -> 500 */
  color: #000000;
  margin-bottom: 6px;       
`;

export const Description = styled.Text`
  font-size: 13px;    /* 14 -> 13 */
  color: #6E6E6E;     /* 767676 -> 6E6E6E */ 
  text-align: center; 
  line-height: 20px;  
  margin-bottom: 24px; 
`;

export const InfoBox = styled.View`
  width: 100%;               
  background-color: #EBEBEB; /* F2F2F2 -> EBEBEB*/
  border-radius: 8px;        
  padding: 20px 20px;        
  margin-bottom: 16px;       
`;

export const BulletRow = styled.View<{isLast?: boolean}>`
  flex-direction: row;       
  align-items: flex-start;   
  margin-bottom: ${props => (props.isLast ? '0px' : '10px')}; 
`;

export const BulletPoint = styled.Text`
  font-size: 13px;
  color: #6E6E6E;   /* 767676 -> 6E6E6E */
  margin-right: 6px;         
  line-height: 20px;         
`;

export const BulletText = styled.Text`
  flex: 1;           
  font-size: 13px;
  color: #6E6E6E; /* 767676 -> 6E6E6E */
  line-height: 20px; 
`;

export const AgreeContainer = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-bottom: 24px; 
`;

export const AgreeText = styled.Text`
  font-size: 10px;     /* 13 -> 10 */
  color: #6E6E6E ; /* 767676 -> 6E6E6E */
  margin-left: 8px; 
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
