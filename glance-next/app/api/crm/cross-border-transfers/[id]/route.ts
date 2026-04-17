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

    const cleanBody = { ...body };
    delete cleanBody.id;
    delete cleanBody.tenant;
    delete cleanBody.createdAt;
    delete cleanBody.updatedAt;

    if ('distanceKm' in cleanBody) cleanBody.distanceKm = Number(cleanBody.distanceKm);
    if ('priceEconomy' in cleanBody) cleanBody.priceEconomy = Number(cleanBody.priceEconomy);
    if ('pricePremium' in cleanBody) cleanBody.pricePremium = Number(cleanBody.pricePremium);
    if ('priceBusiness' in cleanBody) cleanBody.priceBusiness = Number(cleanBody.priceBusiness);
    if ('priceLuxury' in cleanBody) cleanBody.priceLuxury = Number(cleanBody.priceLuxury);

    const data = await (prisma.crossBorderTransfer as any).update({ 
      where: { id: params.id, tenantId: tenant.id }, 
      data: cleanBody 
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
    await (prisma.crossBorderTransfer as any).delete({ 
      where: { id: params.id, tenantId: tenant.id } 
    });
    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}
