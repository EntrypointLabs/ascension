import type { ReactNode } from "react";
import { Watermark } from "@/components/common/Watermark";
import type { ChartTooltip, Tick } from "@/terminal/liquidity/charts";
import type { HoverHandlers } from "@/terminal/liquidity/analytics";

/**
 * Plot area shared by the Liquidity charts: y labels and gridlines, the watermark, the SVG
 * layers passed as children (drawn in a 1000 x 280 viewBox), the hover line and tooltip,
 * and x labels. Without `yTicks` the plot runs edge to edge.
 */
export function ChartPlot({
  chart,
  yTicks,
  className = "",
  children,
}: {
  chart: { xTicks: Tick[]; tip: ChartTooltip } & HoverHandlers;
  yTicks?: Tick[];
  className?: string;
  children: ReactNode;
}) {
  const tip = chart.tip;
  return (
    <div className={("lq-plot " + (yTicks ? "" : "nolabels ") + className).trim()}>
      {yTicks ? (
        <div className="lq-y num" aria-hidden="true">
          {yTicks.map((tick, i) => (
            <span key={i} style={{ top: tick.y + "%" }}>
              {tick.label}
            </span>
          ))}
        </div>
      ) : null}
      <div className="lq-area">
        {yTicks ? (
          <div className="mwc-gridy" aria-hidden="true">
            {yTicks.map((tick, i) => (
              <i key={i} style={{ top: tick.y + "%" }} />
            ))}
          </div>
        ) : null}
        <Watermark />
        <svg
          className="mwc-svg"
          viewBox="0 0 1000 280"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          {children}
        </svg>
        {tip.show ? (
          <>
            <i className="mwc-vline" style={{ left: tip.left + "%" }} />
            <div className={tip.side + " mwc-tip num"} style={{ left: tip.left + "%" }}>
              <div className="tip-h">
                <b>{tip.date}</b>
                <b>{tip.total}</b>
              </div>
              {(tip.rows || []).map((row, i) => (
                <div key={i} className="tip-r">
                  <span>
                    <i style={{ background: row.color }} />
                    {row.name}
                  </span>
                  <span>{row.val}</span>
                </div>
              ))}
            </div>
          </>
        ) : null}
        <div
          className="mwc-hit"
          onPointerMove={chart.move}
          onPointerDown={chart.move}
          onPointerLeave={chart.leave}
        />
      </div>
      <div className="lq-x num" aria-hidden="true">
        {chart.xTicks.map((tick, i) => (
          <span key={i} className={tick.cls} style={{ left: tick.x + "%" }}>
            {tick.label}
          </span>
        ))}
      </div>
    </div>
  );
}

/** Colour key under a chart. */
export function ChartLegend({ items }: { items: { name: string; color: string }[] }) {
  return (
    <div className="lq-legend">
      {items.map((item, i) => (
        <span key={i}>
          <i style={{ background: item.color }} />
          {item.name}
        </span>
      ))}
    </div>
  );
}

/** Highlight band behind the hovered bar group. */
export function HoverBand({ show, x, width }: { show: boolean; x: string; width: string }) {
  return show ? (
    <rect x={x} y="0" width={width} height="280" style={{ fill: "var(--hover)" }} />
  ) : null;
}
