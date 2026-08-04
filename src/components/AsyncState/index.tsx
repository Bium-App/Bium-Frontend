import React from 'react';
import {ActivityIndicator} from 'react-native';
import {
  RetryButton,
  RetryText,
  StateContainer,
  StateDescription,
  StateTitle,
} from './styles';

interface AsyncStateProps {
  isLoading?: boolean;
  errorMessage?: string;
  emptyMessage?: string;
  onRetry?: () => void;
}

export default function AsyncState({
  isLoading = false,
  errorMessage,
  emptyMessage = '표시할 내용이 없습니다.',
  onRetry,
}: AsyncStateProps) {
  if (isLoading) {
    return (
      <StateContainer accessibilityLabel="데이터를 불러오는 중">
        <ActivityIndicator size="large" color="#FF8933" />
        <StateDescription>불러오는 중...</StateDescription>
      </StateContainer>
    );
  }

  return (
    <StateContainer>
      <StateTitle>
        {errorMessage ? '불러오지 못했습니다.' : emptyMessage}
      </StateTitle>
      {errorMessage ? <StateDescription>{errorMessage}</StateDescription> : null}
      {errorMessage && onRetry ? (
        <RetryButton
          accessibilityRole="button"
          activeOpacity={0.8}
          onPress={onRetry}>
          <RetryText>다시 시도</RetryText>
        </RetryButton>
      ) : null}
    </StateContainer>
  );
}
