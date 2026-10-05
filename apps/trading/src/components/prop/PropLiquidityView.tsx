import { Fragment } from "react";
import { parseStyle } from "@/lib/style";
import type { TerminalViewModel } from "@/terminal/types";

export function PropLiquidityView({ vm }: { vm: TerminalViewModel }) {
  return (
    <>
      <div className="mw-kpis pp-kpis">
        {(vm.prop2?.kpis || []).map((kpi: any, i: any) => (
          <Fragment key={i}>
            <div className="mw-kpi">
              <span className="kp-l">{kpi?.label}</span>
              <b className="num">{kpi?.value}</b>
              <small className="num">{kpi?.sub}</small>
            </div>
          </Fragment>
        ))}
      </div>
      <div className="pp-grid2">
        <section className="mw-card snap-card" data-snap="vault-share-price">
          <div className="mw-card-h">
            <div>
              <h2>Vault Share Price</h2>
              <p>Last 90 days</p>
            </div>
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
              <span>Snapshot</span>
            </button>
          </div>
          <div className="pp-chart">
            <span className="pp-y num top">{vm.prop2?.hi}</span>
            <span className="pp-y num bot">{vm.prop2?.lo}</span>
            <div className="wm" aria-hidden="true">
              <svg viewBox="-6 -6 112 112">
                <path
                  fillRule="evenodd"
                  d="M18.7 0L13 13L0 18.7L0 37L25 48L25 52L0 63L0 81.3L13 87L18.7 100L37 100L48 75L52 75L63 100L81.3 100L87 87L100 81.3L100 63L75 52L75 48L100 37L100 18.7L87 13L81.3 0L63 0L52 25L48 25L37 0ZM28 28L28 72L72 72L72 28Z"
                />
              </svg>
              <span>OpenFutures</span>
            </div>
            <svg viewBox="0 0 1000 280" preserveAspectRatio="none" aria-hidden="true">
              <path d={vm.prop2?.lineArea} className="pp-area" />
              <path d={vm.prop2?.line} className="pp-ln" vectorEffect="non-scaling-stroke" />
            </svg>
          </div>
        </section>
        <section className="mw-card">
          <div className="mw-card-h">
            <div>
              <h2>Your Position</h2>
              <p>{vm.prop2?.myShares}</p>
            </div>
          </div>
          <div className="pp-eq">
            <span>Value</span>
            <b className="num">{vm.prop2?.myValue}</b>
            <em className={`num ${vm.prop2?.myEarnCls ?? ""}`}>{vm.prop2?.myEarned} earned</em>
          </div>
          {vm.prop2?.hasPending ? (
            <>
              <p className="pp-note">{vm.prop2?.pending}</p>
            </>
          ) : null}
          <div className="pp-cta two">
            <button type="button" className="ob-btn primary" onClick={vm.prop2?.openDep}>
              Deposit
            </button>
            <button
              type="button"
              className="ob-btn ghost"
              disabled={!!vm.prop2?.noShares}
              onClick={vm.prop2?.openWd}
            >
              Withdraw
            </button>
          </div>
          {vm.prop2?.hasLog ? (
            <>
              <div className="cl-log">
                {(vm.prop2?.log || []).map((logItem: any, i: any) => (
                  <Fragment key={i}>
                    <div className={logItem?.cls}>
                      <span>
                        <b>{logItem?.text}</b>
                        <small>{logItem?.t}</small>
                      </span>
                      <b className="num">{logItem?.amt}</b>
                    </div>
                  </Fragment>
                ))}
              </div>
            </>
          ) : null}
        </section>
        <section className="mw-card">
          <div className="mw-card-h">
            <div>
              <h2>Where Yield Comes From</h2>
              <p>Last 30 days</p>
            </div>
          </div>
          <div className="pp-rows">
            {(vm.prop2?.sources || []).map((source: any, i: any) => (
              <Fragment key={i}>
                <div className="obs-row">
                  <span>{source?.k}</span>
                  <b className={`num ${source?.cls ?? ""}`}>{source?.v}</b>
                </div>
              </Fragment>
            ))}
          </div>
        </section>
        <section className="mw-card">
          <div className="mw-card-h">
            <div>
              <h2>Risk Controls</h2>
            </div>
          </div>
          <div className="pp-rows">
            {(vm.prop2?.risk || []).map((riskItem: any, i: any) => (
              <Fragment key={i}>
                <div className="obs-row">
                  <span>{riskItem?.k}</span>
                  <b>{riskItem?.v}</b>
                </div>
              </Fragment>
            ))}
          </div>
        </section>
      </div>
      <section className="mw-card snap-card mw-tablecard" data-snap="vault-traders">
        <div className="mw-card-h">
          <div>
            <h2>Funded Traders</h2>
            <p>Accounts trading vault capital</p>
          </div>
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
            <span>Snapshot</span>
          </button>
        </div>
        <div className="wfilter">
          <div className="mwc-seg" role="group" aria-label="Sort">
            {(vm.prop2?.sorts || []).map((sort: any, i: any) => (
              <Fragment key={i}>
                <button type="button" className={sort?.cls} onClick={sort?.pick}>
                  {sort?.label}
                </button>
              </Fragment>
            ))}
          </div>
        </div>
        <div className="pv-table num" role="table">
          <div className="pv-tr pv-th" role="row">
            <span>
              <span className="rk">#</span>Trader
            </span>
            <span>Account</span>
            <span>PnL</span>
            <span>Drawdown used</span>
            <span>Days</span>
            <span>Status</span>
          </div>
          {(vm.prop2?.traders || []).map((trader: any, i: any) => (
            <Fragment key={i}>
              <div className={trader?.rowCls} role="row">
                <span className="pv-name">
                  <span className="rk num">{trader?.num}</span>
                  <b>{trader?.name}</b>
                </span>
                <span>{trader?.size}</span>
                <span className={trader?.pnlCls}>{trader?.pnl}</span>
                <span className="pv-dd">
                  <i className={trader?.ddCls}>
                    <b style={parseStyle(`width: ${trader?.ddW ?? ""}%`)} />
                  </i>
                  <em>{trader?.dd}</em>
                </span>
                <span>{trader?.days}</span>
                <span className={trader?.stCls}>{trader?.st}</span>
              </div>
            </Fragment>
          ))}
        </div>
        <div className="pgx num">
          <span className="pgx-t">{vm.prop2?.tradersPager?.text}</span>
          <span className="pgx-c">
            <button
              type="button"
              className="pgx-a"
              aria-label="Previous page"
              disabled={!!vm.prop2?.tradersPager?.prevDis}
              onClick={vm.prop2?.tradersPager?.prev}
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                strokeWidth="2"
                strokeLinecap="round"
                aria-hidden="true"
                style={{ fill: "none", stroke: "currentColor" }}
              >
                <path d="m15 18-6-6 6-6" />
              </svg>
            </button>
            {(vm.prop2?.tradersPager?.nums || []).map((num: any, i: any) => (
              <Fragment key={i}>
                <button
                  type="button"
                  className={num?.cls}
                  aria-current={num?.cur}
                  onClick={num?.go}
                >
                  {num?.label}
                </button>
              </Fragment>
            ))}
            <button
              type="button"
              className="pgx-a"
              aria-label="Next page"
              disabled={!!vm.prop2?.tradersPager?.nextDis}
              onClick={vm.prop2?.tradersPager?.next}
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                strokeWidth="2"
                strokeLinecap="round"
                aria-hidden="true"
                style={{ fill: "none", stroke: "currentColor" }}
              >
                <path d="m9 18 6-6-6-6" />
              </svg>
            </button>
          </span>
        </div>
      </section>
      {vm.prop2?.sheetOpen ? (
        <>
          <button
            type="button"
            className="fd-scrim"
            aria-label="Close"
            onClick={vm.prop2?.closeSheet}
          />
          <div className="fd-sheet cr-sheet" role="dialog" aria-label={vm.prop2?.sheetTitle}>
            <span className="hm-grab" aria-hidden="true" />
            <div className="fd-head">
              <h2>{vm.prop2?.sheetTitle}</h2>
              <button
                type="button"
                className="fd-hbtn fd-x"
                aria-label="Close"
                onClick={vm.prop2?.closeSheet}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  aria-hidden="true"
                  style={{ fill: "none", stroke: "currentColor" }}
                >
                  <path d="M6 6l12 12M18 6 6 18" />
                </svg>
              </button>
            </div>
            <label className="fd-lbl" htmlFor="lp-amt">
              Amount, USDC
            </label>
            <div className="fd-amt">
              <input
                id="lp-amt"
                className="fd-input num"
                type="text"
                inputMode="decimal"
                placeholder="0.00"
                value={vm.prop2?.amt ?? ""}
                onChange={vm.prop2?.onAmt}
              />
            </div>
            <div className="cr-chips">
              {(vm.prop2?.quick || []).map((quickItem: any, i: any) => (
                <Fragment key={i}>
                  <button type="button" className="wk-o" onClick={quickItem?.pick}>
                    {quickItem?.label}
                  </button>
                </Fragment>
              ))}
              <span className="cr-max num">{vm.prop2?.sheetMax}</span>
            </div>
            <button
              type="button"
              className="cta fd-cta"
              disabled={!!vm.prop2?.sheetDis}
              onClick={vm.prop2?.submit}
            >
              {vm.prop2?.sheetCta}
            </button>
          </div>
        </>
      ) : null}
    </>
  );
}
