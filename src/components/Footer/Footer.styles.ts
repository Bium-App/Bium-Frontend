import styled from 'styled-components/native';
import { Dimensions, Animated } from 'react-native';

export const SCREEN_WIDTH = Dimensions.get('window').width;
export const TAB_WIDTH = SCREEN_WIDTH / 5;
export const BAR_HEIGHT = 50; 

export const Container = styled.View<{
  barHeight: number;
  bottomInset: number;
}>`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: transparent;
  z-index: 999;
  height: ${({ barHeight, bottomInset }) => barHeight + bottomInset}px;
`;

export const AnimatedSvgContainer = styled(Animated.View)`
  position: absolute;
  top: 0;
  left: 0;
  shadow-color: #6B6EA1;
  shadow-offset: 0px -2px;
  shadow-opacity: 0.25;
  shadow-radius: 6px;
  elevation: 5;
`;

export const TabRow = styled.View`
  flex-direction: row;
  height: ${BAR_HEIGHT}px;
  align-items: center;
`;

export const TabItem = styled.TouchableOpacity`
  width: ${TAB_WIDTH}px;
  align-items: center;
  justify-content: center;
`;

export const AnimatedIconWrapper = styled(Animated.View)`
  width: 56px;
  height: 56px;
  align-items: center;
  justify-content: center;
`;

export const AnimatedCircleWrapper = styled(Animated.View)`
  position: absolute;
  left: -${TAB_WIDTH / 2}px;
  width: ${TAB_WIDTH}px;
  height: ${BAR_HEIGHT}px;
  align-items: center;
  justify-content: center;
  top: -20px;
`;

export const Circle = styled.View`
  width: 56px;
  height: 56px;
  border-radius: 28px;
  background-color: #FFFFFF;
  shadow-color: #6B6EA1;
  shadow-offset: 0px 4px;
  shadow-opacity: 0.25;
  shadow-radius: 6px;
  elevation: 5;
`;

export const IconImage = styled.Image<{tintColor: string}>`
  width: 24px;
  height: 24px;
  resize-mode: contain;
  tint-color: ${({ tintColor }) => tintColor};
`;
