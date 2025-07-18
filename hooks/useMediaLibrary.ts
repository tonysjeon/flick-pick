import { useState, useCallback } from 'react';
import * as MediaLibrary from 'expo-media-library';
import { PhotoCollection, Photo, PermissionStatus } from '@/types';

export function useMediaLibrary() {
  const [permissionStatus, setPermissionStatus] = useState<PermissionStatus>('undetermined');
  const [albums, setAlbums] = useState<PhotoCollection[]>([]);
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const requestPermission = useCallback(async () => {
    setIsLoading(true);
    try {
      const { status } = await MediaLibrary.requestPermissionsAsync();
      setPermissionStatus(status as PermissionStatus);
      setError(null);
    } catch (e) {
      setError('Failed to request permissions');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const fetchAlbums = useCallback(async () => {
    setIsLoading(true);
    try {
      const albumList = await MediaLibrary.getAlbumsAsync();
      const collections: PhotoCollection[] = albumList.map(album => ({
        id: album.id,
        title: album.title,
        assetCount: album.assetCount,
      }));
      setAlbums(collections);
      setError(null);
    } catch (e) {
      setError('Failed to fetch albums');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const fetchPhotos = useCallback(async (albumId: string) => {
    setIsLoading(true);
    try {
      const assets = await MediaLibrary.getAssetsAsync({
        album: albumId,
        sortBy: [[MediaLibrary.SortBy.creationTime, false]],
        mediaType: [MediaLibrary.MediaType.photo],
        first: 1000,
      });
      const photoList: Photo[] = assets.assets.map(asset => ({
        id: asset.id,
        uri: asset.uri,
        filename: asset.filename ?? '',
        creationTime: asset.creationTime ?? 0,
        modificationTime: asset.modificationTime ?? 0,
        duration: asset.duration,
        mediaType: asset.mediaType === 'photo' ? 'photo' : 'video',
        mediaSubtypes: asset.mediaSubtypes,
        width: asset.width,
        height: asset.height,
      }));
      setPhotos(photoList);
      setError(null);
    } catch (e) {
      setError('Failed to fetch photos');
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    permissionStatus,
    albums,
    photos,
    isLoading,
    error,
    requestPermission,
    fetchAlbums,
    fetchPhotos,
  };
} 