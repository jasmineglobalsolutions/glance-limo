import { ServiceDashboard } from '@/app/components/service-dashboard';
import { getPublicServiceCards } from '@/lib/public-service-cards';

export default async function PublicServicePage({
  params,
}: {
  params: Promise<{ service: string }>;
}) {
  const { service } = await params;
  const { config, cards } = await getPublicServiceCards(service);

  return <ServiceDashboard cards={cards} config={config} />;
}
