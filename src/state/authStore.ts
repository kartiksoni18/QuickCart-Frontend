import {create} from 'zustand';
import {createJSONStorage, persist} from 'zustand/middleware';
import {mmkvStorage} from './storage';
interface authStore {
  user: Record<string, any> | null;
  setUser: (user: any) => void;
  currentOrder: Record<string, any> | null;
  setCurrentOrder: (order: any) => void;
  logout: () => void;
}

export const useAuthStore = create<authStore>()(
  persist(
    (set, get) => ({
      user: null,
      setUser: data => {
        console.log('datad', data);
        return set({user: data});
      },
      currentOrder: null,
      setCurrentOrder: order => set({currentOrder: order}),
      logout: () => set({user: null, currentOrder: null}),
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => mmkvStorage),
    },
  ),
);
