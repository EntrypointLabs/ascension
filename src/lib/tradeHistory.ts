import { MARKETS } from "@/data/markets";
// Trade prices are derived from the live marks, so the price feed must have run first.
import "@/lib/prices";
import { hashString, seededRandom } from "@/lib/random";
import type { Side, Trade } from "@/types";

/** Deterministic filler history, walking backwards in time from `startTime`. */
export function generateTradeHistory(
  seedKey: string,
  tradeCount: number,
  startTime: number,
  symbols: string[],
): Trade[] {
  const rng = seededRandom(hashString(seedKey));
  const trades: Trade[] = [];
  let time = startTime;
  const openSides: Record<string, Side | null> = {};
  const venueIds = ["hyperliquid", "binance", "okx", "lighter", "dydx", "variational"];
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const pad2Digits = (n: number) => {
    if (n < 10) {
      return "0" + n;
    } else {
      return String(n);
    }
  };
  for (let i = 0; i < tradeCount; i++) {
    time -= (25 + Math.floor(rng() * 520)) * 60000;
    var symbol = symbols[Math.floor(rng() * symbols.length)];
    const market = MARKETS.filter((m) => m.sym === symbol)[0];
    let venueId = venueIds[Math.floor(rng() * venueIds.length)];
    if (market.venues && market.venues.indexOf(venueId) < 0) {
      venueId = market.venues[0];
    }
    const price = market.price * (1 + (rng() - 0.5) * 0.08);
    const notional = 800 + Math.floor(rng() * 9000);
    let qty = notional / price;
    qty =
      qty >= 100
        ? Math.round(qty)
        : qty >= 1
          ? Math.round(qty * 100) / 100
          : Math.round(qty * 10000) / 10000;
    const isClosing = openSides[symbol] && rng() < 0.6;
    let side: Side;
    let action;
    let pnl: number | null = null;
    if (isClosing) {
      side = openSides[symbol] === "long" ? "short" : "long";
      action = "Close " + openSides[symbol];
      pnl = Math.round((rng() - 0.42) * notional * 0.06 * 100) / 100;
      openSides[symbol] = null;
    } else {
      side = rng() < 0.55 ? "long" : "short";
      action = "Open " + side;
      openSides[symbol] = side;
    }
    const date = new Date(time);
    trades.push({
      time:
        monthNames[date.getUTCMonth()] +
        " " +
        date.getUTCDate() +
        ", " +
        pad2Digits(date.getUTCHours()) +
        ":" +
        pad2Digits(date.getUTCMinutes()),
      sym: symbol,
      venue: venueId,
      action: action,
      side: side,
      price: price,
      qty: qty,
      fee: Math.round(notional * 0.00035 * 100) / 100,
      pnl: pnl,
    });
  }
  return trades;
}
