import { notFound } from 'next/navigation';
import { serviceConfigFromSlug } from '@/lib/crm-services';
import type { PublicServiceCard, PublicServicePricing } from '@/lib/public-service-types';
import { prisma } from '@/lib/prisma';
import { buildServiceCardSlug, extractServiceCardId } from '@/lib/service-card-slug';

export async function getPublicServiceCards(serviceSlug: string) {
  const config = serviceConfigFromSlug(serviceSlug);
  if (!config) notFound();

  let rawCards: any[] = [];
  if (config.key === 'SINGAPORE_TRANSFER') {
    rawCards = await prisma.singaporeTransfer.findMany({ orderBy: { createdAt: 'desc' } });
  } else if (config.key === 'CROSS_BORDER_TRANSFER') {
    rawCards = await prisma.crossBorderTransfer.findMany({ orderBy: { createdAt: 'desc' } });
  } else if (config.key === 'SINGAPORE_TOURS') {
    rawCards = await prisma.singaporeTour.findMany({ orderBy: { createdAt: 'desc' }, include: { images: true } });
  } else if (config.key === 'MALAYSIA_TOURS') {
    rawCards = await prisma.malaysiaTour.findMany({ orderBy: { createdAt: 'desc' }, include: { images: true } });
  } else if (config.key === 'SINGAPORE_ATTRACTIONS') {
    rawCards = await prisma.singaporeAttraction.findMany({ orderBy: { createdAt: 'desc' } });
  }

  const mappedCards: PublicServiceCard[] = rawCards.map(c => mapToCard(config, c));
  return { config, cards: mappedCards };
}

export async function getPublicServiceCardById(serviceSlug: string, cardId: string) {
  const config = serviceConfigFromSlug(serviceSlug);
  if (!config) notFound();

  let card: any = null;
  if (config.key === 'SINGAPORE_TRANSFER') {
    card = await prisma.singaporeTransfer.findUnique({ where: { id: cardId } });
  } else if (config.key === 'CROSS_BORDER_TRANSFER') {
    card = await prisma.crossBorderTransfer.findUnique({ where: { id: cardId } });
  } else if (config.key === 'SINGAPORE_TOURS') {
    card = await prisma.singaporeTour.findUnique({ where: { id: cardId }, include: { images: true } });
  } else if (config.key === 'MALAYSIA_TOURS') {
    card = await prisma.malaysiaTour.findUnique({ where: { id: cardId }, include: { images: true } });
  } else if (config.key === 'SINGAPORE_ATTRACTIONS') {
    card = await prisma.singaporeAttraction.findUnique({ where: { id: cardId } });
  }

  if (!card) notFound();
  return { config, card: mapToCard(config, card) };
}

export async function getPublicServiceCardBySlug(serviceSlug: string, slug: string) {
  const { config, cards } = await getPublicServiceCards(serviceSlug);
  const card = cards.find(c => c.slug === slug);
  if (!card) notFound();
  return { config, card };
}

function formatCurrency(amount: number) {
  return `SGD ${amount}`;
}

function mapToCard(config: any, raw: any): PublicServiceCard {
  let pricing: PublicServicePricing = {
    summary: { amount: null, headline: 'Contact us', subline: 'Price on request', tiers: [] },
    highlights: [],
    facts: []
  };

  if (config.key === 'SINGAPORE_TRANSFER') {
    pricing = {
      summary: {
        amount: raw.ratePerTransfer,
        headline: formatCurrency(raw.ratePerTransfer),
        subline: 'Standard transfer rate',
        tiers: [
          { label: 'Per Transfer', value: formatCurrency(raw.ratePerTransfer) },
          { label: 'Hourly', value: formatCurrency(raw.pricePerHour) + ' / hr' }
        ]
      },
      highlights: ['Private chauffeur', `${raw.pax} pax capacity`, 'Door-to-door'],
      facts: [
        { label: 'Max Pax', value: String(raw.pax) },
        { label: 'Luggage', value: `${raw.smallLuggage} S / ${raw.bigLuggage} B` }
      ]
    };
  } else if (config.key === 'CROSS_BORDER_TRANSFER') {
    pricing = {
      summary: {
        amount: raw.economy,
        headline: formatCurrency(raw.economy),
        subline: `Rate for ${raw.destination}`,
        tiers: [
          { label: 'Economy', value: formatCurrency(raw.economy) },
          { label: 'Premium', value: formatCurrency(raw.premium) },
          { label: 'Business', value: formatCurrency(raw.business) },
          { label: 'Luxury', value: formatCurrency(raw.luxury) }
        ]
      },
      highlights: ['Direct border transit', `${raw.distanceKm} km trip`, 'No vehicle change'],
      facts: [
        { label: 'Distance', value: `${raw.distanceKm} km` }
      ]
    };
  } else if (config.key === 'SINGAPORE_TOURS' || config.key === 'MALAYSIA_TOURS') {
    pricing = {
      summary: {
        amount: raw.adultPrice,
        headline: formatCurrency(raw.adultPrice),
        subline: 'Per adult (Min. 2 adults)',
        tiers: [
          { label: 'Adult', value: formatCurrency(raw.adultPrice) },
          { label: 'Child', value: formatCurrency(raw.childPrice) }
        ]
      },
      highlights: [raw.category || 'Tour', raw.serviceMode, 'Private Guide', raw.duration],
      facts: [
        { label: 'Category', value: raw.category || 'General' },
        { label: 'Duration', value: String(raw.duration) },
        { label: 'Min. Pax', value: String(raw.minAdults) },
        { label: 'Adult Price', value: formatCurrency(raw.adultPrice) },
        { label: 'Child Price', value: formatCurrency(raw.childPrice) }
      ]
    };
  } else if (config.key === 'SINGAPORE_ATTRACTIONS') {
    pricing = {
      summary: {
        amount: raw.adultOurPrice,
        headline: formatCurrency(raw.adultOurPrice),
        subline: 'Special online rate',
        tiers: [
          { label: 'Adult', value: formatCurrency(raw.adultOurPrice) },
          { label: 'Child', value: formatCurrency(raw.childOurPrice) }
        ]
      },
      highlights: [raw.category, raw.audience, raw.badge || 'Popular'],
      facts: [
        { label: 'Original Price', value: formatCurrency(raw.adultPublishPrice) }
      ]
    };
  }

  return {
    id: raw.id,
    slug: buildServiceCardSlug(raw.name || raw.title || raw.destination || 'service', raw.id),
    title: raw.name || raw.title || raw.destination,
    subtitle: raw.category || raw.serviceMode || (raw.distanceKm ? `${raw.distanceKm} km` : null),
    description: raw.description || null,
    imageUrl: raw.imageUrl || raw.image || null,
    ctaLabel: 'Book Now',
    ctaHref: '/book',
    displayOrder: 0,
    badge: raw.badge || raw.audience || null,
    serviceSlug: config.slug,
    serviceName: config.label,
    sectionKey: config.key,
    car: (config.key === 'SINGAPORE_TRANSFER') ? {
      name: raw.name,
      category: raw.category,
      pax: raw.pax,
      luggage: `${raw.smallLuggage} small / ${raw.bigLuggage} big`,
      hourlyRate: raw.pricePerHour,
      transferRate: raw.ratePerTransfer,
      rate: `SGD ${raw.pricePerHour}/hr`
    } : null,
    galleryImages: Array.isArray(raw.images) ? raw.images.map((img: any) => ({
      imageUrl: img.imageUrl,
      altText: img.altText || null,
      displayOrder: img.displayOrder || 0
    })) : [],
    pricing
  };
}
