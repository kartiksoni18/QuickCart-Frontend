import {create} from 'zustand';

interface MapStoreProps {
  mapRef: any;
  setMapRef: (ref: any) => void;
}

export const useMapRefStore = create<MapStoreProps>(set => ({
  mapRef: null,
  setMapRef: ref => set({mapRef: ref}),
}));
