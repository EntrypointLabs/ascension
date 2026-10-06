import { useId, type SVGProps } from "react";
import {
  LOGO_WORDMARK_BLOCK,
  LOGO_WORDMARK_FUTURES,
  LOGO_WORDMARK_OPEN,
  LOGO_WORDMARK_OPEN_CLIP_HEIGHT,
  LOGO_WORDMARK_VIEWBOX,
} from "./wordmark";

export interface LogoWordmarkProps extends Omit<SVGProps<SVGSVGElement>, "viewBox"> {}

/**
 * The spelt-out OpenFutures logo. The block takes `currentColor` and the letters are cut out of
 * it, so they show whatever is behind. Size it with `width` or CSS; the height follows.
 */
export function LogoWordmark(props: LogoWordmarkProps) {
  const id = useId();
  const mask = id + "-letters";
  const clip = id + "-open";
  return (
    <svg viewBox={LOGO_WORDMARK_VIEWBOX} {...props}>
      <defs>
        <clipPath id={clip}>
          <rect width="985" height={LOGO_WORDMARK_OPEN_CLIP_HEIGHT} />
        </clipPath>
        <mask id={mask}>
          <rect width="985" height="408" fill="#fff" />
          <path d={LOGO_WORDMARK_OPEN} fill="#000" clipPath={`url(#${clip})`} />
          <path d={LOGO_WORDMARK_FUTURES} fill="#000" />
        </mask>
      </defs>
      <path d={LOGO_WORDMARK_BLOCK} fill="currentColor" mask={`url(#${mask})`} />
    </svg>
  );
}
