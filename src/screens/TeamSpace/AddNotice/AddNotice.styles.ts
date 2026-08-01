import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background-color: #ffffff;
`;

export const ContentContainer = styled.KeyboardAvoidingView`
  flex: 1;
`;

export const Content = styled.ScrollView.attrs({
  contentContainerStyle: {
    padding: 20,
    paddingBottom: 40,
  },
})`
  flex: 1;
`;

export const HeaderButton = styled.TouchableOpacity`
  padding: 4px;
`;

export const SaveText = styled.Text`
  color: #ff8933;
  font-size: 16px;
  font-weight: 600;
`;

export const Label = styled.Text`
  margin-top: 20px;
  margin-bottom: 8px;
  color: #000000;
  font-size: 15px;
  font-weight: 600;
`;

export const TitleInput = styled.TextInput`
  height: 52px;
  padding-horizontal: 14px;
  border-width: 1px;
  border-color: #e8e8e8;
  border-radius: 8px;
  color: #000000;
`;

export const ContentInput = styled.TextInput`
  min-height: 180px;
  padding: 14px;
  border-width: 1px;
  border-color: #e8e8e8;
  border-radius: 8px;
  color: #000000;
`;

export const ToggleRow = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top: 28px;
`;

export const ToggleTextContainer = styled.View``;

export const ToggleTitle = styled.Text`
  color: #000000;
  font-size: 15px;
  font-weight: 600;
`;

export const ToggleDescription = styled.Text`
  margin-top: 4px;
  color: #999999;
  font-size: 12px;
`;
