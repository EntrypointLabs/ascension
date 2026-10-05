import { Fragment } from "react";
import { parseStyle } from "@/lib/style";
import type { TerminalViewModel } from "@/terminal/types";

export function OrderBookPane({ vm }: { vm: TerminalViewModel }) {
  return (
    <aside className={vm.bookPaneCls} aria-label="Order book">
      {vm.bookShow ? (
        <>
          <div className="bk-tabs">
            <div className="tabs" role="tablist" aria-label="Book">
              {(vm.btabs || []).map((btab: any, i: any) => (
                <Fragment key={i}>
                  <button
                    type="button"
                    role="tab"
                    className={btab?.cls}
                    aria-selected={btab?.pressed}
                    onClick={btab?.pick}
                  >
                    {btab?.label}
                  </button>
                </Fragment>
              ))}
            </div>
            <button
              type="button"
              className="btn btn-icon sm pane-tools"
              aria-label="Collapse order book"
              onClick={vm.collapseBook}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
                style={{ fill: "none", stroke: "currentColor" }}
              >
                <path d="m14 6 6 6-6 6" />
                <path d="M4 4v16" />
              </svg>
            </button>
          </div>
          <div className="bk-ctrl">
            <span className="vtag2">
              <img className="logo xxs" src={vm.V?.logo} data-venue="1" alt="" />
              {vm.V?.name}
            </span>
            <span className="bk-ctrl-r">
              <button
                type="button"
                className="ctrl-btn num"
                aria-label="Price grouping, tap to change"
                onClick={vm.cycleTick}
              >
                {vm.tickText}
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                  style={{ fill: "none", stroke: "currentColor" }}
                >
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </button>
              <button
                type="button"
                className="ctrl-btn"
                aria-label="Size unit, tap to change"
                onClick={vm.toggleUnit}
              >
                {vm.unitLabel}
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                  style={{ fill: "none", stroke: "currentColor" }}
                >
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </button>
            </span>
          </div>
          {vm.showBookTab ? (
            <>
              <div className="book-head">
                <span>Price</span>
                <span>Size ({vm.unitLabel})</span>
                <span>Total ({vm.unitLabel})</span>
              </div>
              {(vm.asks || []).map((ask: any, i: any) => (
                <Fragment key={i}>
                  <div className="book-row ask num">
                    <div className="bar" style={parseStyle(`width: ${ask?.depth ?? ""}%`)} />
                    <span className="down">{ask?.price}</span>
                    <span>{ask?.size}</span>
                    <span>{ask?.total}</span>
                  </div>
                </Fragment>
              ))}
              <div className="book-spread num">
                <span>Spread</span>
                <span>{vm.spreadAbs}</span>
                <span>{vm.spreadPct}</span>
              </div>
              {(vm.bids || []).map((bid: any, i: any) => (
                <Fragment key={i}>
                  <div className="book-row bid num">
                    <div className="bar" style={parseStyle(`width: ${bid?.depth ?? ""}%`)} />
                    <span className="up">{bid?.price}</span>
                    <span>{bid?.size}</span>
                    <span>{bid?.total}</span>
                  </div>
                </Fragment>
              ))}
            </>
          ) : null}
          {vm.showTradesTab ? (
            <>
              <div className="book-head">
                <span>Price</span>
                <span>Size ({vm.unitLabel})</span>
                <span>Time</span>
              </div>
              {(vm.recentTrades || []).map((recentTrade: any, i: any) => (
                <Fragment key={i}>
                  <div className="book-row num">
                    <span className={recentTrade?.cls}>{recentTrade?.price}</span>
                    <span>{recentTrade?.size}</span>
                    <span className="muted">{recentTrade?.time}</span>
                  </div>
                </Fragment>
              ))}
            </>
          ) : null}
        </>
      ) : null}
      {vm.bookRail ? (
        <>
          <div className="rail">
            <button
              type="button"
              className="btn btn-icon sm"
              aria-label="Show order book"
              onClick={vm.expandBook}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
                style={{ fill: "none", stroke: "currentColor" }}
              >
                <path d="m10 6-6 6 6 6" />
                <path d="M20 4v16" />
              </svg>
            </button>
            <span className="rail-label">Order book</span>
          </div>
        </>
      ) : null}
    </aside>
  );
}
