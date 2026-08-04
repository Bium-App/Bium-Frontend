import React from 'react';
import type {RootScreenProps} from '../../../../types/navigation';
import {TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Header from '../../../../components/Header';
import IcMegaphone from '../../../../assets/icons/ic_megaphone-outline.svg';
import IcPersonCircle from '../../../../assets/icons/ic_person-circle-outline.svg';
import IcDocumentText from '../../../../assets/icons/ic_document-text-outline.svg';
import IcBug from '../../../../assets/icons/ic_bug-outline.svg';
import IcChatbubble from '../../../../assets/icons/ic_chatbubble-ellipses-outline.svg';
import { useInquiryForm } from '../../../../hooks/useInquiryForm';
import FilePickerField from '../../../../components/FilePickerField';

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
  SubmitButtonContainer,
  SubmitButton,
  SubmitText,
  FormLayer,
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

export default function Inquiry({navigation}: RootScreenProps<'Inquiry'>) {
  const {
    isDropdownOpen,
    setIsDropdownOpen,
    selectedType,
    title,
    setTitle,
    content,
    setContent,
    attachmentFile,
    isPickingAttachment,
    isLoading,
    isSubmitEnabled,
    handleSelectType,
    selectAttachment,
    removeAttachment,
    handleSubmit,
  } = useInquiryForm(navigation);

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
              size={22}
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

        <FormLayer>
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

          <FilePickerField
            label="첨부 이미지 (선택)"
            helperText="이미지 1개, 최대 10MB까지 첨부할 수 있습니다."
            file={attachmentFile}
            kind="image"
            isPicking={isPickingAttachment}
            disabled={isLoading}
            onSelect={selectAttachment}
            onRemove={removeAttachment}
          />
        </FormLayer>
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
    </Container>
  );
}
