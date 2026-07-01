import React, { useState } from 'react';
import { TouchableOpacity, Text, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Header from '../../../../components/Header'; // 💡 항상 공통 컴포넌트로 분리해서 사용하는 헤더
import IcFire from '../../../../assets/icons/ic_fire.svg';

import {
  Container,
  SelectAllBar,
  SelectAllButton,
  SelectText,
  ScrollContainer,
  Card,
  CardInner,     
  CardTop,
  CardBottom,
  IconCircle,
  TextContainer,
  CardTitle,
  CardDesc,
  CardDate,
  CheckZone,
  BottomBar,
  RestoreButton,
  RestoreText,
  DeleteButton,
  DeleteText
} from './Trash.styles';

export default function Trash({ navigation }) {
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedIds, setSelectedIds] = useState([]);
  const [trashItems, setTrashItems] = useState([
    { id: 'trash_1', title: '오늘 해야 할 일', desc: '발표 자료 준비하기', remain: '10일' },
    { id: 'trash_2', title: '오늘 해야 할 일', desc: '발표 자료 준비하기', remain: '10일' },
    { id: 'trash_3', title: '오늘 해야 할 일', desc: '발표 자료 준비하기', remain: '10일' },
  ]);
  const handleItemPress = (id) => {
    if (!isEditMode) return;
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter(item => item !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const handleSelectAll = () => {
    if (selectedIds.length === trashItems.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(trashItems.map(item => item.id));
    }
  };

  const handleAction = (type) => {
    if (selectedIds.length === 0) return;
    
    const actionName = type === 'restore' ? '복구' : '영구 삭제';
    Alert.alert("확인", `선택한 ${selectedIds.length}개의 항목을 ${actionName}하시겠습니까?`, [
      { text: "취소" },
      { 
        text: "확인", 
        onPress: () => {
          setTrashItems(trashItems.filter(item => !selectedIds.includes(item.id)));
          setSelectedIds([]);     
          setIsEditMode(false);   
      }
     }
    ]);
  };

  return (
    <Container>

      <Header
        left={
          <TouchableOpacity onPress={() => navigation.goBack()} activeOpacity={0.7}>
            <Icon name="chevron-back-outline" size={24} color="#FF8933" />
          </TouchableOpacity>
        }
        title="휴지통"
        right={
          <TouchableOpacity 
            onPress={() => {
              setIsEditMode(!isEditMode); 
              setSelectedIds([]);       
            }}
          >
            <Text style={{ fontSize: 15, color: '#FF8933', fontWeight: '500' }}>
              {isEditMode ? '취소' : '편집'}
            </Text>
          </TouchableOpacity>
        }
      />

      {/* 💡 isEditMode가 true(편집 모드)일 때만 나타나는 전체 선택 바 */}
      {isEditMode && (
        <SelectAllBar>
          <SelectAllButton onPress={handleSelectAll} activeOpacity={0.7}>
            <Icon 
              // 전체 개수와 선택된 개수가 같으면 꽉 찬 주황색 동그라미, 아니면 빈 회색 동그라미
              name={selectedIds.length === trashItems.length ? "checkmark-circle" : "ellipse-outline"} 
              size={20}    /* 24 -> 20 */
              color={selectedIds.length === trashItems.length ? "#FF8933" : "#9B9B9B"}  /* C7C7CC - >9B9B9B */
            />
            <SelectText>전체</SelectText>
          </SelectAllButton>
          <SelectText style={{ fontWeight: '400', marginLeft: 16 }}> 
            {selectedIds.length}개 선택됨
          </SelectText>
        </SelectAllBar>
      )}
      
      <ScrollContainer showsVerticalScrollIndicator={false}>
        {trashItems.map((item) => {
          const isSelected = selectedIds.includes(item.id);
          return (
            <Card 
              key={item.id} 
              activeOpacity={0.8}
              onPress={() => handleItemPress(item.id)} 
            >
              <CardInner>
                <CardTop>
                  <IconCircle isSelected={isSelected}>
                    <IcFire 
                      width={32} 
                      height={36} 
                      color={isSelected ? '#FF8933' : '#000000'}  /* 1A1A1A -> 000000 */ 
                    />
                  </IconCircle>

                  <TextContainer>
                    <CardTitle>{item.title}</CardTitle>
                    <CardDesc>{item.desc}</CardDesc>
                  </TextContainer>

                  {isEditMode && (
                    <CheckZone>
                      <Icon 
                        name={isSelected ? "checkmark-circle" : "ellipse-outline"} 
                        size={20}    /*24 -> 20  */ 
                        color={isSelected ? "#FF8933" : "#C7C7CC"} /* C7C7CC -> 9B9B9B*/
                      />
                    </CheckZone>
                  )}
                </CardTop>

                <CardBottom>
                  <CardDate>{item.remain}</CardDate>
                </CardBottom>
              </CardInner>
            </Card>
          );
        })}
      </ScrollContainer>

      {isEditMode && (
        <BottomBar>
          <RestoreButton 
            onPress={() => handleAction('restore')} 
            disabled={selectedIds.length === 0} 
            style={{ opacity: selectedIds.length === 0 ? 0.3 : 1 }} // 0개일 때는 흐리게(0.3) 처리하여 시각적으로도 막아둠
          >
            <RestoreText>복구({selectedIds.length})</RestoreText>
          </RestoreButton>
          
          <DeleteButton 
            onPress={() => handleAction('delete')} 
            disabled={selectedIds.length === 0}
            style={{ opacity: selectedIds.length === 0 ? 0.3 : 1 }}
          >
            <DeleteText>삭제({selectedIds.length})</DeleteText>
          </DeleteButton>
        </BottomBar>
      )}
    </Container>
  );
}