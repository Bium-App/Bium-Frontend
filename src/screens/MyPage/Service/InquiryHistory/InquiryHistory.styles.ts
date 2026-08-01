import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background-color: #ffffff;
`;

export const HeaderBackButton = styled.TouchableOpacity``;

export const ContentScroll = styled.ScrollView.attrs({
  contentContainerStyle: {
    padding: 20,
    paddingBottom: 40,
  },
})``;

export const EmptyText = styled.Text`
  margin-top: 40px;
  color: #999999;
  text-align: center;
`;

export const InquiryCard = styled.View`
  margin-bottom: 12px;
  padding: 16px;
  border-width: 1px;
  border-color: #e8e8e8;
  border-radius: 12px;
`;

export const InquiryHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 10px;
`;

export const InquiryTypeText = styled.Text`
  color: #ff8933;
  font-weight: 600;
`;

export const InquiryStatusText = styled.Text<{isAnswered: boolean}>`
  color: ${({ isAnswered }) => (isAnswered ? '#248A3D' : '#999999')};
`;

export const InquiryTitle = styled.Text`
  margin-bottom: 8px;
  font-size: 16px;
  font-weight: 600;
`;

export const InquiryContent = styled.Text`
  color: #555555;
  line-height: 20px;
`;

export const InquiryDate = styled.Text`
  margin-top: 10px;
  color: #999999;
  font-size: 12px;
`;

export const ResponseBox = styled.View`
  margin-top: 12px;
  padding: 12px;
  background-color: #fff4ec;
  border-radius: 8px;
`;

export const ResponseTitle = styled.Text`
  margin-bottom: 4px;
  font-weight: 600;
`;

export const ResponseText = styled.Text`
  color: #555555;
  line-height: 20px;
`;
