import React, { useRef, useEffect } from 'react';
import {Animated, type ImageSourcePropType} from 'react-native';
import { Svg, Path } from 'react-native-svg';
import type {BottomTabBarProps} from '@react-navigation/bottom-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import type {MainTabParamList} from '../../types/navigation';
import {
  Container,
  AnimatedSvgContainer,
  TabRow,
  TabItem,
  AnimatedIconWrapper,
  AnimatedCircleWrapper,
  Circle,
  IconImage,
  SCREEN_WIDTH,
  TAB_WIDTH,
  BAR_HEIGHT,
} from './Footer.styles';

interface TabItemConfig {
  name: keyof MainTabParamList;
  icon: ImageSourcePropType;
}

interface CurvedBarProps {
  bottomInset: number;
  tabTranslateX: Animated.AnimatedInterpolation<number>;
  tabScaleX: Animated.AnimatedInterpolation<number>;
}

const TABS: TabItemConfig[] = [
  { name: 'Home', icon: require('../../assets/icons/home.png') },
  { name: 'Timeline', icon: require('../../assets/icons/timeline.png') },
  { name: 'MemoEditor', icon: require('../../assets/icons/memo.png') },
  { name: 'TeamSpace', icon: require('../../assets/icons/teamspace.png') },
  { name: 'MyPage', icon: require('../../assets/icons/mypage.png') },
];

function CurvedBar({
  bottomInset,
  tabTranslateX,
  tabScaleX,
}: CurvedBarProps) {
  const totalHeight = BAR_HEIGHT + bottomInset;
  const curveWidth = 80;
  const curveDepth = 30;
  const bgWidth = SCREEN_WIDTH * 4;

  const path = `
    M -${bgWidth / 2} 0
    L ${-curveWidth / 2} 0
    C ${-curveWidth / 4} 0, ${-curveWidth / 4} ${curveDepth}, 0 ${curveDepth}
    C ${curveWidth / 4} ${curveDepth}, ${curveWidth / 4} 0, ${curveWidth / 2} 0
    L ${bgWidth / 2} 0
    L ${bgWidth / 2} ${totalHeight}
    L -${bgWidth / 2} ${totalHeight}
    Z
  `;

  return (
    <AnimatedSvgContainer
      style={{
        width: bgWidth,
        left: -bgWidth / 2,
        transform: [
          { translateX: tabTranslateX },
          { scaleX: tabScaleX }
        ]
      }}
    >
      <Svg
        width={bgWidth}
        height={totalHeight}
        viewBox={`${-bgWidth / 2} 0 ${bgWidth} ${totalHeight}`}
      >
        <Path d={path} fill="white" />
      </Svg>
    </AnimatedSvgContainer>
  );
}

export default function Footer({state, navigation}: BottomTabBarProps) {
  const insets = useSafeAreaInsets();
  const animatedValue = useRef(new Animated.Value(state.index)).current;

  useEffect(() => {
    Animated.spring(animatedValue, {
      toValue: state.index,
      useNativeDriver: false,
      tension: 100,
      friction: 10,
    }).start();
  }, [state.index, animatedValue]);

  const tabTranslateX = animatedValue.interpolate({
    inputRange: [0, 1, 2, 3, 4],
    outputRange: [
      TAB_WIDTH / 2,
      TAB_WIDTH * 1.5,
      TAB_WIDTH * 2.5,
      TAB_WIDTH * 3.5,
      TAB_WIDTH * 4.5,
    ],
  });

  const tabScaleX = animatedValue.interpolate({
    inputRange: [0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4],
    outputRange: [1, 1.3, 1, 1.3, 1, 1.3, 1, 1.3, 1],
    extrapolate: 'clamp',
  });

  return (
    <Container barHeight={BAR_HEIGHT} bottomInset={insets.bottom}>
      <CurvedBar
        bottomInset={insets.bottom}
        tabTranslateX={tabTranslateX}
        tabScaleX={tabScaleX}
      />
      
      <AnimatedCircleWrapper style={{ transform: [{ translateX: tabTranslateX }] }}>
        <Circle />
      </AnimatedCircleWrapper>

      <TabRow>
        {TABS.map((tab, index) => {
          const isFocused = state.index === index;
          const translateY = animatedValue.interpolate({
            inputRange: [index - 1, index, index + 1],
            outputRange: [0, -20, 0],
            extrapolate: 'clamp',
          });

          return (
            <TabItem
              key={tab.name}
              onPress={() => navigation.navigate(tab.name)}
              activeOpacity={1}
            >
              <AnimatedIconWrapper style={{ transform: [{ translateY }] }}>
                <IconImage
                  source={tab.icon}
                  tintColor={isFocused ? '#FF8933' : '#BBBBBB'} 
                />
              </AnimatedIconWrapper>
            </TabItem>
          );
        })}
      </TabRow>
    </Container>
  );
}
