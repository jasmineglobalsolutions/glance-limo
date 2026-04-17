'use client';
/* eslint-disable @next/next/no-img-element */

import Link from 'next/link';
import { useMemo, useState } from 'react';

import { createCartItem } from '@/lib/public-cart';
import type { PublicServiceCard } from '@/lib/public-service-types';
import { addItem, openCart } from '@/lib/store/features/cart/cart-slice';
import { useAppDispatch, useAppSelector } from '@/lib/store/hooks';
import { useCurrencyFormatter } from '@/lib/store/hooks/useCurrencyFormatter';

type ServiceCardDetailProps = {
  config: {
    slug: string;
    label: string;
  };
  card: PublicServiceCard;
  relatedCards: PublicServiceCard[];
};

type VehicleUpgradeOption = {
  label: string;
  hourlyRate: number;
  maxPax: number;
};

type GuideOption = {
  label: string;
  hourlyRate: number;
};

type BookingDefaults = {
  adultPrice: number;
  childPrice: number;
  durationHours: number;
  durationLabel: string;
  minAdults: number;
  bookingRule: string;
  driverMode: string;
  inclusions: string[];
  exclusions: string[];
};

const VEHICLE_UPGRADES: VehicleUpgradeOption[] = [
  { label: 'Economy Included', hourlyRate: 0, maxPax: 4 },
  { label: 'Premium Economy', hourlyRate: 10, maxPax: 6 },
  { label: 'Business Class', hourlyRate: 20, maxPax: 4 },
  { label: 'Luxury Class W222', hourlyRate: 90, maxPax: 2 },
];

const GUIDE_OPTIONS: GuideOption[] = [
  { label: 'No Tour Guide', hourlyRate: 0 },
  { label: 'English-speaking guide', hourlyRate: 50 },
  {
    label: 'Russian / Spanish / German / Italian guide',
    hourlyRate: 90,
  },
];

const PHOTOGRAPHER_OPTIONS: GuideOption[] = [
  { label: 'No photographer', hourlyRate: 0 },
  { label: 'Photographer', hourlyRate: 50 },
];

const BABY_SEAT_UNIT_PRICE = 20;

function buildGallery(card: PublicServiceCard) {
  if (card.galleryImages.length > 0) {
    return card.galleryImages.map((image, index) => ({
      imageUrl: image.imageUrl,
      altText: image.altText || `${card.title} image ${index + 1}`,
    }));
  }

  if (card.imageUrl) {
    return [
      {
        imageUrl: card.imageUrl,
        altText: card.title,
      },
    ];
  }

  return [
    {
      imageUrl: '/logo.webp',
      altText: card.title,
    },
  ];
}

function parseAmount(text: string | null | undefined): number | null {
  if (!text) {
    return null;
  }

  const match = text.match(/(\d[\d,]*(?:\.\d+)?)/);
  if (!match) {
    return null;
  }

  return Number(match[1].replaceAll(',', ''));
}

function findTierAmount(card: PublicServiceCard, labelPattern: RegExp): number | null {
  const tier = card.pricing.summary.tiers.find((entry) =>
    labelPattern.test(entry.label.toLowerCase()),
  );

  return parseAmount(tier?.value);
}

function findFactValue(card: PublicServiceCard, labelPattern: RegExp): string | null {
  const fact = card.pricing.facts.find((entry) =>
    labelPattern.test(entry.label.toLowerCase()),
  );

  return fact?.value ?? null;
}

function formatDriverMode(value: string): string {
  const normalized = value.replaceAll('_', ' ').trim().toLowerCase();

  if (normalized.includes('two')) {
    return 'Two-Way Transfer';
  }
  if (normalized.includes('shared')) {
    return 'Shared Coach';
  }
  if (normalized.includes('full') || normalized.includes('driver')) {
    return 'Full Driver';
  }

  return value
    .replaceAll('_', ' ')
    .split(' ')
    .filter(Boolean)
    .map((part) => part[0].toUpperCase() + part.slice(1).toLowerCase())
    .join(' ');
}

