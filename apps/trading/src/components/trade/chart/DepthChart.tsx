import { Fragment } from "react";
import { parseStyle } from "@/lib/style";
import type { TerminalViewModel } from "@/terminal/types";

export function DepthChart({ vm }: { vm: TerminalViewModel }) {
  return (
    <>
      <div className="cz-head num">
        <span>
          Mid <b>${vm.dz?.mid}</b>
        </span>
        <span>
          Spread <b>{vm.dz?.spread}</b>
        </span>
        <span>
          Bids in range <b>{vm.dz?.bidTot}</b>
        </span>
        <span>
          Asks in range <b className="down">{vm.dz?.askTot}</b>
        </span>
        <span>
          Bids vs typical <b className={vm.dz?.vsBCls}>{vm.dz?.vsB}</b>
        </span>
        <span>
          Asks vs typical <b className={vm.dz?.vsACls}>{vm.dz?.vsA}</b>
        </span>
        <span className="cz-src">
          <i className="cz-key dash" />
          {vm.dz?.avgLabel}
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
          onMouseMove={vm.dz?.move}
          onMouseLeave={vm.dz?.leave}
          onTouchStart={vm.dz?.move}
          onTouchMove={vm.dz?.move}
          onTouchEnd={vm.dz?.leave}
        >
          <svg
            viewBox="0 0 1000 300"
            preserveAspectRatio="none"
            role="img"
            aria-label={`Order book depth for ${vm.m?.sym ?? ""} on ${vm.V?.name ?? ""}`}
          >
            <path
              d={vm.dz?.grid}
              strokeDasharray="3 6"
              vectorEffect="non-scaling-stroke"
              style={{ stroke: "var(--line-2)" }}
            />
            <path
              d={vm.dz?.bidArea}
              style={{ fill: "color-mix(in srgb, var(--c-up) 16%, transparent)" }}
            />
            <path d={vm.dz?.askArea} style={{ fill: "rgba(229,72,77,0.14)" }} />
            <path
              d={vm.dz?.bidLine}
              strokeWidth="1.5"
              vectorEffect="non-scaling-stroke"
              style={{ fill: "none", stroke: "var(--c-up)" }}
            />
            <path
              d={vm.dz?.askLine}
              strokeWidth="1.5"
              vectorEffect="non-scaling-stroke"
              style={{ fill: "none", stroke: "var(--c-dn)" }}
            />
            <path
              d={vm.dz?.midLine}
              strokeDasharray="2 4"
              vectorEffect="non-scaling-stroke"
              style={{ stroke: "var(--line-4)" }}
            />
            <path
              d={vm.dz?.avgBid}
              strokeWidth="1.2"
              strokeDasharray="4 4"
              vectorEffect="non-scaling-stroke"
              style={{ fill: "none", stroke: "var(--text-3)" }}
            />
            <path
              d={vm.dz?.avgAsk}
              strokeWidth="1.2"
              strokeDasharray="4 4"
              vectorEffect="non-scaling-stroke"
              style={{ fill: "none", stroke: "#6f8fe0" }}
            />
          </svg>
          {vm.dz?.hov ? (
            <>
              <div className="cross-v" style={parseStyle(`left: ${vm.dz?.hx ?? ""}%`)} />
              <div
                className="cz-dot"
                style={parseStyle(
                  `left: ${vm.dz?.hx ?? ""}%; top: ${vm.dz?.hy ?? ""}%; background: ${vm.dz?.hc ?? ""}`,
                )}
              />
              <div
                className={vm.dz?.tipCls}
                style={parseStyle(`left: ${vm.dz?.hx ?? ""}%; top: ${vm.dz?.tipY ?? ""}%`)}
              >
                <b>{vm.dz?.tSide}</b>
                <span>
                  Price <em>${vm.dz?.tPrice}</em>
                </span>
                <span>
                  Total to here <em>{vm.dz?.tTotal}</em>
                </span>
                <span>
                  Distance from mid <em>{vm.dz?.tDist}</em>
                </span>
                <span>
                  Typical, {vm.dz?.tfLabel} <em>{vm.dz?.tAvg}</em>
                </span>
              </div>
            </>
          ) : null}
        </div>
        <div className="yaxis num" aria-hidden="true">
          {(vm.dz?.yt || []).map((ytItem: any, i: any) => (
            <Fragment key={i}>
              <span style={parseStyle(`top: ${ytItem?.y ?? ""}%`)}>{ytItem?.label}</span>
            </Fragment>
          ))}
        </div>
      </div>
      <div className="xaxis num cz-x" aria-hidden="true">
        {(vm.dz?.xt || []).map((xtItem: any, i: any) => (
          <Fragment key={i}>
            <span style={parseStyle(`left: ${xtItem?.x ?? ""}%`)}>{xtItem?.t}</span>
          </Fragment>
        ))}
      </div>
    </>
  );
}
