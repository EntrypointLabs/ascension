import { LogoMark } from "@openfutures/ui";

/** Faint OpenFutures mark centred behind a chart, so snapshots carry the brand (`.wm`). */
export function Watermark() {
  return (
    <div className="wm" aria-hidden="true">
      <LogoMark />
      <span>OpenFutures</span>
    </div>
  );
}
