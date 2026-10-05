import type { SVGProps } from "react";
import { LOGO_MARK_PATH, LOGO_MARK_VIEWBOX } from "./mark";

export interface LogoMarkProps extends Omit<
  SVGProps<SVGSVGElement>,
  "width" | "height" | "viewBox"
> {
  /** Width and height in pixels. Left out, the mark is sized by CSS. */
  size?: number;
  /** Class for the path, for places that colour the mark from their own stylesheet. */
  pathClassName?: string;
}

/**
 * The bare OpenFutures mark. Pass `aria-hidden="true"` when it sits next to the product name,
 * or `role="img"` with an `aria-label` when it stands alone.
 */
export function LogoMark({ size, pathClassName, ...rest }: LogoMarkProps) {
  return (
    <svg width={size} height={size} viewBox={LOGO_MARK_VIEWBOX} {...rest}>
      <path className={pathClassName} fillRule="evenodd" d={LOGO_MARK_PATH} />
    </svg>
  );
}
