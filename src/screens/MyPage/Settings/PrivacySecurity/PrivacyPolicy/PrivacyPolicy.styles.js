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

// 화면 최상단의 장문 안내 텍스트 영역
export const TopIntroText = styled.Text`
  font-size: 13px;
  color: #666666;
  line-height: 20px;
  margin-bottom: 40px; 
`;

// 💡 상단 텍스트 중 '관련 법령' 등 굵게 표시해야 할 부분을 위한 스타일 추가!
export const TopIntroBoldText = styled.Text`
  font-weight: 700;
  color: #1A1A1A;
`;

export const SectionContainer = styled.View`
  margin-bottom: 40px;
`;

export const SectionTitle = styled.Text`
  font-size: 16px;
  font-weight: 700;
  color: #1A1A1A;
  margin-bottom: 16px;
`;

export const PolicyCard = styled.View`
  width: 100%;
  border-width: 1px;
  border-color: #E5E5EA;
  border-radius: 12px;
  padding: 32px 20px;
  align-items: center; 
  background-color: #FFFFFF;
`;

export const IconWrapper = styled.View`
  margin-bottom: 24px;
`;

export const CardMainText = styled.Text`
  text-align: center;
  font-size: 15px;
  font-weight: 600;
  color: #1A1A1A;
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
  font-size: 13px;
  color: #666666;
  margin-right: 8px;
  margin-top: 2px; 
`;

export const BulletText = styled.Text`
  flex: 1; 
  font-size: 13px;
  color: #666666;
  line-height: 20px;
`;