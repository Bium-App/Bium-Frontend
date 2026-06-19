import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background-color: #FFFFFF;
`;

export const HeaderBackButton = styled.TouchableOpacity`
  padding: 0 4px;
`;

export const ContentBody = styled.ScrollView`
  padding: 24px 20px;
`;

export const TitleInputUnderline = styled.TextInput`
  font-size: 18px;
  font-weight: 500;
  color: #000000;
  padding: 8px 0;
  border-bottom-width: 1px;
  border-bottom-color: #E0DDDD;
  margin-bottom: 24px;
`;

export const DateDisplayRow = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  margin-bottom: 24px;
`;

export const DateDisplayText = styled.Text`
  font-size: 15px;
  font-weight: 400;
  color: #000000;
  margin-left: 8px;
`;

export const MemoCardContainer = styled.View`
  border-width: 1px;
  border-color: #E1E1E1;
  border-radius: 8px;
  overflow: hidden;
`;

export const MemoCardHeader = styled.View`
  background-color: #FFE8D6;
  padding: 10px 16px;
  border-bottom-width: 1px;
  border-bottom-color: #E1E1E1;
`;

export const MemoCardTitle = styled.Text`
  font-size: 15px;
  font-weight: 500;
  color: #000000;
`;

export const MemoCardInput = styled.TextInput`
  background-color: #FFFFFF;
  height: 120px;
  padding: 16px;
  font-size: 14px;
  color: ${({ initialValueColor }) => (initialValueColor ? '#000000' : '#000000')};
  text-align-vertical: top;
`;

export const BottomButtonArea = styled.View`
  flex-direction: row;
  padding: 12px 20px;
  background-color: #FFFFFF;
`;

export const CompleteButton = styled.TouchableOpacity`
  flex: 1;
  background-color: #FF8933;
  border-radius: 8px;
  align-items: center;
  justify-content: center;
  padding: 10px 0;
  margin-right: 12px;
`;

export const CompleteButtonText = styled.Text`
  font-size: 15px;
  font-weight: 500;
  color: #FFFFFF;
`;

export const DeleteButton = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: #FFFFFF;
  border-width: 1px;
  border-color: #FF0000;
  border-radius: 8px;
  padding: 10px 16px;
`;

export const DeleteButtonText = styled.Text`
  font-size: 15px;
  font-weight: 500;
  color: #FF0000;
  margin-left: 4px;
`;