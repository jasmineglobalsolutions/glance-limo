import { z } from 'zod';

import {
  CRM_SERVICE_OPTIONS,
  VEHICLE_CATEGORY_OPTIONS,
} from '@/lib/crm-services';

const serviceSectionKeys = CRM_SERVICE_OPTIONS.map((service) => service.key) as [
  string,
  ...string[],
];

const vehicleCategories = VEHICLE_CATEGORY_OPTIONS.map((category) => category.value) as [
  string,
  ...string[],
];

const trimmedString = z
  .string()
  .transform((value) => value.trim())
  .pipe(z.string().min(1, 'This field is required.'));

const optionalTrimmedString = z
  .union([z.string(), z.null(), z.undefined()])
  .transform((value) => {
    if (typeof value !== 'string') {
      return null;
    }

    const trimmed = value.trim();
    return trimmed.length > 0 ? trimmed : null;
  });

const slugSchema = z
  .string()
  .trim()
  .min(1, 'Slug is required.')
  .regex(/^[a-z0-9-]+$/, 'Slug can only contain lowercase letters, numbers, and hyphens.');

const nonNegativeInt = z.coerce.number().int().min(0);
const nonNegativeNumber = z.coerce.number().min(0);

export const carInputSchema = z.object({
  name: trimmedString,
  description: optionalTrimmedString,
  category: z.enum(vehicleCategories),
  imageUrl: optionalTrimmedString,
  personCapacity: nonNegativeInt,
  smallLuggage: nonNegativeInt,
  bigLuggage: nonNegativeInt,
  hasChildSeat: z.boolean(),
  pricePerHour: nonNegativeNumber,
  ratePerTransfer: nonNegativeNumber,
  isActive: z.boolean(),
  displayOrder: nonNegativeInt,
});

export const transferRouteInputSchema = z.object({
  destination: trimmedString,
  distanceKm: nonNegativeInt,
  priceEconomy: nonNegativeNumber,
  pricePremium: nonNegativeNumber,
  priceBusiness: nonNegativeNumber,
  priceLuxury: nonNegativeNumber,
  isActive: z.boolean(),
  displayOrder: nonNegativeInt,
});

export const serviceSectionUpdateSchema = z.object({
  name: trimmedString,
  slug: slugSchema,
  description: optionalTrimmedString,
  isActive: z.boolean(),
});

export const serviceCardImageInputSchema = z.object({
  id: z.string().optional(),
  imageUrl: trimmedString,
  altText: optionalTrimmedString,
  displayOrder: nonNegativeInt,
});

export const serviceCardInputSchema = z.object({
  sectionId: trimmedString,
  title: trimmedString,
  subtitle: optionalTrimmedString,
  description: optionalTrimmedString,
  imageUrl: optionalTrimmedString,
  badge: optionalTrimmedString,
  ctaLabel: optionalTrimmedString,
  ctaHref: optionalTrimmedString,
  displayOrder: nonNegativeInt,
  isActive: z.boolean(),
  images: z.array(serviceCardImageInputSchema).default([]),
});

export const serviceSectionKeySchema = z.enum(serviceSectionKeys);
