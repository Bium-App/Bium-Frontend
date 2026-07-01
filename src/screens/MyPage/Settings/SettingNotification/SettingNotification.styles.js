import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background-color: #FFFFFF;
`;

export const Content = styled.View`
  padding-horizontal: 32px; 
  padding-top: 24px;      
`;

export const RowItem = styled.View`
  flex-direction: row;        
  justify-content: space-between; 
  align-items: center;        
  padding-vertical: 16px;     
`;

export const RowText = styled.Text`
  font-size: 16px;
  color: #000000;
  font-weight: 200; /* 400 -> 200 수정 */
`;