import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1; 
  background-color: #FFFFFF; 
`;

export const KeyboardContainer = styled.KeyboardAvoidingView`
  flex: 1; 
`;

export const ScrollContainer = styled.ScrollView.attrs({
  contentContainerStyle: {
    paddingBottom: 40,
  }
})`
  flex: 1;
`;

export const ProfileContainer = styled.View`
  align-self: center; 
  margin-top: 10px; 
  margin-bottom: 32px; 
`;

export const ProfileImageWrapper = styled.View`
  width: 126px; 
  height: 126px; 
  border-radius: 63px; 
  background-color: #F0F0F0; 
  justify-content: center; 
  align-items: center; 
  overflow: hidden; 
`;

export const BadgeWrapper = styled.TouchableOpacity`
  position: absolute; 
  bottom: 0; 
  right: 0; 
  width: 28px; 
  height: 28px; 
  border-radius: 14px; 
  background-color: #FF8933; 
  justify-content: center; 
  align-items: center; 
  border-width: 2px; 
  border-color: #FFFFFF; 
`;

export const FormContainer = styled.View`
  padding: 0 24px; 
`;

export const InputGroup = styled.View`
  margin-bottom: 20px; 
`;

export const Label = styled.Text`
  font-size: 17px; /* 💡 17x로 되어있던 오타 수정 완료 */
  font-weight: 500; 
  color: #000000; 
  margin-bottom: 8px; 
`;

export const Input = styled.TextInput`
  height: 52px; 
  border-width: 1px; 
  border-color: #D9D9D9; 
  border-radius: 8px; 
  padding: 0 16px; 
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
  margin-top: 12px; 
`;

export const SubmitText = styled.Text`
  font-size: 17px; 
  font-weight: 500; 
  color: #FFFFFF; 
`;