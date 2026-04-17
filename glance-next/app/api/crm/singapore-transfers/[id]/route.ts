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
    
    // remove fields that should not be updated directly
    const cleanBody = { ...body };
    delete cleanBody.id;
    delete cleanBody.tenant;
    delete cleanBody.createdAt;
    delete cleanBody.updatedAt;

    // Type casting logic for numbers where present
    if ('personCapacity' in cleanBody) cleanBody.personCapacity = Number(cleanBody.personCapacity);
    if ('smallLuggage' in cleanBody) cleanBody.smallLuggage = Number(cleanBody.smallLuggage);
    if ('bigLuggage' in cleanBody) cleanBody.bigLuggage = Number(cleanBody.bigLuggage);
    if ('pricePerHour' in cleanBody) cleanBody.pricePerHour = Number(cleanBody.pricePerHour);
    if ('ratePerTransfer' in cleanBody) cleanBody.ratePerTransfer = Number(cleanBody.ratePerTransfer);
    if ('hasChildSeat' in cleanBody) cleanBody.hasChildSeat = Boolean(cleanBody.hasChildSeat);

    const data = await (prisma.singaporeTransfer as any).update({ 
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
    await (prisma.singaporeTransfer as any).delete({ 
      where: { id: params.id, tenantId: tenant.id } 
    });
    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}
