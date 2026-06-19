import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background-color: #FFFFFF;
`;

export const RightIconContainer = styled.View`
  flex-direction: row;
  gap: 16px;
`;

export const SectionHeader = styled.Text`
  font-size: 15px;
  font-weight: 700;
  color: #000000;
  padding-horizontal: 16px;
  margin-top: 16px;
  margin-bottom: 12px;
`;

export const TooltipContainer = styled.View`
  background-color: #F4F6F8;
  border-radius: 8px;
  padding: 16px;
  margin: 16px;
  flex-direction: row;
  justify-content: space-between;
  shadow-color: #6B6EA1;
  shadow-offset: 0px 1px;
  shadow-opacity: 0.25;
  shadow-radius: 3px;
`;

export const TooltipLeft = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 16px;
`;

export const FingerWrapper = styled.View`
  align-items: center;
`;

export const ArrowRow = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 2px;
  margin-bottom: -4px;
`;

export const TooltipTextWrapper = styled.View`
  gap: 6px;
`;

export const TooltipRow = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 8px;
`;

export const TooltipText = styled.Text`
  font-size: 13px;
  color: #000000;
`;

export const CloseButton = styled.TouchableOpacity`
  align-self: flex-start;
  padding: 4px;
  margin-top: -4px;
  margin-right: -4px;
`;

export const ListContainer = styled.SectionList.attrs({
  contentContainerStyle: {
    paddingBottom: 100,
  },
})`
  flex: 1;
`;