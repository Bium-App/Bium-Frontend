import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background-color: #ffffff;
`;

export const HeaderCancelButton = styled.TouchableOpacity`
  padding: 4px 8px;
`;

export const HeaderCancelText = styled.Text`
  font-size: 20px;
  color: #b9b9b9;
`;

export const HeaderSaveButton = styled.TouchableOpacity`
  padding: 4px 8px;
`;

export const HeaderSaveText = styled.Text`
  font-size: 20px;
  font-weight: 400;
  color: #ff8933;
`;

export const ContentBody = styled.ScrollView`
  padding: 24px 20px;
`;

export const InputLabel = styled.Text`
  font-size: 18px;
  font-weight: 500;
  color: #000000;
  margin-bottom: 8px;
  margin-top: ${({ isFirst }) => (isFirst ? 0 : 24)}px;
`;

export const TitleInput = styled.TextInput`
  background-color: ${({ isFocused }) => (isFocused ? '#FFE8D6' : '#FFFFFF')};
  border-width: 1px;
  border-color: ${({ isFocused }) => (isFocused ? '#FF8933' : '#E0E0E0')};
  border-radius: 8px;
  padding: 12px 14px;
  font-size: 14px;
  color: #000000;
`;

export const ContentInputMultiline = styled.TextInput`
  background-color: ${({ isFocused }) => (isFocused ? '#FFE8D6' : '#FFFFFF')};
  border-width: 1px;
  border-color: ${({ isFocused }) => (isFocused ? '#FF8933' : '#E0E0E0')};
  border-radius: 8px;
  padding: 12px 14px;
  font-size: 13px;
  color: #000000;
  height: 140px;
  text-align-vertical: top;
`;

export const DateActionRow = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 24px;
`;

export const DateActionLabel = styled.Text`
  font-size: 15px;
  font-weight: 500;
  color: #000000;
  margin-right: 16px;
`;

export const DateActionBox = styled.TouchableOpacity`
  flex: 1;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border-width: 1px;
  border-color: #ff8933;
  border-radius: 8px;
  padding: 12px 14px;
  background-color: #ffe8d6;
`;

export const DateActionBoxLeft = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const DateActionText = styled.Text`
  font-size: 15px;
  color: #9c9c9c;
  margin-left: 8px;
`;

export const NotificationRow = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top: 20px;
`;

export const NotificationLabel = styled.Text`
  font-size: 15px;
  font-weight: 500;
  color: #000000;
`;
