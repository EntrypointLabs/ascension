import { LOGOS } from "@/assets/logos";

import type { Venue } from "@/types";

const VENUE_SEEDS: Omit<Venue, "logo">[] = [
  { id: "binance", name: "Binance", off: 0.1, fee: 0.045, mul: 1.4, fund: 0.0084, spr: 0.4 },
  { id: "okx", name: "OKX", off: 0.25, fee: 0.05, mul: 1, fund: 0.01, spr: 0.6 },
  {
    id: "hyperliquid",
    logoKey: "hype",
    name: "Hyperliquid",
    off: -0.2,
    fee: 0.035,
    mul: 1.1,
    fund: 0.0013,
    spr: 0.5,
  },
  { id: "lighter", name: "Lighter", off: 0.05, fee: 0, mul: 0.5, fund: 0.0021, spr: 0.9 },
  {
    id: "variational",
    name: "Variational",
    off: 0.3,
    fee: 0.02,
    mul: 0.45,
    fund: 0.0042,
    spr: 1.2,
  },
  { id: "dydx", name: "dYdX", off: 0.35, fee: 0.05, mul: 0.6, fund: 0.0035, spr: 0.8 },
];

export const VENUES: Venue[] = VENUE_SEEDS.map((venue) => ({
  ...venue,
  logo: LOGOS[venue.logoKey || venue.id],
}));

export const VENUE_COLORS: Record<string, string> = {
  binance: "var(--v1)",
  okx: "var(--v2)",
  hyperliquid: "var(--v3)",
  lighter: "var(--v4)",
  variational: "var(--v5)",
  dydx: "var(--v6)",
};
