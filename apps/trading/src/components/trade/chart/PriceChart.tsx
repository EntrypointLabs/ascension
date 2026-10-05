import { Fragment } from "react";
import { parseStyle } from "@/lib/style";
import type { TerminalViewModel } from "@/terminal/types";
import { LogoMark } from "@openfutures/ui";

export function PriceChart({ vm }: { vm: TerminalViewModel }) {
  return (
    <>
      <div className="ch-main">
        {vm.ta?.show ? (
          <>
            <div className="ta-rail" role="toolbar" aria-label="Drawing tools">
              {(vm.ta?.tools || []).map((tool: any, i: any) => (
                <Fragment key={i}>
                  <button
                    type="button"
                    className={tool?.cls}
                    aria-label={tool?.label}
                    title={tool?.label}
                    aria-pressed={tool?.pressed}
                    onClick={tool?.pick}
                  >
                    <span className="ta-ic">{tool?.icon}</span>
                  </button>
                </Fragment>
              ))}
              <span className="ta-rsep" aria-hidden="true" />
              <button
                type="button"
                className="ta-tool"
                aria-label="Remove all drawings"
                title="Remove all drawings"
                disabled={!!vm.ta?.noDraw}
                onClick={vm.ta?.clear}
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
                  <path d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13" />
                </svg>
              </button>
            </div>
          </>
        ) : null}
        <div className="chart-body tv-body">
          <div className="wm" aria-hidden="true">
            <LogoMark />
            <span>OpenFutures</span>
          </div>
          <div className="tv-host" id="tv-host" aria-label={vm.chartLabel} />
          <div className={vm.chLegendCls}>
            <div className="chl-top">
              <b>{vm.m?.sym}-PERP</b>
              <span>{vm.tfLabel}</span>
              <span>{vm.V?.name}</span>
              <i className="chl-dot" aria-hidden="true" />
              {vm.isCandle ? (
                <>
                  <span>
                    O<em className={vm.o?.dir}>{vm.o?.o}</em>
                  </span>
                  <span>
                    H<em className={vm.o?.dir}>{vm.o?.h}</em>
                  </span>
                  <span>
                    L<em className={vm.o?.dir}>{vm.o?.l}</em>
                  </span>
                  <span>
                    C<em className={vm.o?.dir}>{vm.o?.c}</em>
                  </span>
                </>
              ) : null}
              {vm.isLine ? (
                <>
                  <span>
                    Price<em className={vm.o?.dir}>{vm.o?.c}</em>
                  </span>
                </>
              ) : null}
              <em className={vm.o?.dir}>{vm.o?.chg}</em>
              <span className="chl-vol">
                Vol<em>{vm.o?.vol}</em>
              </span>
            </div>
            <div className="ta-legend num chl-ind">
              {(vm.ta?.legend || []).map((legendItem: any, i: any) => (
                <Fragment key={i}>
                  <span>
                    <i style={parseStyle(`background: ${legendItem?.color ?? ""}`)} />
                    {legendItem?.name} <b>{legendItem?.val}</b>
                  </span>
                </Fragment>
              ))}
            </div>
          </div>
          {vm.ta?.hasHint ? (
            <>
              <span className="ta-hint-ov">{vm.ta?.hint}</span>
            </>
          ) : null}
        </div>
      </div>
      <div className="ch-foot num">
        <div className="chf-ranges" role="group" aria-label="Visible range">
          {(vm.chRanges || []).map((chRange: any, i: any) => (
            <Fragment key={i}>
              <button
                type="button"
                className={chRange?.cls}
                aria-pressed={chRange?.pressed}
                onClick={chRange?.pick}
              >
                {chRange?.label}
              </button>
            </Fragment>
          ))}
        </div>
        <span className="chf-r">
          <span className="chf-clock">{vm.chClock}</span>
          <span className="chf-sep" aria-hidden="true" />
          {(vm.chScales || []).map((chScale: any, i: any) => (
            <Fragment key={i}>
              <button
                type="button"
                className={chScale?.cls}
                aria-pressed={chScale?.pressed}
                title={chScale?.title}
                onClick={chScale?.pick}
              >
                {chScale?.label}
              </button>
            </Fragment>
          ))}
        </span>
      </div>
    </>
  );
}
