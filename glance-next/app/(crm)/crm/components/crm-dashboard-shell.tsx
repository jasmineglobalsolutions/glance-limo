'use client';

import { CrmDashboard } from './crm-dashboard';

export function CrmDashboardShell({ adminEmail }: { adminEmail: string }) {
  return <CrmDashboard adminEmail={adminEmail} />;
}
