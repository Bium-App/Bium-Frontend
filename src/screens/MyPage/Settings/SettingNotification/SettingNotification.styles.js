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

/* --- 👇 여기부터 방금 전 만든 커스텀 토글 스타일이 추가되었습니다 👇 --- */

/* 💡 완벽한 원형을 유지하는 커스텀 토글 스위치 (배경 부분) */
export const CustomToggle = styled.TouchableOpacity`
  width: 52px;
  height: 30px;
  border-radius: 15px; /* 높이의 절반을 주어 완벽하게 둥근 캡슐 형태로 만듦 */
  background-color: ${props => (props.isOn ? '#FF8933' : '#E8E8E8')}; /* 켜지면 주황색, 꺼지면 회색 */
  justify-content: center;
  padding: 2px; /* 동그라미가 바깥 테두리를 뚫고 나가지 않도록 안쪽 여백 부여 */
`;

/* 💡 토글 스위치 안의 흰색 동그라미 (타원형 찌그러짐 방지) */
export const ToggleCircle = styled.View`
  width: 26px;
  height: 26px;
  border-radius: 13px; /* 가로세로 똑같이 맞추고 절반을 깎아 완벽한 원형 생성 */
  background-color: #FFFFFF;
  
  /* 상태(isOn)에 따라 동그라미를 왼쪽(꺼짐) 또는 오른쪽(켜짐)으로 정렬 */
  align-self: ${props => (props.isOn ? 'flex-end' : 'flex-start')};
  
  /* 시각적 입체감을 주기 위한 그림자 효과 */
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.1;
  shadow-radius: 2px;
  elevation: 2; /* 안드로이드용 그림자 */
`;