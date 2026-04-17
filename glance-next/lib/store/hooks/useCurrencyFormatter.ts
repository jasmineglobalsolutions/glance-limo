'use client';

import {
  CURRENCY_SYMBOLS,
  type SupportedCurrency,
} from '@/lib/store/features/currency/currency-slice';
import { useAppSelector } from '@/lib/store/hooks';

/**
 * Returns a formatter function that converts a SGD amount to the active
 * currency and formats it with the correct symbol.
 *
 * Usage:
 *   const fmt = useCurrencyFormatter();
 *   fmt(120)  → "US$ 89" (when USD is selected)
 *   fmt(null) → "Custom quote"
 */
export function useCurrencyFormatter() {
  const activeCurrency = useAppSelector((s) => s.currency.activeCurrency) as SupportedCurrency;
  const rates = useAppSelector((s) => s.currency.rates);

  return function format(sgdAmount: number | null): string {
    if (sgdAmount === null) return 'Custom quote';

    const rate = rates[activeCurrency] ?? 1;
    const converted = sgdAmount * rate;
    const symbol = CURRENCY_SYMBOLS[activeCurrency] ?? activeCurrency;

    // Round to 0 decimals for whole amounts, 2 for fractional
    const formatted =
      converted % 1 === 0 ? converted.toFixed(0) : converted.toFixed(2);

    return `${symbol} ${formatted}`;
  };
}
