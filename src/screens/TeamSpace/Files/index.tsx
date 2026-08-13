import React, { useState } from 'react';
import {
  Alert,
  Linking,
  Share,
  StatusBar,
  ScrollView,
  Modal,
  RefreshControl,
  Switch,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import Header from '../../../components/Header';
import AsyncState from '../../../components/AsyncState';
import AttachmentSourceModal from '../../../components/AttachmentSourceModal';
import { useTeamFiles } from '../../../hooks/useTeamFiles';
import type { TeamFileListItem } from '../../../hooks/useTeamFiles';
import { useFileSelection } from '../../../hooks/useFileSelection';
import {
  getApiErrorMessage,
  getApiResponseMessage,
} from '../../../utils/apiError';
import type { RootStackParamList } from '../../../types/navigation';
import type { SelectedFile } from '../../../types/file';

import PlusIcon from '../../../assets/icons/ic_plus.svg';
import FolderOutlineIcon from '../../../assets/icons/ic_folder_outline.svg';
import FileDocIcon from '../../../assets/icons/ic_file.svg';
import FileImageIcon from '../../../assets/icons/ic_image.svg';
import DownloadIcon from '../../../assets/icons/ic_download.svg';
import EditIcon from '../../../assets/icons/ic_edit.svg';
import FolderMoveIcon from '../../../assets/icons/ic_folder_move.svg';
import ShareIcon from '../../../assets/icons/ic_share.svg';
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
  SectionHeader,
  SmallAddButton,
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
  ActionModalInputDisabled,
  ActionModalInputDisabledText,
  ActionModalRow,
  ActionModalRowText,
  ActionModalDesc,
} from './Files.styles';

type FileAction = 'rename' | 'move' | 'share' | 'delete';

type FilesScreenProps = NativeStackScreenProps<RootStackParamList, 'Files'>;

