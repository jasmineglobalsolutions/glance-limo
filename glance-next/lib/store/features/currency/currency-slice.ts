import { createAsyncThunk, createSlice, type PayloadAction } from '@reduxjs/toolkit';

export type SupportedCurrency = 'SGD' | 'USD' | 'AED' | 'GBP' | 'SAR' | 'EUR';

export const SUPPORTED_CURRENCIES: SupportedCurrency[] = [
  'SGD',
  'USD',
  'AED',
  'GBP',
  'SAR',
  'EUR',
];

export const CURRENCY_SYMBOLS: Record<SupportedCurrency, string> = {
  SGD: 'S$',
  USD: 'US$',
  AED: 'AED',
  GBP: '£',
  SAR: 'SAR',
  EUR: '€',
};

type CurrencyState = {
  activeCurrency: SupportedCurrency;
  /** Rates relative to SGD base (1 SGD = X currency) */
  rates: Partial<Record<SupportedCurrency, number>>;
  status: 'idle' | 'loading' | 'success' | 'error';
};

const initialState: CurrencyState = {
  activeCurrency: 'SGD',
  rates: { SGD: 1 },
  status: 'idle',
};

/**
 * Fetches live exchange rates from the /api/exchange-rates proxy
 * (server-side route keeps the API key hidden).
 */
export const fetchRates = createAsyncThunk(
  'currency/fetchRates',
  async () => {
    const res = await fetch('/api/exchange-rates');
    if (!res.ok) {
      throw new Error('Failed to fetch exchange rates');
    }
    const data = await res.json() as { rates: Partial<Record<SupportedCurrency, number>> };
    return data.rates;
  },
);

const currencySlice = createSlice({
  name: 'currency',
  initialState,
  reducers: {
    setCurrency(state, action: PayloadAction<SupportedCurrency>) {
      state.activeCurrency = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRates.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchRates.fulfilled, (state, action) => {
        state.rates = action.payload;
        state.status = 'success';
      })
      .addCase(fetchRates.rejected, (state) => {
        state.status = 'error';
        // Keep SGD as fallback
        state.rates = { SGD: 1 };
      });
  },
});

export const { setCurrency } = currencySlice.actions;
export const currencyReducer = currencySlice.reducer;
