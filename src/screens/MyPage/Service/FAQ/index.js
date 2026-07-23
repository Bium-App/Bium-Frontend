import React, { useState } from 'react';
import {
  TouchableOpacity,
  LayoutAnimation,
  UIManager,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Header from '../../../../components/Header';

// 💡 종이와 돋보기를 각각 분리해서 임포트합니다.
import ImgFaqPaper from '../../../../assets/icons/img_faq_paper.svg';
import ImgFaqGlass from '../../../../assets/icons/img_faq_glass.svg';

import {
  Container,
  ScrollContainer,
  TopSection,
  IllustrationBackground,
  GlassWrapper,
  Title,
  Subtitle,
  SearchContainer,
  SearchInput,
  SearchIconWrapper,
  FAQListContainer,
  FAQItemCard,
  FAQQuestionRow,
  FAQQuestionText,
  FAQAnswerContainer,
  FAQAnswerIntro,
  FAQStepRow,
  FAQStepNumberBadge,
  FAQStepNumberText,
  FAQStepText,
} from './FAQ.styles';

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const FAQ_DATA = [
  {
    id: 1,
    question: 'Q. 회원 탈퇴는 어떻게 하나요?',
    answerIntro: 'A. 회원 탈퇴는 아래와 같이 이용할 수 있어요.',
    steps: [
      '마이페이지>설정>회원 탈퇴 메뉴로 이동',
      '탈퇴 시 유의사항을 확인',
      '페이지 하단 ‘탈퇴하기’ 버튼 누르면 탈퇴 완료',
    ],
  },
  {
    id: 2,
    question: 'Q. 비밀번호를 잊어버렸어요',
    answerIntro: 'A. 비밀번호 재설정은 로그인 화면에서 진행할 수 있습니다.',
    steps: [
      '로그인 화면 하단의 "비밀번호 찾기" 클릭',
      '가입 시 등록한 이메일 주소 입력',
      '이메일로 발송된 링크를 통해 새 비밀번호 설정',
    ],
  },
  {
    id: 3,
    question: 'Q. 첨부파일 용량 제한이 있나요?',
    answerIntro: 'A. 네, 원활한 서비스 제공을 위해 용량 제한이 있습니다.',
    steps: [
      '이미지 파일: 건당 최대 10MB',
      '문서 파일: 건당 최대 30MB',
      '동영상 파일: 첨부 불가 (링크 대체 권장)',
    ],
  },
  {
    id: 4,
    question: 'Q. 다른 기기에서도 로그인 할 수 있나요?',
    answerIntro: 'A. 네, 여러 기기에서 동일한 계정으로 로그인할 수 있습니다.',
    steps: [
      '새로운 기기에서 앱 설치 후 기존 계정으로 로그인',
      '기존 데이터는 자동으로 동기화되어 그대로 이용 가능',
      '단, 동시 접속 시 일부 알림이 지연될 수 있습니다.',
    ],
  },
  {
    id: 5,
    question: 'Q. 메모는 어디에 저장되나요?',
    answerIntro: 'A. 작성하신 모든 메모는 안전하게 클라우드에 저장됩니다.',
    steps: [
      '작성 완료 즉시 서버에 자동 동기화',
      '인터넷 연결이 불안정할 경우 기기에 임시 저장 후 추후 동기화',
    ],
  },
  {
    id: 6,
    question: 'Q. 완전히 삭제된 메모는 복구 할 수 없나요?',
    answerIntro: 'A. 안타깝게도 영구 삭제된 데이터는 복구가 불가능합니다.',
    steps: [
      '삭제된 메모는 먼저 "휴지통"으로 이동하여 30일간 보관',
      '휴지통에서 수동으로 영구 삭제하거나 30일이 지나면 완전 삭제됨',
      '중요한 메모는 삭제 전 다시 한번 확인해 주세요.',
    ],
  },
];

export default function FAQ({ navigation }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedId, setExpandedId] = useState(null);

  const toggleExpand = id => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpandedId(expandedId === id ? null : id);
  };

  const filteredFaqData = FAQ_DATA.filter(item =>
    item.question.includes(searchQuery),
  );

  return (
    <Container>
      <Header
        left={
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            activeOpacity={0.7}
          >
            <Icon name="chevron-back-outline" size={24} color="#FF8933" />
          </TouchableOpacity>
        }
        title="자주 묻는 질문"
      />

      <ScrollContainer showsVerticalScrollIndicator={false}>
        <TopSection>
          <IllustrationBackground>
            {/* 1. 배경 한가운데에 종이를 먼저 깔아줍니다 */}
            <ImgFaqPaper width={100} height={132} />

            {/* 2. 그 위에 GlassWrapper를 올려서 절대 좌표(우측 하단)로 띄워줍니다 */}
            <GlassWrapper>
              <ImgFaqGlass width={90} height={90} />
            </GlassWrapper>
          </IllustrationBackground>

          <Title>궁금하신 내용을 찾아보세요</Title>
          <Subtitle>자주 묻는 질문에서 빠르게 해결할 수 있어요.</Subtitle>
        </TopSection>

        <SearchContainer>
          <SearchInput
            placeholder="검색"
            placeholderTextColor="#BBBBBB"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          <SearchIconWrapper activeOpacity={0.7}>
            <Icon name="search-outline" size={20} color="#BBBBBB" />
          </SearchIconWrapper>
        </SearchContainer>

        <FAQListContainer>
          {filteredFaqData.map(item => {
            const isExpanded = expandedId === item.id;

            return (
              <FAQItemCard key={item.id}>
                <FAQQuestionRow
                  activeOpacity={0.7}
                  onPress={() => toggleExpand(item.id)}
                >
                  <FAQQuestionText isExpanded={isExpanded}>
                    {item.question}
                  </FAQQuestionText>
                  <Icon
                    name={isExpanded ? 'chevron-up' : 'chevron-down'}
                    size={20}
                    color="#6E6E6E"
                  />
                </FAQQuestionRow>

                {isExpanded && (
                  <FAQAnswerContainer>
                    <FAQAnswerIntro>{item.answerIntro}</FAQAnswerIntro>
                    {item.steps.map((stepText, index) => {
                      const isLast = index === item.steps.length - 1;
                      return (
                        <FAQStepRow key={index} isLast={isLast}>
                          <FAQStepNumberBadge>
                            <FAQStepNumberText>{index + 1}</FAQStepNumberText>
                          </FAQStepNumberBadge>
                          <FAQStepText>{stepText}</FAQStepText>
                        </FAQStepRow>
                      );
                    })}
                  </FAQAnswerContainer>
                )}
              </FAQItemCard>
            );
          })}
        </FAQListContainer>
      </ScrollContainer>
    </Container>
  );
}
