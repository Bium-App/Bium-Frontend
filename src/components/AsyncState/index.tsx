import React from 'react';
import {ActivityIndicator} from 'react-native';
import {useTranslation} from 'react-i18next';
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
  emptyMessage,
  onRetry,
}: AsyncStateProps) {
  const {t} = useTranslation();
  const resolvedEmptyMessage = emptyMessage ?? t('async_state.empty');

  if (isLoading) {
    return (
      <StateContainer accessibilityLabel={t('async_state.loading_label')}>
        <ActivityIndicator size="large" color="#FF8933" />
        <StateDescription>{t('async_state.loading')}</StateDescription>
      </StateContainer>
    );
  }

  return (
    <StateContainer>
      <StateTitle>
        {errorMessage ? t('async_state.failed') : resolvedEmptyMessage}
      </StateTitle>
      {errorMessage ? <StateDescription>{errorMessage}</StateDescription> : null}
      {errorMessage && onRetry ? (
        <RetryButton
          accessibilityRole="button"
          activeOpacity={0.8}
          onPress={onRetry}>
          <RetryText>{t('async_state.retry')}</RetryText>
        </RetryButton>
      ) : null}
    </StateContainer>
  );
}
