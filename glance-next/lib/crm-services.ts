export const DEFAULT_TENANT_NAME = 'Glance Limousine';

export const CRM_SERVICE_OPTIONS = [
  {
    slug: 'singapore-transfer',
    label: 'Singapore Transfer',
    key: 'SINGAPORE_TRANSFER',
    description: 'Airport, city, and hourly transfer vehicles.',
  },
  {
    slug: 'cross-border-transfer',
    label: 'Cross Border Transfer',
    key: 'CROSS_BORDER_TRANSFER',
    description: 'Singapore to Malaysia transfer route catalogue.',
  },
  {
    slug: 'singapore-tours',
    label: 'Singapore Tours',
    key: 'SINGAPORE_TOURS',
    description: 'Private tour cards and itinerary highlights.',
  },
  {
    slug: 'malaysia-tours',
    label: 'Malaysia Tours',
    key: 'MALAYSIA_TOURS',
    description: 'Malaysia private tour cards and day-trip products.',
  },
  {
    slug: 'singapore-attractions',
    label: 'Singapore Attractions',
    key: 'SINGAPORE_ATTRACTIONS',
    description: 'Attraction and shared experience cards.',
  },
] as const;

export const VEHICLE_CATEGORY_OPTIONS = [
  { value: 'LUXURY', label: 'Luxury' },
  { value: 'BUSINESS', label: 'Business' },
  { value: 'PREMIUM_ECONOMY', label: 'Premium Economy' },
  { value: 'ECONOMY', label: 'Economy' },
  { value: 'VAN', label: 'Van' },
  { value: 'BUS', label: 'Bus' },
] as const;

export type CrmServiceSlug = (typeof CRM_SERVICE_OPTIONS)[number]['slug'];
export type ServiceSectionKey = (typeof CRM_SERVICE_OPTIONS)[number]['key'];
export type VehicleCategoryValue = (typeof VEHICLE_CATEGORY_OPTIONS)[number]['value'];

export type ServiceSectionConfig = {
  slug: CrmServiceSlug;
  label: string;
  key: ServiceSectionKey;
  description: string;
};

export function serviceConfigFromSlug(slug: string): ServiceSectionConfig | null {
  return CRM_SERVICE_OPTIONS.find((service) => service.slug === slug) ?? null;
}

export function serviceConfigFromKey(key: string): ServiceSectionConfig | null {
  return CRM_SERVICE_OPTIONS.find((service) => service.key === key) ?? null;
}

export function getDefaultServiceSectionSeed() {
  return CRM_SERVICE_OPTIONS.map((service) => ({
    key: service.key,
    name: service.label,
    slug: service.slug,
    description: service.description,
    isActive: true,
  }));
}
