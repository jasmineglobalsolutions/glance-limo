import { NextResponse } from 'next/server';

import { getCrmSession } from '@/lib/crm-auth';
import { buildDashboardBootstrapPayload } from '@/lib/crm-serializers';
import { ensureServiceSections, serviceCardInclude } from '@/lib/crm-data';
import { unauthorizedCrmResponse } from '@/lib/crm-route-utils';
import { prisma } from '@/lib/prisma';

export async function GET() {
  const session = await getCrmSession();
  if (!session) {
    return unauthorizedCrmResponse();
  }

  const sections = await ensureServiceSections();
  const [singaporeTransfers, crossBorderTransfers, serviceCards] = await Promise.all([
    prisma.singaporeTransfer.findMany({
      orderBy: [{ displayOrder: 'asc' }, { createdAt: 'desc' }],
    }),
    prisma.crossBorderTransfer.findMany({
      orderBy: [{ displayOrder: 'asc' }, { createdAt: 'desc' }],
    }),
    prisma.serviceCard.findMany({
      include: serviceCardInclude,
      orderBy: [{ displayOrder: 'asc' }, { createdAt: 'desc' }],
    }),
  ]);

  return NextResponse.json(
    buildDashboardBootstrapPayload({
      sections,
      singaporeTransfers,
      crossBorderTransfers,
      serviceCards,
    }),
  );
}
