import { Fragment } from "react";
import { parseStyle } from "@/lib/style";
import type { TerminalViewModel } from "@/terminal/types";

export function MarketsColumn({ vm }: { vm: TerminalViewModel }) {
  return (
    <aside className="col-markets" aria-label="Markets">
      <div className="mk-top">
        <button
          type="button"
          className="btn btn-icon sm pane-tools"
          aria-label="Close markets"
          onClick={vm.closeAll}
        >
          <svg
            width="18"
            height="18"
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
      <label className="search">
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
          placeholder="Search markets"
          aria-label="Search markets"
          value={vm.query ?? ""}
          onChange={vm.onQuery}
        />
      </label>
      <div className="pills" role="group" aria-label="Filter markets">
        {(vm.filters || []).map((filter: any, i: any) => (
          <Fragment key={i}>
            <button
              type="button"
              className={filter?.cls}
              aria-pressed={filter?.pressed}
              onClick={filter?.pick}
            >
              {filter?.label}
            </button>
          </Fragment>
        ))}
      </div>
      <div className="mk-list">
        {(vm.rows || []).map((row: any, i: any) => (
          <Fragment key={i}>
            <button type="button" className={`mk-row ${row?.activeCls ?? ""}`} onClick={row?.pick}>
              <img className="logo" src={row?.logo} alt="" />
              <span className="mk-name">
                <b>
                  {row?.sym}
                  <span className="lev">{row?.lev}</span>
                </b>
                <span>{row?.name}</span>
              </span>
              <svg
                className="spark"
                viewBox="0 0 100 32"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <path
                  d={row?.spark}
                  strokeWidth="1.6"
                  strokeLinejoin="round"
                  vectorEffect="non-scaling-stroke"
                  style={parseStyle(`fill: none; stroke: ${row?.sparkColor ?? ""}`)}
                />
              </svg>
              <span className="mk-price num">
                <span>{row?.priceText}</span>
                <small className={row?.dir}>{row?.chgText}</small>
              </span>
            </button>
          </Fragment>
        ))}
        {vm.noRows ? (
          <>
            <p className="mk-empty">No markets match that search. Try a ticker like ETH or SOL.</p>
          </>
        ) : null}
      </div>
    </aside>
  );
}
