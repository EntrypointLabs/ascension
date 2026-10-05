import { Fragment } from "react";
import type { TerminalViewModel } from "@/terminal/types";

export function ExchangesTableCard({ vm }: { vm: TerminalViewModel }) {
  return (
    <section className="mw-card snap-card mw-tablecard" data-snap="venues-table">
      <div className="mw-card-h">
        <div>
          <h2>All Venues</h2>
          <p>{vm.mwTableSub?.venues}</p>
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
      <div className="mw-card-tools">
        <div className="wfilter">
          <div className="dd">
            <button
              type="button"
              className={vm.mw?.dd?.xtype?.btnCls}
              aria-haspopup="listbox"
              aria-expanded={vm.mw?.dd?.xtype?.openStr}
              onClick={vm.mw?.dd?.xtype?.toggle}
            >
              <span className="dd-l">{vm.mw?.dd?.xtype?.label}</span>
              <b>{vm.mw?.dd?.xtype?.cur}</b>
              <svg
                className="dd-chev"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
                style={{ fill: "none", stroke: "currentColor" }}
              >
                <path d="m6 9 6 6 6-6" />
              </svg>
            </button>
            {vm.mw?.dd?.xtype?.open ? (
              <>
                <button
                  type="button"
                  className="dd-scrim"
                  aria-label="Close"
                  onClick={vm.mw?.dd?.xtype?.close}
                />
                <div className="dd-menu" role="listbox" aria-label={vm.mw?.dd?.xtype?.label}>
                  {(vm.mw?.dd?.xtype?.opts || []).map((opt: any, i: any) => (
                    <Fragment key={i}>
                      <button
                        type="button"
                        role="option"
                        aria-selected={opt?.sel}
                        className={opt?.cls}
                        onClick={opt?.pick}
                      >
                        {opt != null && opt.hasLogo ? (
                          <>
                            <img className="logo" src={opt?.logo} data-venue="1" alt="" />
                          </>
                        ) : null}
                        <span>{opt?.label}</span>
                        <em className="num">{opt?.count}</em>
                        <svg
                          className="dd-tick"
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          strokeWidth="2.4"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          aria-hidden="true"
                          style={{ fill: "none", stroke: "currentColor" }}
                        >
                          <path d="m5 12 5 5 9-10" />
                        </svg>
                      </button>
                    </Fragment>
                  ))}
                </div>
              </>
            ) : null}
          </div>
          <label className="search wsearch">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              strokeWidth="1.8"
              strokeLinecap="round"
              aria-hidden="true"
              style={{ fill: "none", stroke: "currentColor" }}
            >
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-3.5-3.5" />
            </svg>
            <input
              type="text"
              placeholder="Search exchanges"
              aria-label="Search exchanges"
              value={vm.wq ?? ""}
              onChange={vm.onWq}
            />
          </label>
        </div>
      </div>
      <div className="wt wt-ex num" role="table" aria-label="Exchanges">
        <div className="wt-row wt-head" role="row">
          <div role="columnheader">
            <span className="rk">#</span>Exchange
          </div>
          <div role="columnheader">Chain</div>
          <div role="columnheader">Markets</div>
          <div role="columnheader">24h Volume</div>
          <div role="columnheader">Open Interest</div>
          <div role="columnheader">Top by Volume</div>
          <div role="columnheader">Top by OI</div>
          <div role="columnheader">Funding Range, APR</div>
          <div role="columnheader">Feed</div>
          <div role="columnheader">Updated</div>
        </div>
        {(vm.exListP || []).map((exListPItem: any, i: any) => (
          <Fragment key={i}>
            <div className="wt-group" role="rowgroup">
              <div className="wt-row" role="row">
                <div role="cell">
                  <span className="xc-name">
                    <span className="rk num">{exListPItem?.num}</span>
                    <img className="logo sm" src={exListPItem?.logo} data-venue="1" alt="" />
                    <span className="wname">
                      <b>
                        {exListPItem?.name}
                        <span className="lev xtype">{exListPItem?.type}</span>
                      </b>
                      <small className="mono">{exListPItem?.url}</small>
                    </span>
                  </span>
                </div>
                <div role="cell">{exListPItem?.chain}</div>
                <div role="cell">{exListPItem?.markets}</div>
                <div role="cell">{exListPItem?.vol}</div>
                <div role="cell">{exListPItem?.oi}</div>
                <div role="cell">
                  <span className="xcell r">
                    <img className="logo xxs" src={exListPItem?.topVolLogo} alt="" />
                    {exListPItem?.topVol}
                  </span>
                </div>
                <div role="cell">
                  <span className="xcell r">
                    <img className="logo xxs" src={exListPItem?.topOiLogo} alt="" />
                    {exListPItem?.topOi}
                  </span>
                </div>
                <div role="cell">
                  <span className="down">{exListPItem?.fMin}</span> to {exListPItem?.fMax}
                </div>
                <div role="cell">
                  <span className="feedc r">
                    <span className={exListPItem?.dotCls} />
                    {exListPItem?.status},{" "}
                    <span className={exListPItem?.latCls}>{exListPItem?.lat}</span>
                  </span>
                </div>
                <div role="cell" className="muted">
                  {exListPItem?.updated}
                </div>
              </div>
            </div>
          </Fragment>
        ))}
        {vm.noEx ? (
          <>
            <div className="dock-empty">
              <b>No exchanges match</b>
              <span>Try Binance, DEX or Arbitrum.</span>
            </div>
          </>
        ) : null}
      </div>
      <div className="wlist">
        {(vm.exListP || []).map((exListPItem: any, i: any) => (
          <Fragment key={i}>
            <div className="wrow-m xrow-m">
              <img className="logo" src={exListPItem?.logo} data-venue="1" alt="" />
              <span className="wname">
                <b>
                  {exListPItem?.name}
                  <span className="lev xtype">{exListPItem?.type}</span>
                </b>
                <small className="num">
                  {exListPItem?.chain}, {exListPItem?.markets} markets
                </small>
              </span>
              <span className="mk-price num">
                <span>{exListPItem?.vol}</span>
                <small className="feedc">
                  <span className={exListPItem?.dotCls} />
                  {exListPItem?.lat}
                </small>
              </span>
            </div>
          </Fragment>
        ))}
      </div>
      <div className="pgx num">
        <span className="pgx-t">{vm.exPager?.text}</span>
        <span className="pgx-c">
          <button
            type="button"
            className="pgx-a"
            aria-label="Previous page"
            disabled={!!vm.exPager?.prevDis}
            onClick={vm.exPager?.prev}
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
          {(vm.exPager?.nums || []).map((num: any, i: any) => (
            <Fragment key={i}>
              <button type="button" className={num?.cls} aria-current={num?.cur} onClick={num?.go}>
                {num?.label}
              </button>
            </Fragment>
          ))}
          <button
            type="button"
            className="pgx-a"
            aria-label="Next page"
            disabled={!!vm.exPager?.nextDis}
            onClick={vm.exPager?.next}
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
  );
}
