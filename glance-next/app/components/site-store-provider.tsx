'use client';

import { startTransition, useEffect, useState } from 'react';
import { Provider } from 'react-redux';

import { SiteCartDrawer } from '@/app/components/site-cart-drawer';
import {
  CART_STORAGE_KEY,
  hydrateCart,
} from '@/lib/store/cart-slice';
import { useAppDispatch, useAppSelector } from '@/lib/store/hooks';
import { makeStore, type AppStore } from '@/lib/store/store';

function CartPersistence() {
  const dispatch = useAppDispatch();
  const items = useAppSelector((state) => state.cart.items);
  const hydrated = useAppSelector((state) => state.cart.hydrated);

  useEffect(() => {
    try {
      const persistedCart = window.localStorage.getItem(CART_STORAGE_KEY);
      const parsedItems = persistedCart ? JSON.parse(persistedCart) : [];

      startTransition(() => {
        dispatch(hydrateCart(Array.isArray(parsedItems) ? parsedItems : []));
      });
    } catch {
      dispatch(hydrateCart([]));
    }
  }, [dispatch]);

  useEffect(() => {
    if (!hydrated) {
      return;
    }

    window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
  }, [hydrated, items]);

  return null;
}

export function SiteStoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [store] = useState<AppStore>(() => makeStore());

  return (
    <Provider store={store}>
      <CartPersistence />
      {children}
      <SiteCartDrawer />
    </Provider>
  );
}
