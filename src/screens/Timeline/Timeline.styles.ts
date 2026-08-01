import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background-color: #FFFFFF; 
`;

export const HeaderIconRow = styled.View`
  flex-direction: row;
  align-items: center;
  padding-right: 16px; 
`;

export const IconButton = styled.TouchableOpacity``;

export const SpacedIconButton = styled.TouchableOpacity`
  margin-left: 16px; 
`;

export const TabContainer = styled.View`
  flex-direction: row;
  width: 100%;
  height: 48px;
  border-bottom-width: 1px; 
  border-bottom-color: #FFFFFF; 
`;

export const TabButton = styled.TouchableOpacity<{
  active: boolean;
  tabType: string;
}>`
  flex: 1;
  justify-content: center;
  align-items: center;
  border-bottom-width: 3px; 
  border-bottom-color: ${({ active, tabType }) => 
    active ? (tabType === 'ice' ? '#7CC4FF' : '#FF8933') : '#D1D5DB'};
  margin-bottom: -1px;
`;

export const TabText = styled.Text<{active: boolean; tabType: string}>`
  font-size: 15px; 
  font-weight: ${({ active }) => (active ? '700' : '500')}; 
  color: ${({ active, tabType }) => 
    active ? (tabType === 'ice' ? '#7CC4FF' : '#FF8933') : '#D1D5DB'};
  letter-spacing: -0.3px; 
`;

export const ScrollContainer = styled.ScrollView.attrs({
  contentContainerStyle: {
    paddingTop: 16, 
    paddingBottom: 40, 
    paddingHorizontal: 20, 
  }
})`
  flex: 1;
  background-color: #FFFFFF; 
`;

export const SectionHeaderRow = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-vertical: 16px; 
  padding-horizontal: 4px; 
  margin-bottom: 8px; 
`;

export const SectionTitle = styled.Text`
  font-size: 17px; 
  font-weight: 500; 
  color: #000000; 
  letter-spacing: 0px; 
`;

export const TimelineRow = styled.View`
  flex-direction: row;
  margin-bottom: 24px; 
`;

export const TimelineLeft = styled.View`
  width: 32px; 
  justify-content: center;
  align-items: center;
  margin-right: 16px; 
  position: relative;
`;

export const TimelineLineTop = styled.View<{color: string}>`
  position: absolute;
  top: -24px;
  bottom: 50%;
  width: 2px; 
  background-color: ${({ color }) => color}; 
  z-index: 1;
`;

export const TimelineLineBottom = styled.View<{color: string}>`
  position: absolute;
  top: 50%;
  bottom: -24px;
  width: 2px; 
  background-color: ${({ color }) => color}; 
  z-index: 1;
`;

export const TimelineDotOuter = styled.View<{bgColor: string}>`
  width: 21px; 
  height: 21px; 
  border-radius: 10.5px; 
  background-color: ${({ bgColor }) => bgColor}; 
  justify-content: center;
  align-items: center;
  z-index: 2;
`;

export const TimelineDotInner = styled.View<{color: string}>`
  width: 15px; 
  height: 15px; 
  border-radius: 7.5px; 
  background-color: ${({ color }) => color}; 
`;

export const MemoCard = styled.TouchableOpacity`
  flex: 1;
  flex-direction: row;
  align-items: center;
  background-color: #FFFFFF; 
  border-radius: 10px; 
  padding: 16px; 
  elevation: 3; 
  shadow-color: #6B6EA1;
  shadow-offset: 0px 1px;
  shadow-opacity: 0.25;
  shadow-radius: 3px;
`;

export const CardLeft = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
`;

export const IconWrapper = styled.View`
  width: 30px;
  height: 30px;
  background-color: transparent; 
  justify-content: center;
  align-items: center;
  margin-right: 12px; 
`;

export const TextWrapper = styled.View`
  flex: 1;
  justify-content: center;
`;

export const CardTitle = styled.Text`
  font-size: 15px; 
  font-weight: 500; 
  color: #000000; 
  margin-bottom: 4px; 
  letter-spacing: 0px; 
`;

export const CardDesc = styled.Text`
  font-size: 10px; 
  font-weight: 400; 
  color: #000000; 
  letter-spacing: 0px; 
  margin-bottom: 4px; 
`;

export const CardTime = styled.Text`
  font-size: 10px; 
  font-weight: 400; 
  color: #FF8933; 
  margin-bottom: 2px; 
`;


export const DateRow = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 2px;
`;

export const DateText = styled.Text`
  font-size: 10px; 
  font-weight: 400; 
  color: #AAAAAA; 
  margin-left: 4px; 
`;

export const CardRight = styled.View`
  margin-left: 12px;
  justify-content: center;
  align-items: center;
`;

export const PinWrapper = styled.View`
  align-self: flex-start; 
  margin-left: 12px; 
`;

export const TimerRing = styled.View`
  width: 50px; 
  height: 50px; 
  border-radius: 25px; 
  border-width: 2px; 
  border-color: #FF8933; 
  justify-content: center;
  align-items: center;
  position: relative;
  background-color: #FFFFFF; 
`;

export const TimerDot = styled.View`
  position: absolute;
  right: -3px; 
  top: 50%;
  margin-top: -3px;
  width: 4px; 
  height: 4px; 
  border-radius: 3px; 
  background-color: #FFFFFF; 
  border-width: 1px; 
  border-color: #FFFFFF; 
`;

export const TimerValue = styled.Text`
  font-size: 10px; 
  font-weight: 400; 
  color: #000000; 
  letter-spacing: 0px; 
`;

export const TimerLabel = styled.Text`
  font-size: 10px; 
  font-weight: 400; 
  color: #000000; 
  margin-top: 1px; 
`;
