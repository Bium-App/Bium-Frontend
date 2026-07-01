import styled from 'styled-components/native';

// 화면 전체를 감싸는 하얀색 바탕 컨테이너
export const Container = styled.View`
  flex: 1; 
  background-color: #FFFFFF; 
`;

// 중앙 내용물들을 위에서부터 쌓아주는 영역
export const Content = styled.View`
  flex: 1;                     
  justify-content: flex-start; 
  align-items: center;         
  padding-horizontal: 32px;    
  /* 💡 [위치 조정] 기존 80px에서 40px로 반 토막 내어, 시안처럼 전체 덩어리를 윗선으로 확 끌어올렸습니다. */
  padding-top: 40px;           
`;

// 변경해 주신 아주 예쁜 사이즈와 컬러의 원형 배경
export const IconBackground = styled.View`
  width: 160px;     
  height: 160px;   
  border-radius: 80px;       
  background-color: #FEF7F3; 
  justify-content: center;   
  align-items: center;       
  margin-bottom: 20px;
  position: relative;   
`;

// 메인 타이틀
export const Title = styled.Text`
  font-size: 18px;    
  font-weight: 500;   
  color: #000000;     
  margin-bottom: 8px; 
`;

// 설명글
export const Description = styled.Text`
  font-size: 13px;
  color: #6E6E6E;     
  text-align: center; 
  line-height: 20px; 
`;

// 하단 고정 버튼을 담는 컨테이너
export const ButtonContainer = styled.View`
  padding-horizontal: 24px; 
  padding-bottom: 20px;     
`;

// 로그아웃 주황색 메인 버튼
export const PrimaryButton = styled.TouchableOpacity`
  width: 100%;             
  height: 52px;            
  background-color: #FF8933; 
  border-radius: 8px;      
  justify-content: center; 
  align-items: center;     
  margin-bottom: 8px;      
`;

export const PrimaryButtonText = styled.Text`
  font-size: 18px;  
  font-weight: 400; 
  color: #FFFFFF;   
`;

// 취소 하얀색 서브 버튼
export const SecondaryButton = styled.TouchableOpacity`
  width: 100%;
  height: 52px;
  background-color: #FFFFFF; 
  border-width: 1px;        
  border-color: #FF8933;     
  border-radius: 8px;        
  justify-content: center;
  align-items: center;
`;

export const SecondaryButtonText = styled.Text`
  font-size: 18px;  
  font-weight: 400; 
  color: #FF8933;            
`;