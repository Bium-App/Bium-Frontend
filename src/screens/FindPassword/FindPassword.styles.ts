import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background-color: #FFFFFF;
`;

export const HeaderDivider = styled.View`
  width: 100%;
  height: 1px;
  background-color: #EEEEEE;
`;

export const ScrollContent = styled.ScrollView.attrs({
  contentContainerStyle: {
    paddingHorizontal: 24,
    paddingTop: 0,
    paddingBottom: 40,
  },
})``;

export const TitleText = styled.Text`
  font-size: 20px;
  font-weight: 200;
  color: #FF8933;
  margin-top: 40px;
  margin-bottom: 20px;
  text-align: left;
  align-self: flex-start;
`;

export const InputWrapper = styled.View`
  width: 100%;
  margin-bottom: 16px;
`;

export const InputField = styled.TextInput`
  height: 52px;
  border-width: 1px;
  border-color: #AAAAAA;
  border-radius: 8px;
  padding-horizontal: 16px;
  font-size: 15px;
  color: #000000;
  background-color: #FFFFFF;
`;

export const SubmitButton = styled.TouchableOpacity`
  width: 100%;
  height: 52px;
  background-color: #FF8933;
  border-radius: 8px;
  justify-content: center;
  align-items: center;
  margin-top: 8px;
`;

export const SubmitButtonText = styled.Text`
  font-size: 16px;
  font-weight: 700;
  color: #FFFFFF;
`;

export const DividerRow = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 32px;
  margin-bottom: 24px;
`;

export const DividerLine = styled.View`
  flex: 1;
  height: 1px;
  background-color: #EEEEEE;
`;

export const DividerText = styled.Text`
  font-size: 12px;
  color: #000000;
  margin-horizontal: 16px;
  font-weight: 500;
`;

export const VerificationRow = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 8px;
`;

export const VerificationInput = styled.TextInput`
  flex: 1;
  height: 52px;
  border-width: 1px;
  border-color: #AAAAAA;
  border-radius: 8px;
  padding-horizontal: 16px;
  font-size: 15px;
  color: #000000;
  background-color: #FFFFFF;
`;

export const TimerText = styled.Text`
  font-size: 13px;
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
  font-size: 13px;
  color: #FF8933;
`;

export const HelperText = styled.Text`
  font-size: 11px;
  color: #000000;
  margin-left: 4px;
  margin-bottom: 24px;
`;
