import { redirect } from 'next/navigation';

import { getCrmSession } from '@/lib/crm-auth';
import { CrmDashboardShell } from '../components/crm-dashboard-shell';

export default async function DashboardPage() {
  const session = await getCrmSession();
  if (!session) {
    redirect('/crm/login');
  }

  return (
    <main>
      <CrmDashboardShell adminEmail={session.email} />
    </main>
  );
}
