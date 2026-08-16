import styled from 'styled-components/native';

export const Overlay = styled.Pressable`
  flex: 1;
  background-color: rgba(0, 0, 0, 0.4);
  align-items: center;
  justify-content: center;
  padding: 24px;
`;

export const Container = styled.View`
  width: 100%;
  max-width: 360px;
  background-color: #ffffff;
  border-radius: 16px;
  overflow: hidden;
  shadow-color: #6b6ea1;
  shadow-offset: 0px 1px;
  shadow-opacity: 0.25;
  shadow-radius: 3px;
  elevation: 5;
`;

export const Header = styled.View`
  height: 58px;
  background-color: #ffe8d6;
  align-items: center;
  justify-content: center;
`;

export const Title = styled.Text`
  color: #000000;
  font-size: 18px;
  font-weight: 700;
`;

export const CloseButton = styled.TouchableOpacity`
  position: absolute;
  right: 16px;
  padding: 8px;
`;

export const Body = styled.View`
  padding: 20px 20px 24px;
`;

export const SectionLabel = styled.Text<{ spaced?: boolean }>`
  color: #000000;
  font-size: 14px;
  font-weight: 700;
  margin-top: ${({ spaced }) => (spaced ? 22 : 0)}px;
  margin-bottom: 10px;
`;

export const SearchBox = styled.View`
  height: 44px;
  flex-direction: row;
  align-items: center;
  padding: 0 14px;
  background-color: #e8e8e8;
  border-radius: 8px;
`;

export const SearchText = styled.Text`
  margin-left: 10px;
  color: #333333;
  font-size: 14px;
`;

export const MethodRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

export const MethodButton = styled.TouchableOpacity`
  width: 23%;
  aspect-ratio: 1;
  border-width: 1px;
  border-color: #d1d5db;
  border-radius: 10px;
  align-items: center;
  justify-content: center;
  background-color: #ffffff;
`;

export const MethodText = styled.Text`
  margin-top: 6px;
  color: #000000;
  font-size: 12px;
`;

export const RecentBox = styled.View`
  min-height: 72px;
  max-height: 176px;
  border-width: 1px;
  border-color: #d1d5db;
  border-radius: 10px;
  overflow: hidden;
`;

export const RecentEmptyText = styled.Text`
  color: #8e8e93;
  font-size: 12px;
  text-align: center;
  padding: 26px 12px;
`;

export const RecentScroll = styled.ScrollView`
  max-height: 176px;
`;

export const RecentFileRow = styled.View<{ $isLast: boolean }>`
  min-height: 68px;
  flex-direction: row;
  align-items: center;
  margin: 0 14px;
  border-bottom-width: ${({ $isLast }) => ($isLast ? 0 : 1)}px;
  border-bottom-color: #e8e8e8;
`;

export const RecentIconBox = styled.View`
  width: 34px;
  align-items: flex-start;
  justify-content: center;
`;

export const RecentFileInfo = styled.View`
  flex: 1;
  padding-right: 8px;
`;

export const RecentFileName = styled.Text`
  color: #000000;
  font-size: 14px;
  font-weight: 500;
`;

export const RecentFileSize = styled.Text`
  color: #555555;
  font-size: 11px;
  margin-top: 2px;
`;

export const RecentAddButton = styled.TouchableOpacity`
  padding: 10px;
`;
