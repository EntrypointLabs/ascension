import { Fragment } from "react";
import { parseStyle } from "@/lib/style";
import type { TerminalViewModel } from "@/terminal/types";

export function ExchangeShareCard({ vm }: { vm: TerminalViewModel }) {
  return (
    <section className="mw-card snap-card lg" data-snap="league-table">
      <div className="mw-card-h">
        <div>
          <h2>League Table</h2>
          <p>Ranked by open interest</p>
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
      <div className="lg-tabs" role="tablist" aria-label="League">
        {(vm.mw?.league?.tabs || []).map((tab: any, i: any) => (
          <Fragment key={i}>
            <button
              type="button"
              role="tab"
              className={tab?.cls}
              aria-selected={tab?.pressed}
              onClick={tab?.pick}
            >
              {tab?.label}
            </button>
          </Fragment>
        ))}
      </div>
      <div className="lg-table num" role="table">
        <div className="lg-tr lg-th" role="row">
          <span>#</span>
          <span>Name</span>
          {(vm.mw?.league?.heads || []).map((head: any, i: any) => (
            <Fragment key={i}>
              <button type="button" className={head?.cls} onClick={head?.pick}>
                {head?.label}
              </button>
            </Fragment>
          ))}
        </div>
        {(vm.mw?.league?.rows || []).map((row: any, i: any) => (
          <Fragment key={i}>
            <button type="button" className="lg-tr" role="row" onClick={row?.open}>
              <span className="lg-rk">{row?.rank}</span>
              <span className="lg-nm">
                {row != null && row.hasLogo ? (
                  <>
                    <img className="logo" src={row?.logo} data-venue={row?.venue} alt="" />
                  </>
                ) : null}
                {row != null && row.hasDot ? (
                  <>
                    <i style={parseStyle(`background: ${row?.dot ?? ""}`)} />
                  </>
                ) : null}
                <b>{row?.name}</b>
              </span>
              <span>{row?.count}</span>
              <span>{row?.oi}</span>
              <span>{row?.vol}</span>
              <span className={row?.d30Cls}>{row?.d30}</span>
              <span className="lg-sh">
                <em>{row?.share}</em>
                <i>
                  <b style={parseStyle(`width: ${row?.shareW ?? ""}%`)} />
                </i>
              </span>
            </button>
          </Fragment>
        ))}
      </div>
      <div className="pgx num">
        <span className="pgx-t">{vm.mw?.league?.pager?.text}</span>
        <span className="pgx-c">
          <button
            type="button"
            className="pgx-a"
            aria-label="Previous page"
            disabled={!!vm.mw?.league?.pager?.prevDis}
            onClick={vm.mw?.league?.pager?.prev}
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
          {(vm.mw?.league?.pager?.nums || []).map((num: any, i: any) => (
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
            disabled={!!vm.mw?.league?.pager?.nextDis}
            onClick={vm.mw?.league?.pager?.next}
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
