import { PhotoCollection } from '@/types';

export type RootStackParamList = {
  CollectionSelectionScreen: undefined;
  HomeScreen: { album: PhotoCollection };
}; 