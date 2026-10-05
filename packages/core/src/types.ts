export type Side = "long" | "short";

export type MarketCategory = "Crypto" | "Stocks" | "Indices" | "Commodities" | "Forex";

export interface Market {
  sym: string;
  name: string;
  glyph?: string;
  /** Mark price. Updated in place by the price feed. */
  price: number;
  /** 24h change in percent. Updated in place by the price feed. */
  chg: number;
  /** 24h volume, preformatted (e.g. "$1.72B"). */
  vol: string;
  /** Open interest, preformatted. */
  oi: string;
  /** Maximum leverage. */
  max: number;
  cat: MarketCategory;
  /** Venue ids that list this market. Listed on every venue when omitted. */
  venues?: string[];
  /** Price at load, which the simulated feed drifts around. */
  base: number;
  /** 24h change at load. */
  chg0: number;
}

export interface Venue {
  id: string;
  name: string;
  /** Price offset against the index, in basis points. */
  off: number;
  /** Taker fee in percent. */
  fee: number;
  /** Relative liquidity weight; scales simulated depth and volume share. */
  mul: number;
  /** Funding rate in percent. */
  fund: number;
  /** Quoted spread in basis points. */
  spr: number;
  logoKey?: string;
  logo: string;
}

export interface Timeframe {
  id: string;
  label: string;
  aria: string;
  /** Candle duration in milliseconds. */
  ms: number;
  /** Candles in the default view; also the window the headline change is measured over. */
  n: number;
  /** Total candles loaded into the chart, including the default view. */
  history: number;
  /** Per-candle volatility used by the simulated series. */
  vol: number;
  range: string;
  intra: boolean;
}

export interface Position {
  id: string;
  sym: string;
  venue: string;
  side: Side;
  lev: number;
  qty: number;
  entry: number;
}

export interface Order {
  id: string;
  sym: string;
  venue: string;
  side: Side;
  type: string;
  price: number;
  qty: number;
  filled: number;
  placed: string;
}

export interface Trade {
  time: string;
  sym: string;
  venue: string;
  action: string;
  side: Side;
  price: number;
  qty: number;
  fee: number;
  /** Realised PnL; null for trades that open a position. */
  pnl: number | null;
}

export interface PropPlan {
  size: string;
  fee: string;
  tag: string;
}
