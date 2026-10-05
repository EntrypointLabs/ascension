import { Fragment } from "react";
import { parseStyle } from "@/lib/style";
import type { TerminalViewModel } from "@/terminal/types";

export function WatchDetailSheet({ vm }: { vm: TerminalViewModel }) {
  return (
    <>
      <div className="wsheet" role="dialog" aria-label={`${vm.wd?.name ?? ""} across exchanges`}>
        <span className="grab" aria-hidden="true" />
        <div className="wsheet-head">
          <img className="logo sm" src={vm.wd?.logo} alt="" />
          <div>
            <b>{vm.wd?.sym}</b>
            <small className="num">
              ${vm.wd?.vwap} <span className={vm.wd?.dir}>{vm.wd?.chgText}</span>
            </small>
          </div>
          <button
            type="button"
            className="btn btn-icon sm"
            aria-label={`Add ${vm.wd?.sym ?? ""}-PERP to watchlist`}
            aria-pressed={vm.wd?.favPressed}
            onClick={vm.wd?.toggleFav}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              strokeWidth="1.6"
              strokeLinejoin="round"
              aria-hidden="true"
              style={parseStyle(`fill: ${vm.wd?.favFill ?? ""}; stroke: currentColor`)}
            >
              <path d="m12 3.5 2.6 5.3 5.9.9-4.3 4.1 1 5.8-5.2-2.8-5.2 2.8 1-5.8-4.3-4.1 5.9-.9z" />
            </svg>
          </button>
          <button
            type="button"
            className="btn btn-icon sm"
            aria-label={`Share ${vm.wd?.sym ?? ""}-PERP`}
            onClick={vm.wd?.share}
          >
            <svg
              width="19"
              height="19"
              viewBox="0 0 24 24"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
              style={{ fill: "none", stroke: "currentColor" }}
            >
              <path d="M12 15V3" />
              <path d="m7 8 5-5 5 5" />
              <path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-7" />
            </svg>
          </button>
          <button
            type="button"
            className="btn btn-icon sm"
            aria-label="Close"
            onClick={vm.closeAll}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              strokeWidth="1.8"
              strokeLinecap="round"
              aria-hidden="true"
              style={{ fill: "none", stroke: "currentColor" }}
            >
              <path d="M6 6l12 12M18 6 6 18" />
            </svg>
          </button>
        </div>
        <div className="md">
          <div className="md-main">
            <dl className="md-stats num">
              {(vm.wd?.stats || []).map((stat: any, i: any) => (
                <Fragment key={i}>
                  <div>
                    <dt>{stat?.label}</dt>
                    <dd className={stat?.cls}>{stat?.value}</dd>
                  </div>
                </Fragment>
              ))}
            </dl>
            <div className="md-chart-head">
              <div className="md-ct">
                <span>{vm.wd?.chart?.title}</span>
                <b className={`num ${vm.wd?.chart?.valCls ?? ""}`}>{vm.wd?.chart?.value}</b>
              </div>
              <div className="seg-sm" role="group" aria-label="Chart">
                {(vm.wdmetrics || []).map((wdmetric: any, i: any) => (
                  <Fragment key={i}>
                    <button
                      type="button"
                      className={wdmetric?.cls}
                      aria-pressed={wdmetric?.pressed}
                      onClick={wdmetric?.pick}
                    >
                      {wdmetric?.label}
                    </button>
                  </Fragment>
                ))}
              </div>
            </div>
            <div className="md-chart">
              <div className="wm" aria-hidden="true">
                <svg viewBox="-6 -6 112 112">
                  <path
                    fillRule="evenodd"
                    d="M18.7 0L13 13L0 18.7L0 37L25 48L25 52L0 63L0 81.3L13 87L18.7 100L37 100L48 75L52 75L63 100L81.3 100L87 87L100 81.3L100 63L75 52L75 48L100 37L100 18.7L87 13L81.3 0L63 0L52 25L48 25L37 0ZM28 28L28 72L72 72L72 28Z"
                  />
                </svg>
                <span>OpenFutures</span>
              </div>
              {(vm.wd?.chart?.lines || []).map((line: any, i: any) => (
                <Fragment key={i}>
                  <svg
                    className="lc-svg"
                    viewBox="0 0 1000 200"
                    preserveAspectRatio="none"
                    aria-hidden="true"
                  >
                    <path d={line?.area} style={parseStyle(`fill: ${line?.fill ?? ""}`)} />
                    <path
                      d={line?.d}
                      strokeWidth="1.6"
                      strokeLinejoin="round"
                      vectorEffect="non-scaling-stroke"
                      style={parseStyle(`fill: none; stroke: ${line?.c ?? ""}`)}
                    />
                  </svg>
                </Fragment>
              ))}
              <svg
                className="lc-svg"
                viewBox="0 0 1000 200"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <path d={vm.wd?.chart?.barsUp} style={{ fill: "var(--text)" }} />
                <path d={vm.wd?.chart?.barsDown} style={{ fill: "#d7303a" }} />
                <path
                  d={vm.wd?.chart?.zero}
                  strokeDasharray="3 5"
                  vectorEffect="non-scaling-stroke"
                  style={{ stroke: "var(--line-3)" }}
                />
              </svg>
              <span className="md-y top num">{vm.wd?.chart?.hi}</span>
              <span className="md-y bot num">{vm.wd?.chart?.lo}</span>
              {vm.wd?.chart?.tip?.show ? (
                <>
                  <i
                    className="mwc-vline"
                    style={parseStyle(`left: ${vm.wd?.chart?.tip?.left ?? ""}%`)}
                  />
                  <div
                    className={`${vm.wd?.chart?.tip?.side ?? ""} mwc-tip num`}
                    style={parseStyle(`left: ${vm.wd?.chart?.tip?.left ?? ""}%`)}
                  >
                    <div className="tip-h">
                      <b>{vm.wd?.chart?.tip?.when}</b>
                    </div>
                    {(vm.wd?.chart?.tip?.rows || []).map((row: any, i: any) => (
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
                onPointerMove={vm.wd?.chart?.move}
                onPointerDown={vm.wd?.chart?.move}
                onPointerLeave={vm.wd?.chart?.leave}
              />
            </div>
            <div className="md-x num">
              {(vm.wd?.chart?.x || []).map((xItem: any, i: any) => (
                <Fragment key={i}>
                  <span>{xItem?.t}</span>
                </Fragment>
              ))}
            </div>
            <div className="md-legend num">
              {(vm.wd?.chart?.legend || []).map((legendItem: any, i: any) => (
                <Fragment key={i}>
                  <span>
                    <i style={parseStyle(`background: ${legendItem?.c ?? ""}`)} />
                    {legendItem?.label}
                    <b>{legendItem?.value}</b>
                  </span>
                </Fragment>
              ))}
            </div>
          </div>
          <aside className="md-side">
            <div className="md-side-head">
              <b>Exchanges</b>
              <span>By open interest</span>
            </div>
            <div className="md-ex-list">
              {(vm.wd?.ex || []).map((exItem: any, i: any) => (
                <Fragment key={i}>
                  <button
                    type="button"
                    className={exItem?.cls}
                    aria-pressed={exItem?.selected}
                    onClick={exItem?.pick}
                  >
                    <img className="logo sm" src={exItem?.logo} data-venue="1" alt="" />
                    <span className="mx-name">
                      <b>{exItem?.name}</b>
                      <small>{exItem?.native}</small>
                    </span>
                    <span className="mx-num num">
                      <b>{exItem?.price}</b>
                      <small className={exItem?.fundCls}>{exItem?.fund} APR</small>
                    </span>
                    <span className="mx-share num">
                      <i>
                        <span style={parseStyle(`width: ${exItem?.share ?? ""}%`)} />
                      </i>
                      <small>{exItem?.shareText}</small>
                    </span>
                  </button>
                </Fragment>
              ))}
            </div>
            <div className="md-sel">
              <div className="md-sel-head">
                <span className="xcell">
                  <img className="logo xs" src={vm.wd?.sel?.logo} data-venue="1" alt="" />
                  <b>{vm.wd?.sel?.name}</b>
                  <span className={vm.wd?.sel?.dotCls} />
                  <small className="num">{vm.wd?.sel?.lat}</small>
                </span>
                <div className="seg-sm" role="group" aria-label="Exchange detail">
                  {(vm.wdsel || []).map((wdselItem: any, i: any) => (
                    <Fragment key={i}>
                      <button
                        type="button"
                        className={wdselItem?.cls}
                        aria-pressed={wdselItem?.pressed}
                        onClick={wdselItem?.pick}
                      >
                        {wdselItem?.label}
                      </button>
                    </Fragment>
                  ))}
                </div>
              </div>
              {vm.wd?.selBook ? (
                <>
                  <div className="vb-head">
                    <div>
                      <span>Size</span>
                      <span>Bid</span>
                    </div>
                    <div>
                      <span>Ask</span>
                      <span>Size</span>
                    </div>
                  </div>
                  {(vm.wd?.sel?.book || []).map((bookItem: any, i: any) => (
                    <Fragment key={i}>
                      <div className="vb-row num">
                        <div className="vb-half bid">
                          <i style={parseStyle(`width: ${bookItem?.bd ?? ""}%`)} />
                          <span>{bookItem?.bs}</span>
                          <span className="up">{bookItem?.bp}</span>
                        </div>
                        <div className="vb-half ask">
                          <i style={parseStyle(`width: ${bookItem?.ad ?? ""}%`)} />
                          <span className="down">{bookItem?.ap}</span>
                          <span>{bookItem?.as}</span>
                        </div>
                      </div>
                    </Fragment>
                  ))}
                  <div className="md-sel-foot num">
                    <span>Spread {vm.wd?.sel?.spread}</span>
                    <span>Basis {vm.wd?.sel?.basis}</span>
                  </div>
                </>
              ) : null}
              {vm.wd?.selSpecs ? (
                <>
                  <dl className="md-specs num">
                    {(vm.wd?.sel?.specs || []).map((spec: any, i: any) => (
                      <Fragment key={i}>
                        <div>
                          <dt>{spec?.k}</dt>
                          <dd>{spec?.v}</dd>
                        </div>
                      </Fragment>
                    ))}
                  </dl>
                </>
              ) : null}
              <button
                type="button"
                className="btn btn-primary md-trade"
                onClick={vm.wd?.sel?.trade}
              >
                Trade {vm.wd?.sym} on {vm.wd?.sel?.name}
              </button>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}
