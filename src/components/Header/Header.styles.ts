import styled from 'styled-components/native';

export const Container = styled.View<{paddingTop: number}>`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding-top: ${({ paddingTop }) => paddingTop || 0}px;
  padding-horizontal: 16px;
  height: ${({ paddingTop }) => (paddingTop || 0) + 56}px;
  background-color: #FFFFFF;
`;

export const LeftSection = styled.View`
  flex: 1;
  align-items: flex-start;
  justify-content: center;
`;

export const CenterSection = styled.View`
  flex: 2;
  align-items: center;
  justify-content: center;
`;

export const RightSection = styled.View`
  flex: 1;
  align-items: flex-end;
  justify-content: center;
`;

export const TitleText = styled.Text`
  font-size: 18px;
  font-weight: 600;
  color: #000000;
`;
