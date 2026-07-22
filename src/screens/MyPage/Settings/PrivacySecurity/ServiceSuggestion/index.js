import React from 'react';
import { TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Header from '../../../../../components/Header';
import ImgSuggestion from '../../../../../assets/icons/img_suggestion.svg';
import { useServiceSuggestion } from '../../../../../hooks/useServiceSuggestion';

import {
  Container,
  ScrollContainer,
  TopSection,
  IllustrationWrapper,
  IntroText,
  InputSection,
  InputLabel,
  InputBox,
  TextInputArea,
  CharCountText,
  SubmitButton,
  SubmitButtonText,
} from './ServiceSuggestion.styles';

export default function ServiceSuggestion({ navigation }) {
  const {
    suggestion,
    setSuggestion,
    isFocused,
    setIsFocused,
    isLoading,
    handleSubmit,
  } = useServiceSuggestion(navigation);
  const MAX_LENGTH = 500;

  return (
    <Container>
      <Header
        left={
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            activeOpacity={0.7}
          >
            <Icon name="chevron-back-outline" size={24} color="#FF8933" />
          </TouchableOpacity>
        }
        title="서비스 개선 제안"
      />

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollContainer showsVerticalScrollIndicator={false}>
          <TopSection>
            <IllustrationWrapper>
              <ImgSuggestion width="100%" height="100%" />
            </IllustrationWrapper>

            <IntroText>
              더 나은 서비스를 위해{'\n'}
              여러분의 소중한 의견을{'\n'}
              기다리고 있습니다.
            </IntroText>
          </TopSection>
          <InputSection>
            <InputLabel>제안하기</InputLabel>

            <InputBox isFocused={isFocused}>
              <TextInputArea
                placeholder="서비스 개선에 대한 아이디어나&#13;&#10;의견을 남겨주세요."
                placeholderTextColor="#C7C7CC"
                multiline={true}
                maxLength={MAX_LENGTH}
                textAlignVertical="top"
                value={suggestion}
                onChangeText={setSuggestion}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
              />
              <CharCountText>
                {suggestion.length}/{MAX_LENGTH}
              </CharCountText>
            </InputBox>
          </InputSection>

          <SubmitButton
            activeOpacity={0.8}
            disabled={suggestion.trim().length === 0 || isLoading}
            onPress={handleSubmit}
          >
            <SubmitButtonText>제출하기</SubmitButtonText>
          </SubmitButton>
        </ScrollContainer>
      </KeyboardAvoidingView>
    </Container>
  );
}
