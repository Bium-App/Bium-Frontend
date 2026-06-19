import React from 'react';
import { Svg, Path } from 'react-native-svg';

export default function MyPageIcon({ color = '#BBBBBB', size = 24 }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 25 26" fill="none">
      <Path
        d="M23.75 25.1029H0.749993M23.75 12.9265H0.749993M23.75 0.75H0.749993"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </Svg>
  );
}