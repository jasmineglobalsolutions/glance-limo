'use client';

import { useEffect } from 'react';

import {
  CURRENCY_SYMBOLS,
  fetchRates,
  setCurrency,
  SUPPORTED_CURRENCIES,
  type SupportedCurrency,
} from '@/lib/store/features/currency/currency-slice';
import { useAppDispatch, useAppSelector } from '@/lib/store/hooks';

export function CurrencySwitch() {
  const dispatch = useAppDispatch();
  const activeCurrency = useAppSelector((s) => s.currency.activeCurrency) as SupportedCurrency;
  const status = useAppSelector((s) => s.currency.status);

  // Fetch rates once when the component first mounts
  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchRates());
    }
  }, [dispatch, status]);

  return (
    <div className="currency-switch" aria-label="Select display currency">
      <span className="currency-switch__label">Currency</span>
      <div className="currency-switch__select-wrap">
        <select
          aria-label="Choose display currency"
          className="currency-switch__select"
          onChange={(event) => dispatch(setCurrency(event.target.value as SupportedCurrency))}
          value={activeCurrency}
        >
          {SUPPORTED_CURRENCIES.map((code) => (
            <option key={code} value={code}>
              {code} ({CURRENCY_SYMBOLS[code]})
            </option>
          ))}
        </select>
        <span className={`currency-switch__status currency-switch__status--${status}`} />
      </div>
    </div>
  );
}
