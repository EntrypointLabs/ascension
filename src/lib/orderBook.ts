import { hashString, seededRandom } from "@/lib/random";
import type { Market, Venue } from "@/types";

export interface BookLevel {
  /** Price. */
  p: number;
  /** Resting size in USD. */
  usd: number;
  /** Venue quoting this level. */
  v: Venue;
}

/** Simulated order book for one market on one venue; the top levels flicker once a second. */
export function buildOrderBook(market: Market, venue: Venue) {
  const jitterRng = seededRandom(hashString(market.sym + venue.id));
  const mid = market.price * (1 + venue.off / 10000);
  const halfSpread = (venue.spr || 0.8) / 2;
  const asks: BookLevel[] = [];
  const bids: BookLevel[] = [];
  let askPrice = mid * (1 + halfSpread / 10000);
  let bidPrice = mid * (1 - halfSpread / 10000);
  const liveRng = seededRandom(hashString(market.sym + venue.id + Math.floor(Date.now() / 1000)));
  for (let i = 0; i < 16; i++) {
    asks.push({
      p: askPrice,
      usd:
        venue.mul *
        900 *
        (0.4 + jitterRng() * 1.2) *
        (i < 2 ? 0.55 + liveRng() * 0.9 : 0.8 + liveRng() * 0.4),
      v: venue,
    });
    bids.push({
      p: bidPrice,
      usd:
        venue.mul *
        900 *
        (0.4 + jitterRng() * 1.2) *
        (i < 2 ? 0.55 + liveRng() * 0.9 : 0.8 + liveRng() * 0.4),
      v: venue,
    });
    askPrice = askPrice * (1 + (0.5 + jitterRng() * 0.7) / 10000);
    bidPrice = bidPrice * (1 - (0.5 + jitterRng() * 0.7) / 10000);
  }
  return { mid: mid, asks: asks, bids: bids };
}

/** Walks the levels best-first by fee-adjusted price until `usdAmount` is filled. */
export function simulateFill(levels: BookLevel[], usdAmount: number, isBuy: boolean) {
  const effective = levels.map((level) => ({
    l: level,
    e: isBuy ? level.p * (1 + level.v.fee / 100) : level.p * (1 - level.v.fee / 100),
  }));
  effective.sort((a, b) => {
    if (isBuy) {
      return a.e - b.e;
    } else {
      return b.e - a.e;
    }
  });
  for (
    var remaining = usdAmount,
      totalQty = 0,
      totalFees = 0,
      byVenue: Record<string, number> = {},
      i = 0;
    i < effective.length && remaining > 0;
    i++
  ) {
    const level = effective[i].l;
    const fillUsd = Math.min(remaining, level.usd);
    remaining -= fillUsd;
    totalQty += fillUsd / level.p;
    totalFees += (fillUsd * level.v.fee) / 100;
    byVenue[level.v.id] = (byVenue[level.v.id] || 0) + fillUsd;
  }
  const filledUsd = usdAmount - remaining;
  return {
    filled: filledUsd,
    qty: totalQty,
    fees: totalFees,
    by: byVenue,
    partial: remaining > 0.0001,
    avg: totalQty
      ? isBuy
        ? (filledUsd + totalFees) / totalQty
        : (filledUsd - totalFees) / totalQty
      : 0,
  };
}
