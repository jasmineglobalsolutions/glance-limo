import type { PublicServiceCard } from '@/lib/public-service-types';
import type { CartItem } from '@/lib/store/cart-slice';

export function createCartItem(card: PublicServiceCard): Omit<CartItem, 'quantity'> {
  return {
    id: card.id,
    slug: card.slug,
    serviceSlug: card.serviceSlug,
    serviceName: card.serviceName,
    title: card.title,
    subtitle: card.subtitle,
    imageUrl: card.imageUrl,
    unitPrice: card.pricing.summary.amount,
    priceLabel: card.pricing.summary.headline,
  };
}
