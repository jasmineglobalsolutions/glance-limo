import {
  malaysiaToursAll,
  prices as crossBorderPrices,
  sharedTours,
  singaporeToursAll,
} from '@/app/utils/data';

import type { PublicServicePricing } from '@/lib/public-service-types';

type PricingInput = {
  sectionKey: string;
  title: string;
  subtitle: string | null;
  description: string | null;
  badge: string | null;
  car: {
    category: string;
    pax: number;
    luggage: string;
    hourlyRate: number;
    transferRate: number;
  } | null;
};

type TourTemplate = {
  title: string;
  category: string;
  adult: number;
  child: number;
  duration: string;
  serviceMode?: string;
};

function formatCurrency(amount: number | null | undefined, suffix = '') {
  if (amount === null || amount === undefined || Number.isNaN(amount)) {
    return 'Custom quote';
  }

  return `SGD ${amount}${suffix}`;
}

function normalizeTitle(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();
}

function findTourTemplate(title: string, collection: TourTemplate[]) {
  const normalizedTitle = normalizeTitle(title);

  return (
    collection.find((item) => normalizeTitle(item.title) === normalizedTitle) ??
    collection.find((item) => normalizedTitle.includes(normalizeTitle(item.title))) ??
    null
  );
}

function compactStrings(values: Array<string | null | undefined>) {
  return values.filter((value): value is string => Boolean(value));
}

function buildTransferPricing(input: PricingInput): PublicServicePricing {
  if (!input.car) {
    return {
      summary: {
        amount: null,
        headline: 'Custom quote',
        subline: 'Pricing is confirmed after route review.',
        tiers: [],
      },
      highlights: ['Private chauffeur', 'Direct hotel or airport pickup'],
      facts: [],
    };
  }

  return {
    summary: {
      amount: input.car.transferRate,
      headline: formatCurrency(input.car.transferRate),
      subline: 'Base transfer rate for this vehicle.',
      tiers: [
        { label: 'Transfer', value: formatCurrency(input.car.transferRate) },
        { label: 'Hourly', value: formatCurrency(input.car.hourlyRate, ' / hr') },
      ],
    },
    highlights: [
      `${input.car.pax} passenger capacity`,
      input.car.luggage,
      'Private chauffeur with direct pickup',
    ],
    facts: [
      { label: 'Vehicle class', value: input.car.category },
      { label: 'Passengers', value: `${input.car.pax}` },
      { label: 'Luggage', value: input.car.luggage },
    ],
  };
}

function buildCrossBorderPricing(input: PricingInput): PublicServicePricing {
  const destination =
    Object.keys(crossBorderPrices).find((route) =>
      normalizeTitle(input.title).includes(normalizeTitle(route)),
    ) ?? null;

  if (!destination) {
    return {
      summary: {
        amount: null,
        headline: 'Custom quote',
        subline: 'Cross-border pricing depends on destination and vehicle class.',
        tiers: [],
      },
      highlights: ['Immigration stop coordination', 'Singapore to Malaysia private ride'],
      facts: [],
    };
  }

  const routePricing = crossBorderPrices[destination];

  return {
    summary: {
      amount: routePricing.Economy,
      headline: formatCurrency(routePricing.Economy),
      subline: `Economy rate for ${destination}.`,
      tiers: [
        { label: 'Economy', value: formatCurrency(routePricing.Economy) },
        { label: 'Premium', value: formatCurrency(routePricing.Premium) },
        { label: 'Business', value: formatCurrency(routePricing.Business) },
        { label: 'Luxury', value: formatCurrency(routePricing.Luxury) },
      ],
    },
    highlights: [
      `Private transfer to ${destination}`,
      'Checkpoint support and direct routing',
      'Rates vary by vehicle class',
    ],
    facts: [
      { label: 'Destination', value: destination },
      { label: 'Service type', value: 'Cross-border transfer' },
    ],
  };
}

function buildTourPricing(
  input: PricingInput,
  collection: TourTemplate[],
  defaultHighlight: string,
): PublicServicePricing {
  const template = findTourTemplate(input.title, collection);

  if (!template) {
    return {
      summary: {
        amount: null,
        headline: 'Custom quote',
        subline: 'This itinerary is priced after trip planning.',
        tiers: [],
      },
      highlights: [defaultHighlight, 'Flexible private planning'],
      facts: [],
    };
  }

  const serviceMode =
    template.serviceMode === 'full-driver'
      ? 'Full driver service'
      : template.serviceMode === 'two-way'
        ? 'Two-way transfer'
        : 'Shared or attraction schedule';

  return {
    summary: {
      amount: template.adult,
      headline: formatCurrency(template.adult),
      subline: 'Adult starting rate.',
      tiers: [
        { label: 'Adult', value: formatCurrency(template.adult) },
        { label: 'Child', value: formatCurrency(template.child) },
      ],
    },
    highlights: [
      template.category,
      template.duration,
      input.badge ?? defaultHighlight,
    ].filter((value): value is string => Boolean(value)),
    facts: [
      { label: 'Category', value: template.category },
      { label: 'Duration', value: template.duration },
      { label: 'Format', value: serviceMode },
    ],
  };
}

export function getPublicServicePricing(input: PricingInput): PublicServicePricing {
  switch (input.sectionKey) {
    case 'SINGAPORE_TRANSFER':
      return buildTransferPricing(input);
    case 'CROSS_BORDER_TRANSFER':
      return buildCrossBorderPricing(input);
    case 'SINGAPORE_TOURS':
      return buildTourPricing(input, singaporeToursAll, 'Private city tour');
    case 'MALAYSIA_TOURS':
      return buildTourPricing(input, malaysiaToursAll, 'Private Malaysia tour');
    case 'SINGAPORE_ATTRACTIONS':
      return buildTourPricing(input, sharedTours, 'Shared attraction experience');
    default:
      return {
        summary: {
          amount: null,
          headline: 'Custom quote',
          subline: input.subtitle || input.description || 'Price available on request.',
          tiers: [],
        },
        highlights: compactStrings([input.badge ?? 'Premium service']),
        facts: [],
      };
  }
}
