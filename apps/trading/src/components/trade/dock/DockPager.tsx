import { Fragment } from "react";
import type { TerminalViewModel } from "@/terminal/types";

export function DockPager({ vm }: { vm: TerminalViewModel }) {
  return (
    <>
      {vm.pager?.empty ? (
        <>
          <div className="dock-empty">
            <b>{vm.pager?.emptyText}</b>
            <span>Turn off the market filter to see everything.</span>
          </div>
        </>
      ) : null}
      <div className="pager num">
        <div className="pg-left">
          <label className="pg-filter">
            <input type="checkbox" checked={!!vm.pager?.mktOn} onChange={vm.pager?.toggleMkt} />
            {vm.pager?.mktLabel}
          </label>
          <span className="pg-count">{vm.pager?.label}</span>
        </div>
        <nav className="pg-nav" aria-label="Pages">
          <button
            type="button"
            className="pg-arrow"
            aria-label="Previous page"
            disabled={!!vm.pager?.prevDis}
            onClick={vm.pager?.prev}
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
              style={{ fill: "none", stroke: "currentColor" }}
            >
              <path d="m15 18-6-6 6-6" />
            </svg>
          </button>
          {(vm.pager?.pages || []).map((page: any, i: any) => (
            <Fragment key={i}>
              {page != null && page.isGap ? (
                <>
                  <span className="pg-gap" aria-hidden="true">
                    ...
                  </span>
                </>
              ) : null}
              {page != null && page.isNum ? (
                <>
                  <button
                    type="button"
                    className={page?.cls}
                    aria-current={page?.cur}
                    aria-label={`Page ${page?.label ?? ""}`}
                    onClick={page?.pick}
                  >
                    {page?.label}
                  </button>
                </>
              ) : null}
            </Fragment>
          ))}
          <button
            type="button"
            className="pg-arrow"
            aria-label="Next page"
            disabled={!!vm.pager?.nextDis}
            onClick={vm.pager?.next}
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
              style={{ fill: "none", stroke: "currentColor" }}
            >
              <path d="m9 18 6-6-6-6" />
            </svg>
          </button>
        </nav>
        <div className="pg-size">
          <span>Rows</span>
          <div className="seg-sm" role="group" aria-label="Rows per page">
            {(vm.pager?.sizes || []).map((size: any, i: any) => (
              <Fragment key={i}>
                <button
                  type="button"
                  className={size?.cls}
                  aria-pressed={size?.pressed}
                  onClick={size?.pick}
                >
                  {size?.label}
                </button>
              </Fragment>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
