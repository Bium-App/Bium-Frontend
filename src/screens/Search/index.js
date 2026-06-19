import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  Container,
  SearchHeaderContainer,
  SearchInputContainer,
  SearchLabel,
  VerticalDivider,
  SearchInput,
  HeaderDivider,
  SectionContainer,
  SectionHeader,
  SectionTitle,
  DeleteAllText,
  ChipContainer,
  RecentChip,
  RecentChipText,
  ChipDeleteButton,
  RecommendChip,
  RecommendIcon,
  RecommendChipText,
  RecommendSectionContainer,
  RecommendSectionHeader
} from './Search.styles';

export default function Search({ navigation }) {
  const insets = useSafeAreaInsets();
  const [keyword, setKeyword] = useState('');
  
  const [recentSearches, setRecentSearches] = useState([
    { id: '1', text: '할일' }
  ]);
  
  const [recommendedSearches] = useState([
    '발표', '회의', '독서', '아이디어', 
    '계획', '운동', '여행', '인사이트'
  ]); 

  const handleDeleteRecent = (id) => {
    setRecentSearches(recentSearches.filter(item => item.id !== id));
  };

  const handleDeleteAll = () => {
    setRecentSearches([]);
  };

  return (
    <Container>
      <SearchHeaderContainer paddingTop={insets.top}>
        <TouchableOpacity onPress={() => navigation.goBack()} activeOpacity={0.7}>
          <Icon name="chevron-back-outline" size={24} color="#AAAAAA" /> 
        </TouchableOpacity>
        <SearchInputContainer>
          <Icon name="search-outline" size={28} color="#FF8933" /> 
          <SearchLabel>검색</SearchLabel>
          <VerticalDivider />
          <SearchInput
            placeholder=""
            value={keyword}
            onChangeText={setKeyword}
            autoFocus
          />
        </SearchInputContainer>
      </SearchHeaderContainer>
      
      <HeaderDivider />

      <SectionContainer>
        <SectionHeader>
          <SectionTitle>최근검색</SectionTitle>
          <TouchableOpacity onPress={handleDeleteAll} activeOpacity={0.7}>
            <DeleteAllText>전체삭제</DeleteAllText>
          </TouchableOpacity>
        </SectionHeader>
        <ChipContainer>
          {recentSearches.map((item) => (
            <RecentChip key={item.id}>
              <RecentChipText>{item.text}</RecentChipText>
              <ChipDeleteButton onPress={() => handleDeleteRecent(item.id)} activeOpacity={0.7}>
                <Icon name="close" size={16} color="#FF8933" /> 
              </ChipDeleteButton>
            </RecentChip>
          ))}
        </ChipContainer>
      </SectionContainer>

      <RecommendSectionContainer>
        <RecommendSectionHeader>
          <SectionTitle>추천 검색어</SectionTitle>
        </RecommendSectionHeader>
        <ChipContainer>
          {recommendedSearches.map((text, index) => (
            <RecommendChip key={index}>
              <RecommendIcon>
                <Icon name="search-outline" size={16} color="#FF8933" /> 
              </RecommendIcon>
              <RecommendChipText>{text}</RecommendChipText>
            </RecommendChip>
          ))}
        </ChipContainer>
      </RecommendSectionContainer>
    </Container>
  );
}