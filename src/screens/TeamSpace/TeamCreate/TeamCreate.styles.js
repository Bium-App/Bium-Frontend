import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background-color: #FFFFFF;
`;

export const HeaderBackButton = styled.TouchableOpacity`
  padding: 0 4px;
`;

export const ScrollContent = styled.ScrollView.attrs({
  contentContainerStyle: { flexGrow: 1 } 
})`
  flex: 1; 
`;

export const ContentInner = styled.View`
  padding: 20px 20px;
`;

export const SectionLabel = styled.Text`
  font-size: 18px;
  font-weight: 500;
  color: #000000;
  margin-bottom: 10px;
  margin-top: ${({ isFirst }) => (isFirst ? 0 : 24)}px;
`;

export const InputBox = styled.View`
  background-color: #DEDEDE;
  border-radius: 8px;
  padding: 12px 14px;
`;

export const StyledTextInput = styled.TextInput`
  font-size: 14px;
  color: #000000;
  padding: 0;
`;

export const SubTextRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-top: 6px;
  padding: 0 4px;
`;

export const SubText = styled.Text`
  font-size: 12px;
  color: #000000;
`;

export const CharCountText = styled.Text`
  font-size: 12px;
  color: #000000;
`;

export const EmptyCard = styled.View`
  height: 58px;       
  border-width: 1px;
  border-color: #DEDEDE;
  border-radius: 8px;
  background-color: #FFFFFF;
  margin-bottom: 5px;
`;

export const BottomFixedArea = styled.View`
  background-color: #FFFFFF;
  padding: 10px 20px 24px;   
`;

export const SubmitBtn = styled.TouchableOpacity`
  background-color: #FF8933;
  border-radius: 8px;
  padding: 15px;
  align-items: center;
  justify-content: center;
`;

export const SubmitBtnText = styled.Text`
  font-size: 18px;
  font-weight: 500;
  color: #FFFFFF;
`;