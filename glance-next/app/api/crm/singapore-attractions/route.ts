import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getCrmSession } from '@/lib/crm-auth';
import { ensureDefaultTenant } from '@/lib/crm-data';
import { unauthorizedCrmResponse } from '@/lib/crm-route-utils';

export async function GET() {
  const session = await getCrmSession();
  if (!session) return unauthorizedCrmResponse();

  const tenant = await ensureDefaultTenant();
  const data = await (prisma.singaporeAttraction as any).findMany({ 
    where: { tenantId: tenant.id },
    orderBy: { createdAt: 'desc' } 
  });
  return NextResponse.json({ data });
}

export async function POST(req: Request) {
  try {
    const session = await getCrmSession();
    if (!session) return unauthorizedCrmResponse();
    
    const tenant = await ensureDefaultTenant();
    const body = await req.json();

    const cleanBody = {
      ...body,
      name: body.name || 'Unnamed Attraction',
      category: body.category || 'Theme Park',
      audience: body.audience || 'FAMILY',
      adultPublishPrice: Number(body.adultPublishPrice) || 0,
      childPublishPrice: Number(body.childPublishPrice) || 0,
      adultOurPrice: Number(body.adultOurPrice) || 0,
      childOurPrice: Number(body.childOurPrice) || 0,
    };
    
    delete cleanBody.id;
    delete cleanBody.tenant;
    delete cleanBody.createdAt;
    delete cleanBody.updatedAt;

    const data = await (prisma.singaporeAttraction as any).create({ 
      data: { ...cleanBody, tenantId: tenant.id } 
    });
    return NextResponse.json({ data });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}
