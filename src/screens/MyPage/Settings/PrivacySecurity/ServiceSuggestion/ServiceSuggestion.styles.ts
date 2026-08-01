import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background-color: #FFFFFF;
`;

export const ScrollContainer = styled.ScrollView.attrs({
  contentContainerStyle: {
    paddingHorizontal: 24, 
    paddingTop: 40,        
    paddingBottom: 40,     
  }
})`
  flex: 1;
`;

export const TopSection = styled.View`
  align-items: center; 
  margin-bottom: 40px; 
`;

export const IllustrationWrapper = styled.View`
  width: 199px;
  height: 127px;
  justify-content: center; 
  align-items: center;     
  margin-bottom: 24px;     
`;

export const IntroText = styled.Text`
  font-size: 14px;
  font-weight: 200;
  color: #000000;
  text-align: center; 
  line-height: 22px;  
`;

export const InputSection = styled.View`
  width: 100%;
  margin-bottom: 32px; 
`;

export const InputLabel = styled.Text`
  font-size: 14px;
  font-weight: 500;
  color: #000000;
  margin-bottom: 12px;
`;

export const InputBox = styled.View<{isFocused: boolean}>`
  width: 100%;
  height: 240px; 
  border-width: 1px;
  border-color: #E8E8E8;
  border-radius: 8px; 
  padding: 16px;     
  background-color: #FFFFFF;
`;

export const TextInputArea = styled.TextInput`
  flex: 1;             
  font-size: 14px;
  font-weight: 200;
  color: #000000;
  padding: 0;          
`;

export const CharCountText = styled.Text`
  font-size: 14px;
  font-weight: 500;
  color: #D0D0D0;
  text-align: right;   
  margin-top: 8px;     
`;

export const SubmitButton = styled.TouchableOpacity`
  width: 100%;
  height: 52px;
  background-color: ${props => (props.disabled ? '#E8E8E8' : '#FF8933')};
  border-radius: 8px;
  justify-content: center;
  align-items: center;
`;

export const SubmitButtonText = styled.Text`
  font-size: 18px;
  font-weight: 600;
  color: #FFFFFF;
`;
