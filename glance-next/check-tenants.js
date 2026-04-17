const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function check() {
  try {
    const records = await prisma.singaporeTransfer.findMany({ select: { tenantId: true }, take: 5 });
    console.log('Sample tenantIds in SingaporeTransfer:', records);
    const tenants = await prisma.tenant.findMany();
    console.log('Available Tenants:', tenants);
  } catch (err) {
    console.error(err);
  } finally {
    await prisma.$disconnect();
  }
}

check();
