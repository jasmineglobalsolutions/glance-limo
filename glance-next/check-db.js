const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function check() {
  try {
    const tenant = await prisma.tenant.findUnique({ where: { name: 'Glance Limousine' } });
    console.log('Tenant:', tenant);
    if (tenant) {
      const count = await prisma.singaporeTransfer.count({ where: { tenantId: tenant.id } });
      console.log('SingaporeTransfer Count for Tenant:', count);
      const allCount = await prisma.singaporeTransfer.count();
      console.log('Total SingaporeTransfer Count:', allCount);
    }
  } catch (err) {
    console.error(err);
  } finally {
    await prisma.$disconnect();
  }
}

check();
