import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background-color: #FFFFFF;
`;

export const SearchContainer = styled.View`
  flex-direction: row;
  align-items: center;
  background-color: #E8E8E8;
  border-radius: 50px;
  padding: 8px 12px;
  margin: 16px 20px;
`;

export const SearchInput = styled.TextInput`
  flex: 1;
  margin-left: 8px;
  font-size: 15px;
  color: #000000;
  padding: 0;
`;

export const ActionRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 0 20px 16px;
`;

export const FilterTab = styled.TouchableOpacity`
  padding: 8px 12px;
  border-radius: 6px;
  border-width: 1px;
  border-color: #FF8933;
  background-color: #FFFFFF;
`;

export const FilterTabText = styled.Text`
  font-size: 15px;
  font-weight: 600;
  color: #FF8933;
`;

export const ActionButtonGroup = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const ActionButton = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  padding: 8px 10px;
  border-radius: 6px;
  border-width: 1px;
  border-color: #D1D5D8;
  background-color: #FFFFFF;
  margin-left: 8px;
`;

export const ActionButtonText = styled.Text`
  font-size: 15px;
  font-weight: 500;
  color: #000000;
  margin-left: 4px;
`;

export const ListContainer = styled.ScrollView.attrs({
  contentContainerStyle: { paddingBottom: 40 }
})`
  flex: 1;
`;

export const ProjectCard = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  background-color: #FFFFFF;
  border-radius: 16px;
  border-width: 1.5px;
  border-color: #E5E5E5;
  padding: 16px;
  margin: 0 20px 12px;
  shadow-color: #6B6EA1;
  shadow-offset: 0px 1px;
  shadow-opacity: 0.25;
  shadow-radius: 3px;
  elevation: 1;

`;

export const FolderCircle = styled.View`
  width: 52px;
  height: 52px;
  border-radius: 26px;
  background-color: #FFE8D6;
  align-items: center;
  justify-content: center;
  margin-right: 16px;
`;

export const ProjectInfo = styled.View`
  flex: 1;
  justify-content: center;
`;

export const TitleRow = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 4px;
`;

export const ProjectTitle = styled.Text`
  font-size: 18px;
  font-weight: 400;
  color: #000000;
  margin-right: 4px;
`;

export const ProjectDesc = styled.Text`
  font-size: 13px;
  color: #BBBBBB;
  margin-bottom: 6px;
`;

export const MemberRow = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const MemberText = styled.Text`
  font-size: 13px;
  color: #BBBBBB;
  margin-left: 4px;
`;
