const fs = require('fs');
const path = require('path');

const models = [
  { path: 'singapore-transfers', model: 'singaporeTransfer' },
  { path: 'cross-border-transfers', model: 'crossBorderTransfer' },
  { path: 'singapore-tours', model: 'singaporeTour' },
  { path: 'malaysia-tours', model: 'malaysiaTour' },
  { path: 'singapore-attractions', model: 'singaporeAttraction' }
];

const basePath = path.join(__dirname, 'app/api/crm');

models.forEach(({path: dirPath, model}) => {
  const dir = path.join(basePath, dirPath);
  const idDir = path.join(dir, '[id]');
  fs.mkdirSync(idDir, { recursive: true });

  const routeContent = `import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getCrmSession } from '@/lib/crm-auth';
import { ensureDefaultTenant } from '@/lib/crm-data';
import { unauthorizedCrmResponse } from '@/lib/crm-route-utils';

export async function GET() {
  const session = await getCrmSession();
  if (!session) return unauthorizedCrmResponse();

  const tenant = await ensureDefaultTenant();
  const data = await (prisma.${model} as any).findMany({ 
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
    const data = await (prisma.${model} as any).create({ 
      data: { ...body, tenantId: tenant.id } 
    });
    return NextResponse.json({ data });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}
`;

  const idRouteContent = `import { NextResponse } from 'next/server';
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
    const data = await (prisma.${model} as any).update({ 
      where: { id: params.id, tenantId: tenant.id }, 
      data: body 
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
    await (prisma.${model} as any).delete({ 
      where: { id: params.id, tenantId: tenant.id } 
    });
    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}
`;

  fs.writeFileSync(path.join(dir, 'route.ts'), routeContent);
  fs.writeFileSync(path.join(idDir, 'route.ts'), idRouteContent);
});
console.log('Done!');
