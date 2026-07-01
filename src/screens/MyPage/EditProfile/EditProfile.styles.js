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
  margin-top: 60px; 
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
  font-size: 17x; /* 글자 크기 14 -> 17 수정   */
  font-weight: 500; /* 글자 굵기 (Bold) - > Medium 수정  */
  color: #000000; 
  margin-bottom: 8px; 
`;

export const Input = styled.TextInput`
  height: 52px; 
  border-width: 1px; 
  border-color: #D9D9D9; /* 테두리 색상 E0E0E0 -> D9D9D9 변경 */
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
  font-size: 17px; /* 버튼 글자 크기 16 -> 17 수정  */
  font-weight: 500; /* 버튼 글자 굵기 (Bold) -> Medium 수정  */
  color: #FFFFFF; 
`;