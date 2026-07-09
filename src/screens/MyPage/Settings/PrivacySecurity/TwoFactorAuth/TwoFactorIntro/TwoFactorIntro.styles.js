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
  justify-content: space-between; 
`;

export const TopContentWrapper = styled.View`
  flex: 1;
`;

export const IntroSection = styled.View`
  align-items: center; 
  margin-top: 16px; 
  margin-bottom: 40px; 
`;

export const IllustrationWrapper = styled.View`
  width: 130px; 
  height: 130px;
  margin-bottom: 16px; 
  justify-content: center;
  align-items: center;
`;

export const IntroText = styled.Text`
  font-size: 14px;
  font-weight: 200;
  color: #000000; 
  text-align: center; 
  line-height: 22px; 
  letter-spacing: -0.3px; 
`;

export const FeaturesList = styled.View`
  width: 100%;
  padding-left: 36px; 
`;

export const FeatureItem = styled.View`
  flex-direction: row; 
  align-items: center; 
  margin-bottom: 36px; 
`;

export const IconWrapper = styled.View`
  width: 58px;
  height: 58px;
  justify-content: center; 
  align-items: center;
  margin-right: 20px; 
`;


export const TextCol = styled.View`
  flex: 1; 
  justify-content: center; 
`;

export const FeatureTitle = styled.Text`
  font-size: 16px;
  font-weight: 500;
  color: #000000;
  margin-bottom: 4px; 
`;

export const FeatureDesc = styled.Text`
  font-size: 14px;
  font-weight: 200;
  color: #000000;
  line-height: 19px; 
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
  font-size: 18px;  /* 16- > 18 */
  font-weight: 600;
  color: #FFFFFF;
`;