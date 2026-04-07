import type {
  SingaporeTransfer,
  ServiceCardImage,
  ServiceSection,
  CrossBorderTransfer,
} from '@prisma/client';

import type {
  CrmSingaporeTransfer,
  CrmDashboardBootstrap,
  CrmServiceCard,
  CrmServiceCardImage,
  CrmServiceSection,
  CrmCrossBorderTransfer,
} from '@/lib/crm-types';
import type { ServiceCardWithRelations } from '@/lib/crm-data';

function toIsoString(value: Date) {
  return value.toISOString();
}

export function serializeSingaporeTransfer(car: SingaporeTransfer): CrmSingaporeTransfer {
  return {
    id: car.id,
    name: car.name,
    description: car.description,
    category: car.category,
    imageUrl: car.imageUrl,
    personCapacity: car.personCapacity,
    smallLuggage: car.smallLuggage,
    bigLuggage: car.bigLuggage,
    hasChildSeat: car.hasChildSeat,
    pricePerHour: car.pricePerHour,
    ratePerTransfer: car.ratePerTransfer,
    isActive: car.isActive,
    displayOrder: car.displayOrder,
    createdAt: toIsoString(car.createdAt),
    updatedAt: toIsoString(car.updatedAt),
  };
}

export function serializeCrossBorderTransfer(route: CrossBorderTransfer): CrmCrossBorderTransfer {
  return {
    id: route.id,
    destination: route.destination,
    distanceKm: route.distanceKm,
    priceEconomy: route.priceEconomy,
    pricePremium: route.pricePremium,
    priceBusiness: route.priceBusiness,
    priceLuxury: route.priceLuxury,
    isActive: route.isActive,
    displayOrder: route.displayOrder,
    createdAt: toIsoString(route.createdAt),
    updatedAt: toIsoString(route.updatedAt),
  };
}

export function serializeServiceCardImage(image: ServiceCardImage): CrmServiceCardImage {
  return {
    id: image.id,
    imageUrl: image.imageUrl,
    altText: image.altText,
    displayOrder: image.displayOrder,
    createdAt: toIsoString(image.createdAt),
  };
}

export function serializeServiceSection(
  section: ServiceSection,
  cardCount = 0,
): CrmServiceSection {
  return {
    id: section.id,
    key: section.key,
    name: section.name,
    slug: section.slug,
    description: section.description,
    isActive: section.isActive,
    cardCount,
    createdAt: toIsoString(section.createdAt),
    updatedAt: toIsoString(section.updatedAt),
  };
}

export function serializeServiceCard(card: ServiceCardWithRelations): CrmServiceCard {
  return {
    id: card.id,
    sectionId: card.sectionId,
    title: card.title,
    subtitle: card.subtitle,
    description: card.description,
    imageUrl: card.imageUrl,
    badge: card.badge,
    ctaLabel: card.ctaLabel,
    ctaHref: card.ctaHref,
    displayOrder: card.displayOrder,
    isActive: card.isActive,
    singaporeTransferId: card.singaporeTransferId,
    createdAt: toIsoString(card.createdAt),
    updatedAt: toIsoString(card.updatedAt),
    section: {
      id: card.section.id,
      key: card.section.key,
      name: card.section.name,
      slug: card.section.slug,
      description: card.section.description,
      isActive: card.section.isActive,
    },
    singaporeTransfer: card.singaporeTransfer
      ? {
          id: card.singaporeTransfer.id,
          name: card.singaporeTransfer.name,
          category: card.singaporeTransfer.category,
          imageUrl: card.singaporeTransfer.imageUrl,
          personCapacity: card.singaporeTransfer.personCapacity,
          smallLuggage: card.singaporeTransfer.smallLuggage,
          bigLuggage: card.singaporeTransfer.bigLuggage,
          pricePerHour: card.singaporeTransfer.pricePerHour,
          ratePerTransfer: card.singaporeTransfer.ratePerTransfer,
        }
      : null,
    images: card.images.map(serializeServiceCardImage),
  };
}

export function buildDashboardBootstrapPayload(input: {
  sections: ServiceSection[];
  singaporeTransfers: SingaporeTransfer[];
  crossBorderTransfers: CrossBorderTransfer[];
  serviceCards: ServiceCardWithRelations[];
}): CrmDashboardBootstrap {
  const cardCountBySection = new Map<string, number>();

  for (const card of input.serviceCards) {
    const current = cardCountBySection.get(card.sectionId) ?? 0;
    cardCountBySection.set(card.sectionId, current + 1);
  }

  const sections = input.sections.map((section) =>
    serializeServiceSection(section, cardCountBySection.get(section.id) ?? 0),
  );
  const singaporeTransfers = input.singaporeTransfers.map(serializeSingaporeTransfer);
  const crossBorderTransfers = input.crossBorderTransfers.map(serializeCrossBorderTransfer);
  const serviceCards = input.serviceCards.map(serializeServiceCard);

  return {
    sections,
    singaporeTransfers,
    crossBorderTransfers,
    serviceCards,
    stats: {
      activeSingaporeTransfers: singaporeTransfers.filter((car) => car.isActive).length,
      totalCrossBorderTransfers: crossBorderTransfers.length,
      activeCrossBorderTransfers: crossBorderTransfers.filter((route) => route.isActive).length,
      totalCards: serviceCards.length,
      activeCards: serviceCards.filter((card) => card.isActive).length,
      totalGalleryImages: serviceCards.reduce(
        (total, card) => total + card.images.length,
        0,
      ),
    },
  };
}
