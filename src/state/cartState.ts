import {create} from 'zustand';
import {createJSONStorage, persist} from 'zustand/middleware';
import {mmkvStorage} from './storage';

interface CartItem {
  _id: string | number;
  item: any;
  count: number;
}
interface CartStore {
  cart: CartItem[];
  addItem: (item: any) => void;
  removeItem: (id: string | number) => void;
  clearCart: () => void;
  getItemCount: (id: string | number) => void;
  getTotalPrice: () => number;
}

// export const useAuthStore = create<CartStore>()(
//   persist((set, get) => ({}), {
//     name: 'cart-storage',
//     storage: createJSONStorage(() => mmkvStorage),
//   }),
// );
