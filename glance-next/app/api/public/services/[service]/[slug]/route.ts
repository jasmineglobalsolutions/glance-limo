import { NextResponse } from 'next/server';

import { getPublicServiceCardBySlug } from '@/lib/public-service-cards';

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ service: string; slug: string }> },
) {
  const { service, slug } = await params;
  const { config, card } = await getPublicServiceCardBySlug(service, slug);

  return NextResponse.json({
    service: {
      slug: config.slug,
      label: config.label,
    },
    card,
  });
}
