'use client';
/* eslint-disable @next/next/no-img-element */

import Link from 'next/link';
import { useState } from 'react';

import { createCartItem } from '@/lib/public-cart';
import type { PublicServiceCard } from '@/lib/public-service-types';
import { addItem } from '@/lib/store/cart-slice';
import { useAppDispatch, useAppSelector } from '@/lib/store/hooks';

type ServiceCardDetailProps = {
  config: {
    slug: string;
    label: string;
  };
  card: PublicServiceCard;
  relatedCards: PublicServiceCard[];
};

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

export function ServiceCardDetail({
  config,
  card,
  relatedCards,
}: ServiceCardDetailProps) {
  const dispatch = useAppDispatch();
  const currentItemQuantity = useAppSelector(
    (state) => state.cart.items.find((item) => item.id === card.id)?.quantity ?? 0,
  );
  const gallery = buildGallery(card);
  const [activeImage, setActiveImage] = useState(gallery[0]);

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
            <div className="service-detail__active-image">
              <img alt={activeImage.altText} src={activeImage.imageUrl} />
            </div>
            <div className="service-detail__thumbs">
              {gallery.map((image) => (
                <button
                  className={activeImage.imageUrl === image.imageUrl ? 'is-active' : ''}
                  key={image.imageUrl}
                  onClick={() => setActiveImage(image)}
                  type="button"
                >
                  <img alt={image.altText} src={image.imageUrl} />
                </button>
              ))}
            </div>
          </div>

          <div className="service-detail__summary">
            <div className="service-detail__heading">
              <p>{config.label}</p>
              <h1>{card.title}</h1>
              <span>{card.badge ?? card.pricing.summary.subline}</span>
            </div>

            <p className="service-detail__copy">
              {card.description || card.subtitle || 'Detailed CRM-backed card view.'}
            </p>

            <div className="service-detail__pricing-hero">
              <span>{card.pricing.summary.subline}</span>
              <strong>{card.pricing.summary.headline}</strong>
            </div>

            <div className="service-detail__tier-grid">
              {card.pricing.summary.tiers.length > 0 ? (
                card.pricing.summary.tiers.map((tier) => (
                  <div className="price-pill" key={`${card.id}-${tier.label}`}>
                    <span>{tier.label}</span>
                    <strong>{tier.value}</strong>
                  </div>
                ))
              ) : (
                <div className="price-pill">
                  <span>Pricing</span>
                  <strong>On request</strong>
                </div>
              )}
            </div>

            <div className="service-dashboard__actions">
              <button
                className="btn"
                onClick={() => dispatch(addItem(createCartItem(card)))}
                type="button"
              >
                Add to cart
              </button>
              <a className="btn ghost" href={card.ctaHref || 'https://wa.me/6584444744'}>
                {card.ctaLabel || 'WhatsApp now'}
              </a>
            </div>

            {currentItemQuantity > 0 ? (
              <p className="service-detail__cart-note">
                This item is already in your cart {currentItemQuantity} time
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
              {relatedCards.map((relatedCard) => (
                <article className="service-dashboard__card service-dashboard__card--compact" key={relatedCard.id}>
                  <div className="service-dashboard__image-wrap">
                    <img
                      alt={relatedCard.title}
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
                        <strong>{relatedCard.pricing.summary.headline}</strong>
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
              ))}
            </div>
          </section>
        ) : null}
      </div>
    </main>
  );
}
