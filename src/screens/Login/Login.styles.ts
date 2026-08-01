import styled from 'styled-components/native';
import { Animated } from 'react-native';

export const Container = styled.View`
  flex: 1;
  background-color: #FFFFFF;
`;

export const HeaderDivider = styled.View`
  width: 100%;
  height: 1px;
  background-color: #EEEEEE;
`;

export const ScrollContent = styled.ScrollView.attrs({
  contentContainerStyle: {
    paddingHorizontal: 24,
    paddingTop: 0,
    paddingBottom: 40,
  },
})``;

export const GreetingText = styled.Text`
  font-size: 24px;
  font-weight: 200; 
  color: #FF8933;
  margin-top: 80px;
  margin-bottom: 20px;
  text-align: left;
  align-self: flex-start;
`;

export const InputWrapper = styled.View`
  width: 100%;
  margin-bottom: 16px;
`;

export const Input = styled.TextInput`
  height: 52px;
  border-width: 1px;
  border-color: #AAAAAA;
  border-radius: 8px;
  padding-horizontal: 16px;
  font-size: 15px;
  color: #000000;
  background-color: #FFFFFF;
`;

export const AnimatedButtonContainer = styled(Animated.View)`
  width: 100%;
  height: 52px;
  border-width: 1.5px;
  border-color: #FF8933;
  border-radius: 8px;
  margin-top: 16px;
  margin-bottom: 40px;
  overflow: hidden;
`;

export const LoginButtonTouch = styled.TouchableOpacity`
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

export const AnimatedButtonText = styled(Animated.Text)`
  font-size: 16px;
  font-weight: 700;
`;

export const LinksRow = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-bottom: 60px;
`;

export const LinkText = styled.Text`
  font-size: 14px;
  color: #000000;
  margin-horizontal: 15px;
`;

export const LinkDivider = styled.Text`
  color: #BBBBBB;
  font-size: 12px;
`;

export const DividerRow = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 24px;
`;

export const DividerLine = styled.View`
  flex: 1;
  height: 1px;
  background-color: #EEEEEE;
`;

export const DividerText = styled.Text`
  font-size: 12px;
  color: #000000;
  margin-horizontal: 16px;
`;

export const SnsRow = styled.View`
  flex-direction: row;
  justify-content: center;
  gap: 16px;
`;

export const SnsButton = styled.TouchableOpacity`
  width: 48px;
  height: 48px;
  border-radius: 24px;
  justify-content: center;
  align-items: center;
`;
