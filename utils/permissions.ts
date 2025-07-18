import * as ImagePicker from 'expo-image-picker';
import { PermissionStatus } from '@/types';

export const requestPhotoLibraryPermission = async (): Promise<PermissionStatus> => {
  try {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    // status can be 'granted', 'denied', or 'undetermined'
    return status as PermissionStatus;
  } catch (error) {
    console.error('Error requesting photo library permission:', error);
    return 'denied';
  }
};

export const getPhotoLibraryPermission = async (): Promise<PermissionStatus> => {
  try {
    const { status } = await ImagePicker.getMediaLibraryPermissionsAsync();
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