import { Fragment } from "react";
import { parseStyle } from "@/lib/style";
import type { TerminalViewModel } from "@/terminal/types";

export function WeeklyVolumeCard({ vm }: { vm: TerminalViewModel }) {
  return (
    <section className="mw-card snap-card wk" data-snap="weekly-volume">
      <div className="mw-card-h">
        <div>
          <h2>Weekly Notional Volume by Venue</h2>
          <p>{vm.mw?.weekly?.sub}</p>
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
      <div className="wk-body">
        <div className="wk-total num">
          <b>{vm.mw?.weekly?.total}</b>
          <span>total in period</span>
        </div>
        <div className="wk-chart">
          <div className="pf-y num" aria-hidden="true">
            {(vm.mw?.weekly?.yTicks || []).map((yTick: any, i: any) => (
              <Fragment key={i}>
                <span style={parseStyle(`top: ${yTick?.y ?? ""}%`)}>{yTick?.label}</span>
              </Fragment>
            ))}
          </div>
          <div className="pf-area">
            <div className="wm" aria-hidden="true">
              <svg viewBox="-6 -6 112 112">
                <path
                  fillRule="evenodd"
                  d="M18.7 0L13 13L0 18.7L0 37L25 48L25 52L0 63L0 81.3L13 87L18.7 100L37 100L48 75L52 75L63 100L81.3 100L87 87L100 81.3L100 63L75 52L75 48L100 37L100 18.7L87 13L81.3 0L63 0L52 25L48 25L37 0ZM28 28L28 72L72 72L72 28Z"
                />
              </svg>
              <span>OpenFutures</span>
            </div>
            <div className="mwc-gridy" aria-hidden="true">
              {(vm.mw?.weekly?.yTicks || []).map((yTick: any, i: any) => (
                <Fragment key={i}>
                  <i style={parseStyle(`top: ${yTick?.y ?? ""}%`)} />
                </Fragment>
              ))}
            </div>
            <svg
              className="mwc-svg"
              viewBox="0 0 1000 280"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              {(vm.mw?.weekly?.paths || []).map((path: any, i: any) => (
                <Fragment key={i}>
                  <path d={path?.d} style={parseStyle(`fill: ${path?.color ?? ""}`)} />
                </Fragment>
              ))}
            </svg>
            {vm.mw?.weekly?.tip?.show ? (
              <>
                <i
                  className="mwc-vline"
                  style={parseStyle(`left: ${vm.mw?.weekly?.tip?.left ?? ""}%`)}
                />
                <div
                  className={`${vm.mw?.weekly?.tip?.side ?? ""} mwc-tip num`}
                  style={parseStyle(`left: ${vm.mw?.weekly?.tip?.left ?? ""}%`)}
                >
                  <div className="tip-h">
                    <b>{vm.mw?.weekly?.tip?.date}</b>
                    <b>{vm.mw?.weekly?.tip?.total}</b>
                  </div>
                  {(vm.mw?.weekly?.tip?.rows || []).map((row: any, i: any) => (
                    <Fragment key={i}>
                      <div className="tip-r">
                        <span>
                          <i style={parseStyle(`background: ${row?.color ?? ""}`)} />
                          {row?.name}
                        </span>
                        <span>{row?.val}</span>
                      </div>
                    </Fragment>
                  ))}
                </div>
              </>
            ) : null}
            <div
              className="mwc-hit"
              onPointerMove={vm.mw?.weekly?.move}
              onPointerDown={vm.mw?.weekly?.move}
              onPointerLeave={vm.mw?.weekly?.leave}
            />
          </div>
          <div className="pf-x num" aria-hidden="true">
            {(vm.mw?.weekly?.xTicks || []).map((xTick: any, i: any) => (
              <Fragment key={i}>
                <span className={xTick?.cls} style={parseStyle(`left: ${xTick?.x ?? ""}%`)}>
                  {xTick?.label}
                </span>
              </Fragment>
            ))}
          </div>
        </div>
        <div className="wk-legend">
          {(vm.mw?.weekly?.legend || []).map((legendItem: any, i: any) => (
            <Fragment key={i}>
              <span>
                <i style={parseStyle(`background: ${legendItem?.color ?? ""}`)} />
                {legendItem?.name}
              </span>
            </Fragment>
          ))}
        </div>
      </div>
      <div className="wk-filters">
        <div className="dd">
          <button
            type="button"
            className={vm.mw?.dd?.wkPeriod?.btnCls}
            aria-haspopup="listbox"
            aria-expanded={vm.mw?.dd?.wkPeriod?.openStr}
            onClick={vm.mw?.dd?.wkPeriod?.toggle}
          >
            <span className="dd-l">{vm.mw?.dd?.wkPeriod?.label}</span>
            <b>{vm.mw?.dd?.wkPeriod?.cur}</b>
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
          {vm.mw?.dd?.wkPeriod?.open ? (
            <>
              <button
                type="button"
                className="dd-scrim"
                aria-label="Close"
                onClick={vm.mw?.dd?.wkPeriod?.close}
              />
              <div className="dd-menu" role="listbox" aria-label={vm.mw?.dd?.wkPeriod?.label}>
                {(vm.mw?.dd?.wkPeriod?.opts || []).map((opt: any, i: any) => (
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
        <div className="dd">
          <button
            type="button"
            className={vm.mw?.dd?.wkVenue?.btnCls}
            aria-haspopup="listbox"
            aria-expanded={vm.mw?.dd?.wkVenue?.openStr}
            onClick={vm.mw?.dd?.wkVenue?.toggle}
          >
            <span className="dd-l">{vm.mw?.dd?.wkVenue?.label}</span>
            <b>{vm.mw?.dd?.wkVenue?.cur}</b>
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
          {vm.mw?.dd?.wkVenue?.open ? (
            <>
              <button
                type="button"
                className="dd-scrim"
                aria-label="Close"
                onClick={vm.mw?.dd?.wkVenue?.close}
              />
              <div className="dd-menu" role="listbox" aria-label={vm.mw?.dd?.wkVenue?.label}>
                {(vm.mw?.dd?.wkVenue?.opts || []).map((opt: any, i: any) => (
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
        <div className="dd">
          <button
            type="button"
            className={vm.mw?.dd?.wkCat?.btnCls}
            aria-haspopup="listbox"
            aria-expanded={vm.mw?.dd?.wkCat?.openStr}
            onClick={vm.mw?.dd?.wkCat?.toggle}
          >
            <span className="dd-l">{vm.mw?.dd?.wkCat?.label}</span>
            <b>{vm.mw?.dd?.wkCat?.cur}</b>
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
          {vm.mw?.dd?.wkCat?.open ? (
            <>
              <button
                type="button"
                className="dd-scrim"
                aria-label="Close"
                onClick={vm.mw?.dd?.wkCat?.close}
              />
              <div className="dd-menu" role="listbox" aria-label={vm.mw?.dd?.wkCat?.label}>
                {(vm.mw?.dd?.wkCat?.opts || []).map((opt: any, i: any) => (
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
        {vm.mw?.weekly?.canReset ? (
          <>
            <button type="button" className="wk-reset" onClick={vm.mw?.weekly?.reset}>
              Reset filters
            </button>
          </>
        ) : null}
      </div>
    </section>
  );
}
