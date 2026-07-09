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

export const TitleText = styled.Text`
  font-size: 24px; /* 22 -> 24 */
  font-weight: 500; /* 700 -> 500 */ 
  color: #000000;
  margin-top: 32px;
  margin-bottom: 32px;
`;

export const SectionLabel = styled.Text`
  font-size: 14px; /* 13 -> 14 */
  font-weight: 500; /*600 -> 500 */
  color: #000000;
  margin-bottom: 12px;
`;

export const OptionsCard = styled.View`
  width: 100%;
  border-width: 1px;
  border-color: #E8E8E8;  /* E5E5E5 ->E8E8E8 */
  border-radius: 8px; 
  background-color: #FFFFFF;
`;

export const OptionItem = styled.TouchableOpacity`
  flex-direction: row; 
  align-items: center; 
  padding: 16px; 
`;

export const Divider = styled.View`
  width: 100%;
  height: 1px;
  background-color: #DADADA; /*E5E5E5 - > DADADA */
`;

export const RadioOuter = styled.View`
  width: 20px;
  height: 20px;
  border-radius: 10px; 
  border-width: ${props => (props.isSelected ? '5px' : '1px')};
  border-color: ${props => (props.isSelected ? '#FF8933' : '#E8E8E8')};
  justify-content: center; 
  align-items: center;
`;

export const RadioInner = styled.View`
  width: 10px;
  height: 10px;
  border-radius: 5px;
  background-color: #FFFFFF; 
`;

export const OptionTextContent = styled.View`
  flex: 1; 
  margin-left: 12px; 
`;

export const OptionTitle = styled.Text`
  font-size: 16px; /* 15 -> 16*/
  font-weight: 500; /* 600 -> 500*/
  color: #000000;
`;

export const OptionValueRow = styled.View`
  flex-direction: row; 
  align-items: center; 
  margin-top: 4px; 
`;

export const OptionValue = styled.Text`
  font-size: 14px;
  font-weight:200;
  color: #000000;
`;

export const RightIconWrapper = styled.View`
  width: 24px;
  height: 24px;
  justify-content: center; 
  align-items: center;
  margin-left: 16px; 
`;

export const InfoBox = styled.View`
  flex-direction: row;
  align-items: center;
  background-color: #FFE8D6; 
  padding: 12px 16px;
  border-radius: 8px;
  margin-top: 24px; 
`;

export const InfoText = styled.Text`
  font-size: 12px;
  font-weight:200;
  color: #000000;
  margin-left: 6px; 
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
  font-size: 18px;
  font-weight: 600;
  color: #FFFFFF;
`;