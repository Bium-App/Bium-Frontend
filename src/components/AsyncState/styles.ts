import styled from 'styled-components/native';

export const StateContainer = styled.View`
  min-height: 180px;
  padding: 32px 24px;
  align-items: center;
  justify-content: center;
`;

export const StateTitle = styled.Text`
  color: #555555;
  font-size: 15px;
  font-weight: 600;
  text-align: center;
`;

export const StateDescription = styled.Text`
  color: #aaaaaa;
  font-size: 13px;
  line-height: 19px;
  text-align: center;
  margin-top: 8px;
`;

export const RetryButton = styled.TouchableOpacity`
  margin-top: 18px;
  border-radius: 8px;
  background-color: #ff8933;
  padding: 10px 18px;
`;

export const RetryText = styled.Text`
  color: #ffffff;
  font-size: 14px;
  font-weight: 700;
`;
