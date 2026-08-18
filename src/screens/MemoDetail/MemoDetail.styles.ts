import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background-color: #ffffff;
`;

export const HeaderIconRow = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 16px;
`;

export const IconButton = styled.TouchableOpacity`
  padding: 4px;
`;

export const ContentContainer = styled.ScrollView.attrs({
  contentContainerStyle: {
    padding: 16,
    paddingBottom: 60,
  },
})`
  flex: 1;
  background-color: #ffffff;
`;

export const TitleRow = styled.View`
  flex-direction: row;
  align-items: flex-start;
  gap: 8px;
`;

export const TitleText = styled.Text`
  flex: 1;
  font-size: 20px;
  font-weight: 700;
  color: #000000;
`;

export const MetaRow = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 6px;
  margin-top: 10px;
`;

export const MetaText = styled.Text`
  font-size: 13px;
  color: #aaaaaa;
`;

export const TimerRow = styled.View`
  margin-top: 16px;
  align-items: flex-start;
`;

export const Divider = styled.View`
  height: 1px;
  background-color: #dbdbdb;
  margin-vertical: 16px;
`;

export const RichEditorFrame = styled.View`
  min-height: 80px;
`;

export const ImageSection = styled.View`
  margin-top: 20px;
  gap: 10px;
`;

export const MemoImage = styled.Image`
  width: 100%;
  height: 220px;
  border-radius: 14px;
  background-color: #f4f6f8;
  shadow-color: #6b6ea1;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.15;
  shadow-radius: 6px;
  elevation: 2;
`;

export const FooterMeta = styled.View`
  margin-top: 28px;
  gap: 4px;
`;

export const FooterMetaText = styled.Text`
  font-size: 12px;
  color: #bbbbbb;
`;
