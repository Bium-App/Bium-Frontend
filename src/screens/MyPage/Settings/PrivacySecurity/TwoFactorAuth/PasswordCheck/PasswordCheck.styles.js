import styled from 'styled-components/native';
import { SafeAreaView } from 'react-native-safe-area-context';

export const Container = styled.View`
  flex: 1;
  background-color: #FFFFFF;
`;

export const MainContainer = styled(SafeAreaView)`
  flex: 1;
`;

export const ContentWrapper = styled.View`
  flex: 1;
  padding: 0px 24px 20px 24px;
`;

export const TitleText = styled.Text`
  font-size: 24px; /* 22- > 24 */
  font-weight: 500; /* 700- > 500 */ 
  color: #000000;
  margin-top: 32px;
  margin-bottom: 32px;
  line-height: 32px; 
`;

export const InputWrapper = styled.View`
  margin-bottom: 12px;
`;

export const ReadOnlyInput = styled.TextInput`
  height: 52px;
  border-width: 1px;
  border-color: #AAAAAA; /*E5E5E5 -> AAAAAA */
  border-radius: 8px;
  padding-horizontal: 16px;
  font-size: 15px;
  color: #000000; /*999999 -> AAAAAA */
  background-color: #FFFFFF;
`;

export const PasswordInputContainer = styled.View`
  flex-direction: row;
  align-items: center;
  height: 52px;
  border-width: 1px;
  border-color: ${props => (props.isFocused ? '#FF8933' : '#AAAAAA')};
  border-radius: 8px;
  padding-horizontal: 16px;
  background-color: #FFFFFF;
`;

export const PasswordInput = styled.TextInput`
  flex: 1;
  height: 100%; 
  font-size: 14px;
  font-weight: 400;
  color: #000000;
  padding: 0px; 
`;

export const ClearIconWrapper = styled.TouchableOpacity`
  padding: 4px; 
`;

export const SubmitButton = styled.TouchableOpacity`
  width: 100%;
  height: 54px;
  background-color: #FF8933; 
  border-radius: 8px;
  justify-content: center;
  align-items: center;
  margin-top: 24px; 
`;

export const SubmitButtonText = styled.Text`
  font-size: 18px; /* 16 -> 18*/
  font-weight: 600;
  color: #FFFFFF;
`;

export const FindPasswordWrapper = styled.TouchableOpacity`
  align-items: center;
  margin-top: 16px; /* 확인 버튼과의 간격 */
  padding: 8px; /* 터치하기 쉽도록 여백 추가 */
`;

export const FindPasswordText = styled.Text`
  font-size: 12px;
  font-weight: 200;
  color: #000000;
  text-decoration-line: underline; 
`;
