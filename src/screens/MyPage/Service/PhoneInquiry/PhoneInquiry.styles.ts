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

export const IllustrationBackground = styled.View`
  width: 176px;
  height: 176px;
  border-radius: 88px;
  background-color: #FFE8D6; 
  justify-content: center;   
  align-items: center;       
  margin-bottom: 24px;      
`;

export const Title = styled.Text`
  font-size: 18px;
  font-weight: 500;   
  color: #000000;
  margin-bottom: 8px;  
`;

export const Subtitle = styled.Text`
  font-size: 13px;
  font-weight: 400;
  color: #000000;
  margin-bottom: 64px; 
`;

export const InfoCard = styled.View`
  width: 100%;           
  border-width: 1px;
  border-color: #E0E0E0; 
  border-radius: 8px;
  padding: 24px 20px;    
  margin-bottom: 24px;   
`;

export const InfoRow = styled.View<{isLast?: boolean}>`
  flex-direction: row; 
  align-items: center; 
  margin-bottom: ${props => (props.isLast ? '0px' : '28px')}; 
`;

export const InfoIconWrapper = styled.View`
  width: 34px;
  height: 34px;
  justify-content: center; 
  align-items: center;     
  margin-right: 12px;      
`;

export const InfoTextCol = styled.View`
  flex: 1; 
`;

export const InfoLabel = styled.Text`
  font-size: 16px;
  font-weight: 500;   
  color: #000000;
  margin-bottom: 4px; 
`;

export const InfoValue = styled.Text<{isHighlight?: boolean}>`
  font-size: 14px;
  font-weight: 300;
  color: ${props => (props.isHighlight ? '#FF8933' : '#767676')}; 
  line-height: 20px; 
`;

export const FooterNoticeText = styled.Text`
  font-size: 12px;
  font-weight: 300;
  color: #000000;
  text-align: center; 
  line-height: 18px;  
`;
