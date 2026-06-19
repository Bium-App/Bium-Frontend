import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Container, LeftSection, CenterSection, RightSection, TitleText } from './Header.styles';

export default function Header({ left, title, center, right }) {
  const insets = useSafeAreaInsets();

  return (
    <Container paddingTop={insets.top}>
      <LeftSection>{left}</LeftSection>
      <CenterSection>
        {title ? <TitleText>{title}</TitleText> : center}
      </CenterSection>
      <RightSection>{right}</RightSection>
    </Container>
  );
}