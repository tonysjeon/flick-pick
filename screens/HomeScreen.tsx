import React, { useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Image, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '@/types/navigation';
import { useMediaLibrary } from '@/hooks/useMediaLibrary';

type HomeScreenRouteProp = RouteProp<RootStackParamList, 'HomeScreen'>;

export default function HomeScreen() {
  const route = useRoute<HomeScreenRouteProp>();
  const { album } = route.params;
  const { photos, fetchPhotos, isLoading, error } = useMediaLibrary();

  useEffect(() => {
    fetchPhotos(album.id);
  }, [album.id, fetchPhotos]);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Album: {album.title}</Text>
      <Text style={styles.subtitle}>ID: {album.id}</Text>
      <Text style={styles.subtitle}>Photos: {album.assetCount}</Text>
      {isLoading ? (
        <ActivityIndicator size="large" color="#888" style={{ marginTop: 20 }} />
      ) : error ? (
        <Text style={styles.error}>{error}</Text>
      ) : (
        <FlatList
          data={photos}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <View style={styles.photoItem}>
              <Image source={{ uri: item.uri }} style={styles.photoThumbnail} />
              <Text style={styles.photoFilename}>{item.filename}</Text>
            </View>
          )}
          contentContainerStyle={styles.photoList}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 5,
    textAlign: 'center',
  },
  error: {
    color: 'red',
    marginTop: 20,
    textAlign: 'center',
  },
  photoList: {
    paddingVertical: 16,
  },
  photoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  photoThumbnail: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 12,
    backgroundColor: '#eee',
  },
  photoFilename: {
    fontSize: 14,
    color: '#333',
  },
}); 