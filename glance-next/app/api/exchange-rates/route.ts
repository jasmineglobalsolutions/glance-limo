import { NextResponse } from 'next/server';

import type { SupportedCurrency } from '@/lib/store/features/currency/currency-slice';

const SUPPORTED: SupportedCurrency[] = ['SGD', 'USD', 'AED', 'GBP', 'SAR', 'EUR'];
const API_KEY = '3ff984cb27735a5cf7f99467';
const API_URL = `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/SGD`;

// Revalidate at most once per hour
export const revalidate = 3600;

export async function GET() {
  try {
    const res = await fetch(API_URL, { next: { revalidate: 3600 } });

    if (!res.ok) {
      throw new Error(`ExchangeRate API error: ${res.status}`);
    }

    const data = (await res.json()) as {
      result: string;
      conversion_rates: Record<string, number>;
    };

    if (data.result !== 'success') {
      throw new Error('ExchangeRate API returned non-success result');
    }

    const rates: Partial<Record<SupportedCurrency, number>> = {};
    for (const currency of SUPPORTED) {
      const rate = data.conversion_rates[currency];
      if (rate !== undefined) {
        rates[currency] = rate;
      }
    }

    return NextResponse.json({ rates });
  } catch (err) {
    console.error('[exchange-rates]', err);
    // Fallback to SGD-only so the UI still works
    return NextResponse.json({ rates: { SGD: 1 } }, { status: 200 });
  }
}
