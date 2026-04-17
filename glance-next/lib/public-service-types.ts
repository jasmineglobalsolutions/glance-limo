export type PublicServicePriceTier = {
  label: string;
  value: string;
};

export type PublicServiceFact = {
  label: string;
  value: string;
};

export type PublicServicePriceSummary = {
  amount: number | null;
  headline: string;
  subline: string;
  tiers: PublicServicePriceTier[];
};

export type PublicServicePricing = {
  summary: PublicServicePriceSummary;
  highlights: string[];
  facts: PublicServiceFact[];
};

export type PublicServiceCard = {
  id: string;
  slug: string;
  title: string;
  subtitle: string | null;
  description: string | null;
  imageUrl: string | null;
  ctaLabel: string | null;
  ctaHref: string | null;
  displayOrder: number;
  badge: string | null;
  serviceSlug: string;
  serviceName: string;
  sectionKey: string;
  car: {
    name: string;
    category: string;
    pax: number;
    luggage: string;
    hourlyRate: number;
    transferRate: number;
    rate: string;
  } | null;
  galleryImages: Array<{
    imageUrl: string;
    altText: string | null;
    displayOrder: number;
  }>;
  pricing: PublicServicePricing;
};
