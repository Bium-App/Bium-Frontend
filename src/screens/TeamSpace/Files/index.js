import React, { useState } from 'react';
import { StatusBar, ScrollView, Modal, Switch } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Header from '../../../components/Header'; 

import PlusIcon from '../../../assets/icons/ic_plus.svg'; 
import FolderOutlineIcon from '../../../assets/icons/ic_folder_outline.svg'; 
import FileDocIcon from '../../../assets/icons/ic_file.svg'; 
import FileImageIcon from '../../../assets/icons/ic_image.svg'; 
import DownloadIcon from '../../../assets/icons/ic_download.svg'; 
import EditIcon from '../../../assets/icons/ic_edit.svg'; 
import FolderMoveIcon from '../../../assets/icons/ic_folder_move.svg'; 
import ShareIcon from '../../../assets/icons/ic_share.svg'; 
import DeleteIcon from '../../../assets/icons/ic_delete.svg'; 
import PhoneIcon from '../../../assets/icons/ic_phone.svg'; 
import AudioIcon from '../../../assets/icons/ic_audio.svg'; 
import CloudIcon from '../../../assets/icons/ic_cloud.svg'; 

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
  AddFileModalOverlay,
  AddFileModalContainer,
  AddFileModalHeader,
  AddFileModalTitle,
  AddFileModalCloseBtn,
  AddFileModalBody,
  AddFileSectionLabel,
  AddFileSearchContainer,
  AddFileSearchInput,
  AddFileMethodRow,
  AddFileMethodBox,
  AddFileMethodText,
  AddFileRecentHeaderRow,
  AddFileRecentListCard,
  AddFileRecentScroll,
  AddFileRecentContent,
  AddFileRecentListItem,
  AddFileRecentSubtitle 
} from './Files.styles';

