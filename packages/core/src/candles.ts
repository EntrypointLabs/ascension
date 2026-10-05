import { hashString, seededRandom } from "./random";
import { seededPriceSeries } from "./series";

export interface Candle {
  open: number;
  high: number;
  low: number;
  close: number;
  /** Traded volume in USD. */
  value: number;
}

const cache = new Map<string, Candle[]>();

/**
 * Simulated candles that lead up to `endPrice`, oldest first. Stable for a given `seedKey`, so
 * the history does not reshuffle between renders.
 */
export function historyCandles(
  seedKey: string,
  count: number,
  endPrice: number,
  volatility: number,
  baseVolume: number,
): Candle[] {
  const key = seedKey + "|" + count + "|" + endPrice;
  const cached = cache.get(key);
  if (cached) {
    return cached;
  }
  const closes = seededPriceSeries(seedKey, count, endPrice, volatility, 0);
  const rng = seededRandom(hashString(seedKey + "ohlc"));
  const candles = closes.map((close, index) => {
    const open = index ? closes[index - 1] : close * (1 + (rng() - 0.5) * volatility);
    return {
      open,
      high: Math.max(open, close) * (1 + rng() * volatility * 0.7),
      low: Math.min(open, close) * (1 - rng() * volatility * 0.7),
      close,
      value: (0.35 + rng()) * (1 + (Math.abs(close - open) / open / volatility) * 2.5) * baseVolume,
    };
  });
  cache.set(key, candles);
  return candles;
}
