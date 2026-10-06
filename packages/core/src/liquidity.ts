/**
 * Liquidity vaults: depositors lock USDC for a fixed term to fund prop traders and earn the APR
 * quoted on the day they deposit. Platform-agnostic maths shared by the apps and any backend.
 */

export const DAY_MS = 86_400_000;

/** Lock terms on offer, in days. One vault per term. */
export const VAULT_TERMS = [90, 180, 270, 360, 720] as const;
export type VaultTerm = (typeof VAULT_TERMS)[number];

/** Exiting before unlock costs this share of the position, falling evenly to zero at unlock. */
export const EARLY_EXIT_MAX_PENALTY = 0.1;

export type VaultLotStatus = "active" | "withdrawn";

/** One deposit into a vault. A lot earns its entry APR until it unlocks. */
export interface VaultLot {
  id: string;
  term: VaultTerm;
  /** USDC deposited. */
  amount: number;
  /** Deposit time, ms since epoch. */
  at: number;
  /** `at` plus the term. */
  unlockAt: number;
  /** Entry APR, in percent. */
  apr: number;
  status: VaultLotStatus;
  /** Earnings paid out when the lot was withdrawn. */
  earned?: number;
}

export type VaultActivityKind = "Deposit" | "Withdraw" | "Early Exit" | "Unlock";

/** One entry in a depositor's activity log. */
export interface VaultActivity {
  at: number;
  act: VaultActivityKind;
  term: VaultTerm;
  /** USDC moved. */
  amount: number;
  /** Entry APR of the lot, in percent. */
  apr: number;
  /** Early exit penalty paid, in USDC. */
  penalty: number;
}

/** Whole days from `now` until `unlockAt`, never negative. */
export function daysUntilUnlock(unlockAt: number, now: number): number {
  return Math.max(0, Math.ceil((unlockAt - now) / DAY_MS));
}

/** Simple interest earned by `amount` at `aprPercent` over `days`, capped at the term. */
export function accruedEarnings(amount: number, aprPercent: number, days: number, term: number) {
  return (((amount * aprPercent) / 100) * Math.min(Math.max(0, days), term)) / 365;
}

/** Early exit penalty as a fraction of the position: 10% on day one, 0% at unlock. */
export function earlyExitPenalty(daysLeft: number, term: number): number {
  return daysLeft <= 0 ? 0 : (EARLY_EXIT_MAX_PENALTY * daysLeft) / term;
}

/** Valuation of a lot at `now`. */
export function valueLot(lot: VaultLot, now: number) {
  const daysHeld = Math.max(0, (now - lot.at) / DAY_MS);
  const daysLeft = daysUntilUnlock(lot.unlockAt, now);
  const unlocked = daysLeft <= 0;
  const earned =
    lot.status === "withdrawn"
      ? lot.earned || 0
      : accruedEarnings(lot.amount, lot.apr, daysHeld, lot.term);
  return {
    daysLeft,
    unlocked,
    earned,
    value: lot.amount + earned,
    /** Penalty fraction if the lot were exited now. */
    penalty: unlocked ? 0 : earlyExitPenalty(daysLeft, lot.term),
  };
}
