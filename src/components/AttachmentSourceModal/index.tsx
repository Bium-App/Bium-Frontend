import React from 'react';
import { Modal } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useTranslation} from 'react-i18next';
import { useRecentFiles } from '../../hooks/useRecentFiles';
import { formatFileSize } from '../../utils/filePicker';
import type { SelectedFile } from '../../types/file';
import {
  Body,
  CloseButton,
  Container,
  Header,
  MethodButton,
  MethodRow,
  MethodText,
  Overlay,
  RecentBox,
  RecentEmptyText,
  RecentFileInfo,
  RecentFileName,
  RecentFileRow,
  RecentFileSize,
  RecentIconBox,
  RecentAddButton,
  RecentScroll,
  SearchBox,
  SearchText,
  SectionLabel,
  Title,
} from './styles';

interface AttachmentSourceModalProps {
  visible: boolean;
  isPicking?: boolean;
  onClose: () => void;
  onSelectDocument: () => unknown;
  onSelectImage: () => unknown;
  onSelectRecent?: (file: SelectedFile) => unknown;
}

export default function AttachmentSourceModal({
  visible,
  isPicking = false,
  onClose,
  onSelectDocument,
  onSelectImage,
  onSelectRecent,
}: AttachmentSourceModalProps) {
  const {t} = useTranslation();
  const { recentFiles } = useRecentFiles(visible);
  const openPicker = (picker: () => unknown) => {
    onClose();
    setTimeout(() => picker(), 200);
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
    >
      <Overlay onPress={onClose}>
        <Container onStartShouldSetResponder={() => true}>
          <Header>
            <Title>{t('attachment.add_file')}</Title>
            <CloseButton
              accessibilityLabel={t('attachment.close')}
              disabled={isPicking}
              onPress={onClose}
            >
              <Icon name="close" size={24} color="#666666" />
            </CloseButton>
          </Header>

          <Body>
            <SectionLabel>{t('common.file')}</SectionLabel>
            <SearchBox>
              <Icon name="search-outline" size={20} color="#000000" />
              <SearchText>{t('common.search')}</SearchText>
            </SearchBox>

            <SectionLabel spaced={true}>{t('attachment.method')}</SectionLabel>
            <MethodRow>
              <MethodButton
                disabled={isPicking}
                onPress={() => openPicker(onSelectDocument)}
              >
                <Icon name="phone-portrait-outline" size={27} color="#FF8933" />
                <MethodText>{t('attachment.device')}</MethodText>
              </MethodButton>
              <MethodButton
                disabled={isPicking}
                onPress={() => openPicker(onSelectImage)}
              >
                <Icon name="images-outline" size={27} color="#FF8933" />
                <MethodText>{t('attachment.album')}</MethodText>
              </MethodButton>
              <MethodButton
                disabled={isPicking}
                onPress={() => openPicker(onSelectDocument)}
              >
                <Icon name="musical-note-outline" size={27} color="#FF8933" />
                <MethodText>{t('attachment.audio')}</MethodText>
              </MethodButton>
              <MethodButton
                disabled={isPicking}
                onPress={() => openPicker(onSelectDocument)}
              >
                <Icon name="cloud-outline" size={27} color="#FF8933" />
                <MethodText>{t('attachment.cloud')}</MethodText>
              </MethodButton>
            </MethodRow>

            <SectionLabel spaced={true}>{t('attachment.recent')}</SectionLabel>
            <RecentBox>
              {recentFiles.length === 0 ? (
                <RecentEmptyText>
                  {t('attachment.recent_empty')}
                </RecentEmptyText>
              ) : (
                <RecentScroll
                  showsVerticalScrollIndicator={true}
                  nestedScrollEnabled={true}
                >
                  {recentFiles.map((file, index) => (
                    <RecentFileRow
                      key={`${file.uri}-${index}`}
                      $isLast={index === recentFiles.length - 1}
                    >
                      <RecentIconBox>
                        <Icon
                          name={
                            file.kind === 'image'
                              ? 'image-outline'
                              : 'document-text-outline'
                          }
                          size={24}
                          color="#FF8933"
                        />
                      </RecentIconBox>
                      <RecentFileInfo>
                        <RecentFileName numberOfLines={1}>
                          {file.name}
                        </RecentFileName>
                        <RecentFileSize>
                          {formatFileSize(file.size)}
                        </RecentFileSize>
                      </RecentFileInfo>
                      <RecentAddButton
                        accessibilityLabel={t('attachment.select_recent', {name: file.name})}
                        disabled={isPicking || !onSelectRecent}
                        onPress={() =>
                          onSelectRecent &&
                          openPicker(() => onSelectRecent(file))
                        }
                      >
                        <Icon name="add" size={22} color="#FF8933" />
                      </RecentAddButton>
                    </RecentFileRow>
                  ))}
                </RecentScroll>
              )}
            </RecentBox>
          </Body>
        </Container>
      </Overlay>
    </Modal>
  );
}
