import { Fragment } from "react";
import { InfoTip } from "@/components/common/InfoTip";
import { SnapshotButton } from "@/components/common/SnapshotButton";
import { parseStyle } from "@/lib/style";
import type { TerminalViewModel } from "@/terminal/types";

export function FundingTableCard({ vm }: { vm: TerminalViewModel }) {
  return (
    <section className="mw-card snap-card mw-tablecard" data-snap="funding-grid">
      <div className="mw-card-h">
        <div>
          <h2 className="h-i">
            Funding by Market and Venue
            <InfoTip tip="The funding rate for each market on each venue. Positive means longs pay shorts." />
          </h2>
          <p>{vm.mwTableSub?.funding}</p>
        </div>
        <SnapshotButton onClick={vm.mw?.snap} />
      </div>
      <div className="mw-card-tools">
        <div className="fm-bar">
          <div className="dd">
            <button
              type="button"
              className={vm.mw?.dd?.funit?.btnCls}
              aria-haspopup="listbox"
              aria-expanded={vm.mw?.dd?.funit?.openStr}
              onClick={vm.mw?.dd?.funit?.toggle}
            >
              <span className="dd-l">{vm.mw?.dd?.funit?.label}</span>
              <b>{vm.mw?.dd?.funit?.cur}</b>
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
            {vm.mw?.dd?.funit?.open ? (
              <>
                <button
                  type="button"
                  className="dd-scrim"
                  aria-label="Close"
                  onClick={vm.mw?.dd?.funit?.close}
                />
                <div className="dd-menu" role="listbox" aria-label={vm.mw?.dd?.funit?.label}>
                  {(vm.mw?.dd?.funit?.opts || []).map((opt: any, i: any) => (
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
          <div className="fm-right">
            <span className="fm-key num">
              <span>
                <i className="k-pos" />
                Longs pay shorts
              </span>
              <span>
                <i className="k-neg" />
                Shorts pay longs
              </span>
            </span>
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
      </div>
      <div className="fm-cards" role="list" aria-label="Funding by market">
        {(vm.fmRowsP || []).map((fmRowsPItem: any, i: any) => (
          <Fragment key={i}>
            <div className="fmc" role="listitem">
              <div className="fmc-top">
                <span className="rk num">{fmRowsPItem?.num}</span>
                <img className="logo" src={fmRowsPItem?.logo} alt="" />
                <b>{fmRowsPItem?.sym}-PERP</b>
                <span className="fmc-spread num">
                  <small>Spread</small>
                  {fmRowsPItem?.spread}
                </span>
              </div>
              <div className="fmc-carry">
                <span>
                  Long on{" "}
                  <img className="logo xxs" src={fmRowsPItem?.longLogo} data-venue="1" alt="" />
                  {fmRowsPItem?.longName}
                </span>
                <span>
                  Short on{" "}
                  <img className="logo xxs" src={fmRowsPItem?.shortLogo} data-venue="1" alt="" />
                  {fmRowsPItem?.shortName}
                </span>
              </div>
              <div className="fmc-rates num">
                {(fmRowsPItem?.cells || []).map((cell: any, i2: any) => (
                  <Fragment key={i2}>
                    <span className={cell?.mcls}>
                      <img className="logo" src={cell?.logo} data-venue="1" alt={cell?.vn} />
                      <span
                        className="fchip"
                        style={parseStyle(
                          `background: ${cell?.bg ?? ""}; color: ${cell?.fg ?? ""}`,
                        )}
                      >
                        {cell?.v}
                      </span>
                    </span>
                  </Fragment>
                ))}
              </div>
            </div>
          </Fragment>
        ))}
      </div>
      <div className="xscroll fm-wrap">
        <div className="fm num" role="table" aria-label="Funding by market and exchange">
          <div className="fm-row fm-head" role="row">
            <div role="columnheader">
              <span className="rk">#</span>Market
            </div>
            {(vm.fmHead || []).map((fmHeadItem: any, i: any) => (
              <Fragment key={i}>
                <div role="columnheader">
                  <img className="logo xs" src={fmHeadItem?.logo} alt="" />
                  <span>{fmHeadItem?.name}</span>
                </div>
              </Fragment>
            ))}
            <div role="columnheader">Spread</div>
            <div role="columnheader">Best Carry</div>
          </div>
          {(vm.fmRowsP || []).map((fmRowsPItem: any, i: any) => (
            <Fragment key={i}>
              <div className="fm-row" role="row">
                <div role="cell">
                  <span className="xcell">
                    <span className="rk num">{fmRowsPItem?.num}</span>
                    <img className="logo xs" src={fmRowsPItem?.logo} alt="" />
                    <b>{fmRowsPItem?.sym}</b>
                  </span>
                </div>
                {(fmRowsPItem?.cells || []).map((cell: any, i2: any) => (
                  <Fragment key={i2}>
                    <div role="cell">
                      <span
                        className="fchip"
                        style={parseStyle(
                          `background: ${cell?.bg ?? ""}; color: ${cell?.fg ?? ""}`,
                        )}
                      >
                        {cell?.v}
                      </span>
                    </div>
                  </Fragment>
                ))}
                <div role="cell">
                  <b>{fmRowsPItem?.spread}</b>
                </div>
                <div role="cell">
                  <span className="carry2">
                    <span>
                      Long{" "}
                      <img className="logo xxs" src={fmRowsPItem?.longLogo} data-venue="1" alt="" />
                      {fmRowsPItem?.longName}
                    </span>
                    <span>
                      Short{" "}
                      <img
                        className="logo xxs"
                        src={fmRowsPItem?.shortLogo}
                        data-venue="1"
                        alt=""
                      />
                      {fmRowsPItem?.shortName}
                    </span>
                  </span>
                </div>
              </div>
            </Fragment>
          ))}
        </div>
      </div>
      <div className="pgx num">
        <span className="pgx-t">{vm.fmPager?.text}</span>
        <span className="pgx-c">
          <button
            type="button"
            className="pgx-a"
            aria-label="Previous page"
            disabled={!!vm.fmPager?.prevDis}
            onClick={vm.fmPager?.prev}
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
          {(vm.fmPager?.nums || []).map((num: any, i: any) => (
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
            disabled={!!vm.fmPager?.nextDis}
            onClick={vm.fmPager?.next}
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
