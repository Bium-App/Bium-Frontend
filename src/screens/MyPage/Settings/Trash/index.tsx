import React, { useState, useEffect } from 'react';
import type {RootScreenProps} from '../../../../types/navigation';
import {TouchableOpacity, Alert, RefreshControl} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useTranslation} from 'react-i18next';
import Header from '../../../../components/Header';
import AsyncState from '../../../../components/AsyncState';
import IcFire from '../../../../assets/icons/ic_fire.svg';
import IcIce from '../../../../assets/icons/ic_ice.svg';
import { useTrash } from '../../../../hooks/useTrash';

import {
  Container,
  SelectAllBar,
  SelectAllButton,
  SelectText,
  HeaderEditText,
  SelectedCountText,
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
  DeleteText,
} from './Trash.styles';

// 휴지통 화면. 삭제되거나 만료되어 TRASH로 옮겨진 메모를 다중 선택해 복원하거나 영구 삭제한다.
export default function Trash({navigation}: RootScreenProps<'Trash'>) {
  const {t} = useTranslation();
  const { 
    trashItems, isLoading, errorMessage, fetchTrashMemos,
    handleRestoreMemos, handlePermanentDeleteMemos 
  } = useTrash();

  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  useEffect(() => {
    fetchTrashMemos();
  }, [fetchTrashMemos]);

  const handleItemPress = (id: string) => {
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

  const handleAction = (type: 'restore' | 'delete') => {
    if (selectedIds.length === 0) return;
    
    const actionName = type === 'restore' ? t('trash.restore') : t('trash.permanent_delete');
    Alert.alert(t('common.confirm'), t('trash.confirm_action', {count: selectedIds.length, action: actionName}), [
      { text: t('trash.cancel') },
      { 
        text: t('common.confirm'), 
        onPress: () => {
          const onSuccess = () => {
            setSelectedIds([]);     
            setIsEditMode(false);
            fetchTrashMemos();
          };

          if (type === 'restore') {
            handleRestoreMemos(selectedIds, onSuccess);
          } else {
            handlePermanentDeleteMemos(selectedIds, onSuccess);
          }
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
        title={t('my_page.trash')}
        right={
          <TouchableOpacity 
            onPress={() => {
              setIsEditMode(!isEditMode); 
              setSelectedIds([]);       
            }}
          >
            <HeaderEditText>
              {isEditMode ? t('trash.cancel') : t('trash.edit')}
            </HeaderEditText>
          </TouchableOpacity>
        }
      />

      {isEditMode && (
        <SelectAllBar>
          <SelectAllButton onPress={handleSelectAll} activeOpacity={0.7}>
            <Icon
              name={selectedIds.length === trashItems.length && trashItems.length > 0 ? "checkmark-circle" : "ellipse-outline"}
              size={20}
              color={selectedIds.length === trashItems.length && trashItems.length > 0 ? "#FF8933" : "#9B9B9B"}
            />
            <SelectText>{t('trash.all')}</SelectText>
          </SelectAllButton>
          <SelectedCountText>
            {t('trash.selected_count', {count: selectedIds.length})}
          </SelectedCountText>
        </SelectAllBar>
      )}
      
      <ScrollContainer 
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={fetchTrashMemos} tintColor="#FF8933" />
        }
      >
        {trashItems.length === 0 ? (
          <AsyncState
            isLoading={isLoading}
            errorMessage={errorMessage}
            emptyMessage={t('trash.empty')}
            onRetry={fetchTrashMemos}
          />
        ) : null}
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
                  <IconCircle isSelected={isSelected} isIce={item.status === 'ICE'}>
                    {item.status === 'ICE' ? (
                      <IcIce
                        width={32}
                        height={36}
                        color={isSelected ? '#7CC4FF' : '#000000'}
                      />
                    ) : (
                      <IcFire
                        width={32}
                        height={36}
                        color={isSelected ? '#FF8933' : '#000000'}
                      />
                    )}
                  </IconCircle>

                  <TextContainer>
                    <CardTitle>{item.title}</CardTitle>
                    <CardDesc>{item.desc}</CardDesc>
                  </TextContainer>

                  {isEditMode && (
                    <CheckZone>
                      <Icon 
                        name={isSelected ? "checkmark-circle" : "ellipse-outline"}
                        size={20}
                        color={isSelected ? "#FF8933" : "#C7C7CC"}
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
            disabled={selectedIds.length === 0 || isLoading} 
            $disabled={selectedIds.length === 0}
          >
            <RestoreText>{t('trash.restore_count', {count: selectedIds.length})}</RestoreText>
          </RestoreButton>
          
          <DeleteButton 
            onPress={() => handleAction('delete')} 
            disabled={selectedIds.length === 0 || isLoading}
            $disabled={selectedIds.length === 0}
          >
            <DeleteText>{t('trash.delete_count', {count: selectedIds.length})}</DeleteText>
          </DeleteButton>
        </BottomBar>
      )}
    </Container>
  );
}
