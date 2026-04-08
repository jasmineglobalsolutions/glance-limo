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

    if ('adultPublishPrice' in cleanBody) cleanBody.adultPublishPrice = Number(cleanBody.adultPublishPrice);
    if ('childPublishPrice' in cleanBody) cleanBody.childPublishPrice = Number(cleanBody.childPublishPrice);
    if ('adultOurPrice' in cleanBody) cleanBody.adultOurPrice = Number(cleanBody.adultOurPrice);
    if ('childOurPrice' in cleanBody) cleanBody.childOurPrice = Number(cleanBody.childOurPrice);

    const data = await (prisma.singaporeAttraction as any).update({ 
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
    await (prisma.singaporeAttraction as any).delete({ 
      where: { id: params.id, tenantId: tenant.id } 
    });
    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}
