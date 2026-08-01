import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background-color: #ffffff;
`;

export const HeaderBackButton = styled.TouchableOpacity`
  padding: 0 4px;
`;

export const ScrollContent = styled.ScrollView.attrs({
  contentContainerStyle: { flexGrow: 1 },
})`
  flex: 1;
`;

export const ContentInner = styled.View`
  padding: 20px 20px;
`;

export const SectionLabel = styled.Text<{isFirst: boolean}>`
  font-size: 18px;
  font-weight: 500;
  color: #000000;
  margin-bottom: 10px;
  margin-top: ${({ isFirst }) => (isFirst ? 0 : 24)}px;
`;

export const InputBox = styled.View`
  background-color: #dedede;
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
  border-color: #dedede;
  border-radius: 8px;
  background-color: #ffffff;
  margin-bottom: 5px;
`;

export const MemberCard = styled.TouchableOpacity<{selected: boolean}>`
  flex-direction: row;
  align-items: center;
  border-width: 1px;
  border-color: ${({ selected }) => (selected ? '#FF8933' : '#E8E8E8')};
  border-radius: 8px;
  padding: 12px;
  margin-bottom: 10px;
  background-color: ${({ selected }) => (selected ? '#FFF4EC' : '#FFFFFF')};
`;

export const MemberAvatar = styled.View`
  width: 36px;
  height: 36px;
  border-radius: 18px;
  align-items: center;
  justify-content: center;
  background-color: #ffe8d6;
  margin-right: 12px;
`;

export const MemberAvatarText = styled.Text`
  color: #ff8933;
  font-size: 15px;
  font-weight: 600;
`;

export const MemberInfo = styled.View`
  flex: 1;
`;

export const MemberName = styled.Text`
  font-size: 15px;
  font-weight: 500;
  color: #000000;
`;

export const MemberDescription = styled.Text`
  font-size: 11px;
  color: #999999;
  margin-top: 3px;
`;

export const BottomFixedArea = styled.View`
  background-color: #ffffff;
  padding: 10px 20px 24px;
`;

export const SubmitBtn = styled.TouchableOpacity`
  background-color: #ff8933;
  border-radius: 8px;
  padding: 15px;
  align-items: center;
  justify-content: center;
`;

export const SubmitBtnText = styled.Text`
  font-size: 18px;
  font-weight: 500;
  color: #ffffff;
`;