function uniqueItems(items: string[]) {
  return [...new Set(items.filter((item) => item.trim().length > 0))];
}

function buildBookingDefaults(card: PublicServiceCard): BookingDefaults {
  const isTourLike =
    card.sectionKey === 'SINGAPORE_TOURS' || card.sectionKey === 'MALAYSIA_TOURS';

  const adultPrice =
    findTierAmount(card, /adult|economy|per transfer|ticket/) ??
    card.pricing.summary.amount ??
    0;
  const fallbackChildPrice = Math.max(0, Math.round(adultPrice * 0.72));
  const childPrice = findTierAmount(card, /child/) ?? fallbackChildPrice;

  const durationFact = findFactValue(card, /duration/);
  const durationLabel =
    durationFact ??
    card.pricing.highlights.find((item) => /(hr|hour)/i.test(item)) ??
    (isTourLike ? '4 Hrs' : '1 Hr');
  const durationHours = parseAmount(durationLabel) ?? (isTourLike ? 4 : 1);

  const minAdultsFact = parseAmount(findFactValue(card, /min/));
  const minAdults = minAdultsFact ?? (isTourLike ? 2 : 1);

  const driverSource =
    card.pricing.highlights.find((item) =>
      /(driver|two_way|two way|shared)/i.test(item),
    ) ?? '';
  const driverMode = driverSource ? formatDriverMode(driverSource) : 'Private Chauffeur';

  const bookingRule =
    minAdults > 1 ? `Minimum ${minAdults} Adults to Go` : 'Adult & Child Pricing';

  const inclusions = uniqueItems([
    'Private chauffeur arrangement',
    `${durationLabel} itinerary window`,
    `${driverMode} support`,
    ...card.pricing.highlights.slice(0, 2).map((item) => item.replaceAll('_', ' ')),
  ]);

  const exclusions = uniqueItems(
    card.sectionKey === 'SINGAPORE_ATTRACTIONS'
      ? [
          'Personal expenses',
          'Optional add-ons not selected',
          'Transport outside listed itinerary',
        ]
      : [
          'Attraction tickets unless listed',
          'Personal expenses',
          'Overtime or extra stopovers',
        ],
  );

  return {
    adultPrice,
    childPrice,
    durationHours,
    durationLabel,
    minAdults,
    bookingRule,
    driverMode,
    inclusions,
    exclusions,
  };
}

