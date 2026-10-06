/**
 * Geometry shared by the Liquidity charts. Every plot draws into a 1000 x 280 SVG viewBox
 * stretched to the card, with the baseline at y = 262 and 248 units of usable height.
 * Tick and tooltip positions are returned as percentages of the plot so HTML labels can sit
 * on top of the stretched SVG without distortion.
 */

export const PLOT_W = 1000;
export const PLOT_H = 280;
export const BASELINE = 262;
export const USABLE_H = 248;

export interface TooltipRow {
  name: string;
  color: string;
  val: string;
}

export interface ChartTooltip {
  show: boolean;
  /** Horizontal position, percent of the plot width. */
  left?: string;
  /** `side-l` opens the tooltip to the left of the cursor line. */
  side?: string;
  date?: string;
  total?: string;
  rows?: TooltipRow[];
}

export interface Tick {
  label: string;
  /** Percent of the plot width (x ticks) or height (y ticks). */
  x?: string;
  y?: string;
  cls?: string;
}

export const HIDDEN_TIP: ChartTooltip = { show: false };

/** x in viewBox units for point `index` of `count` evenly spaced points. */
export function pointX(index: number, count: number): number {
  return (index / (count - 1)) * PLOT_W;
}

/** y in viewBox units for `value` on a 0..`max` scale. */
export function valueY(value: number, max: number): number {
  return BASELINE - (value / max) * USABLE_H;
}

/** Converts a viewBox y into a percentage of the plot height, for HTML tick labels. */
export function yPercent(y: number): string {
  return (y / (PLOT_H / 100)).toFixed(2);
}

/** Polyline through `values`, scaled by `toY`. */
export function linePath(values: number[], toY: (value: number) => number): string {
  let path = "";
  values.forEach((value, index) => {
    path +=
      (index ? "L" : "M") + pointX(index, values.length).toFixed(1) + " " + toY(value).toFixed(1);
  });
  return path;
}

/**
 * Stacks `layers` bottom-up and returns, for each, the filled band (`d`) and its top edge
 * (`line`). All layers must have the same length.
 */
export function stackedAreas<T>(
  layers: T[],
  valuesOf: (layer: T) => number[],
  colorOf: (layer: T) => string,
  max: number,
): { d: string; line: string; color: string }[] {
  const count = valuesOf(layers[0]).length;
  const floor = new Array<number>(count).fill(0);
  return layers.map((layer) => {
    const values = valuesOf(layer);
    let top = "";
    let bottom = "";
    for (let i = 0; i < count; i++) {
      top +=
        (i ? "L" : "M") +
        pointX(i, count).toFixed(1) +
        " " +
        valueY(floor[i] + values[i], max).toFixed(1);
    }
    for (let i = count - 1; i >= 0; i--) {
      bottom += "L" + pointX(i, count).toFixed(1) + " " + valueY(floor[i], max).toFixed(1);
    }
    for (let i = 0; i < count; i++) {
      floor[i] += values[i];
    }
    return { d: top + bottom + "Z", line: top, color: colorOf(layer) };
  });
}

/** Tooltip anchored at `leftPercent`, opening away from the nearer edge. */
export function tooltipAt(
  leftPercent: number,
  flipAbove: number,
  date: string,
  total: string,
  rows: TooltipRow[],
): ChartTooltip {
  return {
    show: true,
    left: leftPercent.toFixed(2),
    side: leftPercent > flipAbove ? "side-l" : "side-r",
    date,
    total,
    rows,
  };
}

/** Evenly spaced y ticks for a 0..`max` scale at the given fractions. */
export function valueTicks(
  max: number,
  fractions: number[],
  format: (value: number) => string,
): Tick[] {
  return fractions.map((fraction) => {
    const value = max * fraction;
    return { y: yPercent(valueY(value, max)), label: format(value) };
  });
}
