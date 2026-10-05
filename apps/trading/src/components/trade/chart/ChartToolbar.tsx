import { Fragment } from "react";
import { parseStyle } from "@/lib/style";
import type { TerminalViewModel } from "@/terminal/types";

export function ChartToolbar({ vm }: { vm: TerminalViewModel }) {
  return (
    <div className="chart-bar">
      {vm.cvNotSocials ? (
        <>
          <div className="seg-sm tf-seg" role="group" aria-label="Timeframe">
            {(vm.tfs || []).map((item: any, i: any) => (
              <Fragment key={i}>
                <button
                  type="button"
                  className={item?.cls}
                  aria-pressed={item?.pressed}
                  aria-label={item?.aria}
                  onClick={item?.pick}
                >
                  {item?.label}
                </button>
              </Fragment>
            ))}
          </div>
        </>
      ) : null}
      {vm.cvPrice ? (
        <>
          <span className="cb-sep" aria-hidden="true" />
          <button
            type="button"
            className="cb-ic"
            aria-label={vm.typeLabel}
            title={vm.typeLabel}
            onClick={vm.toggleType}
          >
            {vm.isCandle ? (
              <>
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  aria-hidden="true"
                  style={{ fill: "none", stroke: "currentColor" }}
                >
                  <path d="M7 3v4M7 15v6M17 3v6M17 17v4" />
                  <rect x="4.5" y="7" width="5" height="8" rx="1" />
                  <rect x="14.5" y="9" width="5" height="8" rx="1" />
                </svg>
              </>
            ) : null}
            {vm.isLine ? (
              <>
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
                  <path d="M3 17l5-6 4 4 9-10" />
                </svg>
              </>
            ) : null}
          </button>
          {vm.ta?.show ? (
            <>
              <span className="cb-sep" aria-hidden="true" />
              <span className="ta-anchor">
                <button
                  type="button"
                  className={vm.ta?.indCls}
                  aria-haspopup="menu"
                  aria-expanded={vm.ta?.menuStr}
                  onClick={vm.ta?.toggleMenu}
                >
                  <svg
                    width="17"
                    height="17"
                    viewBox="0 0 24 24"
                    strokeWidth="1.9"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                    style={{ fill: "none", stroke: "currentColor" }}
                  >
                    <path d="M3 17c3 0 4-8 7-8s3 6 6 6 3-4 5-4" />
                    <path d="M3 21h18" />
                  </svg>
                  <span>Indicators</span>
                  <span className="ta-count num">{vm.ta?.count}</span>
                </button>
                {vm.ta?.menu ? (
                  <>
                    <button
                      type="button"
                      className="ta-scrim"
                      aria-label="Close indicators"
                      onClick={vm.ta?.toggleMenu}
                    />
                    <div className="ta-menu" role="menu" aria-label="Indicators">
                      {(vm.ta?.groups || []).map((group: any, i: any) => (
                        <Fragment key={i}>
                          <p className="ta-mh">{group?.title}</p>
                          {(group?.items || []).map((item: any, i2: any) => (
                            <Fragment key={i2}>
                              <button
                                type="button"
                                role="menuitemcheckbox"
                                aria-checked={item?.on}
                                className={item?.cls}
                                onClick={item?.toggle}
                              >
                                <i style={parseStyle(`background: ${item?.color ?? ""}`)} />
                                <span>
                                  <b>{item?.name}</b>
                                  <small>{item?.desc}</small>
                                </span>
                                <span className="ta-chk" />
                              </button>
                            </Fragment>
                          ))}
                        </Fragment>
                      ))}
                    </div>
                  </>
                ) : null}
              </span>
            </>
          ) : null}
        </>
      ) : null}
      {vm.cvDepth ? (
        <>
          <div className="seg-sm cv-right" role="group" aria-label="Depth range">
            <span className="cv-lbl">Range</span>
            {(vm.dz?.ranges || []).map((range: any, i: any) => (
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
        </>
      ) : null}
      <span className="cb-r">
        <button type="button" className="fs-btn" aria-label={vm.fsLabel} onClick={vm.toggleFs}>
          <span className="fs-in">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
              style={{ fill: "none", stroke: "currentColor" }}
            >
              <path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5" />
            </svg>
          </span>
          <span className="fs-out">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
              style={{ fill: "none", stroke: "currentColor" }}
            >
              <path d="M9 4v5H4M15 4v5h5M9 20v-5H4M15 20v-5h5" />
            </svg>
          </span>
        </button>
      </span>
    </div>
  );
}
