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

export const TopSection = styled.View`
  align-items: center;
  margin-bottom: 24px;
`;

/* 자식 요소인 돋보기를 절대 좌표로 배치하기 위한 기준 컨테이너다. */
export const IllustrationBackground = styled.View`
  width: 176px;
  height: 176px;
  border-radius: 88px; 
  background-color: #EAF3FF; 
  justify-content: center;
  align-items: center;
  margin-bottom: 24px;
  position: relative; 
`;

export const GlassWrapper = styled.View`
  position: absolute;
  bottom: 43px;
  right: 1px;
`;

export const Title = styled.Text`
  font-size: 18px;
  font-weight: 500;
  color: #000000;
  margin-bottom: 6px;
`;

export const Subtitle = styled.Text`
  font-size: 13px;
  font-weight: 400;
  color: #000000;
`;

export const SearchContainer = styled.View`
  flex-direction: row;
  align-items: center;
  height: 44px;          
  border-width: 1px;
  border-color: #E0E0E0; 
  border-radius: 17px;  
  padding-horizontal: 16px;
  margin-bottom: 16px;   
`;

export const SearchInput = styled.TextInput`
  flex: 1; 
  font-size: 14px;
  font-weight: 500;
  color: #000000;
  padding: 0; 
`;

export const SearchIconWrapper = styled.TouchableOpacity`
  padding: 4px;
  margin-left: 8px;
`;

export const FAQListContainer = styled.View`
  width: 100%;
`;

export const FAQItemCard = styled.View`
  border-width: 1px;
  border-color: #E0E0E0;
  border-radius: 8px;
  margin-bottom: 8px;  
  overflow: hidden;    
`;

export const FAQQuestionRow = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: space-between; 
  padding: 12px 16px;
  background-color: #FFFFFF;
`;

export const FAQQuestionText = styled.Text<{isExpanded?: boolean}>`
  flex: 1;
  font-size: 14px;
  font-weight: 500;
  color: #000000;
  margin-right: 12px;
`;

export const FAQAnswerContainer = styled.View`
  padding-horizontal: 16px;
  padding-bottom: 24px;
  background-color: #FFFFFF;
`;

export const FAQAnswerIntro = styled.Text`
  font-size: 14px;
  font-weight: 500;
  color: #000000;
  margin-bottom: 16px; 
  line-height: 22px;
`;

export const FAQStepRow = styled.View<{isLast: boolean}>`
  flex-direction: row;
  align-items: flex-start; 
  margin-bottom: ${props => (props.isLast ? '0px' : '12px')};
`;

export const FAQStepNumberBadge = styled.View`
  width: 20px;
  height: 20px;
  border-radius: 10px;      
  background-color: #FF8933;
  justify-content: center;
  align-items: center;
  margin-right: 12px;
  margin-top: 2px;           
`;

export const FAQStepNumberText = styled.Text`
  font-size: 12px;
  font-weight: 500;
  color: #FFFFFF;
`;

export const FAQStepText = styled.Text`
  flex: 1; 
  font-size: 14px;
  font-weight: 500;
  color: #000000;
  line-height: 22px;
`;
