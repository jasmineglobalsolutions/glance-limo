import { NextResponse } from 'next/server';

import { getCrmSession } from '@/lib/crm-auth';
import { ensureServiceSections } from '@/lib/crm-data';
import { unauthorizedCrmResponse } from '@/lib/crm-route-utils';
import { serializeServiceSection } from '@/lib/crm-serializers';
import { prisma } from '@/lib/prisma';

export async function GET() {
  const session = await getCrmSession();
  if (!session) {
    return unauthorizedCrmResponse();
  }

  await ensureServiceSections();
  const [sections, counts] = await Promise.all([
    prisma.serviceSection.findMany({
      orderBy: [{ isActive: 'desc' }, { name: 'asc' }],
    }),
    prisma.serviceCard.groupBy({
      by: ['sectionId'],
      _count: { _all: true },
    }),
  ]);

  const countMap = new Map(counts.map((entry) => [entry.sectionId, entry._count._all]));

  return NextResponse.json({
    data: sections.map((section) =>
      serializeServiceSection(section, countMap.get(section.id) ?? 0),
    ),
  });
}
