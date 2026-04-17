import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

const CRM_HOST_PREFIX = 'crm.';

export function proxy(request: NextRequest) {
  const host = request.headers.get('host') ?? '';
  const { pathname } = request.nextUrl;

  if (!host.startsWith(CRM_HOST_PREFIX)) {
    return NextResponse.next();
  }

  if (
    pathname.startsWith('/crm') ||
    pathname.startsWith('/_next') ||
    pathname === '/favicon.ico' ||
    pathname === '/robots.txt' ||
    pathname === '/sitemap.xml'
  ) {
    return NextResponse.next();
  }

  const crmUrl = request.nextUrl.clone();
  crmUrl.pathname = pathname === '/' ? '/crm' : `/crm${pathname}`;

  return NextResponse.rewrite(crmUrl);
}

export const config = {
  matcher: '/((?!api|_next/static|_next/image).*)',
};
