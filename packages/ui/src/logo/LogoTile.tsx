import { LogoMark } from "./LogoMark";
import {
  BRAND_TILE,
  TILE_MARK_CLASS,
  TILE_SIZES,
  joinClassNames,
  type LogoTileSize,
  type LogoTileVariant,
} from "./tile";

export interface LogoTileProps {
  variant?: LogoTileVariant;
  /** Size of a `tile`. The `brand` variant sizes itself around its mark. */
  size?: LogoTileSize;
  /** Overrides the mark's size inside the square, in pixels. */
  markSize?: number;
  /** Extra class names, for layout rules that belong to the place it is used. */
  className?: string;
}

/** The OpenFutures mark inside its square. Decorative: pair it with visible text. */
export function LogoTile({ variant = "tile", size = "md", markSize, className }: LogoTileProps) {
  // The two variants hide themselves from assistive tech at different levels, as the prototype does.
  if (variant === "brand") {
    return (
      <span className={joinClassNames(BRAND_TILE.className, className)} aria-hidden="true">
        <LogoMark size={markSize ?? BRAND_TILE.mark} pathClassName={TILE_MARK_CLASS} />
      </span>
    );
  }
  const preset = TILE_SIZES[size];
  return (
    <span className={joinClassNames(preset.className, className)}>
      <LogoMark size={markSize ?? preset.mark} aria-hidden="true" pathClassName={TILE_MARK_CLASS} />
    </span>
  );
}
