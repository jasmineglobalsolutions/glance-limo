import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getCrmSession } from '@/lib/crm-auth';
import { ensureDefaultTenant } from '@/lib/crm-data';
import { unauthorizedCrmResponse } from '@/lib/crm-route-utils';

export async function PUT(req: Request, context: any) {
  try {
    const session = await getCrmSession();
    if (!session) return unauthorizedCrmResponse();

    const tenant = await ensureDefaultTenant();
    const params = await context.params;
    const body = await req.json();
    const { images, ...rest } = body;

    const cleanRest = { ...rest };
    delete cleanRest.id;
    delete cleanRest.tenant;
    delete cleanRest.createdAt;
    delete cleanRest.updatedAt;

    if ('adultPrice' in cleanRest) cleanRest.adultPrice = Number(cleanRest.adultPrice);
    if ('childPrice' in cleanRest) cleanRest.childPrice = Number(cleanRest.childPrice);
    if ('minAdults' in cleanRest) cleanRest.minAdults = Number(cleanRest.minAdults);

    const data = await (prisma.malaysiaTour as any).update({ 
      where: { id: params.id, tenantId: tenant.id }, 
      data: {
        ...cleanRest,
        images: images ? {
          deleteMany: {},
          create: images.map((img: any) => ({ imageUrl: img.imageUrl, displayOrder: img.displayOrder || 0 }))
        } : undefined
      } 
    });
    return NextResponse.json({ data });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}

export async function DELETE(req: Request, context: any) {
  try {
    const session = await getCrmSession();
    if (!session) return unauthorizedCrmResponse();

    const tenant = await ensureDefaultTenant();
    const params = await context.params;
    await (prisma.malaysiaTour as any).delete({ 
      where: { id: params.id, tenantId: tenant.id } 
    });
    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}
