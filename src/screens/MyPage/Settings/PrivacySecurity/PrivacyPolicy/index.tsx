import React from 'react';
import type {RootScreenProps} from '../../../../../types/navigation';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Header from '../../../../../components/Header'; 
import IcPrivacyCollection from '../../../../../assets/icons/ic_privacy_collection.svg';
import IcPrivacySharing from '../../../../../assets/icons/ic_privacy_sharing.svg';
import IcPrivacyDestruction from '../../../../../assets/icons/ic_privacy_destruction.svg';
import IcPrivacyRights from '../../../../../assets/icons/ic_privacy_rights.svg';

import {
  Container,
  ScrollContainer,
  TopIntroText,
  TopIntroBoldText,
  SectionContainer,
  SectionTitle,
  PolicyCard,
  IconWrapper,
  CardMainText,
  HighlightText,
  BulletListContainer,
  BulletRow,
  BulletDot,
  BulletText
} from './PrivacyPolicy.styles';

export default function PrivacyPolicy({navigation}: RootScreenProps<'PrivacyPolicy'>) {
  return (
    <Container>
      <Header
        left={
          <TouchableOpacity onPress={() => navigation.goBack()} activeOpacity={0.7}>
            <Icon name="chevron-back-outline" size={24} color="#FF8933" />
          </TouchableOpacity>
        }
        title="개인정보 처리방침" 
      />

      <ScrollContainer showsVerticalScrollIndicator={false}>
        
        <TopIntroText>
          주식회사 딸깍(이하 '불메모')은 <TopIntroBoldText>관련 법령*</TopIntroBoldText>에 따라 이용자의 개인정보를 안전하게 처리하고 보호하고 있어요. 불메모는 이용자가 안심하고 서비스를 이용할 수 있도록 개인정보 처리방침을 공개하고 있으며, 개인정보가 어떤 목적으로 수집·이용되는지, 어떻게 보호되는지, 그리고 이용자가 어떤 권리를 가지고 있는지 쉽고 명확하게 안내하고 있어요. 또한 개인정보를 안전하게 관리하기 위한 기술적·관리적 보호조치를 적용하고 있으며, 개인정보와 관련된 문의나 불편 사항이 있을 경우 신속하게 도움을 받을 수 있도록 지원하고 있어요.{'\n\n'}
          <TopIntroBoldText>*관련 법령 : [개인정보보호법], [신용정보법] 등</TopIntroBoldText>
        </TopIntroText>

        <SectionContainer>
          <SectionTitle>1) 개인정보 수집 · 이용</SectionTitle>
          <PolicyCard>
            <IconWrapper>
              <IcPrivacyCollection width={129} height={129} />
            </IconWrapper>
            
            <CardMainText>
              불메모는 서비스를 제공하기 위해 필요한{'\n'}
              <HighlightText>최소한</HighlightText>의 정보만 수집해요.
            </CardMainText>

            <BulletListContainer>
              <BulletRow>
                <BulletDot>-</BulletDot>
                <BulletText>회원가입 시 : 이메일 주소, 비밀번호, 프로필 이름</BulletText>
              </BulletRow>
              <BulletRow>
                <BulletDot>-</BulletDot>
                <BulletText>로그인 시 : 접속 기기 정보, 로그인 기록</BulletText>
              </BulletRow>
              <BulletRow>
                <BulletDot>-</BulletDot>
                <BulletText>메모 작성 시 : 메모 내용, 첨부 파일</BulletText>
              </BulletRow>
              <BulletRow>
                <BulletDot>-</BulletDot>
                <BulletText>팀 스페이스 이용 시 : 프로필 정보, 접속 정보</BulletText>
              </BulletRow>
              <BulletRow>
                <BulletDot>-</BulletDot>
                <BulletText>고객센터 문의 시 : 문의 내용, 답변 기록</BulletText>
              </BulletRow>
              <BulletRow>
                <BulletDot>-</BulletDot>
                <BulletText>서비스 이용 시 : 이용 기록, 접속 시간, 앱 버전 정보</BulletText>
              </BulletRow>
            </BulletListContainer>
          </PolicyCard>
        </SectionContainer>

        <SectionContainer>
          <SectionTitle>2) 개인정보 제공 및 위탁</SectionTitle>
          <PolicyCard>
            <IconWrapper>
              <IcPrivacySharing width={213} height={93} />
            </IconWrapper>
            
            <CardMainText>
              불메모는 서비스 제공에{'\n'}
              <HighlightText>필요한 경우</HighlightText>에만 개인정보를 <HighlightText>전달</HighlightText>해요.
            </CardMainText>

            <BulletListContainer>
              <BulletRow>
                <BulletDot>•</BulletDot>
                <BulletText>회원가입 및 로그인 시 : 간편 로그인을 위해 이메일 혹은 서비스 업체에 인증 정보를 전달해요.</BulletText>
              </BulletRow>
              <BulletRow>
                <BulletDot>•</BulletDot>
                <BulletText>팀 스페이스 이용 시 : 초대된 사용자에게 프로필(이름 및 이메일 주소)이 표시될 수 있어요.</BulletText>
              </BulletRow>
              <BulletRow>
                <BulletDot>•</BulletDot>
                <BulletText>메모 공유 시 : 공유된 메모에 작성된 내용과 수정 이력이 참여자에게 제공돼요.</BulletText>
              </BulletRow>
              <BulletRow>
                <BulletDot>•</BulletDot>
                <BulletText>파일 첨부 시 : 파일 저장 및 동기화를 위해 클라우드 저장 서비스에 데이터를 전달해요.</BulletText>
              </BulletRow>
              <BulletRow>
                <BulletDot>•</BulletDot>
                <BulletText>고객센터 문의 시 : 문의 해결을 위해 고객 지원 업체에 문의 내용을 전달할 수 있어요.</BulletText>
              </BulletRow>
              <BulletRow>
                <BulletDot>•</BulletDot>
                <BulletText>서비스 운영 시 : 서버 장애 및 유지 보수를 위해 일부 업무를 전문 업체에 위탁할 수 있어요.</BulletText>
              </BulletRow>
            </BulletListContainer>
          </PolicyCard>
        </SectionContainer>

        <SectionContainer>
          <SectionTitle>3) 개인정보 보호조치 및 파기</SectionTitle>
          <PolicyCard>
            <IconWrapper>
              <IcPrivacyDestruction width={163} height={130} />
            </IconWrapper>
            
            <CardMainText>
              불메모는 이용자의 정보를{'\n'}
              <HighlightText>안전하게 보호</HighlightText>하고 있어요.
            </CardMainText>

            <BulletListContainer>
              <BulletRow>
                <BulletDot>•</BulletDot>
                <BulletText>모든 데이터는 암호화하여 보관해요.</BulletText>
              </BulletRow>
              <BulletRow>
                <BulletDot>•</BulletDot>
                <BulletText>안전한 HTTPS 통신을 사용해요.</BulletText>
              </BulletRow>
              <BulletRow>
                <BulletDot>•</BulletDot>
                <BulletText>개인정보 접근 권한을 최소화하여 관리해요.</BulletText>
              </BulletRow>
              <BulletRow>
                <BulletDot>•</BulletDot>
                <BulletText>정기적으로 보안 점검을 진행해요.</BulletText>
              </BulletRow>
              <BulletRow>
                <BulletDot>•</BulletDot>
                <BulletText>회원 탈퇴 시 개인정보를 안전하게 삭제해요.</BulletText>
              </BulletRow>
              <BulletRow>
                <BulletDot>•</BulletDot>
                <BulletText>법령에 의한 보관 기간이 경과하면 즉시 파기해요.</BulletText>
              </BulletRow>
            </BulletListContainer>
          </PolicyCard>
        </SectionContainer>

        <SectionContainer>
          <SectionTitle>4) 이용자 권리 보호</SectionTitle>
          <PolicyCard>
            <IconWrapper>
              <IcPrivacyRights width={155} height={130} />
            </IconWrapper>
            
            <CardMainText>
              이용자는 자신의 개인정보를{'\n'}
              <HighlightText>직접 관리</HighlightText>할 수 있어요.
            </CardMainText>

            <BulletListContainer>
              <BulletRow>
                <BulletDot>•</BulletDot>
                <BulletText>개인정보 조회</BulletText>
              </BulletRow>
              <BulletRow>
                <BulletDot>•</BulletDot>
                <BulletText>개인정보 수정</BulletText>
              </BulletRow>
              <BulletRow>
                <BulletDot>•</BulletDot>
                <BulletText>계정 탈퇴</BulletText>
              </BulletRow>
              <BulletRow>
                <BulletDot>•</BulletDot>
                <BulletText>메모 데이터 삭제</BulletText>
              </BulletRow>
              <BulletRow>
                <BulletDot>•</BulletDot>
                <BulletText>마케팅 정보 수신 거부</BulletText>
              </BulletRow>
              <BulletRow>
                <BulletDot>•</BulletDot>
                <BulletText>개인정보 처리 동의 철회</BulletText>
              </BulletRow>
              <BulletRow>
                <BulletDot>•</BulletDot>
                <BulletText>개인정보 관련 불편 및 신고</BulletText>
              </BulletRow>
            </BulletListContainer>
          </PolicyCard>
        </SectionContainer>
      </ScrollContainer>
    </Container>
  );
}
