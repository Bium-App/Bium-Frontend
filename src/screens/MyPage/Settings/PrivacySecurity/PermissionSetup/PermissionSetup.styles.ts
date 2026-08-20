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

/* 💡 [정렬 핵심] 아이콘을 감싸는 박스의 크기를 28px로 넉넉하게 고정!
   아이콘마다 크기가 조금씩 달라도, 이 박스 안에 정중앙 배치되어
   우측의 텍스트 시작점이 완벽한 일직선으로 맞춰집니다. */
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
