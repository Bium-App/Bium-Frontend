import styled from 'styled-components/native';


export const Container = styled.View`
  margin-bottom: 20px;
`;

export const Label = styled.Text`
  margin-bottom: 10px;
  color: #000000;
  font-size: 14px;
  font-weight: 600;
`;

export const SelectButton = styled.TouchableOpacity`
  min-height: 52px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border-width: 1px;
  border-style: dashed;
  border-color: #ff8933;
  border-radius: 8px;
  background-color: #fff8f2;
`;

export const SelectText = styled.Text`
  margin-left: 8px;
  color: #ff8933;
  font-size: 14px;
  font-weight: 600;
`;

export const FilePreview = styled.View`
  min-height: 64px;
  flex-direction: row;
  align-items: center;
  padding: 10px 12px;
  border-width: 1px;
  border-color: #e8e8e8;
  border-radius: 8px;
  background-color: #ffffff;
`;

export const ImagePreview = styled.Image`
  width: 48px;
  height: 48px;
  margin-right: 12px;
  border-radius: 6px;
  background-color: #f2f2f2;
`;

export const FileInfo = styled.View`
  flex: 1;
  margin-left: 12px;
`;

export const FileName = styled.Text`
  color: #000000;
  font-size: 14px;
  font-weight: 600;
`;

export const FileSize = styled.Text`
  margin-top: 4px;
  color: #999999;
  font-size: 12px;
`;

export const RemoveButton = styled.TouchableOpacity`
  padding: 4px;
`;

export const HelperText = styled.Text`
  margin-top: 7px;
  color: #999999;
  font-size: 11px;
  line-height: 16px;
`;

export const ActionButton = styled.TouchableOpacity`
  height: 46px;
  align-items: center;
  justify-content: center;
  margin-top: 10px;
  border-radius: 8px;
  background-color: #ff8933;
`;

export const ActionText = styled.Text`
  color: #ffffff;
  font-size: 15px;
  font-weight: 600;
`;
