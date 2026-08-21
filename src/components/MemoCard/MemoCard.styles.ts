import styled from 'styled-components/native';
import type {MemoStatus} from '../../types/memo';

export const CardContainer = styled.TouchableOpacity<{isPinned: boolean}>`
  flex-direction: row;
  background-color: #ffffff;
  border-radius: 12px;
  padding-horizontal: 16px;
  height: 88px;
  margin-horizontal: 16px;
  margin-bottom: 12px;
  border-width: 1.5px;
  border-color: ${({ isPinned }) => (isPinned ? '#7CC4FF' : '#F0F0F0')};
  align-items: center;
  elevation: 1;
  shadow-color: #6b6ea1;
  shadow-offset: 0px 1px;
  shadow-opacity: 0.25;
  shadow-radius: 3px;
`;

export const IconWrapper = styled.View<{status: MemoStatus}>`
  width: 48px;
  height: 48px;
  border-radius: 24px;
  background-color: ${({ status }) =>
    status === 'ICE' ? '#EAF3FF' : '#FFE8D6'};
  justify-content: center;
  align-items: center;
  margin-right: 12px;
`;

export const ContentWrapper = styled.View`
  flex: 1;
  justify-content: center;
  height: 100%;
`;

export const TitleText = styled.Text`
  font-size: 16px;
  font-weight: 700;
  color: #000000;
  margin-bottom: 4px;
`;

export const ContentText = styled.Text`
  font-size: 14px;
  color: #000000;
  margin-bottom: 4px;
`;

export const TimeText = styled.Text`
  font-size: 12px;
  color: #000000;
`;

export const ExpireText = styled.Text`
  font-size: 12px;
  color: #ff8933;
`;

export const RightWrapper = styled.View`
  align-items: flex-end;
  justify-content: space-between;
  padding-vertical: 16px;
  height: 100%;
`;

export const ActionBackground = styled.TouchableOpacity<{
  color: string;
  align: 'flex-start' | 'flex-end';
}>`
  width: 80px;
  height: 88px;
  background-color: ${({ color }) => color};
  border-radius: 12px;
  justify-content: center;
  align-items: center;
  margin-left: ${({ align }) => (align === 'flex-start' ? '16px' : '0px')};
  margin-right: ${({ align }) => (align === 'flex-end' ? '16px' : '0px')};
`;

export const MoreButton = styled.TouchableOpacity`
  padding: 4px;
  margin-right: -4px;
`;
