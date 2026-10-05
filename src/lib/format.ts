export function formatPrice(price: number): string {
  const absPrice = Math.abs(price);
  if (absPrice >= 10000) {
    return price.toLocaleString("en-US", { minimumFractionDigits: 1, maximumFractionDigits: 1 });
  } else if (absPrice >= 1000) {
    return price.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  } else if (absPrice >= 100) {
    return price.toFixed(3);
  } else if (absPrice >= 1) {
    return price.toFixed(4);
  } else if (absPrice) {
    return price.toFixed(Math.min(12, 3 - Math.floor(Math.log10(absPrice))));
  } else {
    return "0";
  }
}
export function formatUsd(amount: number): string {
  return (
    "$" + amount.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })
  );
}
export function formatCompact(value: number): string {
  if (value >= 1000000000) {
    return (value / 1000000000).toFixed(2) + "B";
  } else if (value >= 1000000) {
    return (value / 1000000).toFixed(2) + "M";
  } else if (value >= 1000) {
    return (value / 1000).toFixed(1) + "K";
  } else {
    return value.toFixed(0);
  }
}
export function formatChange(percent: number): string {
  return (percent >= 0 ? "▲ " : "▼ ") + Math.abs(percent).toFixed(2) + "%";
}
export function parseCompact(text: string): number {
  const number = parseFloat(text.replace(/[$,]/g, ""));
  if (/B/.test(text)) {
    return number * 1000000000;
  } else if (/M/.test(text)) {
    return number * 1000000;
  } else if (/K/.test(text)) {
    return number * 1000;
  } else {
    return number;
  }
}
export function formatQty(qty: number): string {
  if (qty >= 1000000) {
    return (qty / 1000000).toFixed(1) + "M";
  } else if (qty >= 1000) {
    return qty.toLocaleString("en-US", { maximumFractionDigits: 0 });
  } else if (qty >= 1) {
    return String(Math.round(qty * 10000) / 10000);
  } else {
    return qty.toFixed(4);
  }
}
export function formatSignedUsd(amount: number): string {
  return (
    (amount >= 0 ? "+$" : "-$") +
    Math.abs(amount).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })
  );
}
