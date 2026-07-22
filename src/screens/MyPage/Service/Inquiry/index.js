import React from 'react';
import { TouchableOpacity, Alert, View, Modal } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Header from '../../../../components/Header';
import IcMegaphone from '../../../../assets/icons/ic_megaphone-outline.svg';
import IcPersonCircle from '../../../../assets/icons/ic_person-circle-outline.svg';
import IcDocumentText from '../../../../assets/icons/ic_document-text-outline.svg';
import IcBug from '../../../../assets/icons/ic_bug-outline.svg';
import IcChatbubble from '../../../../assets/icons/ic_chatbubble-ellipses-outline.svg';
import IcFolder from '../../../../assets/icons/ic_folder.svg';
import PhoneIcon from '../../../../assets/icons/ic_phone.svg';
import FileImageIcon from '../../../../assets/icons/ic_image.svg';
import AudioIcon from '../../../../assets/icons/ic_audio.svg';
import CloudIcon from '../../../../assets/icons/ic_cloud.svg';
import FileDocIcon from '../../../../assets/icons/ic_file.svg';
import { useInquiryForm } from '../../../../hooks/useInquiryForm';

import {
  Container,
  ScrollContainer,
  TopText,
  SectionTitle,
  DropdownWrapper,
  DropdownHeader,
  DropdownHeaderLeft,
  DropdownSelectedIconWrapper,
  DropdownText,
  DropdownList,
  DropdownItem,
  DropdownItemIconWrapper,
  DropdownItemTextContainer,
  DropdownItemTitle,
  DropdownItemDesc,
  InputWrapper,
  TitleInput,
  ContentInputWrapper,
  ContentInput,
  CharCount,
  AttachLabel,
  AttachButton,
  AttachText,
  SubmitButtonContainer,
  SubmitButton,
  SubmitText,
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
  AddFileRecentSubtitle,
  ListItemLeft,
  IconWrapper,
  TextColumn,
  ListItemTitle,
  ListItemRight,
  ActionIconBtn,
} from './Inquiry.styles';

const INQUIRY_TYPES = [
  {
    id: 'service',
    title: '서비스 이용',
    desc: '서비스 이용 방법, 기능 관련 문의',
    Icon: IcMegaphone,
  },
  {
    id: 'account',
    title: '계정 및 보안',
    desc: '로그인, 정보 수정, 보안 설정 관련 문의',
    Icon: IcPersonCircle,
  },
  {
    id: 'file',
    title: '첨부파일 관련',
    desc: '파일 업로드, 다운로드, 오류 관련 문의',
    Icon: IcDocumentText,
  },
  {
    id: 'bug',
    title: '오류 및 장애',
    desc: '서비스 오류, 접속 문제, 장애 신고',
    Icon: IcBug,
  },
  { id: 'etc', title: '기타 문의', desc: '기타 문의 사항', Icon: IcChatbubble },
];

