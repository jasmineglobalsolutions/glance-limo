'use client';
/* eslint-disable @next/next/no-img-element */

import Link from 'next/link';

import { useAppDispatch } from '@/lib/store/hooks';
import { addItem } from '@/lib/store/features/cart/cart-slice';

import { createCartItem } from '@/lib/public-cart';
import type { PublicServiceCard } from '@/lib/public-service-types';

type ServicePreviewProps = {
  config: { slug: string; label: string };
  cards: PublicServiceCard[];
  previewCount?: number;
};

export function ServicePreview({ config, cards, previewCount = 3 }: ServicePreviewProps) {
  const dispatch = useAppDispatch();
  const previewCards = cards.slice(0, previewCount);

  return (
    <section className="service-preview section">
      <div className="container">
        <div className="section-head">
          <h2>{config.label} – Featured</h2>
          <p>Explore our top {config.label.toLowerCase()} options. Click a card for full details.</p>
        </div>
        <div className="services-grid">
          {previewCards.map((card) => {
            const heroImage = card.imageUrl ?? card.galleryImages[0]?.imageUrl ?? '/logo.webp';
            const isCarCard = card.car !== null || card.sectionKey === 'SINGAPORE_TRANSFER';
            return (
              <article className="service-card" key={card.id}>
                <div className={`service-card-image${isCarCard ? ' service-card-image--car' : ''}`}>
                  <img
                    alt={card.title}
                    className={isCarCard ? 'service-card-image__img--car' : 'w-full h-48 object-cover rounded'}
                    src={heroImage}
                  />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-white">{card.title}</h3>
                <p className="mt-2 text-sm text-muted">{card.subtitle}</p>
                <div className="mt-3 flex items-center justify-between">
                  <span className="text-gold font-bold">{card.pricing.summary.headline}</span>
                  <Link href={`/services/${config.slug}/${card.slug}`} className="btn ghost text-sm">
                    Details
                  </Link>
                </div>
                <button
                  className="btn mt-2 w-full"
                  onClick={() => dispatch(addItem(createCartItem(card)))}
                >
                  Add to cart
                </button>
              </article>
            );
          })}
        </div>
        <div className="mt-6 text-center">
          <Link href={`/services/${config.slug}`} className="btn">
            View More {config.label}
          </Link>
        </div>
      </div>
    </section>
  );
}
