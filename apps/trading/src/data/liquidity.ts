import type { VaultActivityKind, VaultTerm } from "@openfutures/core";

/**
 * Seed data for the Liquidity screen. Everything here stands in for the vault contracts and the
 * prop protocol's account registry, and is meant to be replaced by live reads.
 */

/** APR quoted today by each vault, in percent. Longer locks pay more. */
export const VAULT_BASE_APR: Record<VaultTerm, number> = {
  90: 7.4,
  180: 9.6,
  270: 11.9,
  360: 14.2,
  720: 18.1,
};

/** Series colour per vault, shared by every Liquidity chart and legend. */
export const VAULT_COLORS: Record<VaultTerm, string> = {
  90: "#7ea0ff",
  180: "#4fd1b8",
  270: "#e5b75a",
  360: "#b49cff",
  720: "#3b6ff6",
};

/** Days of history behind the vault charts. */
export const VAULT_HISTORY_DAYS = 90;

/** Fees and profit share paid to depositors over the last 30 days, in USDC. */
export const PAID_TO_LPS_30D = 65_500;

/**
 * The signed-in depositor's seeded lots: id, term, amount, days since deposit, status.
 * Withdrawn lots were held for `heldDays` before leaving.
 */
export const SEED_LOTS: {
  id: string;
  term: VaultTerm;
  amount: number;
  daysAgo: number;
  status: "active" | "withdrawn";
  heldDays?: number;
}[] = [
  { id: "s1", term: 270, amount: 400, daysAgo: 18, status: "active" },
  { id: "s2", term: 360, amount: 1200, daysAgo: 41, status: "active" },
  { id: "s3", term: 720, amount: 2500, daysAgo: 64, status: "active" },
  { id: "s4", term: 90, amount: 600, daysAgo: 97, status: "active" },
  { id: "s5", term: 180, amount: 800, daysAgo: 152, status: "active" },
  { id: "s6", term: 180, amount: 500, daysAgo: 60, status: "withdrawn", heldDays: 38 },
  { id: "s7", term: 90, amount: 300, daysAgo: 130, status: "withdrawn", heldDays: 90 },
];

/** Activity that is not a deposit: which lot it touched, when, and the penalty rate paid. */
export const SEED_EXITS: {
  lot: string;
  act: VaultActivityKind;
  daysAgo: number;
  penaltyRate?: number;
}[] = [
  { lot: "s6", act: "Early Exit", daysAgo: 22, penaltyRate: 0.0789 },
  { lot: "s7", act: "Withdraw", daysAgo: 40 },
  { lot: "s4", act: "Unlock", daysAgo: 7 },
];

/** Prop account sizes in USD, with their share of all funded accounts and chart colour. */
export const FUNDED_ACCOUNT_SIZES: { size: number; mix: number; color: string }[] = [
  { size: 10_000, mix: 0.42, color: "#7ea0ff" },
  { size: 25_000, mix: 0.3, color: "#4fd1b8" },
  { size: 50_000, mix: 0.18, color: "#e5b75a" },
  { size: 100_000, mix: 0.1, color: "#b49cff" },
];

/** Funded accounts in the return distribution. */
export const FUNDED_POPULATION = 420;

/** Accounts listed in the Funded Traders table. */
export const FUNDED_TRADER_COUNT = 31;

export const TRADER_HANDLES = [
  "kai",
  "nova",
  "zed",
  "mira",
  "ola",
  "tunde",
  "lena",
  "rio",
  "sasha",
  "ikenna",
  "yuki",
  "dami",
  "theo",
  "ana",
  "femi",
  "jules",
];
export const TRADER_SUFFIXES = [
  ".trades",
  "_fx",
  ".perps",
  "capital",
  "_q",
  ".alpha",
  "x",
  ".desk",
];
