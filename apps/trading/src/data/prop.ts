import { generateTradeHistory } from "@/lib/tradeHistory";
import type { Order, Position, PropPlan, Trade } from "@openfutures/core";

export const PROP_POSITIONS: Position[] = [
  { id: "pp1", sym: "US500", venue: "hyperliquid", side: "long", lev: 10, qty: 3, entry: 6690.5 },
  { id: "pp2", sym: "ETH", venue: "binance", side: "short", lev: 5, qty: 4, entry: 2031.4 },
];
export const PROP_ORDERS: Order[] = [
  {
    id: "po1",
    sym: "XAU",
    venue: "variational",
    side: "long",
    type: "Limit",
    price: 3835,
    qty: 2,
    filled: 0,
    placed: "Oct 2, 06:30",
  },
];
const RECENT_TRADES: Trade[] = [
  {
    time: "Oct 2, 06:12",
    sym: "ETH",
    venue: "binance",
    action: "Open short",
    side: "short",
    price: 2031.4,
    qty: 4,
    fee: 3.66,
    pnl: null,
  },
  {
    time: "Oct 1, 15:48",
    sym: "US500",
    venue: "hyperliquid",
    action: "Open long",
    side: "long",
    price: 6690.5,
    qty: 3,
    fee: 7.03,
    pnl: null,
  },
  {
    time: "Sep 30, 20:31",
    sym: "BTC",
    venue: "bybit",
    action: "Close long",
    side: "short",
    price: 85920,
    qty: 0.2,
    fee: 8.59,
    pnl: 1184.2,
  },
  {
    time: "Sep 29, 09:05",
    sym: "BTC",
    venue: "bybit",
    action: "Open long",
    side: "long",
    price: 80000,
    qty: 0.2,
    fee: 8,
    pnl: null,
  },
];
export const PROP_PLANS: PropPlan[] = [
  { size: "$10,000", fee: "$99", tag: "" },
  { size: "$25,000", fee: "$199", tag: "" },
  { size: "$50,000", fee: "$349", tag: "Most popular" },
  { size: "$100,000", fee: "$599", tag: "" },
];

export const propTradeHistory: Trade[] = RECENT_TRADES.concat(
  generateTradeHistory("prop-hist", 22, Date.UTC(2026, 8, 30, 9, 0), [
    "US500",
    "US100",
    "ETH",
    "XAU",
    "BTC",
  ]),
);
