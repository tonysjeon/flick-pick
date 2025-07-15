import * as MediaLibrary from 'expo-media-library';
import { PermissionStatus } from '@/types';

export const requestPhotoLibraryPermission = async (): Promise<PermissionStatus> => {
  try {
    const { status } = await MediaLibrary.requestPermissionsAsync();
    return status as PermissionStatus;
  } catch (error) {
    console.error('Error requesting photo library permission:', error);
    return 'denied';
  }
};

export const getPhotoLibraryPermission = async (): Promise<PermissionStatus> => {
  try {
    const { status } = await MediaLibrary.getPermissionsAsync();
    return status as PermissionStatus;
  } catch (error) {
    console.error('Error getting photo library permission:', error);
    return 'undetermined';
  }
};

export const checkPhotoLibraryPermission = async (): Promise<boolean> => {
  const permission = await getPhotoLibraryPermission();
  return permission === 'granted';
}; 