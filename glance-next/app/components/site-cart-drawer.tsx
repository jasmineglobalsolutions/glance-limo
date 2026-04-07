'use client';

import Link from 'next/link';

import {
  clearCart,
  closeCart,
  decrementItem,
  incrementItem,
  openCart,
  removeItem,
} from '@/lib/store/cart-slice';
import { useAppDispatch, useAppSelector } from '@/lib/store/hooks';

function formatCurrency(amount: number) {
  return `SGD ${amount.toFixed(0)}`;
}

export function SiteCartDrawer() {
  const dispatch = useAppDispatch();
  const { isOpen, items } = useAppSelector((state) => state.cart);
  const itemCount = items.reduce((total, item) => total + item.quantity, 0);
  const totalAmount = items.reduce((total, item) => {
    if (item.unitPrice === null) {
      return total;
    }

    return total + item.unitPrice * item.quantity;
  }, 0);
  const hasQuotedItem = items.some((item) => item.unitPrice === null);

  return (
    <>
      <button
        aria-label="Open cart"
        className="cart-toggle"
        onClick={() => dispatch(openCart())}
        type="button"
      >
        <span>Cart</span>
        {itemCount > 0 ? <span className="cart-badge">{itemCount}</span> : null}
      </button>

      <aside
        aria-hidden={!isOpen}
        className={`cart-drawer ${isOpen ? 'open' : ''}`}
      >
        <button
          aria-label="Close cart"
          className="cart-close"
          onClick={() => dispatch(closeCart())}
          type="button"
        >
          ×
        </button>

        <div>
          <h4>
            Booking cart
            {itemCount > 0 ? <span className="cart-count">{itemCount}</span> : null}
          </h4>
          <p className="mini-copy">
            Keep shortlisted rides and tours here while you compare options.
          </p>
        </div>

        <div className="cart-items">
          {items.length === 0 ? (
            <p className="cart-empty">Your cart is empty. Add a transfer or tour to get started.</p>
          ) : (
            items.map((item) => (
              <div className="cart-item" key={item.id}>
                <strong>{item.title}</strong>
                <span>{item.serviceName}</span>
                <span>{item.unitPrice === null ? item.priceLabel : formatCurrency(item.unitPrice)}</span>
                <div className="service-dashboard__cart-actions">
                  <div className="service-dashboard__qty">
                    <button onClick={() => dispatch(decrementItem(item.id))} type="button">
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button onClick={() => dispatch(incrementItem(item.id))} type="button">
                      +
                    </button>
                  </div>
                  <div className="service-dashboard__cart-links">
                    <Link href={`/services/${item.serviceSlug}/${item.slug}`}>
                      View
                    </Link>
                    <button onClick={() => dispatch(removeItem(item.id))} type="button">
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="cart-total">
          <span>Estimated total</span>
          <strong>{items.length === 0 ? 'SGD 0' : formatCurrency(totalAmount)}</strong>
        </div>

        {hasQuotedItem ? (
          <p className="cart-note">
            Some items are quote-based, so the total only counts cards with stored prices.
          </p>
        ) : null}

        <div className="detail-cta">
          <button className="btn ghost" onClick={() => dispatch(clearCart())} type="button">
            Clear cart
          </button>
          <a className="btn" href="https://wa.me/6584444744">
            Continue on WhatsApp
          </a>
        </div>
      </aside>
    </>
  );
}
