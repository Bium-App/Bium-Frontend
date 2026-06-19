import styled from 'styled-components/native';
import { Dimensions, Animated, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export const Container = styled(SafeAreaView)`
  flex: 1;
  background-color: #FFFFFF;
`;

export const TopBar = styled.View`
  position: absolute;
  top: ${Platform.OS === 'ios' ? '60px' : '30px'};
  right: 24px;
  z-index: 10;
`;

export const SkipButton = styled.TouchableOpacity`
  padding: 8px;
`;

export const SkipText = styled.Text`
  font-size: 16px;
  font-weight: 600;
  color: #FF8933;
`;

export const ListContainer = styled(Animated.FlatList).attrs({
  contentContainerStyle: {
    flexGrow: 1,
  },
})`
  flex: 1;
`;

export const SlideContainer = styled.View`
  width: ${SCREEN_WIDTH}px;
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const AnimatedIconWrapper = styled(Animated.View)`
  margin-bottom: 2px;
  align-items: center;
  justify-content: center;
  width: 280px;
  height: 280px;
`;

export const ParticleWrapper = styled(Animated.View)`
  position: absolute;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
  z-index: 5;
`;

export const AnimatedTitleText = styled(Animated.Text)`
  font-size: 30px;
  font-weight: 700;
  margin-bottom: 40px;
  text-align: center;
`;

export const AnimatedSubTitleText = styled(Animated.Text)`
  font-size: 24px;
  font-weight: 400;
  color: #BBBBBB;
  text-align: center;
  line-height: 34px;
`;

export const BottomContainer = styled.View`
  padding-horizontal: 24px;
  padding-bottom: 40px;
  background-color: #FFFFFF;
`;

export const DotRow = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-bottom: 32px;
`;

export const AnimatedDot = styled(Animated.View)`
  height: 6px;
  border-radius: 3px;
  margin-horizontal: 4px;
`;

export const StartButton = styled.TouchableOpacity`
  width: 100%;
  height: 56px;
  background-color: #FF8933;
  border-radius: 12px;
  justify-content: center;
  align-items: center;
`;

export const StartButtonText = styled.Text`
  font-size: 18px;
  font-weight: 700;
  color: #FFFFFF;
`;