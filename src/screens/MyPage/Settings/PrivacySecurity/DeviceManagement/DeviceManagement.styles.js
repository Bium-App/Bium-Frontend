import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background-color: #FFFFFF;
`;

export const ScrollContainer = styled.ScrollView.attrs({
  contentContainerStyle: {
    paddingHorizontal: 24, 
    paddingTop: 24,        
    paddingBottom: 40,    
  }
})`
  flex: 1;
`;

export const SectionTitle = styled.Text`
  font-size: 14px;
  font-weight: 500;
  color: #000000;
  margin-top: ${props => (props.isFirst ? '0px' : '32px')}; 
  margin-bottom: 12px;
`;

export const ListCard = styled.View`
  width: 100%;
  background-color: #FFFFFF;
  border-width: 1px;
  border-color: #E8E8E8;
  border-radius: 8px;    
  overflow: hidden;      
`;

export const DeviceRow = styled.View`
  flex-direction: row;     
  align-items: center;     
  padding: 18px 16px;      
  border-bottom-width: ${props => (props.isLast ? '0px' : '1px')};
  border-bottom-color: #DADADA; 
`;

export const DeviceIconWrapper = styled.View`
  width: 28px;
  height: 28px;
  justify-content: center;
  align-items: center;
  margin-right: 16px;     
`;

export const DeviceTextCol = styled.View`
  flex: 1; 
`;

export const DeviceName = styled.Text`
  font-size: 16px;
  font-weight: 500;
  color: #000000;
  margin-bottom: 4px; 
`;

export const DeviceDesc = styled.Text`
  font-size: 12px; /* 13 -> 12 */
  font-weight: 200;
  color: #000000; 
`;

export const DeviceRightCol = styled.View`
  align-items: flex-end; 
`;

export const CurrentBadge = styled.View`
  background-color: #FFE8D6;
  padding: 4px 8px;
  border-radius: 12px;
`;

export const CurrentBadgeText = styled.Text`
  font-size: 10px;
  font-weight: 600; 
  color: #FF8933; 
`;

export const TimeText = styled.Text`
  font-size: 12px;
  font-weight: 200;
  color: #000000;
`;

export const LogoutButton = styled.TouchableOpacity`
  width: 100%;
  height: 47px;
  background-color: #FF8933; 
  border-radius: 8px;
  justify-content: center;
  align-items: center;
  margin-top: 32px; 
`;

export const LogoutButtonText = styled.Text`
  font-size: 18px;
  font-weight: 600; 
  color: #FFFFFF;
`;