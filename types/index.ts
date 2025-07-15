export interface Photo {
  id: string;
  uri: string;
  filename: string;
  creationTime: number;
  modificationTime: number;
  duration?: number;
  mediaType: 'photo' | 'video';
  mediaSubtypes?: string[];
  width: number;
  height: number;
}

export interface PhotoCollection {
  id: string;
  title: string;
  assetCount: number;
  coverImage?: Photo;
}

export interface PhotoAction {
  id: string;
  action: 'keep' | 'delete';
  timestamp: number;
  photo: Photo;
}

export interface SwipeDirection {
  x: number;
  y: number;
}

export interface CardPosition {
  x: number;
  y: number;
  rotation: number;
  scale: number;
}

export type PermissionStatus = 'granted' | 'denied' | 'undetermined' | 'restricted';

export interface AppState {
  currentPhotoIndex: number;
  totalPhotos: number;
  processedPhotos: Set<string>;
  actions: PhotoAction[];
  selectedCollection?: PhotoCollection;
  isLoading: boolean;
  error?: string;
} 