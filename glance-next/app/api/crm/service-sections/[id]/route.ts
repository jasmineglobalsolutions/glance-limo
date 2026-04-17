import { NextResponse } from 'next/server';

import { getCrmSession } from '@/lib/crm-auth';
import { unauthorizedCrmResponse, validationErrorResponse } from '@/lib/crm-route-utils';
import { serializeServiceSection } from '@/lib/crm-serializers';
import { serviceSectionUpdateSchema } from '@/lib/crm-validators';
import { prisma } from '@/lib/prisma';

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await getCrmSession();
  if (!session) {
    return unauthorizedCrmResponse();
  }

  const payload = await request.json().catch(() => null);
  const parsed = serviceSectionUpdateSchema.safeParse(payload);
  if (!parsed.success) {
    return validationErrorResponse(parsed.error);
  }

  const { id } = await params;
  const [section, count] = await prisma.$transaction([
    prisma.serviceSection.update({
      where: { id },
      data: parsed.data,
    }),
    prisma.serviceCard.count({
      where: { sectionId: id },
    }),
  ]);

  return NextResponse.json({ data: serializeServiceSection(section, count) });
}
