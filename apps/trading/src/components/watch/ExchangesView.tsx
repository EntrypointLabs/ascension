import { Fragment } from "react";
import { ExchangeShareCard } from "@/components/watch/ExchangeShareCard";
import { ExchangesTableCard } from "@/components/watch/ExchangesTableCard";
import { WeeklyVolumeCard } from "@/components/watch/WeeklyVolumeCard";
import { parseStyle } from "@/lib/style";
import type { TerminalViewModel } from "@/terminal/types";

export function ExchangesView({ vm }: { vm: TerminalViewModel }) {
  return (
    <>
      <div className="mw-two">
        <ExchangeShareCard vm={vm} />
        <WeeklyVolumeCard vm={vm} />
      </div>
      <h3 className="mw-h3">Venue Insights</h3>
      <div className="ex-cards">
        {(vm.mw?.exCards || []).map((exCard: any, i: any) => {
          return (
            <Fragment key={i}>
              <article className="exc snap-card" data-snap="venue">
                <div className="exc-top">
                  <img className="logo" src={exCard?.logo} data-venue="1" alt="" />
                  <div>
                    <b>{exCard?.name}</b>
                    <small>
                      {exCard?.type}, {exCard?.markets} markets
                    </small>
                  </div>
                  <span className={`exc-lat num ${exCard?.latCls ?? ""}`}>{exCard?.lat}</span>
                  <button
                    type="button"
                    className="snap-btn"
                    aria-label="Save a 4K snapshot"
                    title="Save a 4K snapshot"
                    onClick={vm.mw?.snap}
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
                      <path d="M4 8h3l2-3h6l2 3h3v11H4z" />
                      <rect x="9" y="10" width="6" height="6" rx="1" />
                    </svg>
                  </button>
                </div>
                <div className="exc-oi">
                  <span>Open Interest</span>
                  <b className="num">{exCard?.oi}</b>
                  <em className={`num ${exCard?.chgCls ?? ""}`}>{exCard?.chg} 30d</em>
                  <svg
                    className="exc-spark"
                    viewBox="0 0 100 28"
                    preserveAspectRatio="none"
                    aria-hidden="true"
                  >
                    <path
                      d={exCard?.spark}
                      strokeWidth="1.6"
                      vectorEffect="non-scaling-stroke"
                      style={parseStyle(`fill: none; stroke: ${exCard?.sparkCol ?? ""}`)}
                    />
                  </svg>
                </div>
                <div className="exc-share">
                  <span>Share of All OI</span>
                  <span className="num">{exCard?.share}</span>
                  <span className="exc-bar">
                    <i
                      style={parseStyle(
                        `width: ${exCard?.shareW ?? ""}%; background: ${exCard?.color ?? ""}`,
                      )}
                    />
                  </span>
                </div>
                <dl className="exc-grid num">
                  <div>
                    <dt>24h Volume</dt>
                    <dd>{exCard?.vol}</dd>
                  </div>
                  <div>
                    <dt>Turnover</dt>
                    <dd>{exCard?.turn}</dd>
                  </div>
                  <div>
                    <dt>Long / Short</dt>
                    <dd className={exCard?.lsCls}>{exCard?.ls}</dd>
                  </div>
                  <div>
                    <dt>Funding, APR</dt>
                    <dd className={exCard?.fundCls}>{exCard?.funding}</dd>
                  </div>
                  <div>
                    <dt>Liquidations</dt>
                    <dd>{exCard?.liq}</dd>
                  </div>
                  <div>
                    <dt>Top Market</dt>
                    <dd className="exc-top-m">
                      <img className="logo" src={exCard?.topLogo} alt="" />
                      {exCard?.top}
                    </dd>
                  </div>
                </dl>
              </article>
            </Fragment>
          );
        })}
      </div>
      <ExchangesTableCard vm={vm} />
    </>
  );
}
