import { Fragment } from "react";
import { parseStyle } from "@/lib/style";
import type { TerminalViewModel } from "@/terminal/types";

export function PerformanceCard({ vm }: { vm: TerminalViewModel }) {
  return (
    <section className="mw-card snap-card pf" data-snap="performance">
      <div className="mw-card-h">
        <div>
          <h2>Market Performance</h2>
          <p>Price change over the selected period</p>
        </div>
        <div className="mw-card-a">
          <div className="dd">
            <button
              type="button"
              className={vm.mw?.dd?.pfCat?.btnCls}
              aria-haspopup="listbox"
              aria-expanded={vm.mw?.dd?.pfCat?.openStr}
              onClick={vm.mw?.dd?.pfCat?.toggle}
            >
              <span className="dd-l">{vm.mw?.dd?.pfCat?.label}</span>
              <b>{vm.mw?.dd?.pfCat?.cur}</b>
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
            {vm.mw?.dd?.pfCat?.open ? (
              <>
                <button
                  type="button"
                  className="dd-scrim"
                  aria-label="Close"
                  onClick={vm.mw?.dd?.pfCat?.close}
                />
                <div className="dd-menu" role="listbox" aria-label={vm.mw?.dd?.pfCat?.label}>
                  {(vm.mw?.dd?.pfCat?.opts || []).map((opt: any, i: any) => (
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
          <div className="mwc-seg" role="group" aria-label="Period">
            {(vm.mw?.perf?.ranges || []).map((range: any, i: any) => (
              <Fragment key={i}>
                <button
                  type="button"
                  className={range?.cls}
                  aria-pressed={range?.pressed}
                  onClick={range?.pick}
                >
                  {range?.label}
                </button>
              </Fragment>
            ))}
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
      </div>
      <div className="pf-body">
        <div className="pf-chart">
          <div className="pf-y num" aria-hidden="true">
            {(vm.mw?.perf?.yTicks || []).map((yTick: any, i: any) => (
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
              {(vm.mw?.perf?.yTicks || []).map((yTick: any, i: any) => (
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
              {(vm.mw?.perf?.lines || []).map((line: any, i: any) => (
                <Fragment key={i}>
                  <path
                    d={line?.d}
                    strokeWidth={line?.w}
                    strokeOpacity={line?.op}
                    vectorEffect="non-scaling-stroke"
                    style={parseStyle(`fill: none; stroke: ${line?.color ?? ""}`)}
                  />
                </Fragment>
              ))}
            </svg>
            {vm.mw?.perf?.tip?.show ? (
              <>
                <i
                  className="mwc-vline"
                  style={parseStyle(`left: ${vm.mw?.perf?.tip?.left ?? ""}%`)}
                />
                <div
                  className={`${vm.mw?.perf?.tip?.side ?? ""} mwc-tip num`}
                  style={parseStyle(`left: ${vm.mw?.perf?.tip?.left ?? ""}%`)}
                >
                  <div className="tip-h">
                    <b>{vm.mw?.perf?.tip?.date}</b>
                    <b>vs start</b>
                  </div>
                  {(vm.mw?.perf?.tip?.rows || []).map((row: any, i: any) => (
                    <Fragment key={i}>
                      <div className="tip-r">
                        <span>
                          <i style={parseStyle(`background: ${row?.color ?? ""}`)} />
                          {row?.name}
                        </span>
                        <span className={row?.cls}>{row?.val}</span>
                      </div>
                    </Fragment>
                  ))}
                </div>
              </>
            ) : null}
            <div
              className="mwc-hit"
              onPointerMove={vm.mw?.perf?.move}
              onPointerDown={vm.mw?.perf?.move}
              onPointerLeave={vm.mw?.perf?.leave}
            />
          </div>
          <div className="pf-x num" aria-hidden="true">
            {(vm.mw?.perf?.xTicks || []).map((xTick: any, i: any) => (
              <Fragment key={i}>
                <span className={xTick?.cls} style={parseStyle(`left: ${xTick?.x ?? ""}%`)}>
                  {xTick?.label}
                </span>
              </Fragment>
            ))}
          </div>
        </div>
        <div className="pf-table num" role="table" aria-label="Returns by market">
          <div className="pf-tr pf-th" role="row">
            <span role="columnheader">
              <span className="rk">#</span>Market
            </span>
            {(vm.mw?.perf?.heads || []).map((head: any, i: any) => (
              <Fragment key={i}>
                <button
                  type="button"
                  role="columnheader"
                  className={head?.cls}
                  onClick={head?.pick}
                >
                  {head?.label}
                  <i aria-hidden="true">{head?.arrow}</i>
                </button>
              </Fragment>
            ))}
          </div>
          {(vm.mw?.perf?.rows || []).map((row: any, i: any) => (
            <Fragment key={i}>
              <button
                type="button"
                role="row"
                className={row?.cls}
                aria-pressed={row?.pressed}
                onClick={row?.toggle}
                onPointerEnter={row?.enter}
                onPointerLeave={row?.leave}
              >
                <span className="pf-name">
                  <span className="rk num">{row?.num}</span>
                  <i style={parseStyle(`background: ${row?.color ?? ""}`)} />
                  <img className="logo" src={row?.logo} alt="" />
                  {row?.sym}
                </span>
                {(row?.cells || []).map((cell: any, i2: any) => (
                  <Fragment key={i2}>
                    <span className={cell?.cls}>{cell?.v}</span>
                  </Fragment>
                ))}
              </button>
            </Fragment>
          ))}
        </div>
      </div>
      <div className="mw-card-f">
        <span>Hover to highlight. Tap a row to hide or show its line.</span>
        <span>{vm.mw?.perf?.asOf}</span>
      </div>
    </section>
  );
}
