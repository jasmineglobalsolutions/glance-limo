import { NextResponse } from 'next/server';

import { getPublicServiceCards } from '@/lib/public-service-cards';

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ service: string }> },
) {
  const { service } = await params;
  const { config, cards } = await getPublicServiceCards(service);

  return NextResponse.json({
    service: {
      slug: config.slug,
      label: config.label,
    },
    cards,
  });
}
