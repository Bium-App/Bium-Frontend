import React from 'react';
import {ActivityIndicator} from 'react-native';
import styled from 'styled-components/native';

const StateContainer = styled.View`
  min-height: 180px;
  padding: 32px 24px;
  align-items: center;
  justify-content: center;
`;

const StateTitle = styled.Text`
  color: #555555;
  font-size: 15px;
  font-weight: 600;
  text-align: center;
`;

const StateDescription = styled.Text`
  color: #aaaaaa;
  font-size: 13px;
  line-height: 19px;
  text-align: center;
  margin-top: 8px;
`;

const RetryButton = styled.TouchableOpacity`
  margin-top: 18px;
  border-radius: 8px;
  background-color: #ff8933;
  padding: 10px 18px;
`;

const RetryText = styled.Text`
  color: #ffffff;
  font-size: 14px;
  font-weight: 700;
`;

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
