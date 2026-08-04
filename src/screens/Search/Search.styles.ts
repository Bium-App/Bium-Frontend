import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background-color: #FFFFFF;
`;

export const SearchHeaderContainer = styled.View<{paddingTop: number}>`
  flex-direction: row;
  align-items: center;
  padding-top: ${({ paddingTop }) => paddingTop || 0}px;
  padding-horizontal: 16px;
  height: ${({ paddingTop }) => (paddingTop || 0) + 60}px;
  background-color: #FFFFFF;
`;

export const SearchInputContainer = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
  margin-left: 10px;
  background-color: #EEEEEE;
  border-radius: 8px;
  padding-horizontal: 8px;
`;

export const SearchLabel = styled.Text`
  font-size: 16px; 
  color: #AAAAAA;
  margin-left: 8px;
`;

export const VerticalDivider = styled.View`
  width: 1px;
  height: 16px;
  background-color: #BBBBBB;
  margin-horizontal: 8px;
`;

export const SearchInput = styled.TextInput`
  flex: 1;
  font-size: 16px;
  color: #000000;
  padding: 0;
  height: 34px;
`;

export const HeaderDivider = styled.View`
  height: 1px;
  background-color: #BBBBBB;
`;

export const SectionContainer = styled.View`
  padding-horizontal: 24px;
  padding-top: 24px;
  min-height: 140px;
`;

export const SectionHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;

export const SectionTitle = styled.Text`
  font-size: 16px;
  font-weight: 700;
  color: #000000;
`;

export const DeleteAllText = styled.Text`
  font-size: 13px;
  color: #FF8933;
`;

export const ChipContainer = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  gap: 10px;
`;

export const RecentChip = styled.View`
  flex-direction: row;
  align-items: center;
  background-color: #FFE8D6;
  padding-horizontal: 14px;
  padding-vertical: 8px;
  border-radius: 20px;
`;

export const RecentChipText = styled.Text`
  font-size: 14px;
  color: #FF8933;
`;

export const ChipDeleteButton = styled.TouchableOpacity`
  margin-left: 6px;
`;

export const RecommendChip = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  background-color: #F8F9FA;
  padding-horizontal: 14px;
  padding-vertical: 8px;
  border-radius: 20px;
`;

export const RecommendIcon = styled.View`
  margin-right: 6px;
`;

export const RecommendChipText = styled.Text`
  font-size: 14px;
  color: #000000;
`;

export const RecommendSectionContainer = styled.View`
  padding-horizontal: 24px;
  padding-top: 24px;
  border-top-width: 1px;
  border-top-color: #EEEEEE;
`;

export const RecommendSectionHeader = styled(SectionHeader)`
  margin-bottom: 16px;
`;

export const SearchResultsContainer = styled.View`
  flex: 1;
`;

export const ResultButton = styled.TouchableOpacity`
  padding: 16px;
  border-bottom-width: 1px;
  border-bottom-color: #f0f0f0;
  background-color: #ffffff;
`;

export const ResultTitle = styled.Text`
  font-size: 16px;
  font-weight: 700;
  color: #333333;
  margin-bottom: 4px;
`;

export const ResultCategory = styled.Text`
  font-size: 12px;
  color: #ff8933;
  margin-bottom: 4px;
`;

export const ResultDescription = styled.Text`
  font-size: 14px;
  color: #888888;
`;

export const EmptyResultText = styled.Text`
  text-align: center;
  margin-top: 50px;
  color: #aaaaaa;
`;