export function ServiceCardDetail({
  config,
  card,
  relatedCards,
}: ServiceCardDetailProps) {
  const dispatch = useAppDispatch();
  const format = useCurrencyFormatter();
  const bookingDefaults = useMemo(() => buildBookingDefaults(card), [card]);
  const currentItemQuantity = useAppSelector(
    (state) =>
      state.cart.items
        .filter((item) => item.id === card.id || item.id.startsWith(`${card.id}-`))
        .reduce((total, item) => total + item.quantity, 0),
  );
  const gallery = buildGallery(card);
  const isCarCard = card.car !== null || card.sectionKey === 'SINGAPORE_TRANSFER';
  const [activeImage, setActiveImage] = useState(gallery[0]);
  const [adultQty, setAdultQty] = useState(bookingDefaults.minAdults);
  const [childQty, setChildQty] = useState(0);
  const [vehicleRate, setVehicleRate] = useState(0);
  const [guideRate, setGuideRate] = useState(0);
  const [babySeatQty, setBabySeatQty] = useState(0);
  const [photographerRate, setPhotographerRate] = useState(0);
  const [consent, setConsent] = useState(false);

  const selectedVehicle =
    VEHICLE_UPGRADES.find((option) => option.hourlyRate === vehicleRate) ??
    VEHICLE_UPGRADES[0];
  const selectedGuide =
    GUIDE_OPTIONS.find((option) => option.hourlyRate === guideRate) ?? GUIDE_OPTIONS[0];
  const selectedPhotographer =
    PHOTOGRAPHER_OPTIONS.find((option) => option.hourlyRate === photographerRate) ??
    PHOTOGRAPHER_OPTIONS[0];

  const pricing = useMemo(() => {
    const adultsTotal = adultQty * bookingDefaults.adultPrice;
    const childrenTotal = childQty * bookingDefaults.childPrice;
    const upgradeTotal = bookingDefaults.durationHours * selectedVehicle.hourlyRate;
    const guideTotal = bookingDefaults.durationHours * selectedGuide.hourlyRate;
    const photographerTotal =
      bookingDefaults.durationHours * selectedPhotographer.hourlyRate;
    const babySeatTotal = babySeatQty * BABY_SEAT_UNIT_PRICE;
    const addOnsTotal = guideTotal + photographerTotal + babySeatTotal;
    const total = adultsTotal + childrenTotal + upgradeTotal + addOnsTotal;

    return {
      adultsTotal,
      childrenTotal,
      upgradeTotal,
      addOnsTotal,
      total,
    };
  }, [
    adultQty,
    babySeatQty,
    bookingDefaults.adultPrice,
    bookingDefaults.childPrice,
    bookingDefaults.durationHours,
    childQty,
    selectedGuide.hourlyRate,
    selectedPhotographer.hourlyRate,
    selectedVehicle.hourlyRate,
  ]);

  const totalGuests = adultQty + childQty;
  const warningMessage =
    totalGuests > selectedVehicle.maxPax
      ? `Capacity exceeded: this vehicle supports up to ${selectedVehicle.maxPax} guests.`
      : adultQty < bookingDefaults.minAdults
        ? `Minimum ${bookingDefaults.minAdults} adults required for this card.`
        : null;

  const canSubmit = consent && !warningMessage && pricing.total > 0;

  function buildBookingLabel() {
    const summaryParts = [
      `${adultQty} Adult${adultQty === 1 ? '' : 's'}`,
      `${childQty} Child${childQty === 1 ? '' : 'ren'}`,
      selectedVehicle.label,
    ];

    if (selectedGuide.hourlyRate > 0) {
      summaryParts.push(selectedGuide.label);
    }
    if (selectedPhotographer.hourlyRate > 0) {
      summaryParts.push(selectedPhotographer.label);
    }
    if (babySeatQty > 0) {
      summaryParts.push(`Baby seats x${babySeatQty}`);
    }

    return summaryParts.join(' | ');
  }

  function handleAddConfiguredToCart() {
    if (!canSubmit) {
      return;
    }

    const configuredId = [
      card.id,
      adultQty,
      childQty,
      vehicleRate,
      guideRate,
      babySeatQty,
      photographerRate,
    ].join('-');

    dispatch(
      addItem({
        id: configuredId,
        slug: card.slug,
        serviceSlug: card.serviceSlug,
        serviceName: card.serviceName,
        title: `${card.title} (${adultQty}A/${childQty}C)`,
        subtitle: buildBookingLabel(),
        imageUrl: card.imageUrl ?? gallery[0]?.imageUrl ?? null,
        unitPrice: pricing.total,
        priceLabel: format(pricing.total),
      }),
    );
    dispatch(openCart());
  }

  function handlePayNow() {
    if (!canSubmit) {
      return;
    }

    const message = [
      'Booking Request',
      `${card.title}`,
      `Service: ${card.serviceName}`,
      `Guests: ${adultQty} adults, ${childQty} children`,
      `Duration: ${bookingDefaults.durationLabel}`,
      `Vehicle: ${selectedVehicle.label}`,
      `Guide: ${selectedGuide.label}`,
      `Photographer: ${selectedPhotographer.label}`,
      `Baby seats: ${babySeatQty}`,
      `Total: ${format(pricing.total)}`,
    ].join('\n');

    const defaultWa = `https://wa.me/6584444744?text=${encodeURIComponent(message)}`;
    const target = card.ctaHref?.trim() || defaultWa;

    if (target.startsWith('https://wa.me/')) {
      const separator = target.includes('?') ? '&' : '?';
      window.open(
        `${target}${separator}text=${encodeURIComponent(message)}`,
        '_blank',
        'noopener,noreferrer',
      );
      return;
    }

    if (target.startsWith('http://') || target.startsWith('https://')) {
      window.open(target, '_blank', 'noopener,noreferrer');
      return;
    }

    window.location.href = target;
  }

  return (
    <main className="section service-dashboard">
      <div className="container">
        <div className="service-detail__topbar">
          <Link className="service-detail__backlink" href={`/services/${config.slug}`}>
            Back to {config.label}
          </Link>
          <span className="eyebrow">Slug ready detail page</span>
        </div>

        <section className="service-detail__hero">
          <div className="service-detail__gallery">
            <div
              className={`service-detail__active-image${
                isCarCard ? ' service-detail__active-image--car' : ''
              }`}
            >
              <img
                alt={activeImage.altText}
                className={isCarCard ? 'service-detail__image--car' : undefined}
                src={activeImage.imageUrl}
              />
            </div>
            <div className="service-detail__thumbs">
              {gallery.map((image) => (
                <button
                  className={`${activeImage.imageUrl === image.imageUrl ? 'is-active' : ''}${
                    isCarCard ? ' service-detail__thumb--car' : ''
                  }`}
                  key={image.imageUrl}
                  onClick={() => setActiveImage(image)}
                  type="button"
                >
                  <img
                    alt={image.altText}
                    className={isCarCard ? 'service-detail__thumb-image--car' : undefined}
                    src={image.imageUrl}
                  />
                </button>
              ))}
            </div>
          </div>

          <div className="service-detail__summary">
            <div className="service-detail__heading">
              <p>{config.label}</p>
              <h1>{card.title}</h1>
              <span>{card.badge ?? bookingDefaults.driverMode}</span>
            </div>

            <p className="service-detail__copy">
              {card.description || card.subtitle || 'Detailed CRM-backed card view.'}
            </p>

            <div className="detail-list">
              <div className="detail-box">
                <h4>Inclusions</h4>
                <ul>
                  {bookingDefaults.inclusions.map((item) => (
                    <li key={`${card.id}-inclusion-${item}`}>{item}</li>
                  ))}
                </ul>
              </div>
              <div className="detail-box">
                <h4>Exclusions</h4>
                <ul>
                  {bookingDefaults.exclusions.map((item) => (
                    <li key={`${card.id}-exclusion-${item}`}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="detail-pricing">
              <div className="price-pill">
                <span>Adult</span>
                <strong>{format(bookingDefaults.adultPrice)}</strong>
              </div>
              <div className="price-pill">
                <span>Child</span>
                <strong>{format(bookingDefaults.childPrice)}</strong>
              </div>
              <div className="price-pill">
                <span>Duration</span>
                <strong>{bookingDefaults.durationLabel}</strong>
              </div>
              <div className="price-pill">
                <span>Booking Rule</span>
                <strong>{bookingDefaults.bookingRule}</strong>
              </div>
              <div className="price-pill">
                <span>Driver Mode</span>
                <strong>{bookingDefaults.driverMode}</strong>
              </div>
            </div>

            <div className="booking-builder">
              <div className="booking-grid">
                <div className="booking-box">
                  <label htmlFor="detail-adult-qty">Number of Adults</label>
                  <input
                    id="detail-adult-qty"
                    min={0}
                    onChange={(event) =>
                      setAdultQty(Math.max(0, Number(event.target.value) || 0))
                    }
                    type="number"
                    value={adultQty}
                  />
                </div>
                <div className="booking-box">
                  <label htmlFor="detail-child-qty">Number of Children</label>
                  <input
                    id="detail-child-qty"
                    min={0}
                    onChange={(event) =>
                      setChildQty(Math.max(0, Number(event.target.value) || 0))
                    }
                    type="number"
                    value={childQty}
                  />
                </div>
              </div>

              <div className="booking-box">
                <label htmlFor="detail-upgrade">Tour Booking Options</label>
                <p className="mini-copy mini-copy--booking">
                  All prices include economy class. Upgrade and add-on charges are
                  calculated by duration.
                </p>
                <div className="booking-grid">
                  <div className="booking-box">
                    <label htmlFor="detail-upgrade">Vehicle Class Upgrade</label>
                    <select
                      id="detail-upgrade"
                      onChange={(event) => setVehicleRate(Number(event.target.value))}
                      value={vehicleRate}
                    >
                      {VEHICLE_UPGRADES.map((option) => (
                        <option key={option.label} value={option.hourlyRate}>
                          {option.hourlyRate === 0
                            ? option.label
                            : `${option.label} | +${format(option.hourlyRate)} per hour`}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="booking-box">
                    <label htmlFor="detail-guide">Tour Guide</label>
                    <select
                      id="detail-guide"
                      onChange={(event) => setGuideRate(Number(event.target.value))}
                      value={guideRate}
                    >
                      {GUIDE_OPTIONS.map((option) => (
                        <option key={option.label} value={option.hourlyRate}>
                          {option.hourlyRate === 0
                            ? option.label
                            : `${option.label} | ${format(option.hourlyRate)} per hour`}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="booking-box">
                    <label htmlFor="detail-baby-seat">Baby Seat Quantity</label>
                    <select
                      id="detail-baby-seat"
                      onChange={(event) => setBabySeatQty(Number(event.target.value))}
                      value={babySeatQty}
                    >
                      <option value={0}>No baby seat</option>
                      {[1, 2, 3, 4].map((qty) => (
                        <option key={qty} value={qty}>
                          {qty} seat{qty > 1 ? 's' : ''} | {format(qty * BABY_SEAT_UNIT_PRICE)}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="booking-box">
                    <label htmlFor="detail-photographer">Photographer</label>
                    <select
                      id="detail-photographer"
                      onChange={(event) => setPhotographerRate(Number(event.target.value))}
                      value={photographerRate}
                    >
                      {PHOTOGRAPHER_OPTIONS.map((option) => (
                        <option key={option.label} value={option.hourlyRate}>
                          {option.hourlyRate === 0
                            ? option.label
                            : `${option.label} | ${format(option.hourlyRate)} per hour`}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <div className="summary-box">
                <div className="price-pill">
                  <span>Adults Total</span>
                  <strong>{format(pricing.adultsTotal)}</strong>
                </div>
                <div className="price-pill">
                  <span>Children Total</span>
                  <strong>{format(pricing.childrenTotal)}</strong>
                </div>
                <div className="price-pill">
                  <span>Upgrade Total</span>
                  <strong>{format(pricing.upgradeTotal)}</strong>
                </div>
                <div className="price-pill">
                  <span>Add-Ons Total</span>
                  <strong>{format(pricing.addOnsTotal)}</strong>
                </div>
                <div className="price-pill">
                  <span>Booking Total</span>
                  <strong>{format(pricing.total)}</strong>
                </div>
              </div>

              <div className="consent-box">
                <input
                  checked={consent}
                  id="detail-consent"
                  onChange={(event) => setConsent(event.target.checked)}
                  type="checkbox"
                />
                <label htmlFor="detail-consent">
                  I confirm that I have read and agree to the{' '}
                  <a href="#terms">Terms & Conditions</a>.
                </label>
              </div>

              {warningMessage ? (
                <div className="notice detail-warning">{warningMessage}</div>
              ) : null}
            </div>

            <div className="detail-cta">
              <button className="btn" disabled={!canSubmit} onClick={handlePayNow} type="button">
                Pay Now
              </button>
              <button
                className="btn ghost"
                disabled={!canSubmit}
                onClick={handleAddConfiguredToCart}
                type="button"
              >
                Add to Cart
              </button>
            </div>

            {currentItemQuantity > 0 ? (
              <p className="service-detail__cart-note">
                This card is in your cart {currentItemQuantity} time
                {currentItemQuantity > 1 ? 's' : ''}.
              </p>
            ) : null}
          </div>
        </section>

        <section className="service-detail__content">
          <div className="service-detail__panel">
            <span className="eyebrow">Included snapshot</span>
            <h2>What this card shows</h2>
            <div className="service-dashboard__highlights">
              {card.pricing.highlights.map((highlight) => (
                <span key={`${card.id}-${highlight}`}>{highlight}</span>
              ))}
            </div>
            <p className="service-detail__copy">
              {card.description || card.subtitle || 'Use this detail page to review images, pricing, and booking intent before checkout.'}
            </p>
          </div>

          <div className="service-detail__panel">
            <span className="eyebrow">Trip facts</span>
            <h2>Quick comparison details</h2>
            <div className="service-dashboard__facts service-dashboard__facts--detail">
              {card.pricing.facts.length > 0 ? (
                card.pricing.facts.map((fact) => (
                  <div className="service-dashboard__fact" key={`${card.id}-${fact.label}`}>
                    <span>{fact.label}</span>
                    <strong>{fact.value}</strong>
                  </div>
                ))
              ) : (
                <div className="service-dashboard__fact">
                  <span>Request type</span>
                  <strong>Custom itinerary</strong>
                </div>
              )}
            </div>
          </div>
        </section>

        {relatedCards.length > 0 ? (
          <section className="service-detail__related">
            <div className="section-head">
              <p className="eyebrow">More in this service</p>
              <h2>Related cards</h2>
              <p>Keep exploring without leaving the shortlist flow.</p>
            </div>

            <div className="service-dashboard__grid service-dashboard__grid--compact">
              {relatedCards.map((relatedCard) => {
                const isRelatedCarCard =
                  relatedCard.car !== null || relatedCard.sectionKey === 'SINGAPORE_TRANSFER';

                return (
                  <article className="service-dashboard__card service-dashboard__card--compact" key={relatedCard.id}>
                    <div
                      className={`service-dashboard__image-wrap${
                        isRelatedCarCard ? ' service-dashboard__image-wrap--car' : ''
                      }`}
                    >
                    <img
                      alt={relatedCard.title}
                      className={isRelatedCarCard ? 'service-dashboard__image--car' : undefined}
                      src={
                        relatedCard.imageUrl ??
                        relatedCard.galleryImages[0]?.imageUrl ??
                        '/logo.webp'
                      }
                    />
                    <div className="service-dashboard__image-badge">
                      {relatedCard.badge ?? relatedCard.serviceName}
                    </div>
                    </div>
                    <div className="service-dashboard__card-body">
                      <div className="service-dashboard__card-head">
                        <div>
                          <p className="service-dashboard__eyebrow">{relatedCard.serviceName}</p>
                          <h2>{relatedCard.title}</h2>
                        </div>
                        <div className="service-dashboard__price-box">
                          <span>{relatedCard.pricing.summary.subline}</span>
                          <strong>{format(relatedCard.pricing.summary.amount)}</strong>
                        </div>
                      </div>
                      <div className="service-dashboard__actions">
                        <Link className="btn ghost" href={`/services/${config.slug}/${relatedCard.slug}`}>
                          View details
                        </Link>
                        <button
                          className="btn"
                          onClick={() => dispatch(addItem(createCartItem(relatedCard)))}
                          type="button"
                        >
                          Add to cart
                        </button>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </section>
        ) : null}
      </div>
    </main>
  );
}
