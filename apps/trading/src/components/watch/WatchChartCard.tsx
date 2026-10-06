import { Fragment } from "react";
import { InfoTip } from "@/components/common/InfoTip";
import { IconToggle } from "@/components/common/IconToggle";
import { SnapshotButton } from "@/components/common/SnapshotButton";
import { parseStyle } from "@/lib/style";
import type { TerminalViewModel } from "@/terminal/types";
import { LogoMark } from "@openfutures/ui";

export function WatchChartCard({ vm }: { vm: TerminalViewModel }) {
  return (
    <section className="mwc snap-card" data-snap="market-watch" aria-label={vm.mw?.chart?.title}>
      <div className="mwc-head">
        <div className="mwc-t">
          <h2 className="h-i">
            {vm.mw?.chart?.title}
            <InfoTip tip="Hover or drag across the chart to read every series. Tap a legend item to hide it, and drag the range bar to zoom." />
          </h2>
          <b className="num">{vm.mw?.chart?.headline}</b>
        </div>
        <div className="mwc-actions">
          {vm.mw?.chart?.hasType ? (
            <>
              <IconToggle
                items={vm.mw?.chart?.types}
                label="Chart type"
                className="mwc-types"
                role="group"
              />
            </>
          ) : null}
          <SnapshotButton onClick={vm.mw?.snap} />
          <button type="button" className="mwc-btn" onClick={vm.mw?.chart?.copy}>
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
              <path d="M12 4v11M7 10l5 5 5-5M5 20h14" />
            </svg>
            <span>Copy CSV</span>
          </button>
        </div>
      </div>
      <div className="mwc-ctrls">
        {vm.mw?.chart?.hasSeg ? (
          <>
            <div className="dd">
              <button
                type="button"
                className={vm.mw?.dd?.seg?.btnCls}
                aria-haspopup="listbox"
                aria-expanded={vm.mw?.dd?.seg?.openStr}
                onClick={vm.mw?.dd?.seg?.toggle}
              >
                <span className="dd-l">{vm.mw?.dd?.seg?.label}</span>
                <b>{vm.mw?.dd?.seg?.cur}</b>
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
              {vm.mw?.dd?.seg?.open ? (
                <>
                  <button
                    type="button"
                    className="dd-scrim"
                    aria-label="Close"
                    onClick={vm.mw?.dd?.seg?.close}
                  />
                  <div className="dd-menu" role="listbox" aria-label={vm.mw?.dd?.seg?.label}>
                    {(vm.mw?.dd?.seg?.opts || []).map((opt: any, i: any) => (
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
          </>
        ) : null}
        <div className="dd">
          <button
            type="button"
            className={vm.mw?.dd?.metric?.btnCls}
            aria-haspopup="listbox"
            aria-expanded={vm.mw?.dd?.metric?.openStr}
            onClick={vm.mw?.dd?.metric?.toggle}
          >
            <span className="dd-l">{vm.mw?.dd?.metric?.label}</span>
            <b>{vm.mw?.dd?.metric?.cur}</b>
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
          {vm.mw?.dd?.metric?.open ? (
            <>
              <button
                type="button"
                className="dd-scrim"
                aria-label="Close"
                onClick={vm.mw?.dd?.metric?.close}
              />
              <div className="dd-menu" role="listbox" aria-label={vm.mw?.dd?.metric?.label}>
                {(vm.mw?.dd?.metric?.opts || []).map((opt: any, i: any) => (
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
      </div>
      <div className="mwc-plot">
        <div className="mwc-y num" aria-hidden="true">
          {(vm.mw?.chart?.yTicks || []).map((yTick: any, i: any) => (
            <Fragment key={i}>
              <span style={parseStyle(`top: ${yTick?.y ?? ""}%`)}>{yTick?.label}</span>
            </Fragment>
          ))}
        </div>
        <div className="mwc-area">
          <div className="wm" aria-hidden="true">
            <LogoMark />
            <span>OpenFutures</span>
          </div>
          <svg
            className="mwc-svg"
            viewBox="0 0 1000 288"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            {(vm.mw?.chart?.yTicks || []).map((yTick: any, i: any) => (
              <Fragment key={i}>
                <line
                  x1="0"
                  x2="1000"
                  y1={yTick?.y}
                  y2={yTick?.y}
                  className="mwc-grid"
                  style={{ transform: "translateY(0)" }}
                  vectorEffect="non-scaling-stroke"
                />
              </Fragment>
            ))}
            {(vm.mw?.chart?.paths || []).map((path: any, i: any) => (
              <Fragment key={i}>
                <path
                  d={path?.d}
                  strokeWidth={path?.sw}
                  fillOpacity={path?.op}
                  vectorEffect="non-scaling-stroke"
                  style={parseStyle(`fill: ${path?.fill ?? ""}; stroke: ${path?.stroke ?? ""}`)}
                />
              </Fragment>
            ))}
          </svg>
          <div className="mwc-gridy" aria-hidden="true">
            {(vm.mw?.chart?.yTicks || []).map((yTick: any, i: any) => (
              <Fragment key={i}>
                <i style={parseStyle(`top: ${yTick?.y ?? ""}%`)} />
              </Fragment>
            ))}
            {vm.mw?.chart?.hasZero ? (
              <>
                <i className="zero" style={parseStyle(`top: ${vm.mw?.chart?.zeroY ?? ""}%`)} />
              </>
            ) : null}
          </div>
          {vm.mw?.chart?.tip?.show ? (
            <>
              <i
                className="mwc-vline"
                style={parseStyle(`left: ${vm.mw?.chart?.tip?.vline ?? ""}%`)}
              />
              <div
                className={`${vm.mw?.chart?.tip?.side ?? ""} mwc-tip num`}
                style={parseStyle(`left: ${vm.mw?.chart?.tip?.left ?? ""}%`)}
              >
                <div className="tip-h">
                  <b>{vm.mw?.chart?.tip?.date}</b>
                  <b>{vm.mw?.chart?.tip?.total}</b>
                </div>
                {(vm.mw?.chart?.tip?.rows || []).map((row: any, i: any) => (
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
            onPointerMove={vm.mw?.chart?.move}
            onPointerDown={vm.mw?.chart?.move}
            onPointerLeave={vm.mw?.chart?.leave}
          />
        </div>
      </div>
      <div className="mwc-x num" aria-hidden="true">
        {(vm.mw?.chart?.xTicks || []).map((xTick: any, i: any) => (
          <Fragment key={i}>
            <span className={xTick?.cls} style={parseStyle(`left: ${xTick?.x ?? ""}%`)}>
              {xTick?.label}
            </span>
          </Fragment>
        ))}
      </div>
      <p className="touch-hint">Touch and drag across the chart to read values</p>
      <div className="mwc-range">
        <div className="mwc-rbtns">
          {(vm.mw?.chart?.ranges || []).map((range: any, i: any) => (
            <Fragment key={i}>
              <button type="button" className={range?.cls} onClick={range?.pick}>
                {range?.label}
              </button>
            </Fragment>
          ))}
        </div>
        <span className="mwc-rtext num">{vm.mw?.chart?.rangeText}</span>
      </div>
      <div
        className="mwc-brush"
        role="slider"
        aria-label="Visible date range"
        aria-valuetext={vm.mw?.chart?.rangeText}
        onPointerDown={vm.mw?.chart?.bDown}
        onPointerMove={vm.mw?.chart?.bMove}
        onPointerUp={vm.mw?.chart?.bUp}
        onPointerCancel={vm.mw?.chart?.bUp}
      >
        <svg viewBox="0 0 1000 40" preserveAspectRatio="none" aria-hidden="true">
          <path d={vm.mw?.chart?.miniArea} className="mb-area" />
          <path d={vm.mw?.chart?.mini} className="mb-line" vectorEffect="non-scaling-stroke" />
        </svg>
        <div
          className="mb-win"
          style={parseStyle(
            `left: ${vm.mw?.chart?.winL ?? ""}%; width: ${vm.mw?.chart?.winW ?? ""}%`,
          )}
        >
          <i className="mb-h l" />
          <i className="mb-h r" />
        </div>
      </div>
      <div className="mwc-legend">
        {(vm.mw?.chart?.legend || []).map((legendItem: any, i: any) => (
          <Fragment key={i}>
            <button
              type="button"
              className={legendItem?.cls}
              aria-pressed={legendItem?.pressed}
              onClick={legendItem?.toggle}
            >
              <i style={parseStyle(`background: ${legendItem?.color ?? ""}`)} />
              {legendItem?.name}
            </button>
          </Fragment>
        ))}
      </div>
    </section>
  );
}
