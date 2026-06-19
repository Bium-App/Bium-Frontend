import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function AddNotice() {
  return (
    <View style={styles.container}>
      <Text>Add Notice</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
});