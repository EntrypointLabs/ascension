import { CATEGORY_VOLATILITY, MARKETS } from "@/data/markets";
import { hashString, seededRandom } from "@openfutures/core";

/**
 * Simulated price feed. Moves every market's `price` and `chg` in place and returns the prices
 * from before the move, which is what the tick-direction flash compares against.
 */
export function simulatePrices(timestamp: number): Record<string, number> {
  const prices: Record<string, number> = {};
  MARKETS.forEach((market) => {
    prices[market.sym] = market.price;
    const symbolHash = hashString(market.sym);
    const phaseSlow = (symbolHash % 628) / 100;
    const phaseMid = (symbolHash % 377) / 60;
    const phaseFast = (symbolHash % 211) / 33;
    const volatilityScale =
      (CATEGORY_VOLATILITY[market.cat] || 1) *
      (market.sym === "PEPE" || market.sym === "DOGE" || market.sym === "SUI" ? 1.6 : 1);
    const noiseRng = seededRandom(hashString(market.sym + Math.floor(timestamp / 1000)));
    const drift =
      Math.sin(timestamp / 47000 + phaseSlow) * 0.0016 +
      Math.sin(timestamp / 13000 + phaseMid) * 0.0008 +
      Math.sin(timestamp / 3700 + phaseFast) * 0.0003 +
      (noiseRng() - 0.5) * 0.00035;
    market.price = market.base * (1 + drift * volatilityScale);
    const openPrice = market.base / (1 + market.chg0 / 100);
    market.chg = (market.price / openPrice - 1) * 100;
  });
  return prices;
}

export let livePrices = simulatePrices(Date.now());

export function setLivePrices(value: Record<string, number>) {
  livePrices = value;
}
