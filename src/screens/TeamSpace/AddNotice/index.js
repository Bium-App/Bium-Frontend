import React from 'react';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Header from '../../../components/Header';
import { useAddNotice } from '../../../hooks/useAddNotice';

export default function AddNotice({ route, navigation }) {
  const { projectId } = route.params || {};
  const {
    title,
    setTitle,
    content,
    setContent,
    isPinned,
    setIsPinned,
    isLoading,
    saveNotice,
  } = useAddNotice(projectId, navigation);

  return (
    <View style={styles.container}>
      <Header
        title="공지 추가"
        left={
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="chevron-back" size={24} color="#FF8933" />
          </TouchableOpacity>
        }
        right={
          <TouchableOpacity disabled={isLoading} onPress={saveNotice}>
            {isLoading ? (
              <ActivityIndicator size="small" color="#FF8933" />
            ) : (
              <Text style={styles.saveText}>저장</Text>
            )}
          </TouchableOpacity>
        }
      />

      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView contentContainerStyle={styles.content}>
          <Text style={styles.label}>제목</Text>
          <TextInput
            style={styles.titleInput}
            value={title}
            onChangeText={setTitle}
            placeholder="공지 제목"
            placeholderTextColor="#999999"
            maxLength={100}
          />

          <Text style={styles.label}>내용</Text>
          <TextInput
            style={styles.contentInput}
            value={content}
            onChangeText={setContent}
            placeholder="공지 내용을 입력하세요."
            placeholderTextColor="#999999"
            multiline
            textAlignVertical="top"
          />

          <View style={styles.toggleRow}>
            <View>
              <Text style={styles.toggleTitle}>상단 고정</Text>
              <Text style={styles.toggleDescription}>
                중요한 공지를 목록 위에 표시합니다.
              </Text>
            </View>
            <Switch
              value={isPinned}
              onValueChange={setIsPinned}
              trackColor={{ false: '#E8E8E8', true: '#FF8933' }}
              thumbColor="#FFFFFF"
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  flex: { flex: 1 },
  content: { padding: 20, paddingBottom: 40 },
  saveText: { color: '#FF8933', fontSize: 16, fontWeight: '600' },
  label: { fontSize: 15, fontWeight: '600', marginBottom: 8, marginTop: 20 },
  titleInput: {
    borderWidth: 1,
    borderColor: '#E8E8E8',
    borderRadius: 8,
    paddingHorizontal: 14,
    height: 52,
    color: '#000000',
  },
  contentInput: {
    borderWidth: 1,
    borderColor: '#E8E8E8',
    borderRadius: 8,
    padding: 14,
    minHeight: 180,
    color: '#000000',
  },
  toggleRow: {
    marginTop: 28,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  toggleTitle: { fontSize: 15, fontWeight: '600', color: '#000000' },
  toggleDescription: { marginTop: 4, fontSize: 12, color: '#999999' },
});
