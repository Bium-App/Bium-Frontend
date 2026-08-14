import React from 'react';
import {ActivityIndicator} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useTranslation} from 'react-i18next';
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
  uploadLabel,
  isPicking = false,
  isUploading = false,
  disabled = false,
}: FilePickerFieldProps) {
  const {t} = useTranslation();
  const isBusy = isPicking || isUploading;
  const resolvedUploadLabel = uploadLabel ?? t('common.upload');

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
            accessibilityLabel={t('attachment.remove_selected')}
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
            {kind === 'image' ? t('common.image_select') : t('common.file_select')}
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
            <ActionText>{resolvedUploadLabel}</ActionText>
          )}
        </ActionButton>
      ) : null}
    </Container>
  );
}
