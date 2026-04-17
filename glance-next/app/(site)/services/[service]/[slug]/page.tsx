import { ServiceCardDetail } from '@/app/components/service-card-detail';
import {
  getPublicServiceCardBySlug,
  getPublicServiceCards,
} from '@/lib/public-service-cards';

export default async function PublicServiceCardPage({
  params,
}: {
  params: Promise<{ service: string; slug: string }>;
}) {
  const { service, slug } = await params;
  const [{ config, card }, { cards }] = await Promise.all([
    getPublicServiceCardBySlug(service, slug),
    getPublicServiceCards(service),
  ]);
  const relatedCards = cards.filter((candidate: any) => candidate.id !== card.id).slice(0, 3);

  return <ServiceCardDetail card={card} config={config} relatedCards={relatedCards} />;
}
