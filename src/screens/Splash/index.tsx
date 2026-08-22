import React, { useState, useRef, useEffect } from 'react';
import type {RootScreenProps} from '../../types/navigation';
import {
  StatusBar,
  Animated,
  Dimensions,
  Easing,
  FlatList,
  type ImageSourcePropType,
  type ViewToken,
} from 'react-native';
import type {FunctionComponent} from 'react';
import type {SvgProps} from 'react-native-svg';
import {useTranslation} from 'react-i18next';

import Logo from '../../assets/icons/logo.svg';

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
  OnboardingImage,
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
  titleKey: string;
  titleColor: string;
  subtitleKey: string;
  Icon?: FunctionComponent<SvgProps>;
  imageSource?: ImageSourcePropType;
}

const SPLASH_DATA: SplashItem[] = [
  {
    id: '1',
    titleKey: 'splash.app_name',
    titleColor: '#FF8933', 
    subtitleKey: 'splash.intro_question',
    Icon: Logo,
  },
  {
    id: '2',
    titleKey: 'splash.fire_title',
    titleColor: '#FF8933', 
    subtitleKey: 'splash.fire_subtitle',
    imageSource: require('../../assets/icons/onboarding_fire.png'),
  },
  {
    id: '3',
    titleKey: 'splash.ice_title',
    titleColor: '#7CC4FF', 
    subtitleKey: 'splash.ice_subtitle',
    imageSource: require('../../assets/icons/onboarding_ice.png'),
  },
  {
    id: '4',
    titleKey: 'splash.team_title',
    titleColor: '#000000', 
    subtitleKey: 'splash.team_subtitle',
    imageSource: require('../../assets/icons/onboarding_team.png'),
  }
];

// 로그인 전 앱 소개 온보딩 캐러셀 화면. 슬라이드를 넘기다 마지막에서 회원가입으로 이동한다.
export default function Splash({navigation}: RootScreenProps<'Splash'>) {
  const {t} = useTranslation();
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
    const {Icon, imageSource} = item;

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

          {imageSource ? (
            <OnboardingImage
              source={imageSource}
              resizeMode="contain"
            />
          ) : Icon ? (
            <Icon width={250} height={250} preserveAspectRatio="xMidYMid meet" />
          ) : null}
        </AnimatedIconWrapper>
        
        <AnimatedTitleText
          style={{
            opacity: contentAnim.opacity,
            transform: [{ translateY: contentAnim.textY }],
            color: item.titleColor
          }}
        >
          {t(item.titleKey)}
        </AnimatedTitleText>
        
        <AnimatedSubTitleText
          style={{
            opacity: contentAnim.opacity,
            transform: [{ translateY: contentAnim.textY }]
          }}
        >
          {t(item.subtitleKey)}
        </AnimatedSubTitleText>
      </SlideContainer>
    );
  };

  return (
    <Container>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" /> 
      
      <TopBar>
        <SkipButton onPress={() => navigation.navigate('Login')}>
          <SkipText>{t('common.login')}</SkipText>
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
          <StartButtonText>{t('splash.start')}</StartButtonText>
        </StartButton>
      </BottomContainer>
    </Container>
  );
}
