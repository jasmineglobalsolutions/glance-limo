import { configureStore } from '@reduxjs/toolkit';
import { crmApi } from './crm-api';

export const crmStore = configureStore({
  reducer: {
    [crmApi.reducerPath]: crmApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(crmApi.middleware),
});

export type CrmRootState = ReturnType<typeof crmStore.getState>;
export type CrmAppDispatch = typeof crmStore.dispatch;
