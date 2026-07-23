import React, { useState } from 'react';
import {
  Alert,
  Linking,
  StatusBar,
  ScrollView,
  Modal,
  RefreshControl,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Header from '../../../components/Header';
import AsyncState from '../../../components/AsyncState';
import FilePickerField from '../../../components/FilePickerField';
import { useTeamFiles } from '../../../hooks/useTeamFiles';
import { useFileSelection } from '../../../hooks/useFileSelection';
import { getApiErrorMessage } from '../../../utils/apiError';

import FolderOutlineIcon from '../../../assets/icons/ic_folder_outline.svg';
import FileDocIcon from '../../../assets/icons/ic_file.svg';
import FileImageIcon from '../../../assets/icons/ic_image.svg';
import DownloadIcon from '../../../assets/icons/ic_download.svg';
import EditIcon from '../../../assets/icons/ic_edit.svg';
import DeleteIcon from '../../../assets/icons/ic_delete.svg';

import {
  Container,
  SearchContainer,
  SearchInput,
  TabContainer,
  TabItem,
  TabSeparator,
  TabText,
  SectionContainer,
  ListCard,
  TouchableListItem,
  ListItemLeft,
  IconWrapper,
  TextColumn,
  ListItemTitle,
  ListItemSubtitle,
  ListItemRight,
  ActionIconBtn,
  HeaderBackButton,
  PopupOverlay,
  PopupContent,
  PopupOptionBtn,
  PopupOptionText,
  ActionModalOverlay,
  ActionModalContainer,
  ActionModalHeader,
  ActionModalCancelBtn,
  ActionModalCancelText,
  ActionModalTitle,
  ActionModalSaveBtn,
  ActionModalSaveText,
  ActionModalBody,
  ActionModalLabel,
  ActionModalInput,
  ActionModalDesc,
} from './Files.styles';

export default function Files({ route, navigation }) {
  const { projectId } = route.params || {};
  const {
    files,
    isLoading,
    isUploading,
    errorMessage,
    fetchFiles,
    renameFile,
    deleteFile,
    uploadTeamFile,
  } = useTeamFiles(projectId);
  const {
    selectedFile: uploadFile,
    isPicking,
    selectFile,
    clearFile,
  } = useFileSelection({ kind: 'document' });
  const [isPopupVisible, setPopupVisible] = useState(false);
  const [activeModal, setActiveModal] = useState(null);
  const [renameInput, setRenameInput] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const fileList = files.filter(file =>
    file.title.toLowerCase().includes(searchQuery.trim().toLowerCase()),
  );
  const backButton = (
    <HeaderBackButton onPress={() => navigation.goBack()} activeOpacity={0.8}>
      <Icon name="chevron-back" size={26} color="#FF8933" />
    </HeaderBackButton>
  );
  const handleOpenPopup = item => {
    setSelectedFile(item);
    setRenameInput(item.title);
    setPopupVisible(true);
  };
  const handleClosePopup = () => {
    setPopupVisible(false);
  };
  const handleOptionClick = type => {
    setPopupVisible(false);
    setActiveModal(type);
  };
  const handleCloseActionModal = () => {
    setActiveModal(null);
  };

  const handleRename = async () => {
    if (!selectedFile || !renameInput.trim()) return;
    try {
      await renameFile(selectedFile.id, renameInput.trim());
      handleCloseActionModal();
    } catch (error) {
      Alert.alert(
        '오류',
        error.response?.data?.message ?? '파일 이름을 변경하지 못했습니다.',
      );
    }
  };

  const handleDelete = async () => {
    if (!selectedFile) return;
    try {
      await deleteFile(selectedFile.id);
      handleCloseActionModal();
    } catch (error) {
      Alert.alert(
        '오류',
        error.response?.data?.message ?? '파일을 삭제하지 못했습니다.',
      );
    }
  };

  const handleUpload = async () => {
    if (!uploadFile) return;
    try {
      await uploadTeamFile(uploadFile);
      clearFile();
      Alert.alert('완료', '팀 파일이 업로드되었습니다.');
    } catch (error) {
      Alert.alert(
        '업로드 실패',
        getApiErrorMessage(error, '팀 파일을 업로드하지 못했습니다.'),
      );
    }
  };

  return (
    <Container>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      <Header title={`프로젝트 #${projectId ?? '-'}`} left={backButton} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={isLoading}
            onRefresh={fetchFiles}
            tintColor="#FF8933"
          />
        }
      >
        <SearchContainer>
          <Icon name="search-outline" size={20} color="#000000" />
          <SearchInput
            placeholder="검색"
            placeholderTextColor="#000000"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </SearchContainer>
        <TabContainer>
          <TabItem
            isActive={false}
            onPress={() => navigation.replace('ProjectDetail', { projectId })}
            activeOpacity={0.7}
          >
            <TabText isActive={false}>홈</TabText>
          </TabItem>
          <TabSeparator />
          <TabItem
            isActive={false}
            onPress={() => navigation.replace('ProjectTodo', { projectId })}
            activeOpacity={0.7}
          >
            <TabText isActive={false}>할일</TabText>
          </TabItem>
          <TabSeparator />
          <TabItem
            isActive={false}
            onPress={() => navigation.replace('Schedule', { projectId })}
            activeOpacity={0.7}
          >
            <TabText isActive={false}>일정</TabText>
          </TabItem>
          <TabSeparator />
          <TabItem isActive={true} activeOpacity={1}>
            <TabText isActive={true}>파일</TabText>
          </TabItem>
        </TabContainer>
        <SectionContainer>
          <FilePickerField
            label="팀 파일 업로드"
            helperText="이미지는 최대 10MB, 문서는 최대 30MB까지 업로드할 수 있습니다."
            file={uploadFile}
            kind={uploadFile?.kind ?? 'document'}
            isPicking={isPicking}
            isUploading={isUploading}
            disabled={isLoading}
            onSelect={selectFile}
            onRemove={clearFile}
            onUpload={handleUpload}
          />
          <ListCard>
            {fileList.length === 0 ? (
              <AsyncState
                isLoading={files.length === 0 && isLoading}
                errorMessage={files.length === 0 ? errorMessage : ''}
                emptyMessage={
                  searchQuery.trim()
                    ? '검색 결과가 없습니다.'
                    : '등록된 파일이 없습니다.'
                }
                onRetry={fetchFiles}
              />
            ) : (
              fileList.map((file, index) => (
                <TouchableListItem
                  key={file.id}
                  isLast={index === fileList.length - 1}
                  activeOpacity={0.7}
                >
                  <ListItemLeft>
                    <IconWrapper>
                      {file.type === 'folder' && (
                        <FolderOutlineIcon
                          width={35}
                          height={35}
                          color="#FF8933"
                        />
                      )}
                      {file.type === 'file' && (
                        <FileDocIcon width={35} height={35} color="#FF8933" />
                      )}
                      {file.type === 'image' && (
                        <FileImageIcon width={35} height={35} color="#FF8933" />
                      )}
                    </IconWrapper>
                    <TextColumn>
                      <ListItemTitle>{file.title}</ListItemTitle>
                      <ListItemSubtitle>{file.info}</ListItemSubtitle>
                    </TextColumn>
                  </ListItemLeft>
                  <ListItemRight>
                    <ActionIconBtn
                      activeOpacity={0.7}
                      onPress={() =>
                        file.fileUrl && Linking.openURL(file.fileUrl)
                      }
                    >
                      <DownloadIcon
                        width={21.6}
                        height={19.6}
                        color="#FF8933"
                      />
                    </ActionIconBtn>
                    <ActionIconBtn
                      activeOpacity={0.7}
                      onPress={() => handleOpenPopup(file)}
                    >
                      <Icon
                        name="ellipsis-horizontal"
                        size={20}
                        color="#AAAAAA"
                      />
                    </ActionIconBtn>
                  </ListItemRight>
                </TouchableListItem>
              ))
            )}
          </ListCard>
        </SectionContainer>
      </ScrollView>
      <Modal
        visible={isPopupVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={handleClosePopup}
      >
        <PopupOverlay activeOpacity={1} onPress={handleClosePopup}>
          <PopupContent onStartShouldSetResponder={() => true}>
            <PopupOptionBtn
              activeOpacity={0.7}
              onPress={() => handleOptionClick('rename')}
            >
              <EditIcon width={18} height={18} color="#000000" />
              <PopupOptionText>이름 변경</PopupOptionText>
            </PopupOptionBtn>
            <PopupOptionBtn
              activeOpacity={0.7}
              onPress={() => handleOptionClick('delete')}
              isLast={true}
            >
              <DeleteIcon width={18} height={18} color="#FF0000" />{' '}
              {/* FF4D4D-> FF0000 */}
              <PopupOptionText isDanger={true}>삭제</PopupOptionText>
            </PopupOptionBtn>
          </PopupContent>
        </PopupOverlay>
      </Modal>
      <Modal
        visible={activeModal === 'rename'}
        transparent={true}
        animationType="fade"
        onRequestClose={handleCloseActionModal}
      >
        <ActionModalOverlay activeOpacity={1} onPress={handleCloseActionModal}>
          <ActionModalContainer onStartShouldSetResponder={() => true}>
            <ActionModalHeader>
              <ActionModalCancelBtn onPress={handleCloseActionModal}>
                <ActionModalCancelText>취소</ActionModalCancelText>
              </ActionModalCancelBtn>
              <ActionModalTitle>이름 변경</ActionModalTitle>
              <ActionModalSaveBtn onPress={handleRename}>
                <ActionModalSaveText>저장</ActionModalSaveText>
              </ActionModalSaveBtn>
            </ActionModalHeader>
            <ActionModalBody>
              <ActionModalLabel isFirst={true}>파일 이름</ActionModalLabel>
              <ActionModalInput
                value={renameInput}
                onChangeText={setRenameInput}
                placeholder="파일 이름을 입력하세요."
                placeholderTextColor="#AAAAAA"
              />
            </ActionModalBody>
          </ActionModalContainer>
        </ActionModalOverlay>
      </Modal>
      <Modal
        visible={activeModal === 'delete'}
        transparent={true}
        animationType="fade"
        onRequestClose={handleCloseActionModal}
      >
        <ActionModalOverlay activeOpacity={1} onPress={handleCloseActionModal}>
          <ActionModalContainer onStartShouldSetResponder={() => true}>
            <ActionModalHeader>
              <ActionModalCancelBtn onPress={handleCloseActionModal}>
                <ActionModalCancelText>취소</ActionModalCancelText>
              </ActionModalCancelBtn>
              <ActionModalTitle>파일 삭제</ActionModalTitle>
              <ActionModalSaveBtn onPress={handleDelete}>
                <ActionModalSaveText isDanger={true}>삭제</ActionModalSaveText>
              </ActionModalSaveBtn>
            </ActionModalHeader>
            <ActionModalBody>
              <ActionModalDesc>
                정말 삭제하시겠습니까?{'\n'}삭제된 파일은 복구할 수 없습니다.
              </ActionModalDesc>
            </ActionModalBody>
          </ActionModalContainer>
        </ActionModalOverlay>
      </Modal>
    </Container>
  );
}
