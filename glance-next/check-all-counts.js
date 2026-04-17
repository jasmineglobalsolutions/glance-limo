const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function checkAll() {
  const models = ['singaporeTransfer', 'crossBorderTransfer', 'singaporeTour', 'malaysiaTour', 'singaporeAttraction', 'serviceCard'];
  for (const model of models) {
    const counts = await prisma[model].groupBy({
      by: ['tenantId'],
      _count: true
    });
    console.log(`Counts for ${model}:`, counts);
  }
  await prisma.$disconnect();
}

checkAll();
