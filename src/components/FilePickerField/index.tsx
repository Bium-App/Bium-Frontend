import React from 'react';
import {ActivityIndicator} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {formatFileSize} from '../../utils/filePicker';
import type {SelectedFile, SelectedFileKind} from '../../types/file';
import {
  ActionButton,
  ActionText,
  Container,
  FileInfo,
  FileName,
  FilePreview,
  FileSize,
  HelperText,
  ImagePreview,
  Label,
  RemoveButton,
  SelectButton,
  SelectText,
} from './styles';

interface FilePickerFieldProps {
  label?: string;
  helperText?: string;
  file?: SelectedFile | null;
  kind?: SelectedFileKind;
  onSelect: () => unknown;
  onRemove: () => unknown;
  onUpload?: () => unknown;
  uploadLabel?: string;
  isPicking?: boolean;
  isUploading?: boolean;
  disabled?: boolean;
}

export default function FilePickerField({
  label,
  helperText,
  file,
  kind = 'document',
  onSelect,
  onRemove,
  onUpload,
  uploadLabel = '업로드',
  isPicking = false,
  isUploading = false,
  disabled = false,
}: FilePickerFieldProps) {
  const isBusy = isPicking || isUploading;

  return (
    <Container>
      {label ? <Label>{label}</Label> : null}
      {file ? (
        <FilePreview>
          {kind === 'image' ? (
            <ImagePreview source={{uri: file.uri}} />
          ) : (
            <Icon name="document-text-outline" size={30} color="#FF8933" />
          )}
          <FileInfo>
            <FileName numberOfLines={1}>{file.name}</FileName>
            <FileSize>{formatFileSize(file.size)}</FileSize>
          </FileInfo>
          <RemoveButton
            accessibilityLabel="선택 파일 제거"
            disabled={disabled || isBusy}
            onPress={onRemove}>
            <Icon name="close-circle" size={22} color="#AAAAAA" />
          </RemoveButton>
        </FilePreview>
      ) : (
        <SelectButton
          activeOpacity={0.8}
          disabled={disabled || isBusy}
          onPress={onSelect}>
          {isPicking ? (
            <ActivityIndicator color="#FF8933" size="small" />
          ) : (
            <Icon
              name={kind === 'image' ? 'image-outline' : 'attach-outline'}
              size={22}
              color="#FF8933"
            />
          )}
          <SelectText>
            {kind === 'image' ? '이미지 선택' : '파일 선택'}
          </SelectText>
        </SelectButton>
      )}
      {helperText ? <HelperText>{helperText}</HelperText> : null}
      {file && onUpload ? (
        <ActionButton
          activeOpacity={0.8}
          disabled={disabled || isBusy}
          onPress={onUpload}>
          {isUploading ? (
            <ActivityIndicator color="#FFFFFF" size="small" />
          ) : (
            <ActionText>{uploadLabel}</ActionText>
          )}
        </ActionButton>
      ) : null}
    </Container>
  );
}
