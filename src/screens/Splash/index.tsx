import React, { useState, useRef, useEffect } from 'react';
import type {RootScreenProps} from '../../types/navigation';
import {
  StatusBar,
  Animated,
  Dimensions,
  Easing,
  FlatList,
  type ViewToken,
} from 'react-native';
import type {FunctionComponent} from 'react';
import type {SvgProps} from 'react-native-svg';

import Logo from '../../assets/icons/logo.svg';
import OnboardingFire from '../../assets/icons/onboarding_fire.svg';
import OnboardingIce from '../../assets/icons/onboarding_ice.svg';
import OnboardingTeam from '../../assets/icons/onboarding_team.svg';

import FireGradation from '../../assets/icons/Fire_gradation.svg';
import IceGradation from '../../assets/icons/Ice_gradation.svg';

import {
  Container,
  TopBar,
  SkipButton,
  SkipText,
  ListContainer,
  SlideContainer,
  AnimatedIconWrapper,
  ParticleWrapper,
  AnimatedTitleText,
  AnimatedSubTitleText,
  BottomContainer,
  DotRow,
  AnimatedDot,
  StartButton,
  StartButtonText
} from './Splash.styles';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export interface SplashItem {
  id: string;
  title: string;
  titleColor: string;
  subtitle: string;
  Icon: FunctionComponent<SvgProps>;
}

const SPLASH_DATA: SplashItem[] = [
  {
    id: '1',
    title: '딸깍',
    titleColor: '#FF8933', 
    subtitle: '당신의 기록은\n어떤 온도인가요?',
    Icon: Logo,
  },
  {
    id: '2',
    title: '불 메모',
    titleColor: '#FF8933', 
    subtitle: '시간이 지나면\n메모가 사라집니다.',
    Icon: OnboardingFire,
  },
  {
    id: '3',
    title: '얼음 메모',
    titleColor: '#7CC4FF', 
    subtitle: '중요한 기록은\n얼려서 보관하세요.',
    Icon: OnboardingIce,
  },
  {
    id: '4',
    title: '팀스페이스',
    titleColor: '#000000', 
    subtitle: '함께 쓰고\n함께 기록하세요.',
    Icon: OnboardingTeam,
  }
];

export default function Splash({navigation}: RootScreenProps<'Splash'>) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList<SplashItem>>(null);
  const scrollX = useRef(new Animated.Value(0)).current;

  const contentAnim = useRef({
    scale: new Animated.Value(0.85),
    opacity: new Animated.Value(0),
    textY: new Animated.Value(10)
  }).current;

  const fireAnim = useRef(new Animated.Value(0)).current;
  const iceAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    let anim: Animated.CompositeAnimation | null = null;
    
    const animateContent = () => {
      contentAnim.scale.setValue(0.85);
      contentAnim.opacity.setValue(0);
      contentAnim.textY.setValue(10);

      anim = Animated.parallel([
        Animated.spring(contentAnim.scale, {
          toValue: 1,
          friction: 7,
          useNativeDriver: true
        }),
        Animated.timing(contentAnim.opacity, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true
        }),
        Animated.spring(contentAnim.textY, {
          toValue: 0,
          friction: 7,
          useNativeDriver: true
        })
      ]);
      
      anim.start();
    };

    animateContent();

    return () => {
      if (anim) {
        anim.stop();
      }
    };
  }, [currentIndex, contentAnim]);

  useEffect(() => {
    const fireLoop = Animated.loop(
      Animated.timing(fireAnim, {
        toValue: 1,
        duration: 3000,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: true,
      })
    );
    fireLoop.start();

    const iceLoop = Animated.loop(
      Animated.timing(iceAnim, {
        toValue: 1,
        duration: 5000,
        easing: Easing.inOut(Easing.sin),
        useNativeDriver: true,
      })
    );
    iceLoop.start();

    return () => {
      fireLoop.stop();
      iceLoop.stop();
    };
  }, [fireAnim, iceAnim]);

  const onViewableItemsChanged = useRef(
    ({viewableItems}: {viewableItems: ViewToken<SplashItem>[]}) => {
    if (viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index ?? 0);
    }
    },
  ).current;

  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 50,
  }).current;

  const handleNext = () => {
    if (currentIndex < SPLASH_DATA.length - 1) {
      flatListRef.current?.scrollToIndex({
        index: currentIndex + 1,
        animated: true,
      });
    } else {
      navigation.navigate('SignUp');
    }
  };

  const renderItem = ({item}: {item: SplashItem}) => {
    const { Icon } = item;

    const fireTranslateY = fireAnim.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [10, -15, 10], 
    });
    const fireOpacity = fireAnim.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [0.5, 1, 0.5], 
    });

    const iceTranslateY = iceAnim.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [-15, 15, -15], 
    });
    const iceTranslateX = iceAnim.interpolate({
      inputRange: [0, 0.25, 0.75, 1],
      outputRange: [0, -10, 10, 0], 
    });

    return (
      <SlideContainer>
        <AnimatedIconWrapper
          style={{
            opacity: contentAnim.opacity,
            transform: [{ scale: contentAnim.scale }]
          }}
        >
          {item.id === '2' && (
            <ParticleWrapper
              style={{
                transform: [{ translateY: fireTranslateY }],
                opacity: fireOpacity,
              }}
            >
              <FireGradation width={280} height={280} />
            </ParticleWrapper>
          )}

          {item.id === '3' && (
            <ParticleWrapper
              style={{
                transform: [
                  { translateY: iceTranslateY },
                  { translateX: iceTranslateX },
                ],
              }}
            >
              <IceGradation width={280} height={280} />
            </ParticleWrapper>
          )}

          <Icon width={250} height={250} preserveAspectRatio="xMidYMid meet" />
        </AnimatedIconWrapper>
        
        <AnimatedTitleText
          style={{
            opacity: contentAnim.opacity,
            transform: [{ translateY: contentAnim.textY }],
            color: item.titleColor
          }}
        >
          {item.title}
        </AnimatedTitleText>
        
        <AnimatedSubTitleText
          style={{
            opacity: contentAnim.opacity,
            transform: [{ translateY: contentAnim.textY }]
          }}
        >
          {item.subtitle}
        </AnimatedSubTitleText>
      </SlideContainer>
    );
  };

  return (
    <Container>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" /> 
      
      <TopBar>
        <SkipButton onPress={() => navigation.navigate('Login')}>
          <SkipText>로그인</SkipText>
        </SkipButton>
      </TopBar>
      
      <ListContainer
        ref={flatListRef}
        data={SPLASH_DATA}
        renderItem={renderItem}
        keyExtractor={(item: SplashItem) => item.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        bounces={false}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
      />

      <BottomContainer>
        <DotRow>
          {SPLASH_DATA.map((_, index) => {
            const inputRange = [
              (index - 1) * SCREEN_WIDTH,
              index * SCREEN_WIDTH,
              (index + 1) * SCREEN_WIDTH
            ];

            const dotWidth = scrollX.interpolate({
              inputRange,
              outputRange: [6, 24, 6],
              extrapolate: 'clamp'
            });

            const dotColor = scrollX.interpolate({
              inputRange,
              outputRange: ['#BBBBBB', '#FF8933', '#BBBBBB'], 
              extrapolate: 'clamp'
            });

            return (
              <AnimatedDot
                key={index}
                style={{
                  width: dotWidth,
                  backgroundColor: dotColor
                }}
              />
            );
          })}
        </DotRow>
        
        <StartButton onPress={handleNext}>
          <StartButtonText>오늘부터 메모앱 시작하기</StartButtonText>
        </StartButton>
      </BottomContainer>
    </Container>
  );
}
