import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getCrmSession } from '@/lib/crm-auth';
import { ensureDefaultTenant } from '@/lib/crm-data';
import { unauthorizedCrmResponse } from '@/lib/crm-route-utils';

export async function GET() {
  const session = await getCrmSession();
  if (!session) return unauthorizedCrmResponse();

  const tenant = await ensureDefaultTenant();
  const data = await (prisma.malaysiaTour as any).findMany({ 
    where: { tenantId: tenant.id },
    include: { images: true },
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
    const { images, ...rest } = body;

    const cleanRest = {
      ...rest,
      title: rest.title || 'Unnamed Tour',
      adultPrice: Number(rest.adultPrice) || 0,
      childPrice: Number(rest.childPrice) || 0,
      minAdults: Number(rest.minAdults) || 2,
    };
    delete cleanRest.id;
    delete cleanRest.tenant;
    delete cleanRest.createdAt;
    delete cleanRest.updatedAt;

    const data = await (prisma.malaysiaTour as any).create({ 
      data: { 
        ...cleanRest, 
        tenantId: tenant.id,
        images: images ? {
          create: images.map((img: any) => ({ imageUrl: img.imageUrl }))
        } : undefined
      } 
    });
    return NextResponse.json({ data });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}
