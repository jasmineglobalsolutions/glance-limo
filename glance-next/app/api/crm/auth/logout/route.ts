import { NextResponse } from 'next/server';

import { CRM_SESSION_COOKIE, getCrmCookieOptions } from '@/lib/crm-auth';

export async function POST() {
  const response = NextResponse.json({ success: true });
  response.cookies.set(CRM_SESSION_COOKIE, '', getCrmCookieOptions(0));
  // Clear legacy cookie scope from earlier implementation.
  response.cookies.set(CRM_SESSION_COOKIE, '', {
    ...getCrmCookieOptions(0),
    path: '/crm',
  });
  return response;
}
