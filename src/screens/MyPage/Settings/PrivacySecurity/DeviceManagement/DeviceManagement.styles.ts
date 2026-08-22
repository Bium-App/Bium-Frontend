import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background-color: #ffffff;
`;

export const ScrollContainer = styled.ScrollView.attrs({
  contentContainerStyle: {
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 40,
  },
})`
  flex: 1;
`;

export const SectionTitle = styled.Text<{isFirst: boolean}>`
  font-size: 14px;
  font-weight: 500;
  color: #000000;
  margin-top: ${props => (props.isFirst ? '0px' : '32px')};
  margin-bottom: 12px;
`;

export const ListCard = styled.View`
  width: 100%;
  background-color: #ffffff;
  border-width: 1px;
  border-color: #e8e8e8;
  border-radius: 8px;
  overflow: hidden;
`;

export const DeviceRow = styled.TouchableOpacity<{isLast: boolean}>`
  flex-direction: row;
  align-items: center;
  padding: 18px 16px;
  border-bottom-width: ${props => (props.isLast ? '0px' : '1px')};
  border-bottom-color: #dadada;
`;

export const DeviceIconWrapper = styled.View`
  width: 28px;
  height: 28px;
  justify-content: center;
  align-items: center;
  margin-right: 16px;
`;

export const DeviceTextCol = styled.View`
  flex: 1;
`;

export const DeviceName = styled.Text`
  font-size: 16px;
  font-weight: 500;
  color: #000000;
  margin-bottom: 4px;
`;

export const DeviceDesc = styled.Text`
  font-size: 12px;
  font-weight: 200;
  color: #000000;
`;

export const DeviceRightCol = styled.View`
  align-items: flex-end;
`;

export const CurrentBadge = styled.View`
  background-color: #ffe8d6;
  padding: 4px 8px;
  border-radius: 12px;
`;

export const CurrentBadgeText = styled.Text`
  font-size: 10px;
  font-weight: 600;
  color: #ff8933;
`;

export const TimeText = styled.Text`
  font-size: 12px;
  font-weight: 200;
  color: #000000;
  margin-top: 4px;
`;

export const LogoutButton = styled.TouchableOpacity`
  width: 100%;
  height: 47px;
  background-color: #ff8933;
  border-radius: 8px;
  justify-content: center;
  align-items: center;
  margin-top: 32px;
`;

export const LogoutButtonText = styled.Text`
  font-size: 18px;
  font-weight: 600;
  color: #ffffff;
`;