export default function Files({ route, navigation }: FilesScreenProps) {
  const { projectId, projectName } = route.params;
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
  const { isPicking, selectImageFile, selectDocumentFile, clearFile } =
    useFileSelection({ kind: 'document' });
  const [isPopupVisible, setPopupVisible] = useState(false);
  const [isAddFileModalVisible, setAddFileModalVisible] = useState(false);
  const [activeModal, setActiveModal] = useState<FileAction | null>(null);
  const [renameInput, setRenameInput] = useState('');
  const [moveInput, setMoveInput] = useState('');
  const [shareInput, setShareInput] = useState('');
  const [isShareToggleOn, setIsShareToggleOn] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFile, setSelectedFile] = useState<TeamFileListItem | null>(
    null,
  );
  const fileList = files.filter(file =>
    file.title.toLowerCase().includes(searchQuery.trim().toLowerCase()),
  );
  const backButton = (
    <HeaderBackButton onPress={() => navigation.goBack()} activeOpacity={0.8}>
      <Icon name="chevron-back" size={26} color="#FF8933" />
    </HeaderBackButton>
  );
  const ellipsisButton = (
    <HeaderBackButton activeOpacity={0.8}>
      <Icon name="ellipsis-horizontal" size={24} color="#FF8933" />
    </HeaderBackButton>
  );
  const handleOpenPopup = (item: TeamFileListItem) => {
    setSelectedFile(item);
    setRenameInput(item.title);
    setPopupVisible(true);
  };
  const handleClosePopup = () => {
    setPopupVisible(false);
  };
  const handleOptionClick = (type: FileAction) => {
    setPopupVisible(false);
    if (type === 'move') setMoveInput('');
    if (type === 'share') setShareInput('');
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
        getApiResponseMessage(error) ?? '파일 이름을 변경하지 못했습니다.',
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
        getApiResponseMessage(error) ?? '파일을 삭제하지 못했습니다.',
      );
    }
  };

  const handleSelectAndUpload = async (
    picker: () => Promise<SelectedFile | null>,
  ) => {
    const file = await picker();
    if (!file) return;
    try {
      await uploadTeamFile(file);
      clearFile();
      Alert.alert('완료', '팀 파일이 업로드되었습니다.');
    } catch (error) {
      Alert.alert(
        '업로드 실패',
        getApiErrorMessage(error, '팀 파일을 업로드하지 못했습니다.'),
      );
    }
  };

  const handleMove = () => {
    if (!moveInput.trim()) return;
    Alert.alert(
      '이동 기능 준비 중',
      '현재 API 명세에 파일 이동 API가 없어 화면만 복구된 상태입니다.',
    );
  };

  const handleShare = async () => {
    if (!selectedFile?.fileUrl) {
      Alert.alert('공유 실패', '공유할 파일 주소가 없습니다.');
      return;
    }
    try {
      await Share.share({
        title: selectedFile.title,
        message: [
          shareInput.trim() ? `${shareInput.trim()}님께 공유합니다.` : '',
          selectedFile.fileUrl,
        ]
          .filter(Boolean)
          .join('\n'),
      });
      handleCloseActionModal();
    } catch (error) {
      Alert.alert(
        '공유 실패',
        getApiErrorMessage(error, '파일을 공유하지 못했습니다.'),
      );
    }
  };

  return (
    <Container>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      <Header
        title={projectName ?? '팀 파일'}
        left={backButton}
        right={ellipsisButton}
      />

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
            onPress={() =>
              navigation.replace('ProjectDetail', { projectId, projectName })
            }
            activeOpacity={0.7}
          >
            <TabText isActive={false}>홈</TabText>
          </TabItem>
          <TabSeparator />
          <TabItem
            isActive={false}
            onPress={() =>
              navigation.replace('ProjectTodo', { projectId, projectName })
            }
            activeOpacity={0.7}
          >
            <TabText isActive={false}>할일</TabText>
          </TabItem>
          <TabSeparator />
          <TabItem
            isActive={false}
            onPress={() =>
              navigation.replace('Schedule', { projectId, projectName })
            }
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
          <SectionHeader>
            <SmallAddButton
              accessibilityLabel="팀 파일 추가"
              activeOpacity={0.7}
              disabled={isLoading || isPicking || isUploading}
              onPress={() => setAddFileModalVisible(true)}
            >
              <PlusIcon width={18} height={18} color="#FF8933" />
            </SmallAddButton>
          </SectionHeader>
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
      <AttachmentSourceModal
        visible={isAddFileModalVisible}
        isPicking={isPicking}
        onClose={() => setAddFileModalVisible(false)}
        onSelectDocument={() => handleSelectAndUpload(selectDocumentFile)}
        onSelectImage={() => handleSelectAndUpload(selectImageFile)}
        onSelectRecent={file =>
          handleSelectAndUpload(() => Promise.resolve(file))
        }
      />
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
              onPress={() => handleOptionClick('move')}
            >
              <FolderMoveIcon width={18} height={18} color="#000000" />
              <PopupOptionText>이동</PopupOptionText>
            </PopupOptionBtn>
            <PopupOptionBtn
              activeOpacity={0.7}
              onPress={() => handleOptionClick('share')}
            >
              <ShareIcon width={18} height={18} color="#000000" />
              <PopupOptionText>공유</PopupOptionText>
            </PopupOptionBtn>
            <PopupOptionBtn
              activeOpacity={0.7}
              onPress={() => handleOptionClick('delete')}
              isLast={true}
            >
              <DeleteIcon width={18} height={18} color="#FF0000" />
              {/* FF4D4D-> FF0000 */}
              <PopupOptionText isDanger={true}>삭제</PopupOptionText>
            </PopupOptionBtn>
          </PopupContent>
        </PopupOverlay>
      </Modal>
      <Modal
        visible={activeModal === 'move'}
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
              <ActionModalTitle>파일 이동</ActionModalTitle>
              <ActionModalSaveBtn onPress={handleMove}>
                <ActionModalSaveText>저장</ActionModalSaveText>
              </ActionModalSaveBtn>
            </ActionModalHeader>
            <ActionModalBody>
              <ActionModalLabel isFirst={true}>현재 위치</ActionModalLabel>
              <ActionModalInputDisabled>
                <ActionModalInputDisabledText>
                  {projectName ?? `프로젝트 ${projectId}`} / 파일
                </ActionModalInputDisabledText>
              </ActionModalInputDisabled>
              <ActionModalLabel isFirst={false}>이동할 위치</ActionModalLabel>
              <ActionModalInput
                value={moveInput}
                onChangeText={setMoveInput}
                placeholder="폴더명을 입력하세요."
                placeholderTextColor="#AAAAAA"
              />
            </ActionModalBody>
          </ActionModalContainer>
        </ActionModalOverlay>
      </Modal>
      <Modal
        visible={activeModal === 'share'}
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
              <ActionModalTitle>파일 공유</ActionModalTitle>
              <ActionModalSaveBtn onPress={handleShare}>
                <ActionModalSaveText>공유</ActionModalSaveText>
              </ActionModalSaveBtn>
            </ActionModalHeader>
            <ActionModalBody>
              <ActionModalLabel isFirst={true}>공유할 멤버</ActionModalLabel>
              <ActionModalInput
                value={shareInput}
                onChangeText={setShareInput}
                placeholder="이름 또는 이메일을 입력하세요."
                placeholderTextColor="#AAAAAA"
              />
              <ActionModalRow>
                <ActionModalRowText>알림 발송</ActionModalRowText>
                <Switch
                  trackColor={{ false: '#E5E5E5', true: '#FF8933' }}
                  thumbColor="#FFFFFF"
                  onValueChange={setIsShareToggleOn}
                  value={isShareToggleOn}
                />
              </ActionModalRow>
            </ActionModalBody>
          </ActionModalContainer>
        </ActionModalOverlay>
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
