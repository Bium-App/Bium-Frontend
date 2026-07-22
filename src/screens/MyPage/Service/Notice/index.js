import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Header from '../../../../components/Header'; // 경로에 맞게 점(.) 개수를 조절해 주세요

import {
  Container,
  NoticeList,
} from './Notice.styles';

export default function Notice({ navigation }) {
  return (
    <Container>
      <Header
        left={
          <TouchableOpacity onPress={() => navigation.goBack()} activeOpacity={0.7}>
            <Icon name="chevron-back-outline" size={24} color="#FF8933" />
          </TouchableOpacity>
        }
        title="공지사항"
      />
      
      <NoticeList
        data={[]}
        renderItem={() => null}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <Text
            style={{ textAlign: 'center', marginTop: 48, color: '#999999' }}
          >
            등록된 공지사항이 없습니다.
          </Text>
        }
      />
    </Container>
  );
}
