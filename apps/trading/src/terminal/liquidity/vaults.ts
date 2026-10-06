import {
  DAY_MS,
  VAULT_TERMS,
  hashString,
  seededDriftSeries,
  seededRandom,
  type VaultTerm,
} from "@openfutures/core";
import { VAULT_BASE_APR, VAULT_HISTORY_DAYS } from "@/data/liquidity";

/** One term vault as of today. Amounts in USDC, APRs in percent. */
export interface VaultSnapshot {
  term: VaultTerm;
  deposits: number;
  /** Deposits currently allocated to funded traders. */
  allocated: number;
  /** `allocated / deposits`, 0..1. */
  utilization: number;
  apr: number;
  aprLow30d: number;
  aprHigh30d: number;
  /** Entry APR for each of the last `VAULT_HISTORY_DAYS` days, oldest first. */
  aprHistory: number[];
  /** Total deposits for each of the last `VAULT_HISTORY_DAYS` days, oldest first. */
  depositHistory: number[];
  /** Unlock date of a deposit made today. */
  unlockAt: number;
}

// The simulated series are generated over 180 days and trimmed, matching the Market Watch data.
const SERIES_DAYS = 180;

let cache: { day: number; vaults: VaultSnapshot[] } | null = null;

/** The five vaults as of `today` (UTC midnight). Cached for the day; the inputs only move daily. */
export function vaultSnapshots(today: number): VaultSnapshot[] {
  if (cache && cache.day === today) {
    return cache.vaults;
  }
  const vaults = VAULT_TERMS.map((term) => {
    const rng = seededRandom(hashString("lqv-" + term));
    const deposits = Math.round((1.1e6 + rng() * 1.6e6) * (term >= 360 ? 1.3 : 1));
    const utilization = 0.55 + rng() * 0.27;
    const aprHistory = seededDriftSeries(
      "lqapr" + term,
      SERIES_DAYS,
      VAULT_BASE_APR[term],
      0,
      0.012,
    ).slice(-VAULT_HISTORY_DAYS);
    const depositHistory = seededDriftSeries(
      "lqh" + term,
      SERIES_DAYS,
      deposits,
      0.006,
      0.03,
    ).slice(-VAULT_HISTORY_DAYS);
    const last30 = aprHistory.slice(-30);
    return {
      term,
      deposits,
      allocated: deposits * utilization,
      utilization,
      apr: aprHistory[VAULT_HISTORY_DAYS - 1],
      aprLow30d: Math.min(...last30),
      aprHigh30d: Math.max(...last30),
      aprHistory,
      depositHistory,
      unlockAt: today + term * DAY_MS,
    };
  });
  cache = { day: today, vaults };
  return vaults;
}

/** Entry APR a vault quoted `daysAgo` days before today, falling back to just under its base rate. */
export function aprOnDay(vaults: VaultSnapshot[], term: VaultTerm, daysAgo: number): number {
  const vault = vaults.find((v) => v.term === term)!;
  return daysAgo < VAULT_HISTORY_DAYS
    ? vault.aprHistory[VAULT_HISTORY_DAYS - 1 - daysAgo]
    : VAULT_BASE_APR[term] - 0.3;
}
