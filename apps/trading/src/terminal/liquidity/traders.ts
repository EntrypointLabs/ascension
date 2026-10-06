import { hashString, seededRandom } from "@openfutures/core";
import {
  FUNDED_ACCOUNT_SIZES,
  FUNDED_POPULATION,
  FUNDED_TRADER_COUNT,
  TRADER_HANDLES,
  TRADER_SUFFIXES,
} from "@/data/liquidity";

/** A funded prop account as listed in the Funded Traders table. */
export interface FundedTrader {
  name: string;
  /** Account size, USD. */
  size: number;
  /** Return on the account, as a fraction. */
  pnl: number;
  /** Share of the 10% maximum loss already used, 0..1. */
  drawdown: number;
  status: "Funded" | "Payout due";
  days: number;
  you?: boolean;
}

let tableCache: FundedTrader[] | null = null;

/** The seeded funded accounts, largest first. The signed-in trader is added by the caller. */
export function fundedTraders(): FundedTrader[] {
  if (tableCache) {
    return tableCache;
  }
  const rng = seededRandom(hashString("vault-traders"));
  const traders: FundedTrader[] = [];
  for (let i = 0; i < FUNDED_TRADER_COUNT; i++) {
    // Six draws once built a wallet address; they are kept so the seeded values stay put.
    for (let skip = 0; skip < 6; skip++) {
      rng();
    }
    const size = FUNDED_ACCOUNT_SIZES[Math.floor(rng() * 4)].size;
    const pnl = (rng() - 0.35) * 0.14;
    const drawdown = Math.max(0, Math.min(1, rng() * 0.9));
    const status = pnl > 0.06 && rng() > 0.5 ? "Payout due" : "Funded";
    const name =
      TRADER_HANDLES[Math.floor(rng() * TRADER_HANDLES.length)] +
      TRADER_SUFFIXES[Math.floor(rng() * TRADER_SUFFIXES.length)] +
      (rng() > 0.6 ? String(Math.floor(rng() * 90) + 10) : "");
    traders.push({ name, size, pnl, drawdown, status, days: 6 + Math.floor(rng() * 80) });
  }
  tableCache = traders;
  return traders;
}

/** One funded account in the return distribution. */
export interface FundedOutcome {
  /** Return as a fraction, between -10% (failed) and +13%. */
  ret: number;
  size: number;
  usd: number;
  /** Share of the maximum loss used, 0..1. */
  drawdown: number;
}

let populationCache: FundedOutcome[] | null = null;

/** Returns across every funded account: roughly normal around +0.9%, clipped at the loss limit. */
export function fundedPopulation(): FundedOutcome[] {
  if (populationCache) {
    return populationCache;
  }
  const rng = seededRandom(hashString("funded-population"));
  const outcomes: FundedOutcome[] = [];
  const [a, b, c, d] = FUNDED_ACCOUNT_SIZES;
  for (let i = 0; i < FUNDED_POPULATION; i++) {
    const normal = (rng() + rng() + rng() + rng() - 2) * 1.73;
    const ret = Math.max(-0.1, Math.min(0.13, 0.009 + normal * 0.034));
    const pick = rng();
    const size =
      pick < a.mix ? a.size : pick < a.mix + b.mix ? b.size : pick < 0.9 ? c.size : d.size;
    outcomes.push({
      ret,
      size,
      usd: ret * size,
      drawdown: ret < 0 ? Math.min(1, -ret / 0.1) : rng() * 0.3,
    });
  }
  populationCache = outcomes;
  return outcomes;
}

/** Capital funded in one calendar month. */
export interface FundedMonth {
  start: number;
  /** Cumulative capital funded by account size, since the first month shown. */
  cumulative: Record<number, number>;
  cumulativeTotal: number;
  /** Capital funded during the month. */
  total: number;
  /** Accounts funded during the month. */
  count: number;
}

const MONTHS_SHOWN = 12;
let monthsCache: { key: number; months: FundedMonth[] } | null = null;

/** Capital funded over the last 12 months, ending with the month containing `today`. */
export function fundedByMonth(today: number): FundedMonth[] {
  const anchor = new Date(today);
  anchor.setUTCDate(1);
  const key = anchor.setUTCHours(0, 0, 0, 0);
  if (monthsCache && monthsCache.key === key) {
    return monthsCache.months;
  }
  const rng = seededRandom(hashString("funded-months"));
  const running: Record<number, number> = {};
  FUNDED_ACCOUNT_SIZES.forEach(({ size }) => (running[size] = 0));
  // Monthly new accounts per size before growth; smaller accounts are funded far more often.
  const baseCounts = [7, 5, 3, 1.4];
  const months: FundedMonth[] = [];
  for (let back = MONTHS_SHOWN - 1; back >= 0; back--) {
    const start = new Date(today);
    start.setUTCDate(1);
    start.setUTCMonth(start.getUTCMonth() - back);
    const growth = 1 + (MONTHS_SHOWN - back) * 0.12;
    let total = 0;
    let count = 0;
    FUNDED_ACCOUNT_SIZES.forEach(({ size }, index) => {
      const accounts = Math.max(0, Math.round(baseCounts[index] * growth * (0.6 + rng() * 0.8)));
      running[size] += accounts * size;
      total += accounts * size;
      count += accounts;
    });
    const cumulative = { ...running };
    months.push({
      start: start.getTime(),
      cumulative,
      cumulativeTotal: Object.values(cumulative).reduce((sum, v) => sum + v, 0),
      total,
      count,
    });
  }
  monthsCache = { key, months };
  return months;
}
