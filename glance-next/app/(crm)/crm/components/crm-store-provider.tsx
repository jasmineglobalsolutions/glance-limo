'use client';

import { Provider } from 'react-redux';
import { crmStore } from '@/lib/store/crm-store';

export function CrmStoreProvider({ children }: { children: React.ReactNode }) {
  return <Provider store={crmStore}>{children}</Provider>;
}
