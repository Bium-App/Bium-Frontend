import styled from 'styled-components/native';
import {Animated} from 'react-native';

export const Container = styled.View`
  width: 56px;
  height: 56px;
  justify-content: center;
  align-items: center;
`;

export const RingLayer = styled.View`
  position: absolute;
  top: 0px;
  left: 0px;
  width: 56px;
  height: 56px;
`;

export const TimeText = styled.Text`
  font-size: 10px;
  font-weight: 500;
  color: #000000;
  letter-spacing: 0px;
`;

export const LabelText = styled.Text`
  margin-top: 1px;
  font-size: 10px;
  font-weight: 400;
  color: #000000;
`;

export const EmberGlow = styled(Animated.View)<{
  left: number;
  top: number;
  urgent: boolean;
}>`
  position: absolute;
  left: ${({left}) => left}px;
  top: ${({top}) => top}px;
  width: 8px;
  height: 8px;
  border-radius: 4px;
  background-color: ${({urgent}) => (urgent ? '#FF4D2E' : '#FFB15C')};
  border-width: 2px;
  border-color: #ffffff;
  shadow-color: ${({urgent}) => (urgent ? '#FF3B20' : '#FF8933')};
  shadow-offset: 0px 0px;
  shadow-opacity: 0.9;
  shadow-radius: 4px;
  elevation: 4;
`;
