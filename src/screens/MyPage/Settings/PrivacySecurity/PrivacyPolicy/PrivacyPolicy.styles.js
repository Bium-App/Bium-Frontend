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

export const TopIntroText = styled.Text`
  font-size: 16px;
  font-weight: 200;
  color: #5E5E5E ; 
  line-height: 20px;   
  margin-bottom: 40px; 
`;

export const TopIntroBoldText = styled.Text`
  font-weight: 500;
  color: #000000;      
`;

export const SectionContainer = styled.View`
  margin-bottom: 40px; 
`;

export const SectionTitle = styled.Text`
  font-size: 18px;
  font-weight: 500;
  color: #000000;
  margin-bottom: 16px; 
`;

export const PolicyCard = styled.View`
  width: 100%;
  border-width: 1px;
  border-color: #E8E8E8;
  border-radius: 8px;
  padding: 32px 20px;    
  align-items: center;   
  background-color: #FFFFFF;
`;

export const IconWrapper = styled.View`
  margin-bottom: 24px; 
`;

export const CardMainText = styled.Text`
  text-align: center;  
  font-size: 14px;
  font-weight: 500;
  color: #000000;
  line-height: 24px;   
  margin-bottom: 24px; 
`;

export const HighlightText = styled.Text`
  color: #FF8933; 
`;

export const BulletListContainer = styled.View`
  width: 100%;
  align-items: flex-start; 
`;

export const BulletRow = styled.View`
  flex-direction: row;     
  align-items: flex-start; 
  margin-bottom: 8px;      
`;

export const BulletDot = styled.Text`
  font-size: 12px;
  font-weight : 200 ;
  color: #000000;
  margin-right: 8px; 
  margin-top: 2px;   
`;

export const BulletText = styled.Text`
  flex: 1;
  font-size: 12px;
  color: #000000;
  line-height: 20px; 
`;