import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export const CART_STORAGE_KEY = 'glance-limo-cart-v1';

export type CartItem = {
  id: string;
  slug: string;
  serviceSlug: string;
  serviceName: string;
  title: string;
  subtitle: string | null;
  imageUrl: string | null;
  unitPrice: number | null;
  priceLabel: string;
  quantity: number;
};

type CartState = {
  items: CartItem[];
  isOpen: boolean;
  hydrated: boolean;
};

const initialState: CartState = {
  items: [],
  isOpen: false,
  hydrated: false,
};

function sanitizeHydratedItems(items: CartItem[]) {
  return items
    .filter((item) => item?.id && item?.title)
    .map((item) => ({
      ...item,
      quantity: Math.max(1, item.quantity || 1),
    }));
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    hydrateCart(state, action: PayloadAction<CartItem[]>) {
      state.items = sanitizeHydratedItems(action.payload);
      state.hydrated = true;
    },
    addItem(state, action: PayloadAction<Omit<CartItem, 'quantity'>>) {
      const existingItem = state.items.find((item) => item.id === action.payload.id);

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({
          ...action.payload,
          quantity: 1,
        });
      }

      state.isOpen = true;
    },
    incrementItem(state, action: PayloadAction<string>) {
      const item = state.items.find((entry) => entry.id === action.payload);
      if (item) {
        item.quantity += 1;
      }
    },
    decrementItem(state, action: PayloadAction<string>) {
      const item = state.items.find((entry) => entry.id === action.payload);
      if (!item) {
        return;
      }

      if (item.quantity <= 1) {
        state.items = state.items.filter((entry) => entry.id !== action.payload);
        return;
      }

      item.quantity -= 1;
    },
    removeItem(state, action: PayloadAction<string>) {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    clearCart(state) {
      state.items = [];
    },
    openCart(state) {
      state.isOpen = true;
    },
    closeCart(state) {
      state.isOpen = false;
    },
    toggleCart(state) {
      state.isOpen = !state.isOpen;
    },
  },
});

export const {
  addItem,
  clearCart,
  closeCart,
  decrementItem,
  hydrateCart,
  incrementItem,
  openCart,
  removeItem,
  toggleCart,
} = cartSlice.actions;

export const cartReducer = cartSlice.reducer;
