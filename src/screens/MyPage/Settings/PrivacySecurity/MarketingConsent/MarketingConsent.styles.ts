import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1; 
  background-color: #FFFFFF; 
`;

export const MainContainer = styled.View`
  flex: 1;
  padding: 0px 24px 24px 24px; 
`;

export const TopBanner = styled.View`
  position: relative; 
  margin-top: 24px; 
  margin-bottom: 28px;
`;

export const TopBannerTextCol = styled.View`
  z-index: 2; 
  width: 100%; 
`;

export const BannerText = styled.Text`
  font-size: 12px; 
  font-weight: 400;
  color: #000000;
  line-height: 20px;
  letter-spacing: -0.3px; 
  margin-bottom: 16px; 
`;

export const BannerSubText = styled.Text`
  font-size: 12px;
  font-weight: 400;
  color: #000000;
  line-height: 20px;
  letter-spacing: -0.3px;
`;

export const HighlightText = styled.Text`
  font-weight: 700; 
  color: #FF8933; 
`;

export const IllustrationWrapper = styled.View`
  position: absolute; 
  right: -16px; 
  top: -18px; 
  width: 140px;  
  height: 140px;
  z-index: 1;
  pointer-events: none; 
`;

export const BannerImage = styled.Image`
  width: 100%;
  height: 100%;
`;

export const AllConsentCard = styled.View`
  flex-direction: row; 
  justify-content: space-between; 
  align-items: center; 
  padding: 12px 16px; 
  border-width: 1px;
  border-color: #E8E8E8;
  border-radius: 8px; 
  margin-bottom: 24px; 
`;

export const AllConsentText = styled.Text`
  font-size: 16px; 
  font-weight: 500;
  color: #000000;
`;

export const Section = styled.View`
  margin-bottom: 20px; 
`;

export const SectionTitle = styled.Text`
  font-size: 14px; 
  font-weight: 500;
  color: #6E6E6E;
  margin-bottom: 12px; 
`;

export const ListCard = styled.View`
  width: 100%;
  border-width: 1px;
  border-color: #E8E8E8;
  border-radius: 8px;
  background-color: #FFFFFF;
`;

export const ListItem = styled.TouchableOpacity<{isLast?: boolean}>`
  flex-direction: row;
  align-items: center;
  height: 48px; 
  padding: 0px 16px; 
  border-bottom-width: ${props => (props.isLast ? '0px' : '1px')}; 
  border-bottom-color: #FFFFFF;
`;

export const IconWrapper = styled.View<{type: 'border' | 'bg' | 'filled'}>`
  width: 32px; 
  height: 32px;
  border-radius: 8px;
  justify-content: center;
  align-items: center;
  margin-right: 12px; 
  background-color: ${props => props.type === 'border' ? '#FFFFFF' : '#FFE8D6'};
  border-width: ${props => props.type === 'border' ? '1px' : '0px'};
  border-color: ${props => props.type === 'border' ? '#FFE8D6' : 'transparent'};
`;

export const ItemTextCol = styled.View`
  flex: 1; 
  padding-right: 8px; 
  justify-content: center;
`;

export const ItemTitle = styled.Text`
  font-size: 13px; 
  font-weight: 500;
  color: #000000;
  margin-bottom: 2px;
`;

export const ItemDesc = styled.Text`
  font-size: 10px; 
  font-weight: 200;
  color: #000000;
`;

export const CheckboxSquare = styled.View<{isChecked: boolean}>`
  width: 20px; 
  height: 20px;
  border-radius: 3px;
  background-color: ${props => (props.isChecked ? '#FF8933' : '#FFFFFF')};
  border-width: ${props => (props.isChecked ? '0px' : '1px')};
  border-color: ${props => (props.isChecked ? 'transparent' : '#AAAAAA')}; 
  justify-content: center;
  align-items: center;
`;

export const SubmitButton = styled.TouchableOpacity`
  width: 100%;
  height: 52px; 
  background-color: #FF8933;
  border-radius: 8px;
  justify-content: center;
  align-items: center;
  margin-top: 24px; 
`;

export const SubmitButtonText = styled.Text`
  font-size: 18px;
  font-weight: 600;
  color: #FFFFFF;
`;

/* --- 👇 여기서부터 전체 동의용 커스텀 토글 스타일이 추가되었습니다 👇 --- */

/* 💡 완벽한 원형을 유지하는 커스텀 토글 스위치 배경 */
export const CustomToggle = styled.TouchableOpacity<{isOn: boolean}>`
  width: 52px;
  height: 30px;
  border-radius: 15px; /* 높이의 절반으로 완전한 둥근 캡슐 형태 마감 */
  background-color: ${props => (props.isOn ? '#FF8933' : '#BBBBBB')}; /* 기존 회색 색상 반영 */
  justify-content: center;
  padding: 2px; /* 원형 오브젝트가 테두리를 뚫고 나가지 않도록 패딩 부여 */
`;

/* 💡 토글 스위치 내부의 찌러짐 없는 완벽한 흰색 동그라미 */
export const ToggleCircle = styled.View<{isOn: boolean}>`
  width: 26px;
  height: 26px;
  border-radius: 13px; /* 가로세로 똑같이 맞추고 절반을 깎아 완벽한 원 구현 */
  background-color: #FFFFFF;
  align-self: ${props => (props.isOn ? 'flex-end' : 'flex-start')};
  
  /* 미세한 입체감을 주는 그림자 효과 */
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.1;
  shadow-radius: 2px;
  elevation: 2;
`;
