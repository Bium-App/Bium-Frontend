import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background-color: #ffffff;
`;

export const HeaderBackButton = styled.TouchableOpacity`
  padding: 0 4px;
`;

export const SearchContainer = styled.View`
  flex-direction: row;
  align-items: center;
  background-color: #e8e8e8;
  border-radius: 50px;
  padding: 10px 12px;
  margin: 16px 20px 24px;
`;

export const SearchInput = styled.TextInput`
  flex: 1;
  margin-left: 8px;
  font-size: 14px;
  color: #000000;
  padding: 0;
`;

export const SectionTitle = styled.Text<{isFirst: boolean}>`
  font-size: 16px;
  font-weight: 500;
  color: #000000;
  margin: 0 20px 12px;
  margin-top: ${({ isFirst }) => (isFirst ? 0 : 32)}px;
`;

export const RequestCard = styled.View`
  margin: 0 20px;
  margin-bottom: 12px;
  border-width: 1px;
  border-color: #d1d5db;
  border-radius: 8px;
  background-color: #ffffff;
  padding: 12px;
`;

export const ProfileTopRow = styled.View`
  flex-direction: row;
  align-items: flex-start;
`;

export const AvatarCircle = styled.View`
  width: 34px;
  height: 34px;
  border-radius: 20px;
  background-color: #ffe8d6;
  align-items: center;
  justify-content: center;
`;

export const ProfileTextColumn = styled.View`
  flex: 1;
  margin-left: 12px;
  justify-content: center;
`;

export const ProfileId = styled.Text`
  font-size: 14px;
  color: #000000;
  margin-bottom: 3px;
`;

export const ProfileName = styled.Text`
  font-size: 18px;
  font-weight: 400;
  color: #000000;
`;

export const ProfileDescRow = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 4px;
`;

export const ProfileDescIconWrapper = styled.View`
  margin-right: 4px;
`;

export const ProfileDesc = styled.Text`
  font-size: 10px;
  font-weight: 300;
  color: #000000;
`;

export const ActionBottomRow = styled.View`
  flex-direction: row;
  justify-content: flex-end;
  margin-top: 12px;
`;

export const ActionBtn = styled.TouchableOpacity<{
  isOutline: boolean;
  colorType: string;
}>`
  background-color: ${({ isOutline }) => (isOutline ? '#FFFFFF' : '#FF8933')};
  border-width: ${({ isOutline }) => (isOutline ? 1 : 0)}px;
  border-color: ${({ colorType }) =>
    colorType === 'gray' ? '#D1D5DB' : '#FF8933'};
  border-radius: 8px;
  padding: 8px 18px;
  margin-left: 8px;
  align-items: center;
  justify-content: center;
`;

export const ActionBtnText = styled.Text<{
  isOutline: boolean;
  colorType: string;
}>`
  font-size: 17px;
  font-weight: 500;
  color: ${({ isOutline, colorType }) =>
    isOutline ? (colorType === 'gray' ? '#000000' : '#FF8933') : '#FFFFFF'};
`;

export const EmptyRequestText = styled.Text`
  text-align: center;
  padding: 20px;
  color: #aaaaaa;
`;
