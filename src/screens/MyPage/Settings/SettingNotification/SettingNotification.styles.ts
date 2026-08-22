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
  font-weight: 200;
`;

export const CustomToggle = styled.TouchableOpacity<{isOn: boolean}>`
  width: 52px;
  height: 30px;
  border-radius: 15px; /* 높이의 절반이라 완전한 캡슐 형태가 된다 */
  background-color: ${props => (props.isOn ? '#FF8933' : '#E8E8E8')};
  justify-content: center;
  padding: 2px; /* 동그라미가 바깥 테두리를 벗어나지 않도록 여백을 둔다 */
`;

/* width/height를 같게 하고 절반을 반지름으로 잡아 타원이 아닌 정원이 되도록 한다. */
export const ToggleCircle = styled.View<{isOn: boolean}>`
  width: 26px;
  height: 26px;
  border-radius: 13px;
  background-color: #FFFFFF;

  /* isOn 상태에 따라 동그라미를 왼쪽(꺼짐)/오른쪽(켜짐)으로 이동시켜 토글처럼 보이게 한다. */
  align-self: ${props => (props.isOn ? 'flex-end' : 'flex-start')};

  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.1;
  shadow-radius: 2px;
  elevation: 2; /* 안드로이드용 그림자 */
`;
