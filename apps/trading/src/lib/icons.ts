/**
 * Stroke paths for the small icons drawn in toggles and tabs (24 x 24 viewBox, stroked, no fill).
 * The view model passes these through as `ic`; components draw them with `<IconPath>`.
 */
export const ICON_PATHS = {
  markets: "M3 3v18h18M7 15l3-3 3 3 5-6",
  exchanges: "M4 21V9l8-5 8 5v12M9 21v-6h6v6",
  funding:
    "M19 5 5 19M7.5 9.5a2 2 0 1 0 0-4 2 2 0 0 0 0 4zM16.5 18.5a2 2 0 1 0 0-4 2 2 0 0 0 0 4z",
  vaults: "M4 5h16v14H4zM12 9.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM12 7.5v2M12 14.5v2",
  analytics: "M5 20V11M12 20V4M19 20v-7",
  oi: "M4 18h16M7 18V9M12 18V5M17 18v-6",
  liq: "M13 2 4 14h7l-1 8 9-12h-7z",
  flow: "M4 8h13l-3-3M20 16H7l3 3",
  book: "M4 6h16M4 12h11M4 18h14",
  specs: "M6 3h9l3 3v15H6zM9 9h3M9 13h6M9 17h6",
  positions: "M4 7h16v12H4zM9 7V5h6v2",
  orders: "M5 4h14v16H5zM9 9h6M9 13h6M9 17h3",
  history: "M12 7v5l3 2M4.5 12a7.5 7.5 0 1 0 2.2-5.3M4 4v3.5h3.5",
  all: "M4 6h16M4 12h16M4 18h16",
  locked: "M6 11h12v9H6zM8.5 11V8a3.5 3.5 0 0 1 7 0v3",
  unlocked: "M6 11h12v9H6zM8.5 11V8a3.5 3.5 0 0 1 6.8-1.2",
  area: "M3 17l5-6 4 3 5-7 4 4v6H3z",
  bar: "M5 20V12M10 20V6M15 20v-9M20 20V9",
} as const;

export type IconName = keyof typeof ICON_PATHS;
