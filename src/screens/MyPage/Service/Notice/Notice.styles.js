import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background-color: #FFFFFF;
`;

export const NoticeList = styled.FlatList.attrs({
  contentContainerStyle: {
    paddingBottom: 40,
  }
})`
  flex: 1;
`;

export const NoticeItem = styled.TouchableOpacity`
  padding-vertical: 20px;
  padding-horizontal: 32px;
  border-bottom-width: 0.3px;
  border-bottom-color: #999999;
`;

export const NoticeTitle = styled.Text`
  font-size: 15px;
  color: #000000;
  font-weight: 400;
  margin-bottom: 6px;
`;

export const NoticeDate = styled.Text`
  font-size: 11px;
  color: #6E6E6E;
  font-weight: 200;
`;