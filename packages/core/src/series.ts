import { hashString, seededRandom } from "./random";

/** Axis step that yields about five round-numbered ticks across `range`. */
export function niceStep(range: number): number {
  const roughStep = range / 5;
  const magnitude = Math.pow(10, Math.floor(Math.log10(roughStep)));
  const normalized = roughStep / magnitude;
  return (
    (normalized < 1.5
      ? 1
      : normalized < 2.25
        ? 2
        : normalized < 3.5
          ? 2.5
          : normalized < 7.5
            ? 5
            : 10) * magnitude
  );
}

/** Random walk that is stable for a given `seedKey` and ends exactly at `endValue`. */
export function seededPriceSeries(
  seedKey: string,
  pointCount: number,
  endValue: number,
  volatility: number,
  drift: number,
): number[] {
  const rng = seededRandom(hashString(seedKey));
  const series: number[] = [];
  let level = 1;
  for (let i = 0; i < pointCount; i++) {
    let step = (rng() - 0.5) * volatility * 2;
    if (rng() < 0.05) {
      step += (rng() - 0.5) * volatility * 7;
    }
    level = level * (1 + step + drift);
    series.push(level);
  }
  const scale = endValue / series[series.length - 1];
  return series.map((value) => value * scale);
}

export function sparklinePath(values: number[], width: number, height: number, padding: number) {
  const minValue = Math.min.apply(null, values);
  const maxValue = Math.max.apply(null, values);
  const valueRange = maxValue - minValue || 1;
  const points = values.map((value, i) => [
    (i / (values.length - 1)) * width,
    padding + (1 - (value - minValue) / valueRange) * (height - padding * 2),
  ]);
  const linePath =
    "M" + points.map((point) => point[0].toFixed(2) + " " + point[1].toFixed(2)).join(" L");
  return {
    xy: points,
    line: linePath,
    area: linePath + " L" + width + " " + height + " L0 " + height + " Z",
  };
}

/**
 * Daily series of `length` points that ends exactly at `endValue`, shrinking by `drift` per step
 * going back in time with a random walk of size `volatility` on top. Stable for a given `seedKey`.
 * With `spikes`, about one point in twenty is pushed up 1.6x to 3.4x.
 */
export function seededDriftSeries(
  seedKey: string,
  length: number,
  endValue: number,
  drift: number,
  volatility: number,
  spikes = false,
): number[] {
  const rng = seededRandom(hashString(seedKey));
  const walk: number[] = [];
  let level = 0;
  for (let i = 0; i < length; i++) {
    level += (rng() - 0.5) * volatility;
    walk.push(level);
  }
  const series = new Array<number>(length);
  for (let i = 0; i < length; i++) {
    const stepsBack = length - 1 - i;
    let factor = Math.exp(-stepsBack * drift + walk[i] - walk[length - 1]);
    if (spikes && rng() < 0.05) {
      factor *= 1.6 + rng() * 1.8;
    }
    series[i] = endValue * factor;
  }
  series[length - 1] = endValue;
  return series;
}
