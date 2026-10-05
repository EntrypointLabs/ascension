import { Fragment } from "react";
import { parseStyle } from "@/lib/style";
import type { TerminalViewModel } from "@/terminal/types";

export function FundingChart({ vm }: { vm: TerminalViewModel }) {
  return (
    <>
      <div className="cz-head cz-4 num">
        <span>
          Current rate <b className={vm.fz?.curCls}>{vm.fz?.cur}</b>
        </span>
        <span>
          Est. next <b className={vm.fz?.nextCls}>{vm.fz?.next}</b>
        </span>
        <span>
          Annualized <b className={vm.fz?.curCls}>{vm.fz?.apr}</b>
        </span>
        <span>
          Next in <b>{vm.fz?.countdown}</b>
        </span>
        <span className="cz-src">
          <span className="cz-win">{vm.fz?.win}</span>
          <i className="cz-key pos" />
          Longs pay
          <i className="cz-key neg" />
          Shorts pay
          <i className="cz-key px" />
          Price
        </span>
      </div>
      <div className="cz-body">
        <div className="wm" aria-hidden="true">
          <svg viewBox="-6 -6 112 112">
            <path
              fillRule="evenodd"
              d="M18.7 0L13 13L0 18.7L0 37L25 48L25 52L0 63L0 81.3L13 87L18.7 100L37 100L48 75L52 75L63 100L81.3 100L87 87L100 81.3L100 63L75 52L75 48L100 37L100 18.7L87 13L81.3 0L63 0L52 25L48 25L37 0ZM28 28L28 72L72 72L72 28Z"
            />
          </svg>
          <span>OpenFutures</span>
        </div>
        <div
          className="cz-plot"
          onMouseMove={vm.fz?.move}
          onMouseLeave={vm.fz?.leave}
          onTouchStart={vm.fz?.move}
          onTouchMove={vm.fz?.move}
          onTouchEnd={vm.fz?.leave}
        >
          <svg
            viewBox="0 0 1000 300"
            preserveAspectRatio="none"
            role="img"
            aria-label={`Hourly funding for ${vm.m?.sym ?? ""} on ${vm.V?.name ?? ""}, with price`}
          >
            <path
              d={vm.fz?.grid}
              strokeDasharray="3 6"
              vectorEffect="non-scaling-stroke"
              style={{ stroke: "var(--line-2)" }}
            />
            <path
              d={vm.fz?.pos}
              style={{ fill: "color-mix(in srgb, var(--c-up) 60%, transparent)" }}
            />
            <path d={vm.fz?.neg} style={{ fill: "rgba(229,72,77,0.7)" }} />
            <path
              d={vm.fz?.zero}
              vectorEffect="non-scaling-stroke"
              style={{ stroke: "var(--line-4)" }}
            />
            <path
              d={vm.fz?.price}
              strokeWidth="1.3"
              strokeLinejoin="round"
              vectorEffect="non-scaling-stroke"
              style={{ fill: "none", stroke: "#e8dcc0" }}
            />
          </svg>
          <span className="cz-pl top num">${vm.fz?.pHi}</span>
          <span className="cz-pl bot num">${vm.fz?.pLo}</span>
          {vm.fz?.hov ? (
            <>
              <div className="cross-v" style={parseStyle(`left: ${vm.fz?.hx ?? ""}%`)} />
              <div
                className="cz-dot"
                style={parseStyle(
                  `left: ${vm.fz?.hx ?? ""}%; top: ${vm.fz?.hpy ?? ""}%; background: #e8dcc0`,
                )}
              />
              <div
                className={vm.fz?.tipCls}
                style={parseStyle(`left: ${vm.fz?.hx ?? ""}%; top: 8%`)}
              >
                <b>{vm.fz?.tDate}</b>
                <span>
                  Direction <em className={vm.fz?.tDirCls}>{vm.fz?.tDir}</em>
                </span>
                <span>
                  {vm.fz?.tRateLabel} <em className={vm.fz?.tDirCls}>{vm.fz?.tRate}</em>
                </span>
                <span>
                  Annualized <em>{vm.fz?.tApr}</em>
                </span>
                <span>
                  Price <em>${vm.fz?.tPrice}</em>
                </span>
              </div>
            </>
          ) : null}
        </div>
        <div className="yaxis num" aria-hidden="true">
          {(vm.fz?.yt || []).map((ytItem: any, i: any) => (
            <Fragment key={i}>
              <span style={parseStyle(`top: ${ytItem?.y ?? ""}%`)}>{ytItem?.label}</span>
            </Fragment>
          ))}
        </div>
      </div>
      <div className="xaxis num cz-x" aria-hidden="true">
        {(vm.fz?.xt || []).map((xtItem: any, i: any) => (
          <Fragment key={i}>
            <span style={parseStyle(`left: ${xtItem?.x ?? ""}%`)}>{xtItem?.t}</span>
          </Fragment>
        ))}
      </div>
    </>
  );
}
