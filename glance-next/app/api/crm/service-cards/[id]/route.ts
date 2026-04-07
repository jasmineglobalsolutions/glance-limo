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

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
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
  const { id } = await params;

  const card = await prisma.$transaction(async (tx) => {
    await tx.serviceCardImage.deleteMany({
      where: { cardId: id },
    });

    return tx.serviceCard.update({
      where: { id },
      data: {
        ...mapServiceCardInput(parsed.data, tenant.id),
        images: {
          create: mapServiceCardImages(parsed.data.images),
        },
      },
      include: serviceCardInclude,
    });
  });

  return NextResponse.json({ data: serializeServiceCard(card) });
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await getCrmSession();
  if (!session) {
    return unauthorizedCrmResponse();
  }

  const { id } = await params;
  await prisma.serviceCard.delete({ where: { id } });

  return NextResponse.json({ success: true });
}
