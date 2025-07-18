import React, { useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator, Button } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useMediaLibrary } from '@/hooks/useMediaLibrary';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/types/navigation';

export default function CollectionSelectionScreen() {
  const {
    permissionStatus,
    albums,
    isLoading,
    error,
    requestPermission,
    fetchAlbums,
  } = useMediaLibrary();

  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList, 'CollectionSelectionScreen'>>();

  useEffect(() => {
    if (permissionStatus === 'granted') {
      fetchAlbums();
    }
  }, [permissionStatus, fetchAlbums]);

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" color="#888" />
      </SafeAreaView>
    );
  }

  if (permissionStatus !== 'granted') {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.title}>Flick Pick</Text>
          <Text style={styles.subtitle}>Photo Organization Made Easy</Text>
          <Text style={styles.description}>
            This app needs access to your photo library to organize your photos.
          </Text>
          <Button title="Grant Permission" onPress={requestPermission} />
          {error && <Text style={styles.error}>{error}</Text>}
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Select a Photo Album</Text>
      <FlatList
        data={albums}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.albumItem}
            onPress={() => navigation.navigate('HomeScreen', { album: item })}
          >
            <Text style={styles.albumTitle}>{item.title}</Text>
            <Text style={styles.albumCount}>{item.assetCount} photos</Text>
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.albumList}
      />
      {error && <Text style={styles.error}>{error}</Text>}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    color: '#666',
    marginBottom: 20,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 20,
  },
  albumList: {
    padding: 16,
  },
  albumItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  albumTitle: {
    fontSize: 18,
    color: '#222',
  },
  albumCount: {
    fontSize: 14,
    color: '#888',
  },
  error: {
    color: 'red',
    marginTop: 10,
    textAlign: 'center',
  },
}); 