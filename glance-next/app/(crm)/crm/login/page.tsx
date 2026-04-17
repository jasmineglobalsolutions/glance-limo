import { redirect } from 'next/navigation';

import { getCrmSession } from '@/lib/crm-auth';
import { MuiLoginForm } from '../components/mui-login-form';

export default async function CrmLoginPage() {
  const session = await getCrmSession();
  if (session) {
    redirect('/crm/dashboard');
  }

  return <MuiLoginForm />;
}
