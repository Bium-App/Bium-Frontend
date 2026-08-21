import React, {useEffect, useMemo, useRef, useState} from 'react';
import {Animated, Easing} from 'react-native';
import Svg, {
  Circle,
  Defs,
  LinearGradient,
  Stop,
} from 'react-native-svg';

import {
  Container,
  EmberGlow,
  LabelText,
  RingLayer,
  TimeText,
} from './BurningTimer.styles';

const SIZE = 56;
const STROKE_WIDTH = 3;
const CENTER = SIZE / 2;
const RADIUS = (SIZE - STROKE_WIDTH * 2) / 2;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;
const EMBER_SIZE = 8;

interface BurningTimerProps {
  createdAt?: string | null;
  expiredAt: string;
  label: string;
}

const toTimestamp = (value?: string | null): number | null => {
  if (!value) return null;
  const timestamp = new Date(value).getTime();
  return Number.isFinite(timestamp) ? timestamp : null;
};

const formatRemainingTime = (remainingSeconds: number): string => {
  if (remainingSeconds < 3600) {
    const minutes = Math.floor(remainingSeconds / 60);
    const seconds = remainingSeconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  }

  const hours = Math.floor(remainingSeconds / 3600);
  const minutes = Math.floor((remainingSeconds % 3600) / 60);
  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
};

export default function BurningTimer({
  createdAt,
  expiredAt,
  label,
}: BurningTimerProps) {
  const [now, setNow] = useState(Date.now());
  const mountedAt = useRef(Date.now()).current;
  const emberScale = useRef(new Animated.Value(0.85)).current;
  const emberOpacity = useRef(new Animated.Value(0.65)).current;

  useEffect(() => {
    const interval = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const pulse = Animated.loop(
      Animated.sequence([
        Animated.parallel([
          Animated.timing(emberScale, {
            toValue: 1.35,
            duration: 650,
            easing: Easing.out(Easing.quad),
            useNativeDriver: true,
          }),
          Animated.timing(emberOpacity, {
            toValue: 1,
            duration: 650,
            useNativeDriver: true,
          }),
        ]),
        Animated.parallel([
          Animated.timing(emberScale, {
            toValue: 0.85,
            duration: 650,
            easing: Easing.in(Easing.quad),
            useNativeDriver: true,
          }),
          Animated.timing(emberOpacity, {
            toValue: 0.65,
            duration: 650,
            useNativeDriver: true,
          }),
        ]),
      ]),
    );
    pulse.start();
    return () => pulse.stop();
  }, [emberOpacity, emberScale]);

  const timer = useMemo(() => {
    const expiresAtMs = toTimestamp(expiredAt) ?? now;
    const createdAtMs = toTimestamp(createdAt) ?? mountedAt;
    const totalMs = Math.max(expiresAtMs - createdAtMs, 1);
    const remainingMs = Math.max(expiresAtMs - now, 0);
    const progress = Math.min(Math.max(remainingMs / totalMs, 0), 1);
    const remainingSeconds = Math.ceil(remainingMs / 1000);
    const angle = -Math.PI / 2 + Math.PI * 2 * progress;

    return {
      progress,
      remainingText: formatRemainingTime(remainingSeconds),
      urgent: progress <= 0.15,
      emberLeft: CENTER + RADIUS * Math.cos(angle) - EMBER_SIZE / 2,
      emberTop: CENTER + RADIUS * Math.sin(angle) - EMBER_SIZE / 2,
    };
  }, [createdAt, expiredAt, mountedAt, now]);

  const progressColor = timer.urgent ? '#FF4D2E' : '#FF8933';

  return (
    <Container accessibilityLabel={`${timer.remainingText} ${label}`}>
      <RingLayer pointerEvents="none">
        <Svg width={SIZE} height={SIZE}>
          <Defs>
            <LinearGradient id="burningRing" x1="0" y1="0" x2="1" y2="1">
              <Stop offset="0" stopColor="#FFD0A3" />
              <Stop offset="0.55" stopColor="#FF8933" />
              <Stop offset="1" stopColor={progressColor} />
            </LinearGradient>
          </Defs>
          <Circle
            cx={CENTER}
            cy={CENTER}
            r={RADIUS}
            fill="none"
            stroke="#FFE8D6"
            strokeWidth={STROKE_WIDTH}
          />
          <Circle
            cx={CENTER}
            cy={CENTER}
            r={RADIUS}
            fill="none"
            stroke="url(#burningRing)"
            strokeWidth={STROKE_WIDTH}
            strokeLinecap="round"
            strokeDasharray={`${CIRCUMFERENCE} ${CIRCUMFERENCE}`}
            strokeDashoffset={CIRCUMFERENCE * (1 - timer.progress)}
            rotation={-90}
            origin={`${CENTER}, ${CENTER}`}
          />
        </Svg>
      </RingLayer>

      {timer.progress > 0 ? (
        <EmberGlow
          left={timer.emberLeft}
          top={timer.emberTop}
          urgent={timer.urgent}
          style={{
            opacity: emberOpacity,
            transform: [{scale: emberScale}],
          }}
        />
      ) : null}

      <TimeText>{timer.remainingText}</TimeText>
      <LabelText>{label}</LabelText>
    </Container>
  );
}
