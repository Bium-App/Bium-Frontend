import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background-color: #ffffff;
`;

export const ListContainer = styled.ScrollView.attrs({
  contentContainerStyle: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 40,
  },
})`
  flex: 1;
`;

export const NotificationCard = styled.TouchableOpacity`
  flex-direction: row;
  background-color: #ffffff;
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 12px;
  align-items: center;

  elevation: 1;
  shadow-color: #6b6ea1;
  shadow-offset: 0px 1px;
  shadow-opacity: 0.25;
  shadow-radius: 3px;
  border-width: 1px;
  border-color: #eeeeee;
`;

export const IconWrapper = styled.View`
  width: 48px;
  height: 48px;
  border-radius: 24px;
  background-color: ${({ type }) => (type === 'ICE' ? '#EAF3FF' : '#FFE8D6')};
  justify-content: center;
  align-items: center;
  margin-right: 12px;
`;

export const TextContent = styled.View`
  flex: 1;
`;

export const CardTitle = styled.Text`
  font-size: 16px;
  font-weight: 700;
  color: #000000;
  margin-bottom: 4px;
`;

export const CardDescription = styled.Text`
  font-size: 13px;
  color: #aaaaaa;
`;

export const RightContent = styled.View`
  align-items: flex-end;
  justify-content: space-between;
  height: 48px;
`;

export const TimeText = styled.Text`
  font-size: 12px;
  color: #bbbbbb;
`;

export const DeleteButton = styled.TouchableOpacity`
  padding: 4px;
  margin-right: -4px;
`;
