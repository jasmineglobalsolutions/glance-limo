import { NextResponse } from 'next/server';

import { CRM_SERVICE_OPTIONS } from '@/lib/crm-services';
import { getPublicServiceCards } from '@/lib/public-service-cards';

export async function GET() {
  const services = await Promise.all(
    CRM_SERVICE_OPTIONS.map(async (service) => {
      const { config, cards } = await getPublicServiceCards(service.slug);
      return {
        slug: config.slug,
        label: config.label,
        cards,
      };
    }),
  );

  return NextResponse.json({ services });
}
