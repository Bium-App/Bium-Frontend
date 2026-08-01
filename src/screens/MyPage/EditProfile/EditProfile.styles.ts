import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background-color: #ffffff;
`;

export const KeyboardContainer = styled.KeyboardAvoidingView`
  flex: 1;
`;

export const ScrollContainer = styled.ScrollView.attrs({
  contentContainerStyle: {
    paddingBottom: 40,
  },
})`
  flex: 1;
`;

export const ProfileContainer = styled.View`
  align-self: center;
  margin-top: 10px;
  margin-bottom: 24px;
`;

export const ProfileImageArea = styled.View`
  width: 126px;
  height: 126px;
  align-self: center;
`;

export const ProfileImageWrapper = styled.View`
  width: 126px;
  height: 126px;
  border-radius: 63px;
  background-color: #f0f0f0;
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
  background-color: #ff8933;
  justify-content: center;
  align-items: center;
  border-width: 2px;
  border-color: #ffffff;
`;

export const ProfileHint = styled.Text`
  margin-top: 10px;
  color: #999999;
  font-size: 11px;
  text-align: center;
`;

export const ProfileActionRow = styled.View`
  flex-direction: row;
  justify-content: center;
  margin-top: 8px;
`;

export const ProfileActionButton = styled.TouchableOpacity`
  padding: 4px 8px;
`;

export const ProfileActionText = styled.Text<{muted?: boolean}>`
  color: ${({ muted }) => (muted ? '#999999' : '#FF8933')};
  font-size: 12px;
  font-weight: 600;
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
  border-color: #d9d9d9;
  border-radius: 8px;
  padding: 0 16px;
  font-size: 15px;
  color: #000000;
  background-color: #ffffff;
`;

export const SubmitButton = styled.TouchableOpacity`
  width: 100%;
  height: 52px;
  background-color: #ff8933;
  border-radius: 8px;
  justify-content: center;
  align-items: center;
  margin-top: 12px;
`;

export const SubmitText = styled.Text`
  font-size: 17px;
  font-weight: 500;
  color: #ffffff;
`;
