import { Fragment } from "react";
import { InfoTip } from "@/components/common/InfoTip";
import { SnapshotButton } from "@/components/common/SnapshotButton";
import { MarketsTable } from "@/components/watch/MarketsTable";
import { parseStyle } from "@/lib/style";
import type { TerminalViewModel } from "@/terminal/types";

export function MarketsTableCard({ vm }: { vm: TerminalViewModel }) {
  return (
    <section className="mw-card snap-card mw-tablecard" data-snap="markets-table">
      <div className="mw-card-h">
        <div>
          <h2 className="h-i">
            All Markets
            <InfoTip tip="Every perpetual market across venues. Sort by any column and tap a row for its details." />
          </h2>
          <p>{vm.mwTableSub?.markets}</p>
        </div>
        <SnapshotButton onClick={vm.mw?.snap} />
      </div>
      <div className="mw-card-tools">
        <div className="wfilter">
          <div className="dd">
            <button
              type="button"
              className={vm.mw?.dd?.mcat?.btnCls}
              aria-haspopup="listbox"
              aria-expanded={vm.mw?.dd?.mcat?.openStr}
              onClick={vm.mw?.dd?.mcat?.toggle}
            >
              <span className="dd-l">{vm.mw?.dd?.mcat?.label}</span>
              <b>{vm.mw?.dd?.mcat?.cur}</b>
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
            {vm.mw?.dd?.mcat?.open ? (
              <>
                <button
                  type="button"
                  className="dd-scrim"
                  aria-label="Close"
                  onClick={vm.mw?.dd?.mcat?.close}
                />
                <div className="dd-menu" role="listbox" aria-label={vm.mw?.dd?.mcat?.label}>
                  {(vm.mw?.dd?.mcat?.opts || []).map((opt: any, i: any) => (
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
              placeholder="Search markets"
              aria-label="Search markets"
              value={vm.wq ?? ""}
              onChange={vm.onWq}
            />
          </label>
        </div>
      </div>
      <MarketsTable vm={vm} />
      <div className="wlist pc-list">
        {(vm.wrowsP || []).map((wrowsPItem: any, i: any) => (
          <Fragment key={i}>
            <button type="button" className="wrow-m" onClick={wrowsPItem?.toggle}>
              <span className="av">
                <img className="logo" src={wrowsPItem?.logo} alt="" />
                <span className="av-badges">
                  {(wrowsPItem?.venuesM || []).map((venuesMItem: any, i2: any) => (
                    <Fragment key={i2}>
                      <img
                        className="av-badge"
                        src={venuesMItem?.logo}
                        data-venue="1"
                        alt={venuesMItem?.name}
                        title={venuesMItem?.name}
                      />
                    </Fragment>
                  ))}
                </span>
              </span>
              <span className="wname">
                <b className="hm-t2">
                  <span className="hm-tk">{wrowsPItem?.sym}-PERP</span>
                  <span className="lev">{wrowsPItem?.lev}</span>
                </b>
                <small className="num">
                  <span>{wrowsPItem?.vol} Vol</span>
                </small>
              </span>
              <svg
                className="spark"
                viewBox="0 0 100 32"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <path
                  d={wrowsPItem?.spark}
                  strokeWidth="1.6"
                  strokeLinejoin="round"
                  vectorEffect="non-scaling-stroke"
                  style={parseStyle(`fill: none; stroke: ${wrowsPItem?.sparkColor ?? ""}`)}
                />
              </svg>
              <span className="mk-price num">
                <span>${wrowsPItem?.price}</span>
                <small className={wrowsPItem?.dir}>{wrowsPItem?.chgText}</small>
              </span>
            </button>
          </Fragment>
        ))}
      </div>
      <div className="pgx num">
        <span className="pgx-t">{vm.wrowsPager?.text}</span>
        <span className="pgx-c">
          <button
            type="button"
            className="pgx-a"
            aria-label="Previous page"
            disabled={!!vm.wrowsPager?.prevDis}
            onClick={vm.wrowsPager?.prev}
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
          {(vm.wrowsPager?.nums || []).map((num: any, i: any) => (
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
            disabled={!!vm.wrowsPager?.nextDis}
            onClick={vm.wrowsPager?.next}
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
