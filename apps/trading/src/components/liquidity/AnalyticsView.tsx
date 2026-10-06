import { InfoTip } from "@/components/common/InfoTip";
import { ChartCard } from "@/components/liquidity/ChartCard";
import { ChartLegend, ChartPlot, HoverBand } from "@/components/liquidity/ChartPlot";
import { FundedTradersCard } from "@/components/liquidity/FundedTradersCard";
import type { TerminalViewModel } from "@/terminal/types";

/** Liquidity analytics: headline tiles, vault charts, funded trader charts and table. */
export function AnalyticsView({ vm }: { vm: TerminalViewModel }) {
  const liq = vm.liq;
  const { unlocks, hist, curve, dist, funded } = liq;
  if (!unlocks || !hist || !curve || !dist || !funded) {
    return null;
  }
  return (
    <>
      <div className="lq-kpis">
        {liq.kpis.map((kpi, i) => (
          <div key={i} className="lq-kpi">
            <span className="kp-l h-i">
              {kpi.k}
              <InfoTip tip={kpi.info} />
            </span>
            <b className="num">{kpi.v}</b>
            {kpi.hasSpark ? (
              <svg
                className="kp-spark"
                viewBox="0 0 100 24"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <path
                  d={kpi.spark}
                  strokeWidth="1.6"
                  vectorEffect="non-scaling-stroke"
                  style={{ fill: "none", stroke: "var(--c-up)" }}
                />
              </svg>
            ) : null}
            <small className={"num " + kpi.subCls}>{kpi.sub}</small>
          </div>
        ))}
      </div>

      <div className="lq-charts">
        <ChartCard
          vm={vm}
          title="Unlock Schedule (USDC)"
          info="Deposits unlocking each month"
          snap="liquidity-unlocks"
        >
          <ChartPlot chart={unlocks}>
            <HoverBand show={unlocks.hasBand} x={unlocks.bandX} width={unlocks.bandW} />
            {unlocks.bars.map((bar, i) => (
              <rect
                key={i}
                x={bar.x}
                y={bar.y}
                width={bar.w}
                height={bar.h}
                fillOpacity={bar.op}
                style={{ fill: bar.color }}
              />
            ))}
          </ChartPlot>
          <ChartLegend items={liq.legend} />
        </ChartCard>

        <ChartCard
          vm={vm}
          title="Deposits by Vault (USDC)"
          info="Total deposits in each vault over the last 90 days. Hover for the split by vault."
          sub="Last 90 days"
          snap="liquidity-deposits"
        >
          <ChartPlot chart={hist} yTicks={hist.yTicks}>
            {hist.areas.map((area, i) => (
              <g key={i}>
                <path d={area.d} fillOpacity="0.5" style={{ fill: area.color }} />
                <path
                  d={area.line}
                  strokeWidth="1.5"
                  vectorEffect="non-scaling-stroke"
                  style={{ fill: "none", stroke: area.color }}
                />
              </g>
            ))}
          </ChartPlot>
          <ChartLegend items={liq.legend} />
        </ChartCard>

        <ChartCard
          vm={vm}
          title="Entry APR by Day (%)"
          info="The APR a deposit locks in, by the day it entered"
          snap="liquidity-apr-curve"
          className="lq-full"
        >
          <ChartPlot chart={curve} yTicks={curve.yTicks}>
            {curve.lines.map((line, i) => (
              <path
                key={i}
                d={line.d}
                strokeWidth="2"
                vectorEffect="non-scaling-stroke"
                style={{ fill: "none", stroke: line.color }}
              />
            ))}
          </ChartPlot>
          <ChartLegend items={liq.legend} />
        </ChartCard>
      </div>

      <div className="lq-charts">
        <ChartCard
          vm={vm}
          title="Trader Returns"
          info="How many funded traders sit in each return range. Red is a loss, blue a profit. Accounts fail at a 10% loss"
          sub={dist.count + " funded accounts"}
          snap="liquidity-trader-returns"
        >
          <div className="lq-stats num">
            {dist.stats.map((stat, i) => (
              <div key={i}>
                <span className="h-i">
                  {stat.k}
                  <InfoTip tip={stat.info} />
                </span>
                <b className={stat.cls}>{stat.v}</b>
              </div>
            ))}
          </div>
          <ChartPlot chart={dist} yTicks={dist.yTicks}>
            <HoverBand show={dist.hasBand} x={dist.bandX} width={dist.bandW} />
            {dist.bars.map((bar, i) => (
              <rect
                key={i}
                x={bar.x}
                y={bar.y}
                width={bar.w}
                height={bar.h}
                rx="2"
                fillOpacity={bar.op}
                style={{ fill: bar.color }}
              />
            ))}
            <line
              x1={dist.zeroX}
              x2={dist.zeroX}
              y1="0"
              y2="262"
              strokeDasharray="4 4"
              vectorEffect="non-scaling-stroke"
              style={{ stroke: "var(--text-3)" }}
            />
          </ChartPlot>
        </ChartCard>

        <ChartCard
          vm={vm}
          title="Capital Funded (USD)"
          info="Total capital given to funded traders since the start of the year, by account size"
          sub={funded.totalYear + " across " + funded.countYear + " accounts in 12 months"}
          snap="liquidity-funded-over-time"
        >
          <ChartPlot chart={funded} yTicks={funded.yTicks} className="lq-plot-tall">
            {funded.areas.map((area, i) => (
              <g key={i}>
                <path d={area.d} fillOpacity="0.45" style={{ fill: area.color }} />
                <path
                  d={area.line}
                  strokeWidth="1.6"
                  vectorEffect="non-scaling-stroke"
                  style={{ fill: "none", stroke: area.color }}
                />
              </g>
            ))}
          </ChartPlot>
          <ChartLegend items={funded.legend} />
        </ChartCard>
      </div>

      <FundedTradersCard vm={vm} />
    </>
  );
}
