'use client';
/* eslint-disable @next/next/no-img-element */

import Link from 'next/link';
import { useDeferredValue, useState } from 'react';

import { createCartItem } from '@/lib/public-cart';
import type { PublicServiceCard } from '@/lib/public-service-types';
import { addItem, openCart } from '@/lib/store/cart-slice';
import { useAppDispatch, useAppSelector } from '@/lib/store/hooks';

type ServiceDashboardProps = {
  config: {
    slug: string;
    label: string;
  };
  cards: PublicServiceCard[];
};

function formatCurrency(amount: number | null) {
  if (amount === null) {
    return 'Custom quote';
  }

  return `SGD ${amount.toFixed(0)}`;
}

export function ServiceDashboard({
  config,
  cards,
}: ServiceDashboardProps) {
  const dispatch = useAppDispatch();
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<'all' | 'priced' | 'quote'>('all');
  const deferredSearch = useDeferredValue(search.trim().toLowerCase());
  const cartCount = useAppSelector((state) =>
    state.cart.items.reduce((total, item) => total + item.quantity, 0),
  );

  const filteredCards = cards.filter((card) => {
    const matchesSearch =
      deferredSearch.length === 0 ||
      `${card.title} ${card.subtitle ?? ''} ${card.description ?? ''} ${card.badge ?? ''}`
        .toLowerCase()
        .includes(deferredSearch);

    if (!matchesSearch) {
      return false;
    }

    if (filter === 'priced') {
      return card.pricing.summary.amount !== null;
    }

    if (filter === 'quote') {
      return card.pricing.summary.amount === null;
    }

    return true;
  });

  const lowestPricedCard = cards.reduce<PublicServiceCard | null>((lowest, card) => {
    if (card.pricing.summary.amount === null) {
      return lowest;
    }

    if (!lowest || lowest.pricing.summary.amount === null) {
      return card;
    }

    return card.pricing.summary.amount < lowest.pricing.summary.amount ? card : lowest;
  }, null);

  return (
    <main className="section service-dashboard">
      <div className="container">
        <section className="service-dashboard__hero">
          <div className="service-dashboard__hero-copy">
            <span className="eyebrow">Live booking dashboard</span>
            <h1>{config.label}</h1>
            <p>
              Browse live cards from the CRM, open each itinerary with a clean slug URL,
              compare gallery previews, and keep your shortlist in the cart while you decide.
            </p>
            <div className="service-dashboard__hero-actions">
              <button className="btn" onClick={() => dispatch(openCart())} type="button">
                Open cart
              </button>
              <a className="btn ghost" href="https://wa.me/6584444744">
                Talk to concierge
              </a>
            </div>
          </div>

          <div className="service-dashboard__stats">
            <article className="service-dashboard__stat-card">
              <span>Live cards</span>
              <strong>{cards.length}</strong>
              <p>Every visible card is pulled from the current CRM data.</p>
            </article>
            <article className="service-dashboard__stat-card">
              <span>Best starting rate</span>
              <strong>
                {lowestPricedCard
                  ? formatCurrency(lowestPricedCard.pricing.summary.amount)
                  : 'Quote'}
              </strong>
              <p>
                {lowestPricedCard
                  ? `Currently from ${lowestPricedCard.title}.`
                  : 'Custom pricing is available by request.'}
              </p>
            </article>
            <article className="service-dashboard__stat-card">
              <span>Cart shortlist</span>
              <strong>{cartCount}</strong>
              <p>Use the drawer to keep transfers and tours together while comparing.</p>
            </article>
          </div>
        </section>

        <section className="service-dashboard__toolbar">
          <div className="service-dashboard__search">
            <label htmlFor="service-search">Search cards</label>
            <input
              id="service-search"
              onChange={(event) => setSearch(event.target.value)}
              placeholder={`Search ${config.label.toLowerCase()} cards`}
              value={search}
            />
          </div>

          <div className="service-dashboard__filters">
            <button
              className={filter === 'all' ? 'is-active' : ''}
              onClick={() => setFilter('all')}
              type="button"
            >
              All cards
            </button>
            <button
              className={filter === 'priced' ? 'is-active' : ''}
              onClick={() => setFilter('priced')}
              type="button"
            >
              With price
            </button>
            <button
              className={filter === 'quote' ? 'is-active' : ''}
              onClick={() => setFilter('quote')}
              type="button"
            >
              Quote only
            </button>
          </div>
        </section>

        {filteredCards.length === 0 ? (
          <div className="notice">
            No cards matched your current search or pricing filter for {config.label}.
          </div>
        ) : (
          <section className="service-dashboard__grid">
            {filteredCards.map((card) => {
              const heroImage =
                card.imageUrl ?? card.galleryImages[0]?.imageUrl ?? '/logo.webp';

              return (
                <article className="service-dashboard__card" key={card.id}>
                  <div className="service-dashboard__image-wrap">
                    <img alt={card.title} src={heroImage} />
                    <div className="service-dashboard__image-badge">
                      {card.badge ?? card.serviceName}
                    </div>
                  </div>

                  <div className="service-dashboard__card-body">
                    <div className="service-dashboard__card-head">
                      <div>
                        <p className="service-dashboard__eyebrow">{card.serviceName}</p>
                        <h2>{card.title}</h2>
                      </div>
                      <div className="service-dashboard__price-box">
                        <span>{card.pricing.summary.subline}</span>
                        <strong>{card.pricing.summary.headline}</strong>
                      </div>
                    </div>

                    <p className="service-dashboard__description">
                      {card.description || card.subtitle || 'Live CRM card'}
                    </p>

                    <div className="service-dashboard__highlights">
                      {card.pricing.highlights.map((highlight) => (
                        <span key={`${card.id}-${highlight}`}>{highlight}</span>
                      ))}
                    </div>

                    <div className="service-dashboard__facts">
                      {card.pricing.facts.map((fact) => (
                        <div className="service-dashboard__fact" key={`${card.id}-${fact.label}`}>
                          <span>{fact.label}</span>
                          <strong>{fact.value}</strong>
                        </div>
                      ))}
                    </div>

                    <div className="service-dashboard__actions">
                      <Link className="btn ghost" href={`/services/${config.slug}/${card.slug}`}>
                        View details
                      </Link>
                      <button
                        className="btn"
                        onClick={() => dispatch(addItem(createCartItem(card)))}
                        type="button"
                      >
                        Add to cart
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </section>
        )}
      </div>
    </main>
  );
}
