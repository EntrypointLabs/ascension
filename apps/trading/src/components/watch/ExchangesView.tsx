import { Fragment } from "react";
import { InfoTip } from "@/components/common/InfoTip";
import { SnapshotButton } from "@/components/common/SnapshotButton";
import { ExchangeShareCard } from "@/components/watch/ExchangeShareCard";
import { ExchangesTableCard } from "@/components/watch/ExchangesTableCard";
import { WeeklyVolumeCard } from "@/components/watch/WeeklyVolumeCard";
import type { ExchangeCard } from "@/components/watch/types";
import { parseStyle } from "@/lib/style";
import type { TerminalViewModel } from "@/terminal/types";

export function ExchangesView({ vm }: { vm: TerminalViewModel }) {
  const cards: ExchangeCard[] = vm.mw?.exCards || [];
  return (
    <>
      <div className="mw-two">
        <ExchangeShareCard vm={vm} />
        <WeeklyVolumeCard vm={vm} />
      </div>
      <h3 className="mw-h3 h-i">
        Venue Insights
        <InfoTip tip="A live snapshot of each venue: open interest trend, share of the market, and trading activity" />
      </h3>
      <div className="ex-cards">
        {cards.map((exCard, i) => (
          <Fragment key={i}>
            <article className="exc exc2 snap-card" data-snap="venue">
              <header className="ex2-top">
                <img className="logo" src={exCard?.logo} data-venue="1" alt="" />
                <div className="ex2-id">
                  <b>
                    {exCard?.name}
                    <span className="ex2-type">{exCard?.type}</span>
                  </b>
                  <small className="num">{exCard?.markets} markets</small>
                </div>
                <span className={`${exCard?.latChip ?? ""} num`}>
                  <i aria-hidden="true" />
                  {exCard?.latLabel}
                </span>
                <SnapshotButton onClick={vm.mw?.snap} />
              </header>
              <p className="ex2-lead">{exCard?.headline}</p>
              <div className="ex2-oi">
                <div>
                  <span className="ex2-k">Open Interest</span>
                  <b className="num">{exCard?.oi}</b>
                  <span className={`num ex2-chg ${exCard?.chgCls ?? ""}`}>
                    {exCard?.chg} in 30 days
                  </span>
                </div>
                <svg
                  className="ex2-spark"
                  viewBox="0 0 100 28"
                  preserveAspectRatio="none"
                  aria-hidden="true"
                >
                  <path
                    d={exCard?.area}
                    fillOpacity="0.12"
                    style={parseStyle(`fill: ${exCard?.sparkCol ?? ""}`)}
                  />
                  <path
                    d={exCard?.spark}
                    strokeWidth="1.8"
                    vectorEffect="non-scaling-stroke"
                    style={parseStyle(`fill: none; stroke: ${exCard?.sparkCol ?? ""}`)}
                  />
                </svg>
              </div>
              <div className="ex2-share">
                <div className="ex2-share-t">
                  <span>
                    <b className="num">{exCard?.share}</b> of all open interest
                  </span>
                  <span className="num ex2-rank">{exCard?.rank}</span>
                </div>
                <span className="exc-bar">
                  <i
                    style={parseStyle(
                      `width: ${exCard?.shareW ?? ""}%; background: ${exCard?.color ?? ""}`,
                    )}
                  />
                </span>
              </div>
              <dl className="ex2-grid num">
                <div>
                  <dt className="dt-i">
                    24h Volume
                    <InfoTip tip="Traded in the last 24 hours" />
                  </dt>
                  <dd>{exCard?.vol}</dd>
                </div>
                <div>
                  <dt className="dt-i">
                    Turnover
                    <InfoTip tip="24h volume divided by open interest" />
                  </dt>
                  <dd>{exCard?.turn}</dd>
                </div>
                <div>
                  <dt className="dt-i">
                    Long / Short
                    <InfoTip tip="Ratio of long to short open interest. Above 1 means more traders are long" />
                  </dt>
                  <dd className={exCard?.lsCls}>{exCard?.ls}</dd>
                </div>
                <div>
                  <dt className="dt-i">
                    Funding, APR (%)
                    <InfoTip tip="Positive: longs pay shorts. Negative: shorts pay longs" />
                  </dt>
                  <dd className={exCard?.fundCls}>{exCard?.funding}</dd>
                </div>
                <div>
                  <dt className="dt-i">
                    Liquidations, 24h
                    <InfoTip tip="Positions closed by force in the last 24 hours" />
                  </dt>
                  <dd>{exCard?.liq}</dd>
                </div>
                <div>
                  <dt className="dt-i">
                    Top Market
                    <InfoTip tip="The market with the most open interest on this venue" />
                  </dt>
                  <dd className="exc-top-m">
                    <img className="logo" src={exCard?.topLogo} alt="" />
                    {exCard?.top}
                  </dd>
                </div>
              </dl>
            </article>
          </Fragment>
        ))}
      </div>
      <ExchangesTableCard vm={vm} />
    </>
  );
}
