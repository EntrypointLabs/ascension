import { Fragment, type KeyboardEvent, type PointerEvent } from "react";
import { ChartTooltip } from "@/components/common/ChartTooltip";
import { Dropdown } from "@/components/common/Dropdown";
import { IconToggle } from "@/components/common/IconToggle";
import { InfoTip } from "@/components/common/InfoTip";
import { SnapshotButton } from "@/components/common/SnapshotButton";
import { Watermark } from "@/components/common/Watermark";
import type { WatchChart } from "@/components/watch/types";
import { parseStyle } from "@/lib/style";
import type { TerminalViewModel } from "@/terminal/types";

const STEP = 0.05;

/** Range bar keys, replayed through the vm's pointer handlers. */
function brushKey(
  event: KeyboardEvent<HTMLDivElement>,
  chart: WatchChart | undefined,
  winLPct: number,
  winWPct: number,
) {
  const left = winLPct / 100;
  const width = winWPct / 100;
  const targets: Record<string, number> = {
    ArrowLeft: left - STEP,
    ArrowDown: left - STEP,
    ArrowRight: left + STEP,
    ArrowUp: left + STEP,
    Home: 0,
    End: 1 - width,
  };
  if (!(event.key in targets) || !chart?.bDown || !chart.bMove || !chart.bUp) {
    return;
  }
  event.preventDefault();
  const el = event.currentTarget;
  const rect = el.getBoundingClientRect();
  const next = Math.max(0, Math.min(1 - width, targets[event.key]));
  if (Math.abs(next - left) < 1e-6) {
    return;
  }
  const pointer = (ratio: number) =>
    ({
      currentTarget: el,
      clientX: rect.left + ratio * rect.width,
      pointerId: -1,
    }) as unknown as PointerEvent<HTMLElement>;
  // Narrow windows sit inside the handle zones, so press beside them to recentre instead.
  if (width > 0.06) {
    const grab = left + width / 2;
    chart.bDown(pointer(grab));
    chart.bMove(pointer(grab + next - left));
  } else {
    chart.bDown(pointer(Math.max(0, Math.min(1, next + width / 2))));
  }
  chart.bUp(pointer(0));
}

