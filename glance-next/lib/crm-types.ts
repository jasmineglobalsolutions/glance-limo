import type { ServiceSectionKey, VehicleCategoryValue } from '@/lib/crm-services';

export type CrmTimestamped = {
  createdAt: string;
  updatedAt: string;
};

export type CrmServiceSection = CrmTimestamped & {
  id: string;
  key: ServiceSectionKey;
  name: string;
  slug: string;
  description: string | null;
  isActive: boolean;
  cardCount: number;
};

export type CrmSingaporeTransfer = CrmTimestamped & {
  id: string;
  name: string;
  description: string | null;
  category: VehicleCategoryValue;
  imageUrl: string | null;
  personCapacity: number;
  smallLuggage: number;
  bigLuggage: number;
  hasChildSeat: boolean;
  pricePerHour: number;
  ratePerTransfer: number;
  isActive: boolean;
  displayOrder: number;
};

export type CrmCrossBorderTransfer = CrmTimestamped & {
  id: string;
  destination: string;
  distanceKm: number;
  priceEconomy: number;
  pricePremium: number;
  priceBusiness: number;
  priceLuxury: number;
  isActive: boolean;
  displayOrder: number;
};

export type CrmServiceCardImage = {
  id: string;
  imageUrl: string;
  altText: string | null;
  displayOrder: number;
  createdAt: string;
};

export type CrmServiceCard = CrmTimestamped & {
  id: string;
  sectionId: string;
  title: string;
  subtitle: string | null;
  description: string | null;
  imageUrl: string | null;
  badge: string | null;
  ctaLabel: string | null;
  ctaHref: string | null;
  displayOrder: number;
  isActive: boolean;
  section: Pick<CrmServiceSection, 'id' | 'key' | 'name' | 'slug' | 'description' | 'isActive'>;
  images: CrmServiceCardImage[];
};

export type CrmDashboardStats = {
  activeSingaporeTransfers: number;
  totalCrossBorderTransfers: number;
  activeCrossBorderTransfers: number;
  totalCards: number;
  activeCards: number;
  totalGalleryImages: number;
};

export type CrmDashboardBootstrap = {
  sections: CrmServiceSection[];
  singaporeTransfers: CrmSingaporeTransfer[];
  crossBorderTransfers: CrmCrossBorderTransfer[];
  serviceCards: CrmServiceCard[];
  stats: CrmDashboardStats;
};

export type CrmSingaporeTransferInput = {
  name: string;
  description: string;
  category: VehicleCategoryValue;
  imageUrl: string;
  personCapacity: number;
  smallLuggage: number;
  bigLuggage: number;
  hasChildSeat: boolean;
  pricePerHour: number;
  ratePerTransfer: number;
  isActive: boolean;
  displayOrder: number;
};

export type CrmCrossBorderTransferInput = {
  destination: string;
  distanceKm: number;
  priceEconomy: number;
  pricePremium: number;
  priceBusiness: number;
  priceLuxury: number;
  isActive: boolean;
  displayOrder: number;
};

export type CrmServiceCardImageInput = {
  id?: string;
  imageUrl: string;
  altText: string;
  displayOrder: number;
};

export type CrmServiceCardInput = {
  sectionId: string;
  title: string;
  subtitle: string;
  description: string;
  imageUrl: string;
  badge: string;
  ctaLabel: string;
  ctaHref: string;
  displayOrder: number;
  isActive: boolean;
  images: CrmServiceCardImageInput[];
};

export type CrmServiceSectionInput = {
  name: string;
  slug: string;
  description: string;
  isActive: boolean;
};

export function createEmptySingaporeTransferInput(): CrmSingaporeTransferInput {
  return {
    name: '',
    description: '',
    category: 'LUXURY',
    imageUrl: '',
    personCapacity: 0,
    smallLuggage: 0,
    bigLuggage: 0,
    hasChildSeat: false,
    pricePerHour: 0,
    ratePerTransfer: 0,
    isActive: true,
    displayOrder: 0,
  };
}

export function createEmptyCrossBorderTransferInput(): CrmCrossBorderTransferInput {
  return {
    destination: '',
    distanceKm: 0,
    priceEconomy: 0,
    pricePremium: 0,
    priceBusiness: 0,
    priceLuxury: 0,
    isActive: true,
    displayOrder: 0,
  };
}

export function createEmptyServiceCardInput(sectionId = ''): CrmServiceCardInput {
  return {
    sectionId,
    title: '',
    subtitle: '',
    description: '',
    imageUrl: '',
    badge: '',
    ctaLabel: 'Book now',
    ctaHref: '/book',
    displayOrder: 0,
    isActive: true,
    images: [],
  };
}

export function createSectionInput(section: CrmServiceSection): CrmServiceSectionInput {
  return {
    name: section.name,
    slug: section.slug,
    description: section.description ?? '',
    isActive: section.isActive,
  };
}
