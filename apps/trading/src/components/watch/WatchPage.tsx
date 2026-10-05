import { Fragment } from "react";
import { ExchangesView } from "@/components/watch/ExchangesView";
import { FundingView } from "@/components/watch/FundingView";
import { MarketsView } from "@/components/watch/MarketsView";
import { WatchChartCard } from "@/components/watch/WatchChartCard";
import { parseStyle } from "@/lib/style";
import type { TerminalViewModel } from "@/terminal/types";

export function WatchPage({ vm }: { vm: TerminalViewModel }) {
  return (
    <section className="page page-watch" aria-label="Market Watch">
      <div className="page-inner">
        <header className="page-head wh">
          <div>
            <h1>Market Watch</h1>
            <p className="feed num">
              <span className={vm.feed?.dotCls} />
              {vm.feed?.text}
            </p>
          </div>
          <div className="wh-r">
            <div className="seg-sm wviews" role="tablist" aria-label="View">
              {(vm.wviews || []).map((wview: any, i: any) => (
                <Fragment key={i}>
                  <button
                    type="button"
                    role="tab"
                    className={wview?.cls}
                    aria-selected={wview?.pressed}
                    onClick={wview?.pick}
                  >
                    {wview?.label}
                  </button>
                </Fragment>
              ))}
            </div>
          </div>
        </header>
        <div className="mw-sticky" role="tablist" aria-label="View">
          {(vm.wviews || []).map((wview: any, i: any) => (
            <Fragment key={i}>
              <button
                type="button"
                role="tab"
                className={wview?.cls}
                aria-selected={wview?.pressed}
                onClick={wview?.pick}
              >
                {wview?.label}
              </button>
            </Fragment>
          ))}
        </div>
        <div className="mw-kpis">
          {(vm.mw?.kpis || []).map((kpi: any, i: any) => (
            <Fragment key={i}>
              <div className="mw-kpi">
                <span className="kp-l">
                  {kpi?.label}
                  <span className="kp-help" tabIndex={0} role="note" aria-label={kpi?.help}>
                    ?<span className="kp-tip">{kpi?.help}</span>
                  </span>
                </span>
                <b className="num">{kpi?.value}</b>
                {kpi != null && kpi.hasSpark ? (
                  <>
                    <svg
                      className="kp-spark"
                      viewBox="0 0 100 24"
                      preserveAspectRatio="none"
                      aria-hidden="true"
                    >
                      <path
                        d={kpi?.spark}
                        strokeWidth="1.6"
                        vectorEffect="non-scaling-stroke"
                        style={parseStyle(`fill: none; stroke: ${kpi?.sparkCol ?? ""}`)}
                      />
                    </svg>
                  </>
                ) : null}
                <small className="num">
                  {kpi != null && kpi.hasChg ? (
                    <>
                      <em className={kpi?.chgCls}>{kpi?.chg}</em>{" "}
                    </>
                  ) : null}
                  {kpi?.sub}
                </small>
              </div>
            </Fragment>
          ))}
        </div>
        <WatchChartCard vm={vm} />
        {vm.viewMarkets ? <MarketsView vm={vm} /> : null}
        {vm.viewExchanges ? <ExchangesView vm={vm} /> : null}
        {vm.viewFunding ? <FundingView vm={vm} /> : null}
      </div>
    </section>
  );
}
