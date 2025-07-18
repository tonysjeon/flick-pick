import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RouteProp, useRoute } from '@react-navigation/native';
import { PhotoCollection } from '@/types';
import { RootStackParamList } from '@/types/navigation';

type HomeScreenRouteProp = RouteProp<RootStackParamList, 'HomeScreen'>;

export default function HomeScreen() {
  const route = useRoute<HomeScreenRouteProp>();
  const { album } = route.params;

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Album: {album.title}</Text>
      <Text style={styles.subtitle}>ID: {album.id}</Text>
      <Text style={styles.subtitle}>Photos: {album.assetCount}</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: '#666',
    marginBottom: 5,
  },
}); 