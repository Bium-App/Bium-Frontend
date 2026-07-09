import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background-color: #FFFFFF;
`;

export const MainContainer = styled.SafeAreaView`
  flex: 1;
`;

export const ContentWrapper = styled.View`
  flex: 1;
  padding: 0px 24px 20px 24px;
`;

export const TopContentWrapper = styled.View`
  flex: 1;
  align-items: center;
  margin-top: 40px;
`;

export const IconWrapper = styled.View`
  width: 100px;
  height: 100px;
  justify-content: center;
  align-items: center;
  margin-bottom: 24px;
`;

export const TitleText = styled.Text`
  font-size: 24px;
  font-weight: 500;
  color: #000000;
  text-align: center;
  margin-bottom: 12px;
`;

export const DescText = styled.Text`
  font-size: 14px;
  font-weight: 200;
  color: #000000;
  text-align: center;
  line-height: 20px;
`;

export const BottomArea = styled.View`
  width: 100%;
  margin-bottom: 20px;
`;

export const SummaryBox = styled.View`
  width: 100%;
  border-width: 1px;
  border-color: #E8E8E8; /* EEEEEE -> E8E8E8 */
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 20px;
  background-color: #FFFFFF;
`;

export const SummaryHeader = styled.Text`
  font-size: 16px;
  font-weight: 500; /* 700 -> 500 */
  color: #000000;
  margin-bottom: 20px;
`;

export const SummaryRow = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 16px;
`;

export const LabelWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  width: 120px; 
`;

export const IconContainer = styled.View`
  width: 24px; 
  align-items: center;
  justify-content: center;
`;

export const LabelText = styled.Text`
  font-size: 14px;
  font-weight:500;
  color: #000000;
  margin-left: 8px;
`;

export const ValueText = styled.Text`
  font-size: 14px;
  font-weight: 200; /* 600 -> 200 */
  color: #000000;
`;

export const SubmitButton = styled.TouchableOpacity`
  width: 100%;
  height: 54px;
  background-color: #FF8933;
  border-radius: 8px;
  justify-content: center;
  align-items: center;
`;

export const SubmitButtonText = styled.Text`
  font-size: 18px; /* 16 -> 18 */
  font-weight: 600;
  color: #FFFFFF;
`;