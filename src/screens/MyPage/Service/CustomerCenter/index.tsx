import React from 'react';
import type {RootScreenProps} from '../../../../types/navigation';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Header from '../../../../components/Header';
import IcHeadset from '../../../../assets/icons/ic_headset.svg';
import IcChat from '../../../../assets/icons/ic_chat.svg';
import IcCall from '../../../../assets/icons/ic_call.svg';
import IcMegaphone from '../../../../assets/icons/ic_megaphone.svg';

import {
  Container,
  ScrollContainer,
  TopSection,
  TopTextContainer,
  TopText,
  Card,
  IconCircle,
  TextContainer,
  CardTitle,
  CardDesc,
} from './CustomerCenter.styles';

export default function CustomerCenter({navigation}: RootScreenProps<'CustomerCenter'>) {
  const menuItems = [
    {
      title: '1:1문의',
      desc: '문의사항을 남겨주시면\n빠르게 답변드리겠습니다.',
      SvgIcon: IcChat,
      route: 'Inquiry',
    },
    {
      title: '전화 문의',
      desc: '상담원과 직접 통화하여\n도움을 받으세요.',
      SvgIcon: IcCall,
      route: 'PhoneInquiry',
    },
    {
      title: '문의 내역',
      desc: '등록한 문의와\n답변을 확인해보세요.',
      SvgIcon: IcChat,
      route: 'InquiryHistory',
    },
    {
      title: '자주 묻는 질문',
      desc: '많은 분들이 궁금해하시는\n질문을 확인해보세요.',
      SvgIcon: IcMegaphone,
      route: 'FAQ',
    },
  ] as const;

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
        title="고객센터"
      />

      <ScrollContainer showsVerticalScrollIndicator={false}>
        <TopSection>
          <TopTextContainer>
            <TopText>도움이 필요하신가요?</TopText>
            <TopText>궁금한 점을 해결해보세요.</TopText>
          </TopTextContainer>
          <IcHeadset width={79} height={70} color="#1A1A1A" />
        </TopSection>

        {menuItems.map((item, index) => (
          <Card
            key={index}
            activeOpacity={0.7}
            onPress={() => navigation.navigate(item.route)}
          >
            <IconCircle>
              <item.SvgIcon width={24} height={24} color="#1A1A1A" />
            </IconCircle>
            <TextContainer>
              <CardTitle>{item.title}</CardTitle>
              <CardDesc>{item.desc}</CardDesc>
            </TextContainer>
            <Icon name="chevron-forward" size={20} color="#0000004D" />
          </Card>
        ))}
      </ScrollContainer>
    </Container>
  );
}
