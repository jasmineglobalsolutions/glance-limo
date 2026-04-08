import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getCrmSession } from '@/lib/crm-auth';
import { ensureDefaultTenant } from '@/lib/crm-data';
import { unauthorizedCrmResponse } from '@/lib/crm-route-utils';

export async function GET() {
  try {
    const session = await getCrmSession();
    if (!session) return unauthorizedCrmResponse();

    const tenant = await ensureDefaultTenant();
    const data = await (prisma.singaporeTransfer as any).findMany({ 
      where: { tenantId: tenant.id },
      orderBy: { createdAt: 'desc' } 
    });
    return NextResponse.json({ data });
  } catch (err: any) {
    return NextResponse.json({ error: String(err), stack: err.stack, details: err.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await getCrmSession();
    if (!session) return unauthorizedCrmResponse();
    
    const tenant = await ensureDefaultTenant();
    const body = await req.json();
    
    // Provide sensible defaults for missing fields from the frontend draft
    const cleanBody = {
      ...body,
      name: body.name || 'Unnamed Vehicle',
      category: body.category || 'LUXURY',
      personCapacity: Number(body.personCapacity) || 0,
      smallLuggage: Number(body.smallLuggage) || 0,
      bigLuggage: Number(body.bigLuggage) || 0,
      pricePerHour: Number(body.pricePerHour) || 0,
      ratePerTransfer: Number(body.ratePerTransfer) || 0,
      hasChildSeat: Boolean(body.hasChildSeat),
    };
    
    // remove fields that shouldn't be overridden
    delete cleanBody.id;
    delete cleanBody.tenant;
    delete cleanBody.createdAt;
    delete cleanBody.updatedAt;

    const data = await (prisma.singaporeTransfer as any).create({ 
      data: { ...cleanBody, tenantId: tenant.id } 
    });
    return NextResponse.json({ data });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}
