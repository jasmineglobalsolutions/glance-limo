import { Prisma } from '@prisma/client';

import { DEFAULT_TENANT_NAME, getDefaultServiceSectionSeed } from '@/lib/crm-services';
import { prisma } from '@/lib/prisma';

export const serviceCardInclude = Prisma.validator<Prisma.ServiceCardInclude>()({
  section: true,
  singaporeTransfer: true,
  images: {
    orderBy: {
      displayOrder: 'asc',
    },
  },
});

export type ServiceCardWithRelations = Prisma.ServiceCardGetPayload<{
  include: typeof serviceCardInclude;
}>;

export async function ensureDefaultTenant() {
  return prisma.tenant.upsert({
    where: { name: DEFAULT_TENANT_NAME },
    update: {},
    create: { name: DEFAULT_TENANT_NAME },
  });
}

export async function ensureServiceSections() {
  const defaults = getDefaultServiceSectionSeed();

  await Promise.all(
    defaults.map((section) =>
      prisma.serviceSection.upsert({
        where: { key: section.key },
        update: {},
        create: section,
      }),
    ),
  );

  return prisma.serviceSection.findMany({
    orderBy: [{ isActive: 'desc' }, { name: 'asc' }],
  });
}
