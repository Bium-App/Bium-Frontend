import React, { useState } from 'react';
import { Platform, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Header from '../../../components/Header';
import PlusIcon from '../../../assets/icons/ic_plus.svg';

import {
  Container,
  KeyboardContainer,
  ScrollContainer,
  ProfileContainer,
  ProfileImageWrapper,
  BadgeWrapper,
  FormContainer,
  InputGroup,
  Label,
  Input,
  SubmitButton,
  SubmitText
} from './EditProfile.styles';

export default function EditProfile({ navigation }) {
  const [nickname, setNickname] = useState('');
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  
  // 💡 전화번호 상태 추가
  const [phoneNumber, setPhoneNumber] = useState('');

  return (
    <Container>
      <Header
        left={
          <TouchableOpacity onPress={() => navigation.goBack()} activeOpacity={0.7}>
            <Icon name="chevron-back-outline" size={24} color="#FF8933" />
          </TouchableOpacity>
        }
        title="내 정보 수정"
      />
      
      <KeyboardContainer behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollContainer showsVerticalScrollIndicator={false}>
          
          <ProfileContainer>
            <ProfileImageWrapper>
              <Icon name="person" size={88} color="#AEAEB2" />
            </ProfileImageWrapper>
            <BadgeWrapper activeOpacity={0.7}>
              <PlusIcon width={14} height={14} color="#FFFFFF" />
            </BadgeWrapper>
          </ProfileContainer>

          <FormContainer>
            <InputGroup>
              <Label>닉네임</Label>
              <Input
                placeholder="사용자"
                placeholderTextColor="#AAAAAA"
                value={nickname}
                onChangeText={setNickname}
              />
            </InputGroup>

            <InputGroup>
              <Label>아이디</Label>
              <Input
                placeholder="example3"
                placeholderTextColor="#AAAAAA"
                value={userId}
                onChangeText={setUserId}
                autoCapitalize="none"
              />
            </InputGroup>

            <InputGroup>
              <Label>비밀번호</Label>
              <Input
                placeholder="example1234#"
                placeholderTextColor="#AAAAAA"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                autoCapitalize="none"
              />
            </InputGroup>

            <InputGroup>
              <Label>이메일</Label>
              <Input
                placeholder="example@email.com"
                placeholderTextColor="#AAAAAA"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </InputGroup>

            {/* 💡 요청하신 전화번호 입력란 추가 완료! */}
            <InputGroup>
              <Label>전화번호</Label>
              <Input
                placeholder="010-0000-0000"
                placeholderTextColor="#AAAAAA"
                value={phoneNumber}
                onChangeText={setPhoneNumber}
                keyboardType="phone-pad" // 터치 시 숫자 키패드가 뜨도록 설정
              />
            </InputGroup>

            <SubmitButton activeOpacity={0.8}>
              <SubmitText>확인</SubmitText>
            </SubmitButton>
          </FormContainer>

        </ScrollContainer>
      </KeyboardContainer>
    </Container>
  );
}