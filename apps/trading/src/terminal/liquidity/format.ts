import { MONTHS } from "@openfutures/core";

/** "Sep 25, 2028" in UTC. */
export function formatDate(ms: number): string {
  const date = new Date(ms);
  return MONTHS[date.getUTCMonth()] + " " + date.getUTCDate() + ", " + date.getUTCFullYear();
}

/** "Sep 25" in UTC. */
export function formatDay(ms: number): string {
  const date = new Date(ms);
  return MONTHS[date.getUTCMonth()] + " " + date.getUTCDate();
}

/** "Sep 2028" in UTC. */
export function formatMonth(ms: number): string {
  const date = new Date(ms);
  return MONTHS[date.getUTCMonth()] + " " + date.getUTCFullYear();
}

/** Axis label for a month: "Jan 27" on January and on the first tick, otherwise "Feb". */
export function monthTick(ms: number, isFirst: boolean): string {
  const date = new Date(ms);
  const showYear = date.getUTCMonth() === 0 || isFirst;
  return (
    MONTHS[date.getUTCMonth()] + (showYear ? " " + String(date.getUTCFullYear()).slice(2) : "")
  );
}

/** USDC amount with two decimals and thousands separators: "2,577.65". */
export function formatUsdc(amount: number): string {
  return Number(amount).toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

/** Two-decimal compact amount: "3.35M", "658.74K", "512.00". */
export function formatShort(amount: number): string {
  if (amount >= 1e6) {
    return (amount / 1e6).toFixed(2) + "M";
  } else if (amount >= 1e3) {
    return (amount / 1e3).toFixed(2) + "K";
  }
  return amount.toFixed(2);
}

/** Leading sign with a true minus: "+1.20", "−0.40". */
export function signed(value: number, text: string): string {
  return (value >= 0 ? "+" : "−") + text;
}
