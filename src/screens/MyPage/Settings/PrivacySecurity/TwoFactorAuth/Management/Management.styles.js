import styled from 'styled-components/native';
import { SafeAreaView } from 'react-native-safe-area-context';

export const Container = styled.View`
  flex: 1;
  background-color: #FFFFFF;
`;

export const MainContainer = styled(SafeAreaView)`
  flex: 1;
`;

export const ScrollWrapper = styled.ScrollView.attrs({
  contentContainerStyle: {
    paddingHorizontal: 24, 
    paddingBottom: 40,     
  }
})`
  flex: 1;
`;

export const TopIconWrapper = styled.View`
  align-items: center; 
  margin-top: 32px;    
  margin-bottom: 32px; 
`;

export const IconImageWrapper = styled.View`
  width: 130px;
  height: 130px;
  justify-content: center;
  align-items: center;
`;

export const ToggleCard = styled.View`
  width: 100%;
  border-width: 1px;
  border-color: #FFFFFF; /*EEEEEE -> FFFFFF*/
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 32px; 
  background-color: #FFFFFF;
`;

export const ToggleRow = styled.View`
  flex-direction: row;
  justify-content: space-between; 
  align-items: center;
  margin-bottom: 12px;
`;

export const ToggleTitle = styled.Text`
  font-size: 16px;
  font-weight: 500;
  color: #000000;
`;

export const ToggleDesc = styled.Text`
  font-size: 14px;
  font-weight:200;
  color: #000000;
  line-height: 20px; 
`;

export const CustomToggle = styled.TouchableOpacity`
  width: 52px;
  height: 30px;
  border-radius: 15px; 
  background-color: ${props => (props.isOn ? '#FF8933' : '#BBBBBB')}; 
  justify-content: center;
  padding: 2px; 
`;

export const ToggleCircle = styled.View`
  width: 26px;
  height: 26px;
  border-radius: 13px; 
  background-color: #FFFFFF;
  align-self: ${props => (props.isOn ? 'flex-end' : 'flex-start')};
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.1;
  shadow-radius: 2px;
  elevation: 2; 
`;

export const SectionLabel = styled.Text`
  font-size: 14px;
  font-weight: 500;
  color: #000000;
  margin-bottom: 12px;
`;

export const MethodsCard = styled.View`
  width: 100%;
  border-width: 1px;
  border-color: #E8E8E8; /* EEEEEE -> E8E8E8 */
  border-radius: 12px;
  background-color: #FFFFFF;
`;

export const MethodItem = styled.TouchableOpacity`
  flex-direction: row; 
  align-items: center; 
  padding: 16px;
`;

export const Divider = styled.View`
  width: 100%;
  height: 1px;
  background-color: #EEEEEE;
`;

export const RadioOuter = styled.View`
  width: 20px;
  height: 20px;
  border-radius: 10px;
  border-width: ${props => (props.isSelected ? '5px' : '1px')};
  border-color: ${props => (props.isSelected ? '#FF8933' : '#E8E8E8')};
  justify-content: center;
  align-items: center;
`;

export const RadioInner = styled.View`
  width: 10px;
  height: 10px;
  border-radius: 5px;
  background-color: #FFFFFF;
`;

export const MethodTextContent = styled.View`
  flex: 1; 
  margin-left: 12px; /
`;

export const MethodTitle = styled.Text`
  font-size: 16px;
  font-weight: 500;
  color: #000000;
`;

export const MethodValueRow = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 4px; 
`;

export const MethodValue = styled.Text`
  font-size: 14px;
  font-weight: 200;
  color: #000000;
`;

export const IconContainer = styled.View`
  width: 24px;
  align-items: center;
  justify-content: center;
  margin-left: 16px; 
`;
