// The mark inside its square, described without a framework so the React component and the
// custom element are built from the same presets.

import { logoMarkSvg } from "./mark";

/**
 * - `brand`: next to the product name. A light tile on the dark theme; on the light theme the
 *   tile disappears and only the mark is left.
 * - `tile`: a square that is always there and flips with the theme (light tile and dark mark on
 *   the dark theme, dark tile and white mark on the light theme).
 */
export type LogoTileVariant = "brand" | "tile";

export type LogoTileSize = "xs" | "sm" | "md" | "lg" | "xl";

/** Class the tile styles use to colour the mark. */
export const TILE_MARK_CLASS = "bmark-g";

export const BRAND_TILE = { className: "bmark", mark: 26 };

// The class names are the ones the design prototype uses. The trading app's parity checks compare
// its markup with the prototype exactly, so the output must not gain, lose or rename a class.
export const TILE_SIZES: Record<LogoTileSize, { className: string; mark: number }> = {
  xs: { className: "ai-mark sm", mark: 14 }, // 22px tile
  sm: { className: "ob-mark sm", mark: 16 }, // 24px tile
  md: { className: "ai-mark", mark: 18 }, // 28px tile
  lg: { className: "ob-mark", mark: 26 }, // 44px tile
  xl: { className: "ai-mark lg", mark: 30 }, // 48px tile
};

export const isLogoTileSize = (value: string | null): value is LogoTileSize =>
  value !== null && value in TILE_SIZES;

export const joinClassNames = (base: string, extra?: string) => (extra ? `${base} ${extra}` : base);

export interface LogoTileHtmlOptions {
  variant?: LogoTileVariant;
  size?: LogoTileSize;
  markSize?: number;
  className?: string;
}

/** The tile as an HTML string. Decorative, like the component: pair it with visible text. */
export function logoTileHtml({
  variant = "tile",
  size = "md",
  markSize,
  className,
}: LogoTileHtmlOptions = {}): string {
  const preset = variant === "brand" ? BRAND_TILE : TILE_SIZES[size];
  const mark = logoMarkSvg({ size: markSize ?? preset.mark, pathClassName: TILE_MARK_CLASS });
  return `<span class="${joinClassNames(preset.className, className)}" aria-hidden="true">${mark}</span>`;
}
