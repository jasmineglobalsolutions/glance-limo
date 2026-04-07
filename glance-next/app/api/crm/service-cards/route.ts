import { NextResponse } from 'next/server';

import { getCrmSession } from '@/lib/crm-auth';
import { ensureDefaultTenant, ensureServiceSections, serviceCardInclude } from '@/lib/crm-data';
import { unauthorizedCrmResponse, validationErrorResponse } from '@/lib/crm-route-utils';
import { serializeServiceCard } from '@/lib/crm-serializers';
import { serviceCardInputSchema } from '@/lib/crm-validators';
import { prisma } from '@/lib/prisma';

function mapServiceCardInput(
  payload: Awaited<ReturnType<typeof serviceCardInputSchema.parse>>,
  tenantId: string,
) {
  return {
    sectionId: payload.sectionId,
    title: payload.title,
    subtitle: payload.subtitle,
    description: payload.description,
    imageUrl: payload.imageUrl,
    badge: payload.badge,
    ctaLabel: payload.ctaLabel,
    ctaHref: payload.ctaHref,
    displayOrder: payload.displayOrder,
    isActive: payload.isActive,
    carId: payload.carId,
    tenantId,
  };
}

function mapServiceCardImages(
  images: Awaited<ReturnType<typeof serviceCardInputSchema.parse>>['images'],
) {
  return images.map((image, index) => ({
    imageUrl: image.imageUrl,
    altText: image.altText,
    displayOrder: image.displayOrder ?? index,
  }));
}

export async function GET() {
  const session = await getCrmSession();
  if (!session) {
    return unauthorizedCrmResponse();
  }

  await ensureServiceSections();
  const serviceCards = await prisma.serviceCard.findMany({
    include: serviceCardInclude,
    orderBy: [{ displayOrder: 'asc' }, { createdAt: 'desc' }],
  });

  return NextResponse.json({ data: serviceCards.map(serializeServiceCard) });
}

export async function POST(request: Request) {
  const session = await getCrmSession();
  if (!session) {
    return unauthorizedCrmResponse();
  }

  const payload = await request.json().catch(() => null);
  const parsed = serviceCardInputSchema.safeParse(payload);
  if (!parsed.success) {
    return validationErrorResponse(parsed.error);
  }

  await ensureServiceSections();
  const tenant = await ensureDefaultTenant();
  const card = await prisma.serviceCard.create({
    data: {
      ...mapServiceCardInput(parsed.data, tenant.id),
      images: {
        create: mapServiceCardImages(parsed.data.images),
      },
    },
    include: serviceCardInclude,
  });

  return NextResponse.json({ data: serializeServiceCard(card) });
}