export default function Files({ navigation }) {
  const [isPopupVisible, setPopupVisible] = useState(false); 
  const [activeModal, setActiveModal] = useState(null);
  const [isAddFileModalVisible, setAddFileModalVisible] = useState(false);
  const [renameInput, setRenameInput] = useState('');
  const [moveInput, setMoveInput] = useState('');
  const [shareInput, setShareInput] = useState('');
  const [isShareToggleOn, setIsShareToggleOn] = useState(true);
  const fileList = [
    { id: 1, type: 'folder', title: '아카이브.zip', info: '28.4 KB 1시간전' },
    { id: 2, type: 'file', title: '아카이브.zip', info: '28.4 KB 1시간전' },
    { id: 3, type: 'image', title: '아카이브.zip', info: '28.4 KB 1시간전' },
    { id: 4, type: 'file', title: '아카이브.zip', info: '28.4 KB 1시간전' },
    { id: 5, type: 'folder', title: '아카이브.zip', info: '28.4 KB 1시간전' },
    { id: 6, type: 'file', title: '아카이브.zip', info: '28.4 KB 1시간전' },
    { id: 7, type: 'image', title: '아카이브.zip', info: '28.4 KB 1시간전' },
    { id: 8, type: 'folder', title: '아카이브.zip', info: '28.4 KB 1시간전' },
  ];
  const recentFileList = [
    { id: 101, type: 'file', title: '아카이브.zip', info: '28.4 KB' },
    { id: 102, type: 'image', title: '아카이브.zip', info: '28.4 KB' },
    { id: 103, type: 'file', title: '기획서.pdf', info: '1.2 MB' },
    { id: 104, type: 'image', title: '로고.png', info: '450 KB' },
  ];
  const backButton = (
    <HeaderBackButton onPress={() => navigation.goBack()} activeOpacity={0.8}>
      <Icon name="chevron-back" size={26} color="#FF8933" />
    </HeaderBackButton>
  );
  const ellipsisButton = (
    <HeaderBackButton onPress={() => {}} activeOpacity={0.8}>
      <Icon name="ellipsis-horizontal" size={24} color="#FF8933" />
    </HeaderBackButton>
  );
  const handleOpenPopup = (item) => {
    setRenameInput(item.title);
    setPopupVisible(true);
  };
  const handleClosePopup = () => {
    setPopupVisible(false);
  };
  const handleOptionClick = (type) => {
    setPopupVisible(false);
    setActiveModal(type);
  };
  const handleCloseActionModal = () => {
    setActiveModal(null);
  };

  return (
    <Container>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      
      <Header title="프로젝트1" left={backButton} right={ellipsisButton} />

      <ScrollView showsVerticalScrollIndicator={false}>
        <SearchContainer>
          <Icon name="search-outline" size={20} color="#000000" />
          <SearchInput placeholder="검색" placeholderTextColor="#000000" />
        </SearchContainer>
        <TabContainer>
          <TabItem isActive={false} onPress={() => navigation.replace('ProjectDetail')} activeOpacity={0.7}>
            <TabText isActive={false}>홈</TabText>
          </TabItem>
          <TabSeparator />
          <TabItem isActive={false} onPress={() => navigation.replace('ProjectTodo')} activeOpacity={0.7}>
            <TabText isActive={false}>할일</TabText>
          </TabItem>
          <TabSeparator />
          <TabItem isActive={false} onPress={() => navigation.replace('Schedule')} activeOpacity={0.7}>
            <TabText isActive={false}>일정</TabText>
          </TabItem>
          <TabSeparator />
          <TabItem isActive={true} activeOpacity={1}>
            <TabText isActive={true}>파일</TabText>
          </TabItem>
        </TabContainer>
        <SectionContainer>
          <SectionHeader>
            <SmallAddButton activeOpacity={0.7} onPress={() => setAddFileModalVisible(true)}>
              <PlusIcon width={15} height={15} color="#FF8933" />
            </SmallAddButton>
          </SectionHeader>
          <ListCard>
            {fileList.map((file, index) => (
              <TouchableListItem 
                key={file.id} 
                isLast={index === fileList.length - 1} 
                activeOpacity={0.7}
              >
                <ListItemLeft>
                  <IconWrapper>
                    {file.type === 'folder' && <FolderOutlineIcon width={35} height={35} color="#FF8933" />}
                    {file.type === 'file' && <FileDocIcon width={35} height={35} color="#FF8933" />}
                    {file.type === 'image' && <FileImageIcon width={35} height={35} color="#FF8933" />}
                  </IconWrapper>
                  <TextColumn>
                    <ListItemTitle>{file.title}</ListItemTitle>
                    <ListItemSubtitle>{file.info}</ListItemSubtitle>
                  </TextColumn>
                </ListItemLeft>
                <ListItemRight>
                  <ActionIconBtn activeOpacity={0.7} onPress={() => {}}>
                    <DownloadIcon width={21.6} height={19.6} color="#FF8933" />
                  </ActionIconBtn>
                  <ActionIconBtn activeOpacity={0.7} onPress={() => handleOpenPopup(file)}>
                    <Icon name="ellipsis-horizontal" size={20} color="#AAAAAA" />
                  </ActionIconBtn>
                </ListItemRight>
              </TouchableListItem>
            ))}
          </ListCard>
        </SectionContainer>
      </ScrollView>
      <Modal
        visible={isAddFileModalVisible}
        transparent={true}
        animationType="fade" 
        onRequestClose={() => setAddFileModalVisible(false)} 
      >
        <AddFileModalOverlay activeOpacity={1} onPress={() => setAddFileModalVisible(false)}>
          <AddFileModalContainer onStartShouldSetResponder={() => true}>
            <AddFileModalHeader>
              <AddFileModalTitle>파일 추가</AddFileModalTitle>
              <AddFileModalCloseBtn onPress={() => setAddFileModalVisible(false)}>
                <Icon name="close" size={24} color="#6E6E6E" />
              </AddFileModalCloseBtn>
            </AddFileModalHeader>
            <AddFileModalBody>
              <AddFileSectionLabel isFirst={true}>파일</AddFileSectionLabel>
              <AddFileSearchContainer>
                <Icon name="search-outline" size={18} color="#000000" />
                <AddFileSearchInput placeholder="검색" placeholderTextColor="#000000" />
              </AddFileSearchContainer>
              <AddFileSectionLabel isFirst={false}>추가방식</AddFileSectionLabel>
              <AddFileMethodRow>
                <AddFileMethodBox activeOpacity={0.7}>
                  <PhoneIcon width={24} height={24} color="#FF8933" />
                  <AddFileMethodText>기기</AddFileMethodText>
                </AddFileMethodBox>
                <AddFileMethodBox activeOpacity={0.7}>
                  <FileImageIcon width={24} height={24} color="#FF8933" />
                  <AddFileMethodText>앨범</AddFileMethodText>
                </AddFileMethodBox>
                <AddFileMethodBox activeOpacity={0.7}>
                  <AudioIcon width={24} height={24} color="#FF8933" />
                  <AddFileMethodText>오디오</AddFileMethodText>
                </AddFileMethodBox>
                <AddFileMethodBox activeOpacity={0.7}>
                  <CloudIcon width={28} height={28} color="#FF8933" />
                  <AddFileMethodText>클라우드</AddFileMethodText>
                </AddFileMethodBox>
              </AddFileMethodRow>
              <AddFileRecentHeaderRow>
                <AddFileSectionLabel isFirst={true} noMarginBottom={true}>최근파일</AddFileSectionLabel>
              </AddFileRecentHeaderRow>
              <AddFileRecentListCard>
                <AddFileRecentScroll 
                  showsVerticalScrollIndicator={true} 
                  nestedScrollEnabled={true} 
                >
                  <AddFileRecentContent>
                    {recentFileList.map((file, index) => (
                      <AddFileRecentListItem 
                        key={file.id} 
                        isLast={index === recentFileList.length - 1}
                        activeOpacity={0.7}
                      >
                        <ListItemLeft>
                          <IconWrapper>
                            {file.type === 'file' && <FileDocIcon width={24} height={24} color="#FF8933" />}
                            {file.type === 'image' && <FileImageIcon width={24} height={24} color="#FF8933" />}
                          </IconWrapper>
                          <TextColumn>
                            <ListItemTitle>{file.title}</ListItemTitle>
                            <AddFileRecentSubtitle>{file.info}</AddFileRecentSubtitle>
                          </TextColumn>
                        </ListItemLeft>
                        <ListItemRight>
                          <ActionIconBtn activeOpacity={0.7}>
                            <Icon name="add" size={20} color="#FF8933" />
                          </ActionIconBtn>
                        </ListItemRight>
                      </AddFileRecentListItem>
                    ))}
                  </AddFileRecentContent>
                </AddFileRecentScroll>
              </AddFileRecentListCard>
            </AddFileModalBody>
          </AddFileModalContainer>
        </AddFileModalOverlay>
      </Modal>
      <Modal
        visible={isPopupVisible}
        transparent={true} 
        animationType="fade" 
        onRequestClose={handleClosePopup} 
      >
        <PopupOverlay activeOpacity={1} onPress={handleClosePopup}>
          <PopupContent onStartShouldSetResponder={() => true}>
            <PopupOptionBtn activeOpacity={0.7} onPress={() => handleOptionClick('rename')}>
              <EditIcon width={18} height={18} color="#000000" />
              <PopupOptionText>이름 변경</PopupOptionText>
            </PopupOptionBtn>
            <PopupOptionBtn activeOpacity={0.7} onPress={() => handleOptionClick('move')}>
              <FolderMoveIcon width={18} height={18} color="#000000" />
              <PopupOptionText>이동</PopupOptionText>
            </PopupOptionBtn>
            <PopupOptionBtn activeOpacity={0.7} onPress={() => handleOptionClick('share')}>
              <ShareIcon width={18} height={18} color="#000000" />
              <PopupOptionText>공유</PopupOptionText>
            </PopupOptionBtn>
            <PopupOptionBtn activeOpacity={0.7} onPress={() => handleOptionClick('delete')} isLast={true}>
              <DeleteIcon width={18} height={18} color="#FF0000" /> { /* FF4D4D-> FF0000 */ }
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
              <ActionModalSaveBtn onPress={handleCloseActionModal}>
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
              <ActionModalSaveBtn onPress={handleCloseActionModal}>
                <ActionModalSaveText>저장</ActionModalSaveText>
              </ActionModalSaveBtn>
            </ActionModalHeader>
            <ActionModalBody>
              <ActionModalLabel isFirst={true}>현재 위치</ActionModalLabel>
              <ActionModalInputDisabled>
                <ActionModalInputDisabledText>프로젝트1 / 파일</ActionModalInputDisabledText>
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
              <ActionModalSaveBtn onPress={handleCloseActionModal}>
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
              <ActionModalSaveBtn onPress={handleCloseActionModal}>
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