export default function Inquiry({ navigation }) {
  const {
    isDropdownOpen,
    setIsDropdownOpen,
    isAddFileModalVisible,
    setAddFileModalVisible,
    selectedType,
    title,
    setTitle,
    content,
    setContent,
    isLoading,
    isSubmitEnabled,
    handleSelectType,
    handleSubmit,
  } = useInquiryForm(navigation);

  const recentFileList = [
    { id: 101, type: 'file', title: '아카이브.zip', info: '28.4 KB' },
    { id: 102, type: 'image', title: '아카이브.zip', info: '28.4 KB' },
    { id: 103, type: 'file', title: '기획서.pdf', info: '1.2 MB' },
    { id: 104, type: 'image', title: '로고.png', info: '450 KB' },
  ];

  const SelectedIcon = selectedType ? selectedType.Icon : null;

  return (
    <Container>
      {/* 최상단 공통 헤더 */}
      <Header
        left={
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            activeOpacity={0.7}
          >
            <Icon name="chevron-back-outline" size={24} color="#FF8933" />
          </TouchableOpacity>
        }
        title="1:1 문의"
      />

      <ScrollContainer
        scrollEnabled={!isDropdownOpen}
        showsVerticalScrollIndicator={false}
      >
        <TopText>문의하실 내용을 입력해주세요.</TopText>

        <SectionTitle>문의 유형</SectionTitle>

        <DropdownWrapper>
          <DropdownHeader
            activeOpacity={0.8}
            onPress={() => setIsDropdownOpen(!isDropdownOpen)}
            isOpen={isDropdownOpen}
          >
            <DropdownHeaderLeft>
              {/* 항목이 선택되어 SelectedIcon이 존재할 때만 렌더링 */}
              {SelectedIcon && (
                <DropdownSelectedIconWrapper>
                  {/* 추출해 둔 SVG 컴포넌트에 주황색 컬러값을 주어 렌더링합니다! */}
                  <SelectedIcon width={24} height={24} color="#FF8933" />
                </DropdownSelectedIconWrapper>
              )}

              <DropdownText hasValue={!!selectedType}>
                {selectedType
                  ? selectedType.title
                  : '문의 유형을 선택해주세요.'}
              </DropdownText>
            </DropdownHeaderLeft>

            {/* 우측 열고 닫는 화살표 아이콘 */}
            <Icon
              name={isDropdownOpen ? 'chevron-up' : 'chevron-down'}
              width={10}
              height={22}
              color={isDropdownOpen ? '#FF8933' : '#C7C7CC'}
            />
          </DropdownHeader>

          {/* isDropdownOpen 상태가 true일 때만 목록이 열림 */}
          {isDropdownOpen && (
            <DropdownList>
              {INQUIRY_TYPES.map(type => {
                const isSelected = selectedType?.id === type.id;
                const SvgIcon = type.Icon;

                return (
                  <DropdownItem
                    key={type.id}
                    activeOpacity={0.7}
                    isSelected={isSelected}
                    onPress={() => handleSelectType(type)}
                  >
                    <DropdownItemIconWrapper>
                      {/* 목록 내부 아이콘: 선택되면 주황색, 아니면 회색 */}
                      <SvgIcon
                        width={24}
                        height={24}
                        color={isSelected ? '#FF8933' : '#8E8E93'}
                      />
                    </DropdownItemIconWrapper>

                    <DropdownItemTextContainer>
                      <DropdownItemTitle isSelected={isSelected}>
                        {type.title}
                      </DropdownItemTitle>
                      <DropdownItemDesc>{type.desc}</DropdownItemDesc>
                    </DropdownItemTextContainer>
                  </DropdownItem>
                );
              })}
            </DropdownList>
          )}
        </DropdownWrapper>

        <View style={{ zIndex: 1 }}>
          <SectionTitle>제목</SectionTitle>
          <InputWrapper>
            <TitleInput
              placeholder="제목을 입력해주세요 (최대 50자)"
              placeholderTextColor="#999999"
              maxLength={50}
              value={title}
              onChangeText={setTitle}
            />
          </InputWrapper>

          <SectionTitle>내용</SectionTitle>
          <InputWrapper>
            <ContentInputWrapper>
              <ContentInput
                placeholder="메모를 문의 내용을 자세히 입력해주세요 (최대 1,000자)"
                placeholderTextColor="#999999"
                multiline
                maxLength={1000}
                value={content}
                onChangeText={setContent}
              />
              <CharCount>{content.length}/1,000</CharCount>
            </ContentInputWrapper>
          </InputWrapper>

          <AttachLabel>첨부파일 (선택)</AttachLabel>
          <AttachButton
            activeOpacity={0.8}
            onPress={() =>
              Alert.alert(
                '안내',
                'S3 업로드 API는 연결됐습니다. 파일 선택기 연결 후 첨부를 사용할 수 있습니다.',
              )
            }
          >
            <IcFolder width={22} height={20} color="#000000" />
            <AttachText>파일 첨부하기</AttachText>
          </AttachButton>
        </View>
      </ScrollContainer>

      <SubmitButtonContainer>
        <SubmitButton
          activeOpacity={0.8}
          disabled={!isSubmitEnabled || isLoading}
          onPress={handleSubmit}
        >
          <SubmitText>문의하기</SubmitText>
        </SubmitButton>
      </SubmitButtonContainer>

      <Modal
        visible={isAddFileModalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setAddFileModalVisible(false)}
      >
        <AddFileModalOverlay
          activeOpacity={1}
          onPress={() => setAddFileModalVisible(false)}
        >
          {/* onStartShouldSetResponder: 배경을 눌렀을 때 모달이 닫히도록 하되, 팝업 내부 터치는 막음 */}
          <AddFileModalContainer onStartShouldSetResponder={() => true}>
            <AddFileModalHeader>
              <AddFileModalTitle>파일 추가</AddFileModalTitle>
              <AddFileModalCloseBtn
                onPress={() => setAddFileModalVisible(false)}
              >
                <Icon name="close" size={24} color="#6E6E6E" />
              </AddFileModalCloseBtn>
            </AddFileModalHeader>
            <AddFileModalBody>
              <AddFileSectionLabel isFirst={true}>파일</AddFileSectionLabel>
              <AddFileSearchContainer>
                <Icon name="search-outline" size={18} color="#000000" />
                <AddFileSearchInput
                  placeholder="검색"
                  placeholderTextColor="#000000"
                />
              </AddFileSearchContainer>
              <AddFileSectionLabel isFirst={false}>
                추가방식
              </AddFileSectionLabel>
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
                <AddFileSectionLabel isFirst={true} noMarginBottom={true}>
                  최근파일
                </AddFileSectionLabel>
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
                            {file.type === 'file' && (
                              <FileDocIcon
                                width={24}
                                height={24}
                                color="#FF8933"
                              />
                            )}
                            {file.type === 'image' && (
                              <FileImageIcon
                                width={24}
                                height={24}
                                color="#FF8933"
                              />
                            )}
                          </IconWrapper>
                          <TextColumn>
                            <ListItemTitle>{file.title}</ListItemTitle>
                            <AddFileRecentSubtitle>
                              {file.info}
                            </AddFileRecentSubtitle>
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
    </Container>
  );
}
