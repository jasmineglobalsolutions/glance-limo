import { configureStore } from '@reduxjs/toolkit';

import { cartReducer } from '@/lib/store/features/cart/cart-slice';
import { currencyReducer } from '@/lib/store/features/currency/currency-slice';

export function makeStore() {
  return configureStore({
    reducer: {
      cart: cartReducer,
      currency: currencyReducer,
    },
  });
}

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
