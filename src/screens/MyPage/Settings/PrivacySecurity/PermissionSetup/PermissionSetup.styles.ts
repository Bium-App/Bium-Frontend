import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1; 
  background-color: #FFFFFF; 
`;

export const MainContainer = styled.View`
  flex: 1;
  padding: 32px 24px 0px 24px; 
`;

export const PermissionCard = styled.View`
  width: 100%;
  border-width: 1px;
  border-color: #E8E8E8; 
  border-radius: 12px;
  padding: 24px 20px;
  background-color: #FFFFFF;
`;

export const PermissionRow = styled.View<{isLast?: boolean}>`
  flex-direction: row; 
  justify-content: space-between;
  align-items: center; 
  margin-bottom: ${props => (props.isLast ? '0px' : '24px')}; 
`;

export const RowLeft = styled.View`
  flex-direction: row; 
  align-items: center;
`;

/* 아이콘마다 실제 크기가 달라도 고정 크기 박스 중앙에 배치해, 옆 텍스트의
   시작 위치가 항목마다 어긋나지 않도록 맞춘다. */
export const IconWrapper = styled.View`
  width: 28px; 
  height: 28px;
  justify-content: center;
  align-items: center;
  margin-right: 12px; 
`;

export const PermissionText = styled.Text`
  font-size: 13px;
  font-weight: 500;
  color: #000000;
`;

export const HelperText = styled.Text`
  font-size: 12px;
  color: #919191;
  line-height: 18px;
  margin-bottom: 20px;
`;

export const SettingsLinkRow = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  gap: 2px;
`;

export const SettingsLinkText = styled.Text`
  font-size: 12px;
  font-weight: 500;
  color: #ff8933;
`;