export function WatchChartCard({ vm }: { vm: TerminalViewModel }) {
  const chart: WatchChart | undefined = vm.mw?.chart;
  const winL = Number(chart?.winL) || 0;
  const winW = Number(chart?.winW) || 0;
  const series = (chart?.legend || [])
    .filter((item) => item.pressed !== "false")
    .map((item) => item.name)
    .join(", ");
  return (
    <section className="mwc snap-card" data-snap="market-watch" aria-label={chart?.title}>
      <div className="mwc-head">
        <div className="mwc-t">
          <h2 className="h-i">
            {chart?.title}
            <InfoTip tip="Hover or drag across the chart to read every series. Tap a legend item to hide it, and drag the range bar to zoom." />
          </h2>
          <b className="num">{chart?.headline}</b>
        </div>
        <div className="mwc-actions">
          {chart?.hasType ? (
            <>
              <IconToggle
                items={chart?.types}
                label="Chart type"
                className="mwc-types"
                role="group"
              />
            </>
          ) : null}
          <SnapshotButton onClick={vm.mw?.snap} />
          <button
            type="button"
            className="mwc-btn"
            aria-label="Copy CSV"
            title="Copy CSV"
            onClick={chart?.copy}
          >
            <svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
              style={{ fill: "none", stroke: "currentColor" }}
            >
              <path d="M12 4v11M7 10l5 5 5-5M5 20h14" />
            </svg>
            <span>Copy CSV</span>
          </button>
        </div>
      </div>
      <div className="mwc-ctrls">
        {chart?.hasSeg ? (
          <>
            <Dropdown dd={vm.mw?.dd?.seg} />
          </>
        ) : null}
        <Dropdown dd={vm.mw?.dd?.metric} />
      </div>
      <div className="mwc-plot">
        <div className="mwc-y num" aria-hidden="true">
          {(chart?.yTicks || []).map((yTick, i) => (
            <Fragment key={i}>
              <span style={parseStyle(`top: ${yTick?.y ?? ""}%`)}>{yTick?.label}</span>
            </Fragment>
          ))}
        </div>
        <div className="mwc-area">
          <p className="sr">
            {chart?.title} chart, {chart?.rangeText}. Latest: {chart?.headline}. Series: {series}.
          </p>
          <Watermark />
          <svg
            className="mwc-svg"
            viewBox="0 0 1000 288"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            {(chart?.yTicks || []).map((yTick, i) => (
              <Fragment key={i}>
                <line
                  x1="0"
                  x2="1000"
                  y1={yTick?.y}
                  y2={yTick?.y}
                  className="mwc-grid"
                  style={{ transform: "translateY(0)" }}
                  vectorEffect="non-scaling-stroke"
                />
              </Fragment>
            ))}
            {(chart?.paths || []).map((path, i) => (
              <Fragment key={i}>
                <path
                  d={path?.d}
                  strokeWidth={path?.sw}
                  fillOpacity={path?.op}
                  vectorEffect="non-scaling-stroke"
                  style={parseStyle(`fill: ${path?.fill ?? ""}; stroke: ${path?.stroke ?? ""}`)}
                />
              </Fragment>
            ))}
          </svg>
          <div className="mwc-gridy" aria-hidden="true">
            {(chart?.yTicks || []).map((yTick, i) => (
              <Fragment key={i}>
                <i style={parseStyle(`top: ${yTick?.y ?? ""}%`)} />
              </Fragment>
            ))}
            {chart?.hasZero ? (
              <>
                <i className="zero" style={parseStyle(`top: ${chart?.zeroY ?? ""}%`)} />
              </>
            ) : null}
          </div>
          <ChartTooltip tip={chart?.tip} head={[chart?.tip?.date, chart?.tip?.total]} />
          <div
            className="mwc-hit"
            onPointerMove={chart?.move}
            onPointerDown={chart?.move}
            onPointerLeave={chart?.leave}
          />
        </div>
      </div>
      <div className="mwc-x num" aria-hidden="true">
        {(chart?.xTicks || []).map((xTick, i) => (
          <Fragment key={i}>
            <span className={xTick?.cls} style={parseStyle(`left: ${xTick?.x ?? ""}%`)}>
              {xTick?.label}
            </span>
          </Fragment>
        ))}
      </div>
      <p className="touch-hint">Touch and drag across the chart to read values</p>
      <div className="mwc-range">
        <div className="mwc-rbtns">
          {(chart?.ranges || []).map((range, i) => (
            <Fragment key={i}>
              <button
                type="button"
                className={range?.cls}
                aria-pressed={/\bis-on\b/.test(range?.cls || "")}
                onClick={range?.pick}
              >
                {range?.label}
              </button>
            </Fragment>
          ))}
        </div>
        <span className="mwc-rtext num">{chart?.rangeText}</span>
      </div>
      <div
        className="mwc-brush"
        role="slider"
        tabIndex={0}
        aria-label="Visible date range"
        aria-valuemin={0}
        aria-valuemax={Math.round(100 - winW)}
        aria-valuenow={Math.round(winL)}
        aria-valuetext={chart?.rangeText}
        onKeyDown={(event) => brushKey(event, chart, winL, winW)}
        onPointerDown={chart?.bDown}
        onPointerMove={chart?.bMove}
        onPointerUp={chart?.bUp}
        onPointerCancel={chart?.bUp}
      >
        <svg viewBox="0 0 1000 40" preserveAspectRatio="none" aria-hidden="true">
          <path d={chart?.miniArea} className="mb-area" />
          <path d={chart?.mini} className="mb-line" vectorEffect="non-scaling-stroke" />
        </svg>
        <div
          className="mb-win"
          style={parseStyle(`left: ${chart?.winL ?? ""}%; width: ${chart?.winW ?? ""}%`)}
        >
          <i className="mb-h l" />
          <i className="mb-h r" />
        </div>
      </div>
      <div className="mwc-legend">
        {(chart?.legend || []).map((legendItem, i) => (
          <Fragment key={i}>
            <button
              type="button"
              className={legendItem?.cls}
              aria-pressed={legendItem?.pressed}
              onClick={legendItem?.toggle}
            >
              <i style={parseStyle(`background: ${legendItem?.color ?? ""}`)} />
              {legendItem?.name}
            </button>
          </Fragment>
        ))}
      </div>
    </section>
  );
}
