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
  font-size: 24px;
  font-weight: 500;
  color: #000000;
  margin-top: 16px; 
  margin-bottom: 24px; 
  line-height: 32px; 
`;

export const VerificationRow = styled.View`
  flex-direction: row;
  align-items: center; 
  margin-bottom: 8px; 
`;

export const InputContainer = styled.View`
  flex: 1; 
  height: 52px;
  flex-direction: row;
  align-items: center;
  border-width: 1px;
  border-color: ${props => (props.isFocused ? '#FF8933' : '#AAAAAA')}; /*E5E5E5 -> AAAAAA */
  border-radius: 8px; 
  padding-horizontal: 16px;
  background-color: #FFFFFF;
`;

export const CodeInput = styled.TextInput`
  flex: 1;
  height: 100%; 
  font-size: 14px;
  font-weight: 400;
  color: #000000;
  padding: 0px; 
`;

export const TimerText = styled.Text`
  font-size: 12px;
  font-weight: 200;
  color: #FF8933; 
  margin-left: 12px; 
`;

export const ResendButton = styled.TouchableOpacity`
  height: 36px;
  padding-horizontal: 12px;
  border-width: 1px;
  border-color: #FF8933;
  border-radius: 4px; 
  justify-content: center;
  align-items: center;
  margin-left: 12px; 
  background-color: #FFFFFF;
`;

export const ResendButtonText = styled.Text`
  font-size: 14px;
  font-weight:400;
  color: #FF8933;
`;

export const HelperText = styled.Text`
  font-size: 10px;
  font-weight: 400;
  color: #000000;
  margin-left: 4px; 
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
  font-weight: 400;
  color: #FFFFFF;
`